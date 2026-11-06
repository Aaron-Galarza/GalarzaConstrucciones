// Datos reales y verificados de Galarza Construcción.
// Un único lugar para cambiar contacto, nombre y enlaces: NO repetir estos
// valores sueltos en los componentes.

export const COMPANY = {
  name: 'Galarza Construcción',
  founder: 'Ing. Javier Galarza',
  profession: 'Ingeniero en Construcciones',
  address: {
    street: 'Bélgica Nº 652',
    city: 'Resistencia',
    province: 'Chaco',
    country: 'Argentina',
  },
  phone: {
    landline: '0362-4340080',
    mobile: '0362-4660649',
  },
  email: 'javieradalbertogalarza@gmail.com',
  instagram: {
    handle: '@galarzaconstrucciones',
    url: 'https://www.instagram.com/galarzaconstrucciones',
  },
  startedYear: 1990,
} as const;

export const CONTACT = {
  // Enlaces reales y clickeables.
  // WhatsApp: formato internacional argentino con código 549 (móvil).
  // Número: +54 9 362 466-0649
  whatsappNumber: '5493624660649',
  whatsappUrl: 'https://wa.me/5493624660649',
  whatsappMessage:
    'Hola, vengo desde la web de Galarza Construcción y quiero consultar por un proyecto de obra. ¿Me cuentan cómo trabajan, qué servicios ofrecen y cómo coordinamos una reunión para hablar de mi caso?',
  telLandline: 'tel:+543624340080',
  telMobile: 'tel:+5493624660649',
  mailto:
    'mailto:javieradalbertogalarza@gmail.com?subject=' +
    encodeURIComponent('Consulta por servicios y contrataciones') +
    '&body=' +
    encodeURIComponent(
      'Hola Javier, vengo desde la web de Galarza Construcción y quiero consultar por sus servicios, presupuestos y contrataciones. ¿Coordinamos una reunión o una llamada?',
    ),
} as const;

// Genera un enlace de WhatsApp con mensaje precargado y codificado.
// Cada CTA arma su propio mensaje según la sección donde se toca.
export const whatsappURL = (message: string): string =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;

// Mensajes precargados por contexto. Centralizados para no repetir textos
// largos en las páginas y mantener el mismo tono en todos los CTA.
export const WHATSAPP_MESSAGES = {
  general: CONTACT.whatsappMessage,
  servicesList:
    'Hola, vi el listado de servicios de Galarza Construcción y tengo un proyecto en mente. ¿Con qué servicio convendría arrancar y cómo coordinamos una reunión para conversarlo?',
  worksList:
    'Hola, vi el portfolio de obras de Galarza Construcción y quiero encargar un proyecto. ¿Me cuentan sobre sus servicios, precios y la mejor forma de coordinar una reunión?',
  blogList:
    'Hola, leí los artículos técnicos del blog de Galarza Construcción y quiero consultar por un problema concreto. ¿Cómo coordino una consulta o una reunión para comentarles mi caso?',
  service: (title: string) =>
    `Hola, vi la página de ${title} en la web de Galarza Construcción y quiero avanzar con ese servicio. ¿Me cuentan cómo encararían mi proyecto, plazos y presupuestos, o coordinamos una reunión?`,
  work: (title: string) =>
    `Hola, vi la obra ${title} en la web de Galarza Construcción y me gustaría hacer un proyecto similar. ¿Me cuentan cómo lo encararían y cómo coordinamos una llamada o reunión?`,
  article: (title: string) =>
    `Hola, llegué desde el artículo "${title}" del blog de Galarza Construcción y creo que tengo un problema similar. ¿Me orientan sobre cómo se hace la evaluación de estos casos o coordinamos una visita?`,
} as const;

// Navegación principal del header/footer. Cada destino existe realmente.
export const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios/' },
  { label: 'Obras', href: '/obras/' },
  { label: 'Nosotros', href: '/nosotros/' },
  { label: 'Contacto', href: '/contacto/' },
] as const;

export const CTA_PRIMARY = {
  label: 'Consultar mi proyecto',
  message: CONTACT.whatsappMessage,
} as const;

// Servicios confirmados (Docs/Informacion.txt). Cada item define su slug de página
// cuando la página propia existe; enlaces siempre funcionales.
export const SERVICES = [
  {
    slug: 'construccion',
    title: 'Construcción de obras nuevas',
    short: 'Viviendas, locales y obras nuevas completas, con planificación y supervisión desde el inicio.',
    link: '/servicios/construccion/',
  },
  {
    slug: 'remodelaciones',
    title: 'Remodelaciones',
    short: 'Intervenciones sobre construcciones existentes para mejorar funcionalidad, valor y habitabilidad.',
    link: '/servicios/remodelaciones/',
  },
  {
    slug: 'ampliaciones',
    title: 'Ampliaciones',
    short: 'Extensión y adaptación de construcciones existentes, integradas al proyecto original.',
    link: '/servicios/ampliaciones/',
  },
  {
    slug: 'soluciones-estructurales',
    title: 'Soluciones estructurales',
    short: 'Análisis y resolución de requerimientos estructurales sobre construcciones pequeñas y medianas.',
    link: '/servicios/soluciones-estructurales/',
  },
  {
    slug: 'patologias-de-la-construccion',
    title: 'Patologías de la construcción',
    short: 'Grietas, fisuras, humedad y deterioros: diagnóstico real antes de cualquier intervención.',
    link: '/servicios/patologias-de-la-construccion/',
  },
  {
    slug: 'direccion-tecnica',
    title: 'Dirección técnica',
    short: 'Supervisión y seguimiento profesional de obras, con responsabilidad técnica.',
    link: '/servicios/direccion-tecnica/',
  },
  {
    slug: 'proyecto-y-documentacion',
    title: 'Proyecto y documentación',
    short: 'Proyectos, cómputos, presupuestos, documentación técnica y regularizaciones municipales.',
    link: '/servicios/proyecto-y-documentacion/',
  },
  {
    slug: 'obras-civiles',
    title: 'Obras civiles',
    short: 'Trabajos civiles e infraestructura, incluyendo obras hidráulicas y redes de agua potable.',
    link: '/servicios/obras-civiles/',
  },
] as const;