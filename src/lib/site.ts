// Configuración global del sitio. Única fuente de verdad para URL final,
// idioma, título por defecto y descripción por defecto.
//
// IMPORTANTE: al publicar, reemplazar `url` por el dominio real definitivo.
// Todo el SEO técnico (canonical, sitemap, robots.txt, Open Graph) deriva de
// este valor.

import { COMPANY } from './company';

export const SITE = {
  url: 'https://galarzaconstruccion.com.ar',
  locale: 'es_AR',
  name: COMPANY.name,
  title: 'Galarza Construcción | Empresa de construcción en Resistencia, Chaco',
  description:
    'Ingeniería para resolver. Construcción para perdurar. Galarza Construcción realiza obras, remodelaciones, ampliaciones y soluciones estructurales en Resistencia, Chaco y otras provincias. Trayectoria profesional iniciada en 1990.',
  ogImage: '/og-default.png',
};