import fs from 'node:fs';

const file = new URL('../faqs/index.html', import.meta.url);
let html = fs.readFileSync(file, 'utf8');

const decode = (value) => value
  .replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, '$1')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&mdash;|&ndash;/g, '-')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&quot;/g, '"')
  .replace(/\s+/g, ' ')
  .trim();

const entities = [];
const itemPattern = /<div class="faq-item">\s*<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>\s*<\/div>/gi;
for (const match of html.matchAll(itemPattern)) {
  entities.push({
    '@type': 'Question',
    name: decode(match[1]),
    acceptedAnswer: {
      '@type': 'Answer',
      text: decode(match[2])
    }
  });
}

if (entities.length < 20) {
  throw new Error(`Expected at least 20 visible FAQ items, found ${entities.length}.`);
}

const schema = `<script type="application/ld+json" id="faq-schema">\n${JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: entities
}, null, 2)}\n</script>`;

const schemaPattern = /<script type="application\/ld\+json"(?: id="faq-schema")?>\s*\{\s*"@context":\s*"https:\/\/schema\.org",\s*"@type":\s*"FAQPage"[\s\S]*?<\/script>/i;
if (!schemaPattern.test(html)) {
  throw new Error('Could not find the existing FAQPage schema block.');
}

html = html.replace(schemaPattern, schema);
fs.writeFileSync(file, html);
console.log(`Synced ${entities.length} FAQ questions into JSON-LD.`);
