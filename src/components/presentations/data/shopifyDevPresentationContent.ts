// Complete bilingual content for Shopify Web Development presentation
export type ShopifyDevLanguage = 'en' | 'es';

export interface ShopifyDevContent {
  cover: {
    title: string;
    subtitle: string;
    tagline: string;
  };
  about: {
    title: string;
    description: string;
    stats: Array<{ value: string; label: string }>;
    credentials: string[];
  };
  problem: {
    title: string;
    headline: string;
    points: string[];
    insight: string;
    principle: string;
    principleNote: string;
  };
  solution: {
    title: string;
    headline: string;
    intro: string;
    items: Array<{ title: string; description: string }>;
  };
  scope: {
    title: string;
    headline: string;
    included: Array<{ title: string; description: string }>;
    notIncluded: Array<{ title: string; description: string }>;
  };
  process: {
    title: string;
    steps: Array<{ title: string; description: string }>;
  };
  pricing: {
    title: string;
    headline: string;
    packages: Array<{
      name: string;
      price: string;
      highlight?: boolean;
      revisions: string;
      includes: string[];
    }>;
    note: string;
  };
  otherServices: {
    title: string;
    headline: string;
    services: Array<{ title: string; description: string }>;
  };
  contact: {
    title: string;
    headline: string;
    description: string;
    email: string;
    phone: string;
    address: string;
    website: string;
    cta: string;
  };
}

