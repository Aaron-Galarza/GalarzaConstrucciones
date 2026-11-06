// Utilidad centralizada de JSON-LD. Cada página arma únicamente los schemas
// que representan información real de esa página. No se generan datos
// estructurados inventados.

import { SITE } from './site';
import { COMPANY } from './company';
import { canonicalUrl } from './seo';

/** Identificador estable de la empresa para referencias cruzadas entre schemas. */
const ORGANIZATION_ID = `${SITE.url}/#organization`;

/** Área de cobertura real declarada por la empresa. */
const AREA_SERVED = [
  { '@type': 'City', name: COMPANY.address.city },
  { '@type': 'AdministrativeArea', name: COMPANY.address.province },
  { '@type': 'Country', name: COMPANY.address.country },
];

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'GeneralContractor'],
    '@id': ORGANIZATION_ID,
    name: COMPANY.name,
    description:
      'Ingeniería para resolver. Construcción para perdurar. Obras, remodelaciones, ampliaciones, soluciones estructurales y dirección técnica en Resistencia, Chaco.',
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    image: [`${SITE.url}${SITE.ogImage}`],
    telephone: COMPANY.phone.landline,
    email: COMPANY.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address.street,
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.province,
      addressCountry: 'AR',
    },
    areaServed: AREA_SERVED,
    foundingDate: String(COMPANY.startedYear),
    founder: {
      '@type': 'Person',
      name: COMPANY.founder,
      jobTitle: COMPANY.profession,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: COMPANY.phone.landline,
        contactType: 'customer service',
        email: COMPANY.email,
        availableLanguage: ['es-AR'],
        areaServed: 'AR',
      },
      {
        '@type': 'ContactPoint',
        telephone: COMPANY.phone.mobile,
        contactType: 'sales',
        availableLanguage: ['es-AR'],
        areaServed: 'AR',
      },
    ],
    priceRange: '$$',
    sameAs: [COMPANY.instagram.url],
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: COMPANY.founder,
    jobTitle: COMPANY.profession,
    worksFor: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
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
      '@id': ORGANIZATION_ID,
      name: COMPANY.name,
      url: SITE.url,
      address: {
        '@type': 'PostalAddress',
        addressLocality: COMPANY.address.city,
        addressRegion: COMPANY.address.province,
        addressCountry: 'AR',
      },
    },
    areaServed: AREA_SERVED,
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
    '@id': `${SITE.url}/#website`,
    name: COMPANY.name,
    url: SITE.url,
    inLanguage: 'es-AR',
    publisher: { '@id': ORGANIZATION_ID },
  };
}

/** FAQPage para cualquier listado real de preguntas y respuestas. */
export function faqPageSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/** Listado ordenado de páginas internas (servicios, obras, artículos). */
export function itemListSchema(
  name: string,
  items: { name: string; path: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: canonicalUrl(item.path),
    })),
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
      '@id': ORGANIZATION_ID,
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
      '@id': ORGANIZATION_ID,
      name: COMPANY.name,
    },
  };
}