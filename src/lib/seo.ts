// SEO centralizado. Cada página declara título, descripción y ruta; el resto
// del <head> (canonical, Open Graph, robots, idioma) se resuelve acá y lo
// consume BaseLayout. Evita duplicar <head> manualmente en cada página.

import { SITE } from './site';
import { COMPANY } from './company';

export interface SEOProps {
  /** Título único de la página (recomendado ≤ 60 caracteres). */
  title: string;
  /** Meta description única (recomendado 120–160 caracteres). */
  description: string;
  /** Ruta canónica absoluta interna, ej. '/servicios/remodelaciones/'. */
  path: string;
  /** Tipo Open Graph: por defecto 'website'; usar 'article' en contenido. */
  type?: 'website' | 'article';
  /** Imagen compartible: ruta pública; por defecto la OG general. */
  image?: string;
  /** Directiva robots; por defecto 'index, follow'. */
  robots?: string;
}

/** Devuelve la URL absoluta de una ruta interna, garantizando trailing slash. */
export function canonicalUrl(path: string): string {
  const p = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}/`;
  return `${SITE.url}${p}`;
}

export function buildSEOTags({
  title,
  description,
  path,
  type = 'website',
  image = SITE.ogImage,
  robots = 'index, follow',
}: SEOProps) {
  const canonical = canonicalUrl(path);
  const ogUrl = canonical;

  return [
    { tag: 'title', attrs: {}, children: title },
    { tag: 'meta', attrs: { name: 'description', content: description }, children: '' },
    { tag: 'meta', attrs: { name: 'robots', content: robots }, children: '' },
    { tag: 'link', attrs: { rel: 'canonical', href: canonical }, children: '' },

    // Open Graph
    { tag: 'meta', attrs: { property: 'og:type', content: type }, children: '' },
    { tag: 'meta', attrs: { property: 'og:site_name', content: SITE.name }, children: '' },
    { tag: 'meta', attrs: { property: 'og:title', content: title }, children: '' },
    { tag: 'meta', attrs: { property: 'og:description', content: description }, children: '' },
    { tag: 'meta', attrs: { property: 'og:url', content: ogUrl }, children: '' },
    { tag: 'meta', attrs: { property: 'og:locale', content: 'es_AR' }, children: '' },
    { tag: 'meta', attrs: { property: 'og:image', content: `${SITE.url}${image}` }, children: '' },
    { tag: 'meta', attrs: { property: 'og:image:alt', content: COMPANY.name }, children: '' },

    // Twitter Card
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' }, children: '' },
    { tag: 'meta', attrs: { name: 'twitter:title', content: title }, children: '' },
    { tag: 'meta', attrs: { name: 'twitter:description', content: description }, children: '' },
    { tag: 'meta', attrs: { name: 'twitter:image', content: `${SITE.url}${image}` }, children: '' },
  ];
}