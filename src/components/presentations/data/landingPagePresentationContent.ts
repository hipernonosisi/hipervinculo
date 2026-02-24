// Complete bilingual content for Landing Page Development presentation
export type LandingPageLanguage = 'en' | 'es';

export interface LandingPageContent {
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
  whatIsIt: {
    title: string;
    headline: string;
    definition: string;
    keyPoints: string[];
    notIncluded: string[];
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

export const landingPagePresentationContent: Record<LandingPageLanguage, LandingPageContent> = {
  en: {
    cover: {
      title: 'Landing Page Development',
      subtitle: 'High-Converting Landing Pages Built for Performance',
      tagline: 'Design. Code. Track. Convert.',
    },
    about: {
      title: 'About Hipervinculo',
      description: 'Hipervinculo builds performance-driven growth systems for businesses ready to scale. We combine conversion-focused websites, paid media management, and tracking infrastructure to turn traffic into real business opportunities.',
      stats: [
        { value: '20+', label: 'Years of Experience' },
        { value: '200+', label: 'Landing Pages Built' },
        { value: '5-8yr', label: 'Avg. Client Retention' },
      ],
      credentials: [
        '20+ years in digital marketing & web development',
        'Conversion rate optimization specialists',
        'Meta Business Partner & Google Partner',
        'Long-term client retention (5-8 years average)',
      ],
    },
    problem: {
      title: 'The Core Problem',
      headline: 'Most landing pages fail because they were never built to convert.',
      points: [
        'Sending paid traffic to a homepage instead of a dedicated landing page.',
        'No tracking codes installed — zero visibility on what is working.',
        'Slow load times and poor mobile experience killing conversion rates.',
        'Generic designs with no clear call-to-action or persuasion structure.',
      ],
      insight: 'Without a purpose-built landing page with proper tracking, every ad dollar is a guess.',
      principle: 'A landing page is not a website. It is a conversion tool.',
      principleNote: 'One URL. One goal. Every element designed to drive action.',
    },
    solution: {
      title: 'What We Deliver',
      headline: 'A Single-Page Conversion Machine',
      intro: 'We design, develop, and instrument your landing page for maximum performance:',
      items: [
        {
          title: 'Conversion-Focused Design',
          description: 'Strategic layout with clear hierarchy, compelling copy structure, and a single call-to-action that drives results.',
        },
        {
          title: 'Responsive Development',
          description: 'Pixel-perfect, mobile-first code that loads fast and looks great on every device and screen size.',
        },
        {
          title: 'Tracking Code Installation',
          description: 'Full pixel and tracking setup: Meta Pixel, Google Tag Manager, Google Analytics, and Conversion APIs as needed.',
        },
        {
          title: 'Form & Lead Capture',
          description: 'Contact forms, lead magnets, or booking integrations — connected to your CRM or email platform.',
        },
        {
          title: 'Speed & SEO Optimization',
          description: 'Optimized assets, lazy loading, and proper meta tags for fast load times and search visibility.',
        },
      ],
    },
    whatIsIt: {
      title: 'What is a Landing Page?',
      headline: 'One Page. One Goal. Full Tracking.',
      definition: 'A landing page is a single-URL web page designed for a specific campaign or objective. Unlike a full website with multiple pages and navigation, a landing page focuses entirely on one action: capturing a lead, booking a call, or driving a purchase.',
      keyPoints: [
        'Single URL — no navigation menu, no distractions',
        'Built specifically for paid traffic campaigns (Meta, Google, TikTok)',
        'Includes all tracking pixels and conversion codes',
        'Designed to maximize one specific conversion goal',
        'Fast loading, mobile-optimized, and A/B test ready',
      ],
      notIncluded: [
        'This is NOT a multi-page website',
        'Does not include blog, about page, or site navigation',
      ],
    },
    process: {
      title: 'Our Process',
      steps: [
        {
          title: 'Strategy & Wireframe',
          description: 'We define the conversion goal, audience, and page structure. You approve the wireframe before we design.',
        },
        {
          title: 'Visual Design',
          description: 'We create the visual layout aligned with your brand, optimizing every section for persuasion and clarity.',
        },
        {
          title: 'Development & Tracking',
          description: 'We code the page, install all tracking pixels (Meta, Google, GTM), and configure form integrations.',
        },
        {
          title: 'QA & Launch',
          description: 'Cross-device testing, speed optimization, tracking verification, and launch with post-launch support.',
        },
      ],
    },
    pricing: {
      title: 'Investment',
      headline: 'Choose the Package That Fits Your Campaign',
      packages: [
        {
          name: 'Basic',
          price: '$1,250',
          revisions: 'Up to 1 design revision',
          includes: [
            'Single-page landing page design & development',
            'Mobile-responsive layout',
            'Contact form or CTA button',
            'Meta Pixel installation',
            'Google Analytics setup',
            'Basic SEO meta tags',
            'Speed optimization',
            'Launch support (3 days)',
          ],
        },
        {
          name: 'Standard',
          price: '$1,750',
          highlight: true,
          revisions: 'Up to 2 design revisions',
          includes: [
            'Custom landing page design & development',
            'Mobile-first responsive layout',
            'Advanced form with CRM/email integration',
            'Meta Pixel + Conversion API setup',
            'Google Tag Manager + Analytics',
            'Google Ads conversion tracking',
            'A/B testing structure ready',
            'Speed optimization & lazy loading',
            'Thank-you page / confirmation flow',
            'Launch support (1 week)',
          ],
        },
        {
          name: 'Advanced',
          price: '$2,000',
          revisions: 'Up to 3 design revisions',
          includes: [
            'Premium custom design with animations',
            'Advanced mobile-first development',
            'Multi-step form or interactive elements',
            'Full tracking stack (Meta, Google, TikTok pixels)',
            'Google Tag Manager + server-side tracking',
            'Conversion API configuration',
            'CRM & email automation integration',
            'Custom thank-you page with upsell/next steps',
            'Video embedding & media optimization',
            'A/B test variants setup',
            'Launch support (2 weeks)',
          ],
        },
      ],
      note: 'All packages include tracking code installation and hosting. Custom scopes available upon request.',
    },
    otherServices: {
      title: 'Other Services We Offer',
      headline: 'Complete Growth Solutions',
      services: [
        {
          title: 'Lead Generation Systems',
          description: 'Full inbound lead infrastructure with Google Ads, Meta Ads, and conversion tracking.',
        },
        {
          title: 'eCommerce Growth Partners',
          description: 'Full-funnel paid media for Shopify brands across Meta, Google, TikTok, and Amazon.',
        },
        {
          title: 'Shopify Web Development',
          description: 'Custom Shopify storefronts designed and built for conversions.',
        },
        {
          title: 'Brand Identity Manual',
          description: 'Complete visual identity systems — logo, colors, typography, and brand guidelines.',
        },
        {
          title: 'Tracking & Attribution',
          description: 'Server-side tracking, Conversion APIs, and custom dashboards.',
        },
      ],
    },
    contact: {
      title: "Let's Talk",
      headline: 'Ready to Launch Your Landing Page?',
      description: "Schedule a consultation to discuss your campaign goals and how we can build a page that converts.",
      email: 'info@hipervinculo.net',
      phone: '+1 (786) 529-0679',
      address: '2645 Executive Park Dr, Suite 146\nWeston, FL 33331',
      website: 'hipervinculo.net',
      cta: 'Get in Touch',
    },
  },
  es: {
    cover: {
      title: 'Desarrollo de Landing Page',
      subtitle: 'Landing Pages de Alta Conversión Construidas para Resultados',
      tagline: 'Diseño. Código. Tracking. Conversión.',
    },
    about: {
      title: 'Sobre Hipervinculo',
      description: 'Hipervinculo construye sistemas de crecimiento orientados al rendimiento para empresas listas para escalar. Combinamos sitios web enfocados en conversión, gestión de medios pagados e infraestructura de seguimiento para convertir tráfico en oportunidades reales.',
      stats: [
        { value: '20+', label: 'Años de Experiencia' },
        { value: '200+', label: 'Landing Pages Creadas' },
        { value: '5-8yr', label: 'Retención Promedio' },
      ],
      credentials: [
        '20+ años en marketing digital y desarrollo web',
        'Especialistas en optimización de conversiones',
        'Meta Business Partner y Google Partner',
        'Retención de clientes a largo plazo (5-8 años promedio)',
      ],
    },
    problem: {
      title: 'El Problema Central',
      headline: 'La mayoría de las landing pages fallan porque nunca fueron construidas para convertir.',
      points: [
        'Enviar tráfico pagado a un homepage en vez de una landing page dedicada.',
        'Sin códigos de seguimiento instalados — cero visibilidad de qué funciona.',
        'Tiempos de carga lentos y mala experiencia móvil matando las conversiones.',
        'Diseños genéricos sin un llamado a la acción claro ni estructura de persuasión.',
      ],
      insight: 'Sin una landing page diseñada con propósito y tracking adecuado, cada dólar en ads es una apuesta.',
      principle: 'Una landing page no es un sitio web. Es una herramienta de conversión.',
      principleNote: 'Una URL. Un objetivo. Cada elemento diseñado para generar acción.',
    },
    solution: {
      title: 'Lo Que Entregamos',
      headline: 'Una Máquina de Conversión en Una Sola Página',
      intro: 'Diseñamos, desarrollamos e instrumentamos tu landing page para máximo rendimiento:',
      items: [
        {
          title: 'Diseño Enfocado en Conversión',
          description: 'Layout estratégico con jerarquía clara, estructura de copy persuasiva y un solo llamado a la acción que genera resultados.',
        },
        {
          title: 'Desarrollo Responsive',
          description: 'Código pixel-perfect, mobile-first, que carga rápido y se ve perfecto en cada dispositivo y tamaño de pantalla.',
        },
        {
          title: 'Instalación de Códigos de Seguimiento',
          description: 'Configuración completa de píxeles y tracking: Meta Pixel, Google Tag Manager, Google Analytics y Conversion APIs según necesidad.',
        },
        {
          title: 'Formulario y Captura de Leads',
          description: 'Formularios de contacto, lead magnets o integraciones de reserva — conectados a tu CRM o plataforma de email.',
        },
        {
          title: 'Optimización de Velocidad y SEO',
          description: 'Assets optimizados, lazy loading y meta tags adecuados para tiempos de carga rápidos y visibilidad en buscadores.',
        },
      ],
    },
    whatIsIt: {
      title: '¿Qué es una Landing Page?',
      headline: 'Una Página. Un Objetivo. Tracking Completo.',
      definition: 'Una landing page es una página web de una sola URL diseñada para una campaña u objetivo específico. A diferencia de un sitio web completo con múltiples páginas y navegación, una landing page se enfoca completamente en una acción: capturar un lead, agendar una llamada o generar una compra.',
      keyPoints: [
        'Una sola URL — sin menú de navegación, sin distracciones',
        'Construida específicamente para campañas de tráfico pagado (Meta, Google, TikTok)',
        'Incluye todos los píxeles de seguimiento y códigos de conversión',
        'Diseñada para maximizar un objetivo de conversión específico',
        'Carga rápida, optimizada para móviles y lista para pruebas A/B',
      ],
      notIncluded: [
        'Esto NO es un sitio web de múltiples páginas',
        'No incluye blog, página de about ni navegación del sitio',
      ],
    },
    process: {
      title: 'Nuestro Proceso',
      steps: [
        {
          title: 'Estrategia y Wireframe',
          description: 'Definimos el objetivo de conversión, audiencia y estructura de la página. Apruebas el wireframe antes de diseñar.',
        },
        {
          title: 'Diseño Visual',
          description: 'Creamos el layout visual alineado con tu marca, optimizando cada sección para persuasión y claridad.',
        },
        {
          title: 'Desarrollo y Tracking',
          description: 'Codificamos la página, instalamos todos los píxeles (Meta, Google, GTM) y configuramos integraciones de formularios.',
        },
        {
          title: 'QA y Lanzamiento',
          description: 'Pruebas en múltiples dispositivos, optimización de velocidad, verificación de tracking y lanzamiento con soporte post-lanzamiento.',
        },
      ],
    },
    pricing: {
      title: 'Inversión',
      headline: 'Elige el Paquete que se Ajuste a tu Campaña',
      packages: [
        {
          name: 'Básica',
          price: '$1,250',
          revisions: 'Hasta 1 revisión de diseño',
          includes: [
            'Diseño y desarrollo de landing page de una página',
            'Layout responsive para móviles',
            'Formulario de contacto o botón CTA',
            'Instalación de Meta Pixel',
            'Configuración de Google Analytics',
            'Meta tags básicos de SEO',
            'Optimización de velocidad',
            'Soporte post-lanzamiento (3 días)',
          ],
        },
        {
          name: 'Estándar',
          price: '$1,750',
          highlight: true,
          revisions: 'Hasta 2 revisiones de diseño',
          includes: [
            'Diseño y desarrollo de landing page personalizada',
            'Layout responsive mobile-first',
            'Formulario avanzado con integración CRM/email',
            'Meta Pixel + Conversion API',
            'Google Tag Manager + Analytics',
            'Tracking de conversiones de Google Ads',
            'Estructura lista para pruebas A/B',
            'Optimización de velocidad y lazy loading',
            'Página de agradecimiento / flujo de confirmación',
            'Soporte post-lanzamiento (1 semana)',
          ],
        },
        {
          name: 'Avanzada',
          price: '$2,000',
          revisions: 'Hasta 3 revisiones de diseño',
          includes: [
            'Diseño premium personalizado con animaciones',
            'Desarrollo avanzado mobile-first',
            'Formulario multi-paso o elementos interactivos',
            'Stack completo de tracking (Meta, Google, TikTok)',
            'Google Tag Manager + tracking server-side',
            'Configuración de Conversion API',
            'Integración con CRM y automatización de email',
            'Página de agradecimiento con upsell/próximos pasos',
            'Video embedding y optimización de medios',
            'Configuración de variantes para pruebas A/B',
            'Soporte post-lanzamiento (2 semanas)',
          ],
        },
      ],
      note: 'Todos los paquetes incluyen instalación de códigos de seguimiento y hosting. Alcances personalizados disponibles bajo solicitud.',
    },
    otherServices: {
      title: 'Otros Servicios que Ofrecemos',
      headline: 'Soluciones de Crecimiento Completas',
      services: [
        {
          title: 'Generación de Leads',
          description: 'Infraestructura inbound completa con Google Ads, Meta Ads y tracking de conversiones.',
        },
        {
          title: 'Socios de Crecimiento eCommerce',
          description: 'Medios pagados de embudo completo para marcas Shopify en Meta, Google, TikTok y Amazon.',
        },
        {
          title: 'Desarrollo Web Shopify',
          description: 'Tiendas Shopify personalizadas diseñadas y construidas para convertir.',
        },
        {
          title: 'Manual de Imagen de Marca',
          description: 'Sistemas de identidad visual completos — logo, colores, tipografía y guías de marca.',
        },
        {
          title: 'Seguimiento y Atribución',
          description: 'Tracking server-side, Conversion APIs y dashboards personalizados.',
        },
      ],
    },
    contact: {
      title: 'Hablemos',
      headline: '¿Listo para Lanzar tu Landing Page?',
      description: 'Agenda una consulta para discutir los objetivos de tu campaña y cómo podemos construir una página que convierta.',
      email: 'info@hipervinculo.net',
      phone: '+1 (786) 529-0679',
      address: '2645 Executive Park Dr, Suite 146\nWeston, FL 33331',
      website: 'hipervinculo.net',
      cta: 'Contáctanos',
    },
  },
};
