import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://weightlossdavie.com';
const expectedIndexable = [
  '/',
  '/why-us/',
  '/weight-loss-industry/',
  '/top-10-reasons-to-start/',
  '/faqs/',
  '/provider/',
  '/contact-us/',
  '/glp1-calculator/',
  '/start/',
  '/medical-information/',
  '/editorial-policy/',
  '/privacy/',
  '/terms/',
  '/accessibility/'
];

const errors = [];
const warnings = [];

function pageFile(urlPath) {
  return urlPath === '/' ? path.join(root, 'index.html') : path.join(root, urlPath.slice(1), 'index.html');
}

function count(html, expression) {
  return [...html.matchAll(expression)].length;
}

function textContent(value) {
  return value.replace(/<[^>]*>/g, ' ').replace(/&[^;]+;/g, ' ').replace(/\s+/g, ' ').trim();
}

function checkLocalTarget(pagePath, rawTarget, attribute) {
  if (!rawTarget || /^(?:https?:|mailto:|tel:|data:|javascript:|#)/i.test(rawTarget)) return;
  const clean = rawTarget.split('#')[0].split('?')[0];
  if (!clean) return;

  let target;
  if (clean.startsWith('/')) {
    target = path.join(root, clean.slice(1));
  } else {
    target = path.resolve(path.dirname(pagePath), clean);
  }

  if (clean.endsWith('/')) target = path.join(target, 'index.html');
  if (!path.extname(target) && fs.existsSync(`${target}.html`)) target = `${target}.html`;
  if (!path.extname(target) && fs.existsSync(path.join(target, 'index.html'))) target = path.join(target, 'index.html');
  if (!fs.existsSync(target)) {
    errors.push(`${path.relative(root, pagePath)}: broken local ${attribute} target ${rawTarget}`);
  }
}

for (const urlPath of expectedIndexable) {
  const file = pageFile(urlPath);
  if (!fs.existsSync(file)) {
    errors.push(`Missing indexable page ${urlPath}`);
    continue;
  }

  const html = fs.readFileSync(file, 'utf8');
  const label = path.relative(root, file);
  const requiredCounts = [
    ['doctype', /<!doctype\s+html/gi],
    ['html element', /<html\b/gi],
    ['head element', /<head\b/gi],
    ['title', /<title\b[^>]*>/gi],
    ['meta description', /<meta\b[^>]*name=["']description["'][^>]*>/gi],
    ['canonical', /<link\b[^>]*rel=["']canonical["'][^>]*>/gi],
    ['H1', /<h1\b[^>]*>/gi],
    ['Open Graph title', /<meta\b[^>]*property=["']og:title["'][^>]*>/gi],
    ['Open Graph description', /<meta\b[^>]*property=["']og:description["'][^>]*>/gi],
    ['Open Graph URL', /<meta\b[^>]*property=["']og:url["'][^>]*>/gi],
    ['Open Graph image', /<meta\b[^>]*property=["']og:image["'][^>]*>/gi]
  ];

  for (const [name, expression] of requiredCounts) {
    const total = count(html, expression);
    if (total !== 1) errors.push(`${label}: expected one ${name}, found ${total}`);
  }

  if (/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) {
    errors.push(`${label}: expected indexable page is marked noindex`);
  }

  const canonical = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1]
    ?? html.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i)?.[1];
  if (canonical && canonical !== `${origin}${urlPath}`) {
    errors.push(`${label}: canonical is ${canonical}, expected ${origin}${urlPath}`);
  }

  const title = textContent(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '');
  if (title.length < 20 || title.length > 65) warnings.push(`${label}: title length is ${title.length}`);

  const description = html.match(/<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1]
    ?? html.match(/<meta\b[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i)?.[1]
    ?? '';
  if (description.length < 70 || description.length > 170) warnings.push(`${label}: meta description length is ${description.length}`);

  const jsonLdScripts = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (!jsonLdScripts.length) errors.push(`${label}: missing structured data`);
  for (const script of jsonLdScripts) {
    try {
      JSON.parse(script[1]);
    } catch (error) {
      errors.push(`${label}: invalid JSON-LD (${error.message})`);
    }
  }

  for (const image of html.matchAll(/<img\b([^>]*)>/gi)) {
    const attributes = image[1];
    if (!/\balt=["'][^"']*["']/i.test(attributes)) errors.push(`${label}: image is missing alt text`);
    const source = attributes.match(/\bsrc=["']([^"']+)["']/i)?.[1] ?? '';
    if (!source.startsWith('data:') && (!/\bwidth=["']?\d+/i.test(attributes) || !/\bheight=["']?\d+/i.test(attributes))) {
      errors.push(`${label}: image ${source || '(unknown)'} is missing intrinsic dimensions`);
    }
  }

  for (const match of html.matchAll(/\b(href|src)=["']([^"']+)["']/gi)) {
    checkLocalTarget(file, match[2], match[1]);
  }

  if (/get starteding/i.test(html)) errors.push(`${label}: contains the typo "get starteding"`);
  if (/retatrutide/i.test(html)) errors.push(`${label}: contains non-approved retatrutide content`);
  if (/\+19549990000|\(954\)\s*999-0000|info@weightlossdavie\.com/i.test(html)) errors.push(`${label}: contains legacy placeholder contact information`);
  if (/Google Ads Friendly|Why This Page Works|This landing page is built/i.test(html)) errors.push(`${label}: contains internal marketing or implementation notes`);
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedUrls = expectedIndexable.map((urlPath) => `${origin}${urlPath}`);
for (const url of expectedUrls) if (!sitemapUrls.includes(url)) errors.push(`Sitemap missing ${url}`);
for (const url of sitemapUrls) if (!expectedUrls.includes(url)) errors.push(`Unexpected sitemap URL ${url}`);

for (const asset of ['images/weight-loss-davie-logo.png', 'images/weight-loss-davie-og.jpg', 'llms.txt', 'robots.txt']) {
  const file = path.join(root, asset);
  if (!fs.existsSync(file) || fs.statSync(file).size === 0) errors.push(`Missing or empty required asset ${asset}`);
}

if (warnings.length) {
  console.log(`Warnings (${warnings.length}):`);
  for (const warning of warnings) console.log(`- ${warning}`);
}

if (errors.length) {
  console.error(`SEO/AIO audit failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`SEO/AIO audit passed: ${expectedIndexable.length} indexable pages, valid crawl controls, structured data, local links, and image metadata.`);
