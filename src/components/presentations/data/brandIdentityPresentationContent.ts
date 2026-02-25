// Complete bilingual content for Brand Identity Manual presentation
export type BrandIdentityLanguage = 'en' | 'es';

export interface BrandIdentityContent {
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

export const brandIdentityPresentationContent: Record<BrandIdentityLanguage, BrandIdentityContent> = {
  en: {
    cover: {
      title: 'Brand Identity Manual',
      subtitle: 'Build a Brand That Commands Recognition and Trust',
      tagline: 'Strategy. Design. System. Guidelines.',
    },
    about: {
      title: 'About Hipervinculo',
      description: 'Hipervinculo builds performance-driven growth systems for businesses ready to scale. We combine conversion-focused websites, paid media management, and tracking infrastructure to turn traffic into real business opportunities.',
      stats: [
        { value: '20+', label: 'Years of Experience' },
        { value: '100+', label: 'Brands Developed' },
        { value: '5-8yr', label: 'Avg. Client Retention' },
      ],
      credentials: [
        '20+ years in digital marketing & branding',
        'Meta Business Partner',
        'Google Partner',
        'Long-term client retention (5-8 years average)',
      ],
    },
    problem: {
      title: 'The Core Problem',
      headline: 'Most businesses operate without a defined brand identity.',
      points: [
        'Inconsistent logos, colors, and fonts across all materials.',
        'No clear guidelines for how the brand should look and feel.',
        'Every new piece of content requires guesswork and improvisation.',
        'The brand looks different on the website, social media, and print.',
      ],
      insight: 'Inconsistency erodes trust and weakens brand perception.',
      principle: 'Your brand deserves a system, not improvisation.',
      principleNote: 'A brand manual is the foundation of how your business is perceived.',
    },
    solution: {
      title: 'What We Deliver',
      headline: 'A Complete Brand Identity System',
      intro: 'We design and document every visual element of your brand:',
      items: [
        {
          title: 'Logo System',
          description: 'Primary, secondary, and icon variations with clear usage rules.',
        },
        {
          title: 'Color Palette',
          description: 'Complete color system with HEX, RGB, CMYK, and Pantone codes.',
        },
        {
          title: 'Typography',
          description: 'Primary and secondary fonts with hierarchy and usage guidelines.',
        },
        {
          title: 'Brand Elements',
          description: 'Patterns, graphic elements, and supporting visual assets.',
        },
        {
          title: 'Application Guidelines',
          description: 'Business cards, stationery, social media templates, and mockups.',
        },
      ],
    },
    process: {
      title: 'Our Process',
      steps: [
        {
          title: 'Discovery & Research',
          description: 'We study your business, competitors, audience, and goals to define the strategic direction.',
        },
        {
          title: 'Concept Development',
          description: 'We create multiple visual directions, refining based on your feedback until we nail it.',
        },
        {
          title: 'System Design',
          description: 'We build the complete visual system — logo variations, colors, typography, patterns.',
        },
        {
          title: 'Manual & Delivery',
          description: 'Everything compiled into a professional brand manual (PDF) with clear guidelines.',
        },
      ],
    },
    pricing: {
      title: 'Investment',
      headline: 'Choose the Package That Fits Your Needs',
      packages: [
        {
          name: 'Essential',
          price: '$1,500',
          revisions: 'Up to 2 revisions',
          includes: [
            'Primary logo design',
            'Color palette (HEX, RGB)',
            'Typography selection',
            'Basic usage guidelines',
            'Digital-ready files (PNG, SVG)',
            'Brand summary document',
          ],
        },
        {
          name: 'Professional',
          price: '$3,000',
          highlight: true,
          revisions: 'Up to 3 revisions',
          includes: [
            'Primary + secondary logo variations',
            'Extended color palette (HEX, RGB, CMYK)',
            'Typography system with hierarchy',
            'Logo usage rules & restrictions',
            'Business card design',
            'Social media templates',
            'Brand identity manual (PDF)',
            'Digital + print-ready files',
          ],
        },
        {
          name: 'Premium',
          price: '$5,000',
          revisions: 'Up to 5 revisions',
          includes: [
            'Full logo system (primary, secondary, icon, monochrome)',
            'Complete color palette (HEX, RGB, CMYK, Pantone)',
            'Typography system with full hierarchy',
            'Brand patterns & graphic elements',
            'Comprehensive usage guidelines',
            'Business card + stationery suite',
            'Social media kit & templates',
            'Brand voice & tone guidelines',
            'Application mockups (signage, packaging, merch)',
            'Complete brand identity manual (PDF)',
          ],
        },
      ],
      note: 'All packages include a brand strategy session. Custom scopes available upon request.',
    },
    otherServices: {
      title: 'Other Services We Offer',
      headline: 'Complete Growth Solutions',
      services: [
        {
          title: 'Lead Generation Systems',
          description: 'Conversion-focused websites, Google Ads, and inbound lead infrastructure.',
        },
        {
          title: 'eCommerce Growth Partners',
          description: 'Full-funnel paid media for Shopify brands across Meta, Google, TikTok, and Amazon.',
        },
        {
          title: 'Conversion Website Development',
          description: 'High-converting sites with optimized UX, built for capturing leads and driving action.',
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
      headline: 'Ready to Build Your Brand Identity?',
      description: "Schedule a consultation to discuss your brand vision and how we can bring it to life.",
      email: 'info@hipervinculo.net',
      phone: '+1 (786) 529-0679',
      address: '2645 Executive Park Dr, Suite 146\nWeston, FL 33331',
      website: 'hipervinculo.net',
      cta: 'Get in Touch',
    },
  },
  es: {
    cover: {
      title: 'Manual de Imagen de Marca',
      subtitle: 'Construye una Marca que Genere Reconocimiento y Confianza',
      tagline: 'Estrategia. Diseño. Sistema. Guías.',
    },
    about: {
      title: 'Sobre Hipervinculo',
      description: 'Hipervinculo construye sistemas de crecimiento orientados al rendimiento para empresas listas para escalar. Combinamos sitios web enfocados en conversión, gestión de medios pagados e infraestructura de seguimiento para convertir tráfico en oportunidades reales.',
      stats: [
        { value: '20+', label: 'Años de Experiencia' },
        { value: '100+', label: 'Marcas Desarrolladas' },
        { value: '5-8yr', label: 'Retención Promedio' },
      ],
      credentials: [
        '20+ años en marketing digital y branding',
        'Meta Business Partner',
        'Google Partner',
        'Retención de clientes a largo plazo (5-8 años promedio)',
      ],
    },
    problem: {
      title: 'El Problema Central',
      headline: 'La mayoría de los negocios operan sin una identidad de marca definida.',
      points: [
        'Uso inconsistente de logos, colores y tipografías en todos los materiales.',
        'Sin guías claras de cómo debe verse y sentirse la marca.',
        'Cada nueva pieza de contenido requiere improvisar.',
        'La marca se ve diferente en el sitio web, redes sociales e impresos.',
      ],
      insight: 'La inconsistencia erosiona la confianza y debilita la percepción de marca.',
      principle: 'Tu marca merece un sistema, no improvisación.',
      principleNote: 'Un manual de marca es la base de cómo se percibe tu negocio.',
    },
    solution: {
      title: 'Lo Que Entregamos',
      headline: 'Un Sistema Completo de Identidad de Marca',
      intro: 'Diseñamos y documentamos cada elemento visual de tu marca:',
      items: [
        {
          title: 'Sistema de Logo',
          description: 'Variaciones primarias, secundarias e icono con reglas claras de uso.',
        },
        {
          title: 'Paleta de Colores',
          description: 'Sistema de colores completo con códigos HEX, RGB, CMYK y Pantone.',
        },
        {
          title: 'Tipografía',
          description: 'Fuentes primarias y secundarias con jerarquía y guías de uso.',
        },
        {
          title: 'Elementos de Marca',
          description: 'Patrones, elementos gráficos y activos visuales de soporte.',
        },
        {
          title: 'Guías de Aplicación',
          description: 'Tarjetas de presentación, papelería, plantillas de redes sociales y mockups.',
        },
      ],
    },
    process: {
      title: 'Nuestro Proceso',
      steps: [
        {
          title: 'Descubrimiento e Investigación',
          description: 'Estudiamos tu negocio, competidores, audiencia y objetivos para definir la dirección estratégica.',
        },
        {
          title: 'Desarrollo de Conceptos',
          description: 'Creamos múltiples direcciones visuales, refinando con tu feedback hasta dar con la identidad.',
        },
        {
          title: 'Diseño del Sistema',
          description: 'Construimos el sistema visual completo — variaciones de logo, colores, tipografía, patrones.',
        },
        {
          title: 'Manual y Entrega',
          description: 'Todo compilado en un manual de marca profesional (PDF) con guías claras.',
        },
      ],
    },
    pricing: {
      title: 'Inversión',
      headline: 'Elige el Paquete que se Ajuste a tus Necesidades',
      packages: [
        {
          name: 'Esencial',
          price: '$1,500',
          revisions: 'Hasta 2 revisiones',
          includes: [
            'Diseño de logo primario',
            'Paleta de colores (HEX, RGB)',
            'Selección de tipografía',
            'Guías de uso básicas',
            'Archivos digitales (PNG, SVG)',
            'Documento resumen de marca',
          ],
        },
        {
          name: 'Profesional',
          price: '$3,000',
          highlight: true,
          revisions: 'Hasta 3 revisiones',
          includes: [
            'Logo primario + variaciones secundarias',
            'Paleta de colores extendida (HEX, RGB, CMYK)',
            'Sistema tipográfico con jerarquía',
            'Reglas de uso y restricciones del logo',
            'Diseño de tarjeta de presentación',
            'Plantillas para redes sociales',
            'Manual de identidad de marca (PDF)',
            'Archivos digitales + listos para impresión',
          ],
        },
        {
          name: 'Premium',
          price: '$5,000',
          revisions: 'Hasta 5 revisiones',
          includes: [
            'Sistema de logo completo (primario, secundario, icono, monocromático)',
            'Paleta de colores completa (HEX, RGB, CMYK, Pantone)',
            'Sistema tipográfico con jerarquía completa',
            'Patrones de marca y elementos gráficos',
            'Guías de uso completas',
            'Tarjeta de presentación + suite de papelería',
            'Kit y plantillas para redes sociales',
            'Guías de voz y tono de marca',
            'Mockups de aplicación (señalización, empaque, merch)',
            'Manual de identidad de marca completo (PDF)',
          ],
        },
      ],
      note: 'Todos los paquetes incluyen una sesión de estrategia de marca. Alcances personalizados disponibles bajo solicitud.',
    },
    otherServices: {
      title: 'Otros Servicios que Ofrecemos',
      headline: 'Soluciones de Crecimiento Completas',
      services: [
        {
          title: 'Sistemas de Generación de Leads',
          description: 'Sitios web de conversión, Google Ads e infraestructura inbound de leads.',
        },
        {
          title: 'Socios de Crecimiento eCommerce',
          description: 'Medios pagados de embudo completo para marcas Shopify en Meta, Google, TikTok y Amazon.',
        },
        {
          title: 'Desarrollo Web de Conversión',
          description: 'Sitios de alta conversión con UX optimizado, construidos para capturar leads.',
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
      headline: '¿Listo para Construir tu Identidad de Marca?',
      description: 'Agenda una consulta para discutir tu visión de marca y cómo podemos darle vida.',
      email: 'info@hipervinculo.net',
      phone: '+1 (786) 529-0679',
      address: '2645 Executive Park Dr, Suite 146\nWeston, FL 33331',
      website: 'hipervinculo.net',
      cta: 'Contáctanos',
    },
  },
};
