import { portfolioProjects } from '@/data/portfolioData';

export const SITE_URL = 'https://hipervinculo.net';
export const business = {
  name: 'Hipervínculo', telephone: '+1 (786) 529-0679', email: 'info@hipervinculo.net',
  address: '2645 Executive Park Dr, Suite 146, Weston, FL 33331, USA',
  trackedSales: '$92M+', websiteFrom: 3000, adsFrom: 1250, minimumContractMonths: 0,
  sameAs: ['https://x.com/hipervinculo_ca', 'https://instagram.com/hipervinculo_', 'https://facebook.com/hipervinculo.net'],
} as const;

type PageMeta = { en: [string, string]; es: [string, string] };
export const pageMetadata: Record<string, PageMeta> = {
  '/shopify-agency/google-ads': { en: ['Google Ads for Shopify: Shopping & PMax | Hipervínculo', 'Google Ads management for Shopify stores: Search, Shopping and Performance Max with a clean product feed, accurate tracking and bidding to net profit.'], es: ['Google Ads para Shopify: Shopping y PMax | Hipervínculo', 'Gestión de Google Ads para tiendas Shopify: Search, Shopping y Performance Max con un feed limpio, medición correcta y pujas según la utilidad neta.'] },
  '/shopify-agency/seo': { en: ['Shopify SEO Agency & SEO Services | Hipervínculo', 'Shopify SEO services: technical fixes, collection and product pages, content and AI search visibility. Measured in organic sales, not just rankings.'], es: ['Agencia de SEO para Shopify: servicios | Hipervínculo', 'SEO para tiendas Shopify: arreglos técnicos, páginas de colección y producto, contenido y visibilidad en búsquedas con IA. Medido en ventas orgánicas.'] },
  '/': { en: ['Shopify Agency, Google Ads & Meta Ads | Hipervínculo', 'Bilingual performance marketing agency in Weston, FL. Google Ads, Amazon Ads, Meta Ads and conversion websites for US and Latin American businesses.'], es: ['Agencia de Shopify, Google Ads y Meta Ads | Hipervínculo', 'Agencia bilingüe de marketing de resultados en Weston, FL. Google Ads, Amazon Ads, Meta Ads y sitios web para empresas de Estados Unidos y Latinoamérica.'] },
  '/shopify-agency': { en: ['Shopify Agency: Store Design, Ads & SEO | Hipervínculo', 'Full-service Shopify agency. We design or rebuild your store to convert, run Google Ads and Meta Ads, and grow organic traffic with SEO. Managed to net profit.'], es: ['Agencia de Shopify: diseño, anuncios y SEO | Hipervínculo', 'Agencia integral de Shopify. Diseñamos o rehacemos tu tienda para que venda, gestionamos Google Ads y Meta Ads, y hacemos crecer el tráfico orgánico con SEO.'] },
  '/shopify-agency/store-design': { en: ['Shopify Website Design & Redesign Agency | Hipervínculo', 'Shopify website design built to convert: product pages, speed, mobile and checkout. New stores, redesigns and migrations from WooCommerce. Free store audit.'], es: ['Diseño y rediseño de tiendas Shopify | Hipervínculo', 'Diseño de tiendas Shopify pensado para vender: fichas de producto, velocidad, móvil y pago. Tiendas nuevas, rediseños y migraciones desde WooCommerce.'] },
  '/about': { en: ['About Hipervínculo: 20+ Years in Digital Marketing', 'Founded by Miguel in Venezuela and based in South Florida since 2011. Meet the founder and the bilingual team behind our ads and web projects.'], es: ['Sobre Hipervínculo: más de 20 años en marketing digital', 'Fundada por Miguel en Venezuela y establecida en el sur de Florida desde 2011. Conoce al fundador y al equipo bilingüe de nuestros proyectos web y de anuncios.'] },
  '/services': { en: ['Digital Marketing Services: Ads, Web & Tracking', 'Google Ads, Amazon Ads, Meta Ads, conversion websites and server-side tracking. See what each service includes, who it fits and how pricing works.'], es: ['Servicios de marketing digital: anuncios, web y medición', 'Google Ads, Amazon Ads, Meta Ads, sitios web de conversión y medición del servidor. Conoce qué incluye cada servicio, para quién es y sus precios.'] },
  '/amazon-ads': { en: ['Amazon PPC Management & Automation | Hipervínculo', 'Amazon PPC with hourly bid changes, single-keyword campaigns and daily organic rank tracking. Built to win sales and top organic positions on Amazon.'], es: ['Gestión y automatización de Amazon PPC | Hipervínculo', 'Amazon PPC con cambios de puja por hora, campañas de una palabra clave y seguimiento diario del posicionamiento orgánico para impulsar ventas en Amazon.'] },
  '/pricing': { en: ['Pricing: Websites, Google Ads & Growth Plans', 'Conversion website from $3,000, Google Ads management from $1,250/month, and performance plans for eCommerce brands. See what each plan includes.'], es: ['Precios: sitios web, Google Ads y planes de crecimiento', 'Sitios web desde $3,000, gestión de Google Ads desde $1,250/mes y planes de rendimiento para marcas eCommerce. Conoce qué incluye cada plan.'] },
  '/portfolio': { en: ['Case Studies: Websites & Ads Results | Hipervínculo', 'Websites and ad campaigns we built for manufacturers, local services and LatAm distributors, with the results each project produced and links to live sites.'], es: ['Casos de éxito: sitios web y anuncios | Hipervínculo', 'Sitios web y campañas para fabricantes, servicios locales y distribuidores de Latinoamérica, con resultados de cada proyecto y enlaces a sus sitios.'] },
  '/faqs': { en: ['Agency FAQs: Pricing, Contracts & Results', 'Answers on pricing, contracts, minimum ad spend, reporting, timelines, Net ROAS and TACoS, and how we run Google Ads, Amazon Ads and Meta Ads.'], es: ['Preguntas frecuentes: precios, contratos y resultados', 'Respuestas sobre precios, contratos, publicidad, reportes, plazos, ROAS neto y TACoS, y cómo gestionamos Google Ads, Amazon Ads y Meta Ads.'] },
  '/contact': { en: ['Contact Hipervínculo | Weston, FL Marketing Agency', 'Call +1 (786) 529-0679, email info@hipervinculo.net or visit us at 2645 Executive Park Dr, Weston, FL. Hours Mon-Fri 9:30-5:30 ET. English & Spanish.'], es: ['Contacta a Hipervínculo | Agencia de marketing en Weston', 'Llama al +1 (786) 529-0679 o escribe a info@hipervinculo.net. Visítanos en 2645 Executive Park Dr, Weston, FL. Lun-vie 9:30-5:30 ET. Inglés y español.'] },
  '/hiper-influencers': { en: ['Hiper Influencers: Creator Monetization Program', 'We build the funnel, fund and run the Meta Ads, and share revenue on every sale of your digital product. No upfront investment. Apply to the program.'], es: ['Hiper Influencers: monetización para creadores', 'Creamos el embudo, financiamos y gestionamos Meta Ads y compartimos ingresos por cada venta de tu producto digital. Sin inversión inicial. Solicita acceso.'] },
  '/privacy': { en: ['Privacy Policy | Hipervínculo', 'Read how Hipervínculo handles personal information, contact requests, analytics and cookies, and how to contact us about your privacy rights.'], es: ['Política de privacidad | Hipervínculo', 'Conoce cómo Hipervínculo trata los datos personales, solicitudes de contacto, analítica y cookies, y cómo contactarnos sobre tus derechos de privacidad.'] },
  '/terms': { en: ['Terms of Service | Hipervínculo', 'Review the terms that apply to Hipervínculo services, including payment, responsibilities, intellectual property and the scope of our work.'], es: ['Términos de servicio | Hipervínculo', 'Consulta los términos de los servicios de Hipervínculo, incluidos pagos, responsabilidades, propiedad intelectual y alcance del trabajo.'] },
};
const services: [string, string, string][] = [
  ['lead-generation-systems', 'Lead Generation Systems', 'Sistemas de generación de leads'],
  ['conversion-website-development', 'Conversion Website Development', 'Desarrollo web de conversión'],
  ['ecommerce-growth-partners', 'eCommerce Growth Partners', 'Crecimiento eCommerce'],
  ['amazon-seller-services', 'Amazon Seller Services', 'Servicios para vendedores de Amazon'],
  ['google-ads-management', 'Google Ads Management', 'Gestión de Google Ads'],
  ['tracking-attribution', 'Tracking & Attribution', 'Medición y atribución'],
  ['custom-enterprise-applications', 'Custom Enterprise Applications', 'Aplicaciones empresariales a medida'],
  ['brand-identity-manual', 'Brand Identity Manual Design', 'Diseño de manual de identidad de marca'],
];
for (const [slug, en, es] of services) pageMetadata[`/services/${slug}`] = {
  en: [`${en} | Hipervínculo`, `Explore ${en.toLowerCase()} from Hipervínculo in Weston, Florida. Review our approach, scope and next steps for your business.`],
  es: [`${es} | Hipervínculo`, `Conoce nuestro servicio de ${es.toLowerCase()} en Weston, Florida. Consulta el enfoque, alcance y próximos pasos para tu empresa.`],
};
export function completeDescription(text: string, fallback: string) {
  const source = text.length < 120 ? `${text} ${fallback}` : text;
  if (source.length <= 160) return source;
  const clipped = source.slice(0, 157);
  return `${clipped.slice(0, clipped.lastIndexOf(' ')).replace(/[.,;:!?]$/, '')}…`;
}
for (const project of portfolioProjects) {
  pageMetadata[`/portfolio/${project.slug}`] = {
    en: [`${project.name}: Case Study`.slice(0, 60), completeDescription(project.overview.en, 'Explore the project and results from Hipervínculo.')],
    es: [`${project.name}: Caso de éxito`.slice(0, 60), completeDescription(project.overview.es, 'Conoce el proyecto y sus resultados con Hipervínculo.')],
  };
}
export const publicPaths = Object.keys(pageMetadata);
export const prerenderPaths = [...publicPaths, ...publicPaths.map(p => localizedPath(p, 'es')), '/book', '/audit', '/preview', '/404'];
export const legacyRedirects: Record<string, string> = {
  '/About': '/about',
  '/index.html': '/',
  '/ads': '/amazon-ads',
  '/services/meta-ads': '/services',
  '/services/google-ads': '/services',
  '/services/seo': '/services',
  '/services/ecommerce': '/services',
  '/services/email-marketing': '/services',
  '/services/lead-generation': '/services',
};
export function redirectedPath(path: string) {
  const normalized = normalizedPath(path);
  const destination = legacyRedirects[basePath(normalized)];
  return destination ? localizedPath(destination, normalized.startsWith('/es/') ? 'es' : 'en') : normalized;
}
export function basePath(path: string) { return path.replace(/^\/es(?=\/|$)/, '') || '/'; }
export function localizedPath(path: string, language: 'en' | 'es') {
  const base = basePath(path);
  return language === 'es' ? `/es${base === '/' ? '/' : base}` : base;
}
export function normalizedPath(path: string) {
  const clean = path.replace(/\/+$/, '') || '/';
  if (clean.toLowerCase() === '/index.html') return '/';
  if (clean.toLowerCase() === '/es/index.html') return '/es/';
  const normalized = clean.toLowerCase();
  return normalized === '/es' ? '/es/' : normalized;
}
export function isPublicPath(path: string) { return publicPaths.includes(basePath(normalizedPath(path))); }
export function routeMeta(path: string, language: 'en' | 'es') { return pageMetadata[basePath(normalizedPath(path))]?.[language]; }
export function businessSchema(logo: string) {
  return { '@context': 'https://schema.org', '@graph': [
    { '@type': ['Organization', 'ProfessionalService'], '@id': `${SITE_URL}/#organization`, name: business.name, url: `${SITE_URL}/`, logo, telephone: business.telephone, email: business.email,
      address: { '@type': 'PostalAddress', streetAddress: '2645 Executive Park Dr, Suite 146', addressLocality: 'Weston', addressRegion: 'FL', postalCode: '33331', addressCountry: 'US' },
      geo: { '@type': 'GeoCoordinates', latitude: 26.085917, longitude: -80.374306 },
      sameAs: business.sameAs, areaServed: [{ '@type': 'Country', name: 'United States' }],
    },
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: business.name, url: `${SITE_URL}/`, publisher: { '@id': `${SITE_URL}/#organization` }, inLanguage: ['en', 'es'] },
  ] };
}
