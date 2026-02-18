export interface PortfolioProject {
  name: string;
  url: string;
  image: string;
  description: { en: string; es: string };
  industry: { en: string; es: string };
}

export const portfolioProjects: PortfolioProject[] = [
  {
    name: 'Rasetta Innovations',
    url: 'https://rasettainnovations.com/',
    image: '/portfolio/rasetta-innovations.png',
    description: {
      en: 'Residential & commercial design studio with expert craftsmanship.',
      es: 'Estudio de diseño residencial y comercial con artesanía experta.',
    },
    industry: { en: 'Interior Design', es: 'Diseño de Interiores' },
  },
  {
    name: 'Stillwater Day Spa',
    url: 'https://stillwaterdayspa.com/',
    image: '/portfolio/stillwater-day-spa.png',
    description: {
      en: 'Luxury day spa with online booking and membership system.',
      es: 'Spa de lujo con reservas en línea y sistema de membresías.',
    },
    industry: { en: 'Wellness & Spa', es: 'Bienestar & Spa' },
  },
  {
    name: 'Step Solution USA',
    url: 'https://stepsolutionusa.com/',
    image: '/portfolio/step-solution.png',
    description: {
      en: 'Custom stair treads & nosing manufacturer with e-commerce platform.',
      es: 'Fabricante de peldaños y narices personalizadas con plataforma e-commerce.',
    },
    industry: { en: 'Manufacturing & E-Commerce', es: 'Manufactura & E-Commerce' },
  },
  {
    name: 'ZERMA Latin America',
    url: 'https://zerma-la.com/',
    image: '/portfolio/zerma-la.png',
    description: {
      en: 'Industrial machinery leader for the recycling industry across LATAM.',
      es: 'Líder en maquinaria industrial para la industria del reciclaje en LATAM.',
    },
    industry: { en: 'Industrial Machinery', es: 'Maquinaria Industrial' },
  },
  {
    name: 'Filtro Láser para Plástico',
    url: 'https://filtrolaserparaplastico.com/',
    image: '/portfolio/filtro-laser.png',
    description: {
      en: 'High-precision self-cleaning filters for plastic extrusion & recycling.',
      es: 'Filtros autolimpiantes de alta precisión para extrusión y reciclaje de plástico.',
    },
    industry: { en: 'Industrial Equipment', es: 'Equipos Industriales' },
  },
  {
    name: 'Pulverizadores Industriales',
    url: 'https://pulverizadoresindustriales.com/',
    image: '/portfolio/pulverizadores-industriales.png',
    description: {
      en: 'Industrial plastic pulverizers with advanced Vectored Air technology.',
      es: 'Pulverizadores industriales de plástico con tecnología avanzada Vectored Air.',
    },
    industry: { en: 'Industrial Equipment', es: 'Equipos Industriales' },
  },
  {
    name: 'Lajex LLC',
    url: 'https://lajexllc.com/',
    image: '',
    description: {
      en: 'Business solutions and consulting services.',
      es: 'Soluciones empresariales y servicios de consultoría.',
    },
    industry: { en: 'Business Services', es: 'Servicios Empresariales' },
  },
];