export const shopifyDevPresentationContent: Record<ShopifyDevLanguage, ShopifyDevContent> = {
  en: {
    cover: {
      title: 'Shopify Web Development',
      subtitle: 'Custom Shopify Storefronts Built to Convert',
      tagline: 'Design. Development. Optimization. Launch.',
    },
    about: {
      title: 'About Hipervinculo',
      description: 'Hipervinculo builds performance-driven growth systems for businesses ready to scale. We combine conversion-focused websites, paid media management, and tracking infrastructure to turn traffic into real business opportunities.',
      stats: [
        { value: '20+', label: 'Years of Experience' },
        { value: '50+', label: 'Shopify Stores Built' },
        { value: '5-8yr', label: 'Avg. Client Retention' },
      ],
      credentials: [
        '20+ years in digital marketing & eCommerce',
        'Shopify development specialists',
        'Meta Business Partner & Google Partner',
        'Long-term client retention (5-8 years average)',
      ],
    },
    problem: {
      title: 'The Core Problem',
      headline: 'Launching a Shopify store is not the same as building one that sells.',
      points: [
        'Generic templates that look like thousands of other stores online.',
        'Poor product organization that confuses customers and kills conversions.',
        'No strategic setup of apps, reviews, or trust-building elements.',
        'Missing conversion fundamentals: speed, mobile UX, and checkout flow.',
      ],
      insight: 'A Shopify store without strategy is just a product catalog — not a sales machine.',
      principle: 'You need a store built for conversions, not just aesthetics.',
      principleNote: 'Professional development turns your Shopify store into a real revenue channel.',
    },
    solution: {
      title: 'What We Deliver',
      headline: 'End-to-End Shopify Store Development',
      intro: 'We design, develop, and optimize your Shopify store from the ground up:',
      items: [
        {
          title: 'Custom Theme Design',
          description: 'Unique, on-brand storefront design tailored to your products and audience — not a cookie-cutter template.',
        },
        {
          title: 'Product & Collection Setup',
          description: 'Strategic organization of products, categories, tags, and variants for optimal browsing and discoverability.',
        },
        {
          title: 'App Integration',
          description: 'Installation and configuration of essential apps: reviews, upsells, email capture, shipping calculators, and more.',
        },
        {
          title: 'Mobile-First Optimization',
          description: 'Every page built for mobile performance first, ensuring fast load times and smooth checkout on all devices.',
        },
        {
          title: 'Conversion-Focused UX',
          description: 'Strategic layout, clear CTAs, trust badges, and optimized checkout flow to maximize sales.',
        },
      ],
    },
    scope: {
      title: 'Scope of Service',
      headline: "What's Included & What's Not",
      included: [
        {
          title: 'Custom Shopify theme design & development',
          description: 'We design and build your storefront from scratch on the Shopify platform.',
        },
        {
          title: 'Product & collection setup',
          description: 'We organize and upload your products with proper categories, images, and descriptions.',
        },
        {
          title: 'Essential app installation & configuration',
          description: 'We install and configure key apps like reviews, popups, and shipping tools.',
        },
        {
          title: 'Mobile optimization & speed tuning',
          description: 'We ensure your store loads fast and looks great on all devices.',
        },
      ],
      notIncluded: [
        {
          title: 'Shopify account creation or subscription',
          description: "You provide your own Shopify account. We don't open or manage Shopify subscriptions.",
        },
        {
          title: 'Product photography or copywriting',
          description: 'You provide product images and descriptions. We can recommend partners if needed.',
        },
        {
          title: 'Ongoing store management',
          description: 'Post-launch maintenance and product updates are separate engagements.',
        },
      ],
    },
    process: {
      title: 'Our Process',
      steps: [
        {
          title: 'Discovery & Strategy',
          description: 'We analyze your brand, products, target audience, and competitors to define the store structure and design direction.',
        },
        {
          title: 'Design & Wireframing',
          description: 'We create the visual direction and page layouts, refining with your feedback before development begins.',
        },
        {
          title: 'Development & Setup',
          description: 'We build the store: custom theme, product setup, app installation, payment gateways, and shipping configuration.',
        },
        {
          title: 'Testing & Launch',
          description: 'Thorough QA across devices, checkout testing, speed optimization, and final launch with post-launch support.',
        },
      ],
    },
    pricing: {
      title: 'Investment',
      headline: 'Choose the Package That Fits Your Needs',
      packages: [
        {
          name: 'Starter',
          price: '$2,500',
          revisions: 'Up to 2 design revisions',
          includes: [
            'Custom theme design (based on premium theme)',
            'Up to 5 products setup',
            'Up to 2 product categories',
            'Basic app installation (reviews, contact form)',
            'Mobile-responsive design',
            'Basic SEO setup (meta titles, descriptions)',
            'Payment gateway configuration',
            'Launch support (1 week post-launch)',
          ],
        },
        {
          name: 'Professional',
          price: '$5,000',
          highlight: true,
          revisions: 'Up to 3 design revisions',
          includes: [
            'Fully custom theme design & development',
            'Up to 25 products setup',
            'Up to 5 product categories',
            'Advanced app integration (reviews, upsells, email pop-ups, wishlist)',
            'Custom collection pages & filtering',
            'Mobile-first optimization & speed tuning',
            'Complete SEO setup with structured data',
            'Checkout flow optimization',
            'Social media integration',
            'Launch support (2 weeks post-launch)',
          ],
        },
        {
          name: 'Enterprise',
          price: '$10,000+',
          revisions: 'Unlimited revisions during development',
          includes: [
            'Bespoke theme design from scratch',
            'Unlimited products & categories',
            'Custom functionality & Liquid development',
            'Advanced app ecosystem (loyalty, subscriptions, bundles)',
            'Multi-language / multi-currency setup',
            'Custom integrations (ERP, inventory, CRM)',
            'Advanced analytics & tracking setup',
            'Performance optimization (Core Web Vitals)',
            'Dedicated project manager',
            'Launch support (4 weeks post-launch)',
            'Staff training session',
          ],
        },
      ],
      note: 'All packages require an active Shopify subscription (provided by you). Custom scopes available upon request.',
    },
    otherServices: {
      title: 'Other Services We Offer',
      headline: 'Complete Growth Solutions',
      services: [
        {
          title: 'eCommerce Growth Partners',
          description: 'Full-funnel paid media for Shopify brands across Meta, Google, TikTok, and Amazon.',
        },
        {
          title: 'Lead Generation Systems',
          description: 'Conversion-focused websites, Google Ads, and inbound lead infrastructure.',
        },
        {
          title: 'Brand Identity Manual',
          description: 'Complete visual identity systems — logo, colors, typography, and brand guidelines.',
        },
        {
          title: 'Tracking & Attribution',
          description: 'Server-side tracking, Conversion APIs, and custom dashboards.',
        },
        {
          title: 'Custom Enterprise Applications',
          description: 'Tailored web applications for inventory, production, and operations.',
        },
      ],
    },
    contact: {
      title: "Let's Talk",
      headline: 'Ready to Build Your Shopify Store?',
      description: "Schedule a consultation to discuss your eCommerce vision and how we can bring it to life.",
      email: 'info@hipervinculo.net',
      phone: '+1 (786) 529-0679',
      address: '2645 Executive Park Dr, Suite 146\nWeston, FL 33331',
      website: 'hipervinculo.net',
      cta: 'Get in Touch',
    },
  },
  es: {
    cover: {
      title: 'Desarrollo Web Shopify',
      subtitle: 'Tiendas Shopify Diseñadas para Convertir',
      tagline: 'Diseño. Desarrollo. Optimización. Lanzamiento.',
    },
    about: {
      title: 'Sobre Hipervinculo',
      description: 'Hipervinculo construye sistemas de crecimiento orientados al rendimiento para empresas listas para escalar. Combinamos sitios web enfocados en conversión, gestión de medios pagados e infraestructura de seguimiento para convertir tráfico en oportunidades reales.',
      stats: [
        { value: '20+', label: 'Años de Experiencia' },
        { value: '50+', label: 'Tiendas Shopify Creadas' },
        { value: '5-8yr', label: 'Retención Promedio' },
      ],
      credentials: [
        '20+ años en marketing digital y eCommerce',
        'Especialistas en desarrollo Shopify',
        'Meta Business Partner y Google Partner',
        'Retención de clientes a largo plazo (5-8 años promedio)',
      ],
    },
    problem: {
      title: 'El Problema Central',
      headline: 'Abrir una tienda Shopify no es lo mismo que construir una que venda.',
      points: [
        'Plantillas genéricas que se ven como miles de otras tiendas en línea.',
        'Mala organización de productos que confunde clientes y mata conversiones.',
        'Sin configuración estratégica de apps, reviews ni elementos de confianza.',
        'Falta de fundamentos de conversión: velocidad, UX móvil y flujo de checkout.',
      ],
      insight: 'Una tienda Shopify sin estrategia es solo un catálogo de productos — no una máquina de ventas.',
      principle: 'Necesitas una tienda construida para convertir, no solo para verse bien.',
      principleNote: 'El desarrollo profesional convierte tu tienda Shopify en un canal de ingresos real.',
    },
    solution: {
      title: 'Lo Que Entregamos',
      headline: 'Desarrollo Completo de Tienda Shopify',
      intro: 'Diseñamos, desarrollamos y optimizamos tu tienda Shopify desde cero:',
      items: [
        {
          title: 'Diseño de Tema Personalizado',
          description: 'Diseño de tienda único y alineado a tu marca — no una plantilla genérica.',
        },
        {
          title: 'Configuración de Productos y Colecciones',
          description: 'Organización estratégica de productos, categorías, etiquetas y variantes para navegación óptima.',
        },
        {
          title: 'Integración de Aplicaciones',
          description: 'Instalación y configuración de apps esenciales: reviews, upsells, captura de emails, calculadoras de envío y más.',
        },
        {
          title: 'Optimización Mobile-First',
          description: 'Cada página construida para rendimiento móvil, asegurando carga rápida y checkout fluido en todos los dispositivos.',
        },
        {
          title: 'UX Enfocado en Conversión',
          description: 'Layout estratégico, CTAs claros, insignias de confianza y flujo de checkout optimizado para maximizar ventas.',
        },
      ],
    },
    scope: {
      title: 'Alcance del Servicio',
      headline: 'Qué Incluye y Qué No',
      included: [
        {
          title: 'Diseño y desarrollo de tema Shopify personalizado',
          description: 'Diseñamos y construimos tu tienda desde cero en la plataforma Shopify.',
        },
        {
          title: 'Configuración de productos y colecciones',
          description: 'Organizamos y subimos tus productos con categorías, imágenes y descripciones adecuadas.',
        },
        {
          title: 'Instalación y configuración de apps esenciales',
          description: 'Instalamos y configuramos apps clave como reviews, popups y herramientas de envío.',
        },
        {
          title: 'Optimización móvil y de velocidad',
          description: 'Aseguramos que tu tienda cargue rápido y se vea excelente en todos los dispositivos.',
        },
      ],
      notIncluded: [
        {
          title: 'Creación de cuenta o suscripción Shopify',
          description: 'Tú provees tu propia cuenta Shopify. No abrimos ni administramos suscripciones.',
        },
        {
          title: 'Fotografía de producto o copywriting',
          description: 'Tú provees imágenes y descripciones de productos. Podemos recomendar socios si lo necesitas.',
        },
        {
          title: 'Administración continua de la tienda',
          description: 'El mantenimiento y actualizaciones post-lanzamiento son compromisos separados.',
        },
      ],
    },
    process: {
      title: 'Nuestro Proceso',
      steps: [
        {
          title: 'Descubrimiento y Estrategia',
          description: 'Analizamos tu marca, productos, audiencia y competidores para definir la estructura y dirección de diseño.',
        },
        {
          title: 'Diseño y Wireframing',
          description: 'Creamos la dirección visual y layouts de páginas, refinando con tu feedback antes del desarrollo.',
        },
        {
          title: 'Desarrollo y Configuración',
          description: 'Construimos la tienda: tema personalizado, productos, apps, pasarelas de pago y envíos.',
        },
        {
          title: 'Pruebas y Lanzamiento',
          description: 'QA exhaustivo en dispositivos, pruebas de checkout, optimización de velocidad y lanzamiento con soporte post-lanzamiento.',
        },
      ],
    },
    pricing: {
      title: 'Inversión',
      headline: 'Elige el Paquete que se Ajuste a tus Necesidades',
      packages: [
        {
          name: 'Starter',
          price: '$2,500',
          revisions: 'Hasta 2 revisiones de diseño',
          includes: [
            'Diseño de tema personalizado (basado en tema premium)',
            'Hasta 5 productos configurados',
            'Hasta 2 categorías de productos',
            'Instalación de apps básicas (reviews, formulario de contacto)',
            'Diseño responsive para móviles',
            'Configuración básica de SEO (meta títulos, descripciones)',
            'Configuración de pasarela de pagos',
            'Soporte post-lanzamiento (1 semana)',
          ],
        },
        {
          name: 'Profesional',
          price: '$5,000',
          highlight: true,
          revisions: 'Hasta 3 revisiones de diseño',
          includes: [
            'Diseño y desarrollo de tema completamente personalizado',
            'Hasta 25 productos configurados',
            'Hasta 5 categorías de productos',
            'Integración avanzada de apps (reviews, upsells, pop-ups de email, wishlist)',
            'Páginas de colección personalizadas con filtros',
            'Optimización mobile-first y de velocidad',
            'Configuración completa de SEO con datos estructurados',
            'Optimización del flujo de checkout',
            'Integración de redes sociales',
            'Soporte post-lanzamiento (2 semanas)',
          ],
        },
        {
          name: 'Enterprise',
          price: '$10,000+',
          revisions: 'Revisiones ilimitadas durante el desarrollo',
          includes: [
            'Diseño de tema a medida desde cero',
            'Productos y categorías ilimitados',
            'Funcionalidad personalizada y desarrollo Liquid',
            'Ecosistema avanzado de apps (lealtad, suscripciones, bundles)',
            'Configuración multi-idioma / multi-moneda',
            'Integraciones personalizadas (ERP, inventario, CRM)',
            'Configuración avanzada de analytics y tracking',
            'Optimización de rendimiento (Core Web Vitals)',
            'Project manager dedicado',
            'Soporte post-lanzamiento (4 semanas)',
            'Sesión de capacitación para el equipo',
          ],
        },
      ],
      note: 'Todos los paquetes requieren una suscripción activa de Shopify (proporcionada por ti). Alcances personalizados disponibles bajo solicitud.',
    },
    otherServices: {
      title: 'Otros Servicios que Ofrecemos',
      headline: 'Soluciones de Crecimiento Completas',
      services: [
        {
          title: 'Socios de Crecimiento eCommerce',
          description: 'Medios pagados de embudo completo para marcas Shopify en Meta, Google, TikTok y Amazon.',
        },
        {
          title: 'Generación de Leads',
          description: 'Sitios web de conversión, Google Ads e infraestructura inbound de leads.',
        },
        {
          title: 'Manual de Imagen de Marca',
          description: 'Sistemas de identidad visual completos — logo, colores, tipografía y guías de marca.',
        },
        {
          title: 'Seguimiento y Atribución',
          description: 'Tracking server-side, Conversion APIs y dashboards personalizados.',
        },
        {
          title: 'Aplicaciones Empresariales',
          description: 'Aplicaciones web a medida para inventario, producción y operaciones.',
        },
      ],
    },
    contact: {
      title: 'Hablemos',
      headline: '¿Listo para Construir tu Tienda Shopify?',
      description: 'Agenda una consulta para discutir tu visión de eCommerce y cómo podemos darle vida.',
      email: 'info@hipervinculo.net',
      phone: '+1 (786) 529-0679',
      address: '2645 Executive Park Dr, Suite 146\nWeston, FL 33331',
      website: 'hipervinculo.net',
      cta: 'Contáctanos',
    },
  },
};
