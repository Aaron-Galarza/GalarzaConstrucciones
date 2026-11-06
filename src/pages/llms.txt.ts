// /llms.txt — resumen del sitio para asistentes y buscadores de IA.
// Sigue el formato de llmstxt.org: contexto breve + enlaces con descripción.
// Se genera desde las colecciones reales para no quedar desactualizado.

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { COMPANY, CONTACT, SERVICES } from '../lib/company';
import { canonicalUrl } from '../lib/seo';
import { SITE } from '../lib/site';

export const GET: APIRoute = async () => {
  const obras = (await getCollection('obras')).sort(
    (a, b) => a.data.order - b.data.order,
  );
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  const body = `# ${COMPANY.name}

> ${SITE.description}

${COMPANY.name} es una empresa de construcción con base en ${COMPANY.address.city}, ${COMPANY.address.province}, ${COMPANY.address.country}. Dirigida por ${COMPANY.founder}, ${COMPANY.profession.toLowerCase()}, con trayectoria profesional iniciada en ${COMPANY.startedYear}. Ejecuta obras nuevas, remodelaciones, ampliaciones, soluciones estructurales, patologías de la construcción, dirección técnica, proyectos y obras civiles.

## Servicios
${SERVICES.map(
  (service) =>
    `- [${service.title}](${canonicalUrl(service.link)}): ${service.short}`,
).join('\n')}

## Obras
${obras
  .map(
    (obra) =>
      `- [${obra.data.title}](${canonicalUrl(`/obras/${obra.id}/`)}): ${obra.data.summary}`,
  )
  .join('\n')}

## Páginas principales
- [Inicio](${canonicalUrl('/')}): presentación de la empresa, servicios, obras y preguntas frecuentes.
- [Servicios](${canonicalUrl('/servicios/')}): alcance de cada servicio y cómo se trabaja.
- [Obras](${canonicalUrl('/obras/')}): portfolio de obras ejecutadas y casos de estudio.
- [Nosotros](${canonicalUrl('/nosotros/')}): historia, trayectoria y criterio técnico.
- [Blog](${canonicalUrl('/blog/')}): artículos técnicos sobre patologías y decisiones de obra.
- [Contacto](${canonicalUrl('/contacto/')}): vías directas de consulta.

## Contacto
- WhatsApp: ${CONTACT.whatsappUrl}
- Teléfono fijo: ${COMPANY.phone.landline}
- Celular: ${COMPANY.phone.mobile}
- Email: ${COMPANY.email}
- Dirección: ${COMPANY.address.street}, ${COMPANY.address.city}, ${COMPANY.address.province}, ${COMPANY.address.country}
- Instagram: ${COMPANY.instagram.url}

## Contenido técnico
${posts
  .map(
    (post) =>
      `- [${post.data.title}](${canonicalUrl(`/blog/${post.id}/`)}): ${post.data.description}`,
  )
  .join('\n')}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
