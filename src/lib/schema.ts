// Utilidad centralizada de JSON-LD. Cada página arma únicamente los schemas
// que representan información real de esa página. No se generan datos
// estructurados inventados.

import type { CollectionEntry } from 'astro:content';
import { SITE } from './site';
import { COMPANY } from './company';
import { canonicalUrl } from './seo';

const ORGANIZATION = {
  '@type': 'Organization',
  name: COMPANY.name,
  url: SITE.url,
  email: COMPANY.email,
  telephone: COMPANY.phone.landline,
  founder: {
    '@type': 'Person',
    name: COMPANY.lawyer,
    jobTitle: COMPANY.profession,
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: COMPANY.address.street,
    addressLocality: COMPANY.address.city,
    addressRegion: COMPANY.address.province,
    addressCountry: 'AR',
  },
  sameAs: [COMPANY.instagram.url],
};

export function organizationSchema() {
  return {
    ...ORGANIZATION,
    '@context': 'https://schema.org',
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'GeneralContractor'],
    name: COMPANY.name,
    description:
      'Ingeniería para resolver. Construcción para perdurar. Obras, remodelaciones, ampliaciones, soluciones estructurales y dirección técnica en Resistencia, Chaco.',
    url: SITE.url,
    telephone: COMPANY.phone.landline,
    email: COMPANY.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address.street,
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.province,
      addressCountry: 'AR',
    },
    founder: {
      '@type': 'Person',
      name: COMPANY.lawyer,
      jobTitle: COMPANY.profession,
    },
    image: `${SITE.url}${SITE.ogImage}`,
    priceRange: '$$',
    sameAs: [COMPANY.instagram.url],
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: COMPANY.lawyer,
    jobTitle: COMPANY.profession,
    worksFor: {
      '@type': 'Organization',
      name: COMPANY.name,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.province,
      addressCountry: 'AR',
    },
  };
}

export function serviceSchema(service: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    serviceType: service.title,
    url: canonicalUrl(service.path),
    provider: {
      '@type': ['LocalBusiness', 'GeneralContractor'],
      name: COMPANY.name,
      url: SITE.url,
      address: {
        '@type': 'PostalAddress',
        addressLocality: COMPANY.address.city,
        addressRegion: COMPANY.address.province,
        addressCountry: 'AR',
      },
    },
    areaServed: [
      { '@type': 'City', name: 'Resistencia' },
      { '@type': 'State', name: 'Chaco' },
      { '@type': 'Country', name: 'Argentina' },
    ],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: COMPANY.name,
    url: SITE.url,
    inLanguage: 'es-AR',
  };
}

export function articleSchema(article: {
  title: string;
  description: string;
  date: Date;
  updatedDate?: Date;
  path: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date.toISOString(),
    ...(article.updatedDate
      ? { dateModified: article.updatedDate.toISOString() }
      : {}),
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: COMPANY.name,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl(article.path),
    },
  };
}

export function workSchema(work: {
  title: string;
  description: string;
  path: string;
  location: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    headline: work.title,
    description: work.description,
    url: canonicalUrl(work.path),
    ...(work.image ? { image: `${SITE.url}${work.image}` } : {}),
    locationCreated: {
      '@type': 'Place',
      name: work.location,
    },
    creator: {
      '@type': 'Organization',
      name: COMPANY.name,
    },
  };
}

type Schema = Record<string, unknown>;

/** Serializa una lista de schemas a un único bloque JSON-LD. */
export function renderSchema(schemas: Schema[]): string {
  const json = schemas.length === 1 ? schemas[0] : schemas;
  return JSON.stringify(json, null, 0);
}

export type ServiceEntry = CollectionEntry<'servicios'>;
export type ObraEntry = CollectionEntry<'obras'>;
export type BlogEntry = CollectionEntry<'blog'>;