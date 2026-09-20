import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/lib/site';

// El sitio se construye en /src/lib/site.ts: la URL final vive ahí como
// única fuente de verdad para canonical, sitemap, robots y Open Graph.
export default defineConfig({
  site: SITE.url,
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  integrations: [
    sitemap({
      // El sitemap incluye todas las rutas estáticas + las de contenido.
      filter: (page) => !page.includes('/404'),
      changefreq: 'monthly',
      lastmod: new Date(),
    }),
  ],
  vite: {
    ssr: {
      external: [],
    },
    optimizeDeps: {
      include: [],
    },
  },
});