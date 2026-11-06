// Migas de pan: una sola fuente para el markup (<Breadcrumbs>) y el JSON-LD
// (BreadcrumbList). Evita repetir la misma ruta en cada página.

import { breadcrumbSchema } from './schema';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * Devuelve la ruta completa (siempre iniciada en "Inicio") y su schema listo
 * para pasar a BaseLayout.
 */
export function breadcrumbTrail(items: BreadcrumbItem[]) {
  const trail =
    items[0]?.path === '/'
      ? items
      : [{ name: 'Inicio', path: '/' }, ...items];

  return {
    items: trail,
    schema: breadcrumbSchema(trail),
  };
}
