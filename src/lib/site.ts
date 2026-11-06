// Configuración global del sitio. Única fuente de verdad para URL final,
// nombre, descripción por defecto e imagen social.
//
// IMPORTANTE: al publicar, reemplazar `url` por el dominio real definitivo.
// Todo el SEO técnico (canonical, sitemap, robots.txt, Open Graph) deriva de
// este valor.

import { COMPANY } from './company';

export const SITE = {
  url: 'https://galarzaconstruccion.com.ar',
  name: COMPANY.name,
  description:
    'Ingeniería para resolver. Construcción para perdurar. Galarza Construcción realiza obras, remodelaciones, ampliaciones y soluciones estructurales en Resistencia, Chaco y otras provincias. Trayectoria profesional iniciada en 1990.',
  ogImage: '/og-default.png',
};