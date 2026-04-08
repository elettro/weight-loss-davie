import { defineConfig } from 'vite';

function normalizeBase(basePath) {
  if (!basePath) return '/roadmap/';

  const withLeadingSlash = basePath.startsWith('/') ? basePath : `/${basePath}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
}

const base = normalizeBase(process.env.VITE_DEPLOY_BASE || '/roadmap/');

export default defineConfig({
  base
});
