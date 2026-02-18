export interface PortfolioOutcome {
  metric: string;
  label: { en: string; es: string };
}

export interface PortfolioProject {
  slug: string;
  name: string;
  url: string;
  image: string;
  imageMobile: string;
  extraImages: string[];
  description: { en: string; es: string };
  industry: { en: string; es: string };
  tagline: { en: string; es: string };
  overview: { en: string; es: string };
  servicesUsed: { en: string[]; es: string[] };
  outcomes: PortfolioOutcome[];
}

export const portfolioProjects: PortfolioProject[] = [
  // 1. Step Solution USA
  {
    slug: 'step-solution-usa',
    name: 'Step Solution USA',
    url: 'https://stepsolutionusa.com/',
    image: '/portfolio/step-solution-hero.png',
    imageMobile: '/portfolio/step-solution-mobile.png',
    extraImages: ['/portfolio/step-solution-projects.png', '/portfolio/step-solution-products.png', '/portfolio/step-solution-pro.png', '/portfolio/step-solution-order.png', '/portfolio/step-solution-mobile.png'],
    description: { en: 'Custom stair treads & nosing manufacturer with e-commerce platform.', es: 'Fabricante de peldaños y narices personalizadas con plataforma e-commerce.' },
    industry: { en: 'Manufacturing & E-Commerce', es: 'Manufactura & E-Commerce' },
    tagline: { en: 'An e-commerce platform for a custom stair solutions manufacturer.', es: 'Una plataforma e-commerce para un fabricante de soluciones de escaleras personalizadas.' },
    overview: { en: 'Step Solution needed a comprehensive digital platform to showcase their custom stair treads and nosing products, integrate a dealer network, and enable online ordering. We built a full e-commerce experience with AI-powered product assistance and a pro program for contractors.', es: 'Step Solution necesitaba una plataforma digital integral para mostrar sus productos de peldaños y narices personalizadas, integrar una red de distribuidores y habilitar pedidos en línea. Construimos una experiencia e-commerce completa con asistente de producto con IA y programa pro para contratistas.' },
    servicesUsed: { en: ['E-Commerce Development', 'AI Chatbot', 'Dealer Network Integration'], es: ['Desarrollo E-Commerce', 'Chatbot con IA', 'Integración de Red de Distribuidores'] },
    outcomes: [
      { metric: '+320%', label: { en: 'Increase in online orders', es: 'Aumento en pedidos en línea' } },
      { metric: '45%', label: { en: 'Reduction in support tickets', es: 'Reducción en tickets de soporte' } },
      { metric: '+150%', label: { en: 'Dealer network growth', es: 'Crecimiento de red de distribuidores' } },
    ],
  },
  // 2. ZERMA Latin America
  {
    slug: 'zerma-latin-america',
    name: 'ZERMA Latin America',
    url: 'https://zerma-la.com/',
    image: '/portfolio/zerma-la.png',
    imageMobile: '/portfolio/zerma-la-mobile.png',
    extraImages: ['/portfolio/zerma-la-about.png', '/portfolio/zerma-la-company.png', '/portfolio/zerma-la-products.png', '/portfolio/zerma-la-plastics.png'],
    description: { en: 'Industrial machinery leader for the recycling industry across LATAM.', es: 'Líder en maquinaria industrial para la industria del reciclaje en LATAM.' },
    industry: { en: 'Industrial Machinery', es: 'Maquinaria Industrial' },
    tagline: { en: 'A bilingual digital hub for an industrial machinery leader.', es: 'Un hub digital bilingüe para un líder en maquinaria industrial.' },
    overview: { en: 'ZERMA needed a multilingual website to establish their presence across Latin America. We developed a bilingual platform with a comprehensive product catalog, quote request system, and ISO-certified brand positioning to serve clients across the region.', es: 'ZERMA necesitaba un sitio web multilingüe para establecer su presencia en América Latina. Desarrollamos una plataforma bilingüe con catálogo de productos completo, sistema de solicitud de cotización y posicionamiento de marca con certificación ISO para servir clientes en toda la región.' },
    servicesUsed: { en: ['Website Development', 'Multilingual SEO', 'Lead Generation'], es: ['Desarrollo Web', 'SEO Multilingüe', 'Generación de Leads'] },
    outcomes: [
      { metric: '+200%', label: { en: 'Increase in quote requests', es: 'Aumento en solicitudes de cotización' } },
      { metric: '3x', label: { en: 'LATAM market reach', es: 'Alcance del mercado LATAM' } },
      { metric: '+85%', label: { en: 'Organic visibility growth', es: 'Crecimiento de visibilidad orgánica' } },
    ],
  },
  // 3. Filtro Láser
  {
    slug: 'filtro-laser',
    name: 'Filtro Láser para Plástico',
    url: 'https://filtrolaserparaplastico.com/',
    image: '/portfolio/filtro-laser.png',
    imageMobile: '/portfolio/filtro-laser-mobile.png',
    extraImages: ['/portfolio/filtro-laser-problem.png', '/portfolio/filtro-laser-product.png', '/portfolio/filtro-laser-applications.png', '/portfolio/filtro-laser-specs.png'],
    description: { en: 'High-precision self-cleaning filters for plastic extrusion & recycling.', es: 'Filtros autolimpiantes de alta precisión para extrusión y reciclaje de plástico.' },
    industry: { en: 'Industrial Equipment', es: 'Equipos Industriales' },
    tagline: { en: 'A product-focused website for high-precision industrial filtration.', es: 'Un sitio web enfocado en producto para filtración industrial de alta precisión.' },
    overview: { en: 'This industrial product needed a dedicated landing page that communicated technical specifications while driving qualified leads. We created a conversion-optimized site with clear feature presentation, technical specs, and integrated AI chat for product questions.', es: 'Este producto industrial necesitaba una landing page dedicada que comunicara especificaciones técnicas mientras generaba leads calificados. Creamos un sitio optimizado para conversión con presentación clara de características, especificaciones técnicas y chat con IA integrado para preguntas de producto.' },
    servicesUsed: { en: ['Landing Page Development', 'AI Chatbot', 'Lead Generation'], es: ['Desarrollo de Landing Page', 'Chatbot con IA', 'Generación de Leads'] },
    outcomes: [
      { metric: '+170%', label: { en: 'Increase in qualified leads', es: 'Aumento en leads calificados' } },
      { metric: '4.2%', label: { en: 'Conversion rate', es: 'Tasa de conversión' } },
      { metric: '28s', label: { en: 'Avg. time to first interaction', es: 'Tiempo promedio a primera interacción' } },
    ],
  },
  // 4. Pulverizadores Industriales (Reduction)
  {
    slug: 'pulverizadores-industriales',
    name: 'Pulverizadores Industriales',
    url: 'https://pulverizadoresindustriales.com/',
    image: '/portfolio/pulverizadores-industriales.png',
    imageMobile: '/portfolio/pulverizadores-industriales-mobile.png',
    extraImages: ['/portfolio/pulverizadores-industriales-materials.png', '/portfolio/pulverizadores-industriales-catalog.png', '/portfolio/pulverizadores-industriales-comparison.png', '/portfolio/pulverizadores-industriales-contact.png'],
    description: { en: 'Industrial plastic pulverizers with advanced Vectored Air technology.', es: 'Pulverizadores industriales de plástico con tecnología avanzada Vectored Air.' },
    industry: { en: 'Industrial Equipment', es: 'Equipos Industriales' },
    tagline: { en: 'A digital platform for industrial pulverizer technology.', es: 'Una plataforma digital para tecnología de pulverizadores industriales.' },
    overview: { en: 'Reduction International needed a dedicated website for the Spanish-speaking market to showcase their industrial pulverizers. We built a bilingual platform with video integration, detailed equipment specifications, AI-powered product assistance, and a streamlined quote request flow.', es: 'Reduction International necesitaba un sitio web dedicado para el mercado hispanohablante para mostrar sus pulverizadores industriales. Construimos una plataforma bilingüe con integración de video, especificaciones detalladas de equipos, asistente de producto con IA y un flujo optimizado de solicitud de cotización.' },
    servicesUsed: { en: ['Website Development', 'AI Chatbot', 'Video Integration', 'Lead Generation'], es: ['Desarrollo Web', 'Chatbot con IA', 'Integración de Video', 'Generación de Leads'] },
    outcomes: [
      { metric: '+220%', label: { en: 'Quote request increase', es: 'Aumento en solicitudes de cotización' } },
      { metric: '60%', label: { en: 'Leads from LATAM market', es: 'Leads del mercado LATAM' } },
      { metric: '+110%', label: { en: 'Organic traffic growth', es: 'Crecimiento de tráfico orgánico' } },
    ],
  },
  // 5. Stillwater Day Spa
  {
    slug: 'stillwater-day-spa',
    name: 'Stillwater Day Spa',
    url: 'https://stillwaterdayspa.com/',
    image: '/portfolio/stillwater-day-spa-hero.png',
    imageMobile: '/portfolio/stillwater-day-spa-mobile.png',
    extraImages: ['/portfolio/stillwater-day-spa.png', '/portfolio/stillwater-day-spa-services.png', '/portfolio/stillwater-day-spa-giftcards.png', '/portfolio/stillwater-day-spa-memberships.png'],
    description: { en: 'Luxury day spa with online booking and membership system.', es: 'Spa de lujo con reservas en línea y sistema de membresías.' },
    industry: { en: 'Wellness & Spa', es: 'Bienestar & Spa' },
    tagline: { en: 'A serene digital experience for a luxury day spa.', es: 'Una experiencia digital serena para un spa de lujo.' },
    overview: { en: 'Stillwater Day Spa wanted to increase online bookings and promote their membership program. We built a calming, conversion-optimized website with integrated booking, first-visit specials, and a membership enrollment flow.', es: 'Stillwater Day Spa quería aumentar las reservas en línea y promover su programa de membresías. Construimos un sitio web optimizado para conversión con reservas integradas, especiales de primera visita y flujo de membresías.' },
    servicesUsed: { en: ['Website Development', 'Booking Integration', 'Lead Generation'], es: ['Desarrollo Web', 'Integración de Reservas', 'Generación de Leads'] },
    outcomes: [
      { metric: '+240%', label: { en: 'Increase in online bookings', es: 'Aumento en reservas en línea' } },
      { metric: '35%', label: { en: 'Of new clients from web', es: 'De nuevos clientes desde la web' } },
      { metric: '+90%', label: { en: 'Membership sign-ups growth', es: 'Crecimiento en inscripciones de membresía' } },
    ],
  },
  // 6. Rasetta Innovations
  {
    slug: 'rasetta-innovations',
    name: 'Rasetta Innovations',
    url: 'https://rasettainnovations.com/',
    image: '/portfolio/rasetta-innovations-hero.png',
    imageMobile: '/portfolio/rasetta-innovations-mobile.png',
    extraImages: ['/portfolio/rasetta-innovations-services.png', '/portfolio/rasetta-innovations-landing.png', '/portfolio/rasetta-innovations-mobile.png'],
    description: { en: 'Residential & commercial design studio with expert craftsmanship.', es: 'Estudio de diseño residencial y comercial con artesanía experta.' },
    industry: { en: 'Interior Design', es: 'Diseño de Interiores' },
    tagline: { en: 'A premium web presence for a design studio transforming spaces.', es: 'Una presencia web premium para un estudio de diseño que transforma espacios.' },
    overview: { en: 'Rasetta Innovations needed a website that reflected the quality and sophistication of their residential and commercial design work. We designed and developed a conversion-focused site with an elegant visual identity, optimized for lead generation and mobile performance.', es: 'Rasetta Innovations necesitaba un sitio web que reflejara la calidad y sofisticación de su trabajo de diseño residencial y comercial. Diseñamos y desarrollamos un sitio enfocado en conversión con una identidad visual elegante, optimizado para generación de leads y rendimiento móvil.' },
    servicesUsed: { en: ['Website Development', 'Brand Identity', 'Lead Generation'], es: ['Desarrollo Web', 'Identidad de Marca', 'Generación de Leads'] },
    outcomes: [
      { metric: '+180%', label: { en: 'Increase in consultation requests', es: 'Aumento en solicitudes de consulta' } },
      { metric: '2.1s', label: { en: 'Average page load time', es: 'Tiempo promedio de carga' } },
      { metric: '+65%', label: { en: 'Organic traffic growth', es: 'Crecimiento de tráfico orgánico' } },
    ],
  },
  // 7. Lajex LLC
  {
    slug: 'lajex-llc',
    name: 'Lajex LLC',
    url: 'https://lajexllc.com/',
    image: '/portfolio/lajex-llc.png',
    imageMobile: '/portfolio/lajex-llc-mobile.png',
    extraImages: ['/portfolio/lajex-llc.png', '/portfolio/lajex-llc-benefits.png', '/portfolio/lajex-llc-products.png', '/portfolio/lajex-llc-contact.png'],
    description: { en: 'Licensed & insured plumbing with water purification systems in South Florida.', es: 'Plomería licenciada y asegurada con sistemas de purificación de agua en el sur de Florida.' },
    industry: { en: 'Plumbing & Water Purification', es: 'Plomería & Purificación de Agua' },
    tagline: { en: 'A conversion-focused website for a licensed plumbing & water purification company.', es: 'Un sitio web enfocado en conversión para una empresa licenciada de plomería y purificación de agua.' },
    overview: { en: 'Lajex LLC needed a bilingual website to showcase their licensed plumbing services and KENAI water purification systems in South Florida. We built a conversion-optimized site with AI-powered chat, free consultation booking, and clear service area targeting across Miami-Dade, Broward, and Palm Beach counties.', es: 'Lajex LLC necesitaba un sitio web bilingüe para mostrar sus servicios de plomería licenciada y sistemas de purificación de agua KENAI en el sur de Florida. Construimos un sitio optimizado para conversión con chat con IA, reserva de consultas gratuitas y segmentación clara de áreas de servicio en los condados de Miami-Dade, Broward y Palm Beach.' },
    servicesUsed: { en: ['Website Development', 'AI Chatbot', 'Lead Generation'], es: ['Desarrollo Web', 'Chatbot con IA', 'Generación de Leads'] },
    outcomes: [
      { metric: '+95%', label: { en: 'Increase in inquiries', es: 'Aumento en consultas' } },
      { metric: '1.8s', label: { en: 'Page load time', es: 'Tiempo de carga' } },
      { metric: '+70%', label: { en: 'Organic traffic growth', es: 'Crecimiento de tráfico orgánico' } },
    ],
  },
];
