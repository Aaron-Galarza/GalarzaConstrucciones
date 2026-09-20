// Datos reales y verificados de Galarza Construcción.
// Un único lugar para cambiar contacto, nombre y enlaces: NO repetir estos
// valores sueltos en los componentes.

export const COMPANY = {
  name: 'Galarza Construcción',
  lawyer: 'Ing. Javier Galarza',
  profession: 'Ingeniero en Construcciones',
  address: {
    street: 'Bélgica Nº 652',
    city: 'Resistencia',
    province: 'Chaco',
    country: 'Argentina',
  },
  phone: {
    landline: '0362-4340080',
    mobile: '0362-154660649',
  },
  email: 'adalbertojg@hotmail.com',
  instagram: {
    handle: '@galarzaconstruccion',
    url: 'https://www.instagram.com/galarzaconstruccion',
  },
  startedYear: 1990,
} as const;

export const CONTACT = {
  // Enlaces reales y clickeables.
  // WhatsApp: formato internacional argentino con código 549 (móvil).
  whatsappUrl: 'https://wa.me/549362154660649',
  whatsappText:
    'https://wa.me/549362154660649?text=Hola%2C%20quiero%20consultar%20mi%20proyecto%20de%20construcci%C3%B3n',
  whatsappMessage:
    'Hola, quiero consultar mi proyecto de construcción.',
  telLandline: 'tel:+543624340080',
  telMobile: 'tel:+549362154660649',
  mailto: 'mailto:adalbertojg@hotmail.com',
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
  href: CONTACT.whatsappUrl,
} as const;

// Servicios confirmados (Informacion.txt). Cada item define su slug de página
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