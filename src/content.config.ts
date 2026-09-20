// Content Collections — API de contenido vigente (Astro v5, Content Layer).
// Cada colección define el contrato de su frontmatter. Los ids se generan
// desde el nombre de archivo y se usan como slug de la URL.

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Imagen de contenido referenciada desde la carpeta pública `/`.
 * `src` es la ruta absoluta del sitio (ej. "/obras/axion/panoramica.jpg").
 */
const imageRef = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

const obras = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/obras' }),
  schema: z.object({
    title: z.string(),
    location: z.string(),
    province: z.string(),
    /** Período flexible, sólo cuando está confirmado (ej. "2020–2025"). */
    period: z.string().optional(),
    category: z.string(),
    summary: z.string(),
    description: z.string(),
    problem: z.string(),
    solution: z.string(),
    result: z.string(),
    /** Slugs de servicios relacionados (colección `servicios`). */
    services: z.array(z.string()).default([]),
    /** Galería fotográfica de la obra (etapa, estructura, resultado). */
    gallery: z.array(imageRef).default([]),
    featured: z.boolean().default(false),
    caseStudy: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

const servicios = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/servicios' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    description: z.string(),
    when: z.string(),
    problems: z.array(z.string()).default([]),
    includes: z.array(z.string()).default([]),
    /** Slugs de obras relacionadas (colección `obras`). */
    works: z.array(z.string()).default([]),
    /** Imágenes ilustrativas del servicio (trabajos de referencia). */
    images: z.array(imageRef).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Ing. Javier Galarza'),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    /** Imagen de portada del artículo (ruta pública `/`). */
    image: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { obras, servicios, blog };