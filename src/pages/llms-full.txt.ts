// /llms-full.txt — versión extendida del contenido del sitio para modelos de
// lenguaje: servicios, obras (antes/durante/después), FAQ y artículos.

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { COMPANY, CONTACT, SERVICES, whatsappURL } from '../lib/company';
import { FAQ_ITEMS } from '../lib/faq';
import { canonicalUrl } from '../lib/seo';
import { SITE } from '../lib/site';

export const GET: APIRoute = async () => {
  const obras = (await getCollection('obras')).sort(
    (a, b) => a.data.order - b.data.order,
  );
  const servicios = await getCollection('servicios');
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  const services = SERVICES.map((service) => {
    const entry = servicios.find((item) => item.id === service.slug);
    if (!entry) return `### ${service.title}\n${service.short}`;

    const faq = entry.data.faq
      .map((item) => `- **${item.q}** ${item.a}`)
      .join('\n');

    return `### ${service.title}
URL: ${canonicalUrl(service.link)}
${entry.data.summary}

**Cuándo se necesita:** ${entry.data.when}

**Problemas que resuelve:**
${entry.data.problems.map((problem) => `- ${problem}`).join('\n')}

**Qué incluye:**
${entry.data.includes.map((item) => `- ${item}`).join('\n')}
${faq ? `\n**Preguntas frecuentes:**\n${faq}` : ''}`;
  }).join('\n\n');

  const works = obras
    .map(
      (obra) => `### ${obra.data.title}
URL: ${canonicalUrl(`/obras/${obra.id}/`)}
Ubicación: ${obra.data.location}, ${obra.data.province}
Categoría: ${obra.data.category}
${obra.data.summary}

**Antes:** ${obra.data.before}

**Durante:** ${obra.data.during}

**Después:** ${obra.data.after}`,
    )
    .join('\n\n');

  const articles = posts
    .map(
      (post) => `### ${post.data.title}
URL: ${canonicalUrl(`/blog/${post.id}/`)}
Categoría: ${post.data.category}
${post.data.description}`,
    )
    .join('\n\n');

  const faq = FAQ_ITEMS.map((item) => `- **${item.q}** ${item.a}`).join('\n');

  const body = `# ${COMPANY.name} — información completa

> ${SITE.description}

## Perfil de la empresa
- Nombre: ${COMPANY.name}
- Fundador: ${COMPANY.founder} — ${COMPANY.profession}
- Trayectoria profesional iniciada en: ${COMPANY.startedYear}
- Base: ${COMPANY.address.street}, ${COMPANY.address.city}, ${COMPANY.address.province}, ${COMPANY.address.country}
- Cobertura: ${COMPANY.address.city}, provincia del ${COMPANY.address.province} y otras provincias de Argentina según el proyecto.
- Teléfono fijo: ${COMPANY.phone.landline}
- Celular / WhatsApp: ${COMPANY.phone.mobile}
- Email: ${COMPANY.email}
- Instagram: ${COMPANY.instagram.url}
- WhatsApp: ${whatsappURL(CONTACT.whatsappMessage)}

## Servicios
${services}

## Obras y casos de estudio
${works}

## Preguntas frecuentes
${faq}

## Artículos técnicos
${articles}

## Páginas del sitio
- Inicio: ${canonicalUrl('/')}
- Servicios: ${canonicalUrl('/servicios/')}
- Obras: ${canonicalUrl('/obras/')}
- Nosotros: ${canonicalUrl('/nosotros/')}
- Blog: ${canonicalUrl('/blog/')}
- Contacto: ${canonicalUrl('/contacto/')}
- Resumen para IA: ${SITE.url}/llms.txt
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
