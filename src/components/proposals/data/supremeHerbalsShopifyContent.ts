import type { SupremeHerbalsSection } from './supremeHerbalsContent';

export const supremeHerbalsShopifyTerms = {
  developmentPrice: 3000, maximumProducts: 10, includeVariants: true,
  paymentPercentAtCompletion: 100, upfrontPaymentPercent: 0,
  reviewRounds: 'as-needed-within-scope', maintenance: 'optional-unpriced',
  monthlyRetainer: 0, salesCommissionPercent: 0, minimumMonths: 0,
  fulfillmentAlternativesIncluded: 1,
} as const;
const terms = supremeHerbalsShopifyTerms;
const price = `USD ${terms.developmentPrice.toLocaleString('en-US')}`;
export const supremeHerbalsShopifyContent = {
  pricing: { label: 'DESARROLLO SHOPIFY · PRECIO FIJO', monthly: price, commitment: `${terms.paymentPercentAtCompletion}% al terminar el website · Sin anticipo`, exclusions: 'Shopify, aplicaciones, licencias y costos de operación por cuenta del cliente.' },
  cover: { eyebrow: 'PROPUESTA DE DESARROLLO · 3 NOV 2026', title: 'Desarrollo de\nTienda Shopify', client: 'Supreme Herbals', recipient: 'Atención: Sr. Klaus Stadthagen', tagline: 'Una tienda profesional, funcional y propia para el mercado de Estados Unidos. Borrador para aprobación del alcance final.' },
  about: { title: 'Sobre Hipervínculo', headline: 'Experiencia, criterio y ejecución.', description: 'Hipervinculo LLC acompaña a las marcas en el desarrollo de su presencia digital. En esta nueva etapa, nuestro trabajo se centra en construir y entregar la tienda Shopify de Supreme Herbals, respetando la relación comercial existente y separando el desarrollo de cualquier futura gestión de crecimiento.', stats: [{ value: '20+', label: 'Años de experiencia' }, { value: '200+', label: 'Clientes' }, { value: '$92M+', label: 'Inversión publicitaria gestionada' }], capabilities: ['Diseño y desarrollo eCommerce', 'Configuración de catálogo e integraciones', 'Pruebas operativas y entrega de la tienda'] },
  sections: [
    { eyebrow: 'NUEVO ENFOQUE', title: 'Avanzar por etapas', headline: 'Primero la tienda. El crecimiento, cuando la marca lo decida.', layout: 'panels', intro: 'Estimado Klaus: después de nuestra conversación del 3 de noviembre de 2026, consideramos que la mejor decisión para Supreme Herbals es avanzar por etapas, comenzando por una tienda Shopify profesional y funcional, sin comprometer a la empresa con una inversión publicitaria que todavía no considera oportuna.', items: [
      { title: 'Un canal propio', description: 'Presentar la marca y sus suplementos, recibir compras individuales y recurrentes, integrar la logística elegida y construir una base propia de clientes, complementaria a Amazon.' },
      { title: 'Una nueva oferta independiente', description: 'Esta propuesta comprende exclusivamente el desarrollo e implementación inicial. No modifica la gestión de Seller Central ni Amazon PPC cubierta por nuestro acuerdo independiente.' },
      { title: 'Libertad para el siguiente paso', description: 'Meta Ads, Google Ads y la optimización comercial continua podrán evaluarse mediante otro acuerdo, sin obligación de contratarlos posteriormente.' },
    ], note: 'Disponer de una tienda no genera automáticamente tráfico, ventas, rentabilidad ni crecimiento. Hipervínculo no asume el riesgo comercial de la marca.' },
    { eyebrow: 'DISEÑO Y ARQUITECTURA', title: 'La experiencia de compra', headline: 'Una tienda coherente con la marca, en escritorio y móvil.', layout: 'panels', items: [
      { title: 'Tema Shopify profesional', description: 'Configuración inicial y adaptación visual de un tema compatible. Se personaliza un tema: no se ofrece una plataforma completamente a medida. Una licencia de pago, si se elige, corresponde al cliente.' },
      { title: 'Páginas y navegación', description: 'Homepage, About Us, catálogo, colecciones, fichas de producto, contacto, menús, footer y páginas informativas con materiales aprobados por Supreme Herbals.' },
      { title: 'Carrito, checkout y confianza', description: 'Experiencia de compra dentro de las capacidades del plan Shopify, presentación de marca y elementos de confianza respaldados. Adaptación y pruebas para escritorio y móvil.' },
      { title: 'Preparación técnica básica', description: 'Estructura de URLs, títulos y metadescripciones principales, colecciones, dominio, sitemap e indexación disponible. GA4 y Google Search Console se configurarán de forma básica si se acuerda.' },
    ], note: 'No se incluyen posicionamiento garantizado, SEO mensual, artículos continuos ni link building.' },
    { eyebrow: 'CATÁLOGO', title: 'Productos y contenido', headline: `Hasta ${terms.maximumProducts} productos, con sus variantes.`, layout: 'table', intro: 'Utilizaremos el catálogo actual de Supreme Herbals en Amazon como referencia y únicamente información y materiales aprobados por Klaus.', items: [
      { title: 'Carga inicial', description: 'Hasta 10 productos con sus variantes y presentaciones disponibles. La lista de productos y el inventario de variantes se validarán durante el descubrimiento técnico.' },
      { title: 'Fichas completas', description: 'Nombres, descripciones, fotografías existentes, ingredientes, Supplement Facts, advertencias, precios y disponibilidad, según documentos y datos proporcionados por la marca.' },
      { title: 'Organización', description: 'Colecciones y navegación para facilitar la búsqueda de productos. Supreme Herbals aprueba la estructura, precios, textos y derechos de uso de las imágenes.' },
      { title: 'Límites del catálogo', description: 'No se promete sincronización automática de las fichas de Amazon. Productos adicionales o integraciones personalizadas se cotizarán por separado.' },
    ] },
    { eyebrow: 'RECURRENCIA Y HERRAMIENTAS', title: 'Suscripciones y funciones', headline: 'Configuración inicial, no administración comercial continua.', layout: 'panels', items: [
      { title: 'Suscripciones incluidas', description: 'Selección, instalación y configuración de una aplicación compatible: frecuencias, descuentos, renovaciones, administración, pausas y cancelaciones cuando la herramienta lo permita. Pruebas de cobros recurrentes; no se desarrolla una aplicación propia.' },
      { title: 'Promociones por confirmar', description: 'Evaluaremos cupones, bundles, envío gratuito por umbral y descuentos de primera compra. Su inclusión se documentará tras validar complejidad, compatibilidad y costos; no constituyen obligaciones confirmadas.' },
      { title: 'Conversión y email por confirmar', description: 'Reseñas, upsell/cross-sell, captación de email, recuperación de carrito y automatizaciones básicas de bienvenida/postcompra se evaluarán del mismo modo antes de cerrar el alcance.' },
      { title: 'Operación y licencias', description: 'El cliente paga aplicaciones, suscripciones, SMS y cargos por uso. Campañas continuas de email/SMS, pruebas A/B y optimización recurrente no están incluidas.' },
    ], note: 'La lista final de funciones opcionales requiere aprobación de Miguel y Klaus antes de emitir la propuesta definitiva.' },
    { eyebrow: 'LOGÍSTICA Y OPERACIÓN', title: 'Una solución de fulfillment', headline: 'Configuraremos una de las dos alternativas.', layout: 'table', items: [
      { title: 'A · Laboratorio u operador', description: 'Acceso autorizado a Shopify para recibir y gestionar pedidos; configuración de envíos y etiquetas cuando Shopify Shipping esté disponible.' },
      { title: 'B · Amazon MCF', description: 'Evaluación e implementación de una integración compatible para despachar pedidos Shopify con inventario FBA elegible, sujeta a habilitación, compatibilidad y pruebas del conector.' },
      { title: 'Pagos y mercado', description: 'Métodos disponibles, moneda y mercado de EE. UU., envíos, impuestos conforme a información del cliente y capacidades de Shopify, políticas suministradas y notificaciones transaccionales estándar.' },
      { title: 'Pruebas operativas', description: 'Checkout, pedido, suscripción y envío a la alternativa logística elegida. No se garantiza aprobación del procesador ni funciones no admitidas por terceros.' },
    ], note: 'Incluye una alternativa, no ambas. Supreme Herbals responde por inventario, preparación, envíos, devoluciones, impuestos y costos logísticos; Hipervínculo no opera pedidos diariamente.' },
    { eyebrow: 'CUMPLIMIENTO Y CONFIANZA', title: 'Documentación verificable', headline: 'Presentar calidad sin inventar certificaciones ni claims.', layout: 'panels', items: [
      { title: 'Pruebas y fabricante', description: 'Publicación de certificados de análisis, pruebas de terceros, información del fabricante y certificaciones GMP o non-GMO únicamente cuando estén respaldadas y autorizadas.' },
      { title: 'Precisión sobre la FDA', description: 'El laboratorio podrá presentarse como FDA-registered facility cuando su documentación lo acredite. Esto no significa que los suplementos estén “FDA approved”: nunca se afirmará tal aprobación.' },
      { title: 'Contenido y advertencias', description: 'Ingredientes, etiquetas, Supplement Facts y advertencias aprobadas. No se atribuirán propiedades de prevención, tratamiento o cura de enfermedades.' },
      { title: 'Aprobación de la marca', description: 'Supreme Herbals proporciona y aprueba claims, documentos, políticas y textos regulatorios. Hipervínculo no presta asesoría legal ni certificación regulatoria.' },
    ] },
    { eyebrow: 'IMPLEMENTACIÓN', title: 'Fases y entregables', headline: 'Un proceso de desarrollo, revisión y entrega.', layout: 'steps', items: [
      { title: 'Descubrimiento técnico', description: 'Validar los 10 productos y variantes, materiales, accesos, apps, logística y alcance funcional antes de comenzar.' },
      { title: 'Diseño', description: 'Definir arquitectura, tema, homepage, colecciones y plantillas; presentar la dirección visual para revisión.' },
      { title: 'Implementación', description: 'Configurar catálogo, pagos, logística elegida, suscripciones, políticas e integraciones aprobadas.' },
      { title: 'Pruebas y revisiones', description: 'Revisar navegación móvil, checkout, pedidos, recurrencia y fulfillment. Realizar las rondas necesarias dentro del alcance para que el Sr. Klaus quede satisfecho.' },
      { title: 'Lanzamiento y entrega', description: 'Aprobación final, publicación, entrega de accesos y capacitación básica para administrar la tienda.' },
    ], note: 'No se garantiza una fecha definitiva hasta validar catálogo e integraciones. Materiales, revisiones y aprobaciones del cliente y terceros condicionan el calendario.' },
    { eyebrow: 'INVERSIÓN Y CONDICIONES', title: 'Desarrollo independiente', headline: 'Una inversión fija, sin comisión ni mensualidad obligatoria.', layout: 'investment', items: [
      { title: 'Pago al terminar', description: `${price} · 100% al terminar el website, mediante Square. No se exige anticipo ni pagos por hitos. La revisión y aprobación final forman parte del cierre.` },
      { title: 'Revisiones y cambios', description: 'Las rondas necesarias para satisfacción del Sr. Klaus están incluidas dentro del alcance. Nuevas funcionalidades, productos adicionales o integraciones no especificadas se cotizan y aprueban por separado.' },
      { title: 'Mantenimiento opcional', description: 'Contenido, cambios menores, soporte de configuración e integraciones podrán contratarse mediante un acuerdo independiente, sin precio fijado aquí ni soporte ilimitado incluido.' },
    ], note: 'No hay retainer, porcentaje sobre ventas ni permanencia de 24 meses en esta nueva oferta. Costos de terceros separados. Borrador sujeto a aprobación del alcance funcional final.' },
    { eyebrow: 'RESPONSABILIDADES Y EXCLUSIONES', title: 'Alcance y próximos pasos', headline: 'La tienda y los datos siguen siendo de Supreme Herbals.', layout: 'terms', items: [
      { title: 'Responsabilidades del cliente', description: 'Contratar Shopify, facilitar dominio y accesos, completar datos bancarios/fiscales, entregar catálogo y materiales, aprobar claims y certificados, elegir logística, aprobar apps/costos y revisar entregables.' },
      { title: 'Servicios no incluidos', description: 'Google/Meta Ads ni pauta; Seller Central o Amazon PPC; redes orgánicas y community management; atención al cliente, gestión diaria de pedidos o fulfillment; fotografía/video profesional y asesoría legal/regulatoria.' },
      { title: 'Otros límites y propiedad', description: 'Sin email/SMS mensual, optimización recurrente, desarrollo ilimitado ni integraciones a medida no especificadas. Cuentas, dominio y datos comerciales pertenecen al cliente; ambas partes protegen información confidencial.' },
      { title: 'Confirmar antes de iniciar', description: 'Aprobar alcance exacto y lista opcional de herramientas; entregar los 10 productos con variantes y documentación; seleccionar tema, aplicación de suscripción y una alternativa logística. El acuerdo de Amazon permanece intacto.' },
    ], note: 'La aprobación final del alcance se formalizará por escrito. No existe obligación de contratar publicidad posteriormente ni garantía de resultados comerciales.' },
  ] satisfies SupremeHerbalsSection[],
  contact: { title: 'Construyamos\nsu tienda propia.', subtitle: 'Supreme Herbals · Sr. Klaus Stadthagen', name: 'Miguel Camacho · Hipervinculo LLC', email: 'info@hipervinculo.net', phone: '+1 (786) 529-0679', website: 'hipervinculo.net', address: '2645 Executive Park Dr, Suite 146\nWeston, FL 33331' },
};
export type { SupremeHerbalsSection } from './supremeHerbalsContent';
