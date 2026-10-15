export interface SupremeHerbalsItem { title: string; description: string }
export interface SupremeHerbalsSection {
  eyebrow: string;
  title: string;
  headline: string;
  intro?: string;
  layout: 'panels' | 'steps' | 'table' | 'investment' | 'terms';
  items: SupremeHerbalsItem[];
  note?: string;
}

export const supremeHerbalsContent = {
  pricing: {
    label: 'RETAINER + COMISIÓN SOBRE VENTAS',
    monthly: 'USD 1,250 / mes + 3% sobre ventas',
    commitment: '24 meses · USD 30,000 en retainer fijo + comisión variable',
    exclusions: 'Medios y costos de terceros no incluidos',
  },
  cover: {
    eyebrow: 'PROPUESTA DE SERVICIOS',
    title: 'Shopify &\nPublicidad Digital',
    client: 'Supreme Herbals',
    recipient: 'Atención: Sr. Klaus',
    tagline: 'Desarrollo de tienda, mantenimiento y gestión de Meta & Google Ads para el mercado de Estados Unidos.',
  },
  about: {
    title: 'Sobre Hipervínculo',
    headline: 'Experiencia, estrategia y ejecución.',
    description: 'Ayudamos a las marcas a desarrollar su presencia digital y gestionar campañas publicitarias con una visión integral: sitio web, comunicación, medición y optimización. Nuestro papel es prestar servicios profesionales; no asumir el riesgo financiero ni convertirnos en socios de la operación.',
    stats: [{ value: '20+', label: 'Años de experiencia' }, { value: '200+', label: 'Clientes' }, { value: '$92M+', label: 'Inversión publicitaria gestionada' }],
    capabilities: ['Desarrollo eCommerce', 'Gestión de medios digitales', 'Diseño de anuncios estáticos', 'Medición y optimización'],
  },
  sections: [
    {
      eyebrow: 'LA MARCA', title: 'Supreme Herbals', headline: 'Un canal propio, complementario a Amazon.', layout: 'panels',
      intro: 'Proponemos desarrollar la tienda Shopify de Supreme Herbals para vender sus suplementos en Estados Unidos, utilizando el catálogo disponible de la marca en Amazon y los materiales que el cliente autorice.',
      items: [
        { title: 'Catálogo de la marca', description: 'Incorporación de todos los productos disponibles de Supreme Herbals en Amazon, conforme al listado e información confirmados por el cliente: imágenes, presentaciones, ingredientes, etiquetas, precios y disponibilidad.' },
        { title: 'Identidad y contenido', description: 'Presentación de la marca, su historia, metodologías, procesos y documentación de calidad, usando información aprobada por Supreme Herbals y sin inventar beneficios o certificaciones.' },
        { title: 'Venta directa y recompra', description: 'Una experiencia de compra propia con pagos, políticas de envío, opciones de suscripción y comunicación orientada a construir una base de clientes recurrentes.' },
      ],
      note: 'Esta propuesta no incluye la gestión de la cuenta Seller Central ni de campañas publicitarias de Amazon. La conexión logística con Amazon, si se elige, se limita al alcance descrito aquí.',
    },
    {
      eyebrow: 'ESTRATEGIA', title: 'Vender fuera de Amazon', headline: 'La complejidad va más allá de construir una tienda.', layout: 'panels',
      intro: 'En Amazon el comprador ya está dentro de un entorno de búsqueda, confianza y compra. En una tienda propia debemos atraerlo, generar confianza y sostener una operación rentable desde cero.',
      items: [
        { title: 'Adquisición y confianza', description: 'Competimos por atención y tráfico pagado. La marca debe convencer al comprador sin depender de la reputación, las reseñas o la experiencia de compra de Amazon.' },
        { title: 'Economía de cada pedido', description: 'Producto, publicidad, descuentos, procesamiento de pagos, aplicaciones, logística, devoluciones e impuestos afectan el margen. Vender no significa automáticamente obtener beneficios.' },
        { title: 'Restricciones de suplementos', description: 'Las afirmaciones de salud, los ingredientes y las políticas de Meta, Google y los procesadores de pago pueden limitar anuncios, productos o cuentas, incluso después de su publicación.' },
        { title: 'Maduración del canal', description: 'Durante los primeros 12 meses es probable que existan pérdidas operativas. Debe contemplarse ese escenario sin tratarlo como una predicción exacta ni prometer cuándo llegará la rentabilidad.' },
      ],
      note: 'No garantizamos ventas, rentabilidad, retorno publicitario, costo de adquisición ni éxito comercial. Tampoco podemos asumir una posición de partners o compartir el riesgo de la operación.',
    },
    {
      eyebrow: 'REQUISITOS', title: 'Cuentas y accesos', headline: 'Supreme Herbals conserva la titularidad.', layout: 'table',
      intro: 'El desarrollo comienza cuando contemos con las cuentas, los permisos y los materiales necesarios. Los accesos se concederán por invitación y con permisos adecuados, sin compartir contraseñas personales.',
      items: [
        { title: 'Shopify · Cliente', description: 'Abrir la cuenta, ingresar los datos de la empresa y completar la información bancaria, fiscal y del sistema de pagos; contratar el plan y conceder acceso administrativo a Hipervínculo.' },
        { title: 'Meta y Google · Cliente', description: 'Disponer de los canales sociales y cuentas publicitarias de la marca, sus métodos de pago y verificaciones; conceder los permisos para administrar campañas y medición.' },
        { title: 'Dominio · Cliente', description: 'Proporcionar acceso o colaboración para conectar el dominio. El dominio y el correo corporativo permanecen bajo responsabilidad del cliente.' },
        { title: 'Catálogo y documentos · Cliente', description: 'Entregar el enlace de la tienda o listado de ASIN de Amazon, archivos de producto, derechos de uso, políticas comerciales y pruebas/certificaciones vigentes.' },
        { title: 'Logística · Cliente y operador', description: 'Confirmar laboratorio responsable o alternativa Amazon, inventario, tarifas, cobertura, plazos, devoluciones y permisos de la integración elegida.' },
      ],
      note: 'La apertura de canales sociales no está incluida: si no existen, Supreme Herbals deberá crearlos y proporcionarnos acceso.',
    },
    {
      eyebrow: 'DESARROLLO', title: 'La tienda en Shopify', headline: 'Diseño, catálogo y experiencia de compra.', layout: 'panels',
      items: [
        { title: 'Diseño alineado a la marca', description: 'Desarrollo y adaptación visual de la tienda, navegación y estructura para escritorio y móvil; página principal, marca, catálogo, colecciones, fichas de producto y contacto.' },
        { title: 'Todos los productos disponibles', description: 'Carga inicial del catálogo Supreme Herbals disponible en Amazon, con variantes y organización necesarias a partir de la información aprobada. No implica sincronización automática del contenido de Amazon.' },
        { title: 'Checkout y operación', description: 'Configuración de la experiencia de compra, métodos de pago habilitados por el cliente, reglas de envío y ajustes operativos conforme a sus instrucciones. La aprobación del procesador depende de terceros.' },
        { title: 'Información para vender en EE. UU.', description: 'Publicación de políticas de privacidad, compra, envío, devoluciones y suscripción, avisos aplicables e información de producto suministrados o validados por el cliente y sus asesores.' },
        { title: 'Pruebas y mantenimiento', description: 'Pruebas de navegación y compra antes del lanzamiento, correcciones, actualizaciones de contenidos y ajustes ordinarios de la tienda durante el servicio.' },
      ],
      note: 'El retainer incorpora el desarrollo inicial: no se cobra una tarifa adicional de construcción bajo este acuerdo de 24 meses. Rediseños completos, nuevas tiendas o funciones a medida fuera de este alcance se cotizan aparte.',
    },
    {
      eyebrow: 'CALIDAD Y DOCUMENTACIÓN', title: 'Cumplimiento y confianza', headline: 'Solo afirmaciones respaldadas y verificables.', layout: 'panels',
      intro: 'Organizaremos y publicaremos la información reglamentaria y de calidad de la marca; esto no sustituye asesoría jurídica, certificación, auditoría ni aprobación regulatoria.',
      items: [
        { title: 'Third-party tests', description: 'Presentación de pruebas de terceros y certificados de análisis disponibles, identificando producto, laboratorio, fecha y lote cuando corresponda. El cliente debe proporcionar documentos válidos y autorizar su publicación.' },
        { title: 'GMP y non-GMO', description: 'Publicación de certificaciones GMP, non-GMO y otras únicamente cuando existan documentos vigentes que respalden su alcance real, sin extender una certificación de instalaciones a todos los productos.' },
        { title: 'FDA: precisión obligatoria', description: 'El laboratorio fabricante se presentará como un FDA-registered facility, condición verificable con su documentación. Los suplementos dietéticos, en cambio, no reciben aprobación previa de la FDA como los medicamentos: nunca publicaremos que un producto está “FDA approved”. Cada afirmación se limitará al alcance real que la respalde.' },
        { title: 'Ingredientes, etiquetas y claims', description: 'La marca responde por formulación, etiquetado, advertencias, seguridad y afirmaciones. Los textos no deben atribuir a suplementos la prevención, tratamiento o cura de enfermedades; se incluirán los avisos que correspondan, validados por sus asesores.' },
      ],
      note: 'La autorización para vender en Amazon no equivale a aprobación para anunciar o vender el mismo producto en Shopify, Meta, Google o un procesador de pago.',
    },
    {
      eyebrow: 'OPERACIÓN', title: 'Fulfillment y envíos', headline: 'Dos alternativas; una decisión operativa.', layout: 'table',
      intro: 'Configuraremos la alternativa elegida de acuerdo con la disponibilidad técnica y elegibilidad de productos y cuentas. No se presupone que ambas rutas se utilizarán al mismo tiempo.',
      items: [
        { title: 'Opción A · Laboratorio', description: 'El laboratorio prepara y despacha las órdenes. Facilitaremos acceso limitado a Shopify para consultar pedidos, gestionar fulfillment y comprar etiquetas de envío mediante Shopify Shipping donde esté disponible.' },
        { title: 'Responsabilidad del laboratorio', description: 'Inventario, preparación, embalaje, transportistas, plazos, costos de etiquetas y devoluciones quedan a cargo del operador y del cliente. Hipervínculo no almacena, manipula ni despacha productos.' },
        { title: 'Opción B · Amazon MCF', description: 'Conexión de Shopify con Amazon Multi-Channel Fulfillment para que los pedidos de la tienda se atiendan usando inventario elegible almacenado en FBA, sujeto a cuenta habilitada, integración compatible y pruebas.' },
        { title: 'Centralización y sincronización', description: 'Vinculación de productos/SKU y flujos de pedido, inventario y seguimiento que admita la integración. Amazon puede ser el centro logístico, pero Shopify conserva sus pedidos, pagos y suscripciones; no se convierte en Seller Central.' },
        { title: 'Costos y límites', description: 'Tarifas de Amazon, almacenamiento, fulfillment, transporte, aplicaciones, devoluciones y ajustes de stock se pagan aparte. No se promete inventario en tiempo real ni automatización que el conector no soporte.' },
      ],
      note: 'La elección se confirmará con Supreme Herbals antes del desarrollo logístico. La gestión comercial de Amazon y la atención al cliente no forman parte del retainer.',
    },
    {
      eyebrow: 'RECURRENCIA', title: 'Suscripciones y recompra', headline: 'Una experiencia similar a Subscribe & Save.', layout: 'steps',
      intro: 'Implementaremos compras recurrentes a través de una aplicación compatible con Shopify, no mediante el programa Subscribe & Save de Amazon.',
      items: [
        { title: 'Seleccionar la aplicación', description: 'Evaluación de compatibilidad con suplementos, procesador de pago, catálogo y logística. La contratación y las tarifas de la aplicación corresponden al cliente.' },
        { title: 'Instalar y configurar', description: 'Instalación, integración visual y desarrollo de la experiencia de suscripción dentro de las funciones que permita la aplicación. No se incluye construir una aplicación propia desde cero.' },
        { title: 'Definir reglas comerciales', description: 'Supreme Herbals aprueba frecuencias, descuentos, productos elegibles, condiciones de renovación, cancelación y gestión de suscripciones, conforme a la normativa aplicable.' },
        { title: 'Probar el flujo completo', description: 'Pruebas de alta, cobro recurrente, cambios/cancelación y envío de pedidos a la logística elegida según lo que admita la integración. El cliente responde por cobros, servicio y cumplimiento.' },
      ],
      note: 'La configuración e instalación están incluidas en nuestros honorarios; licencias, cargos por transacción y funciones externas se pagan aparte. No se garantiza una tasa de recompra.',
    },
    {
      eyebrow: 'PUBLICIDAD DIGITAL', title: 'Meta & Google Ads', headline: 'Tráfico hacia la marca, con intención de generar ventas.', layout: 'panels',
      items: [
        { title: 'Estrategia y configuración', description: 'Plan de campañas en las cuentas Meta y Google Ads de Supreme Herbals, definición de audiencias, mensajes y estructura según elegibilidad, documentación y presupuesto autorizado.' },
        { title: 'Campañas en Meta', description: 'Campañas con anuncios de imágenes estáticas para descubrimiento y adquisición; remarketing cuando exista una audiencia suficiente y sea permitido por políticas y consentimiento.' },
        { title: 'Campañas en Google', description: 'Campañas de búsqueda y formatos compatibles con anuncios estáticos. Feeds o formatos de comercio se utilizarán solo cuando los productos y la cuenta sean elegibles; no se garantiza aceptación.' },
        { title: 'Medición y optimización', description: 'Configuración de eventos de compra y medición disponible en Shopify, Meta y Google; revisión de campañas, ajustes de presupuesto autorizado y reporte mensual de inversión, ventas atribuidas y aprendizajes.' },
        { title: 'Evaluación comercial', description: 'Revisión de resultados considerando márgenes, recompra y costos de operación facilitados por el cliente. Las plataformas pueden atribuir una misma venta de forma distinta; no se sumarán como ventas únicas sin revisión.' },
      ],
      note: 'La gestión incluye ambas cuentas publicitarias y la producción de anuncios estáticos. No incluye community management, publicación orgánica continua ni atención de mensajes de compradores.',
    },
    {
      eyebrow: 'PRODUCCIÓN CREATIVA', title: 'Anuncios y creadores', headline: 'Imágenes incluidas. Videos cotizados aparte.', layout: 'table',
      items: [
        { title: 'Incluido · Imágenes estáticas', description: 'Diseño y adaptación de anuncios de imagen con los recursos autorizados de la marca; textos publicitarios sujetos a revisión de claims y políticas de cada plataforma.' },
        { title: 'No incluido · Video', description: 'El servicio base no contempla grabación, edición o producción de videos ni videos generados por inteligencia artificial. No los proponemos como sustituto del contenido real del producto.' },
        { title: 'Opcional · Creador de contenido', description: 'Si la marca solicita anuncios en video con creadores, se presentará una cotización adicional antes de contratar o iniciar la coordinación.' },
        { title: 'Costo del creador', description: 'Supreme Herbals paga el costo facturado por el creador, incluyendo los derechos de uso publicitario que se acuerden. No está absorbido por el retainer.' },
        { title: 'Fee de coordinación', description: 'Hipervínculo cobra por separado la gestión de comunicación y coordinación con el creador. Su monto, entregables, revisiones y derechos se aprueban por escrito antes de comenzar.' },
      ],
      note: 'No se fija aquí una tarifa de creador ni de coordinación: dependerá de la cotización y aprobación del cliente. Las imágenes, testimonios y materiales deben contar con permisos de uso.',
    },
    {
      eyebrow: 'MEDIOS Y RIESGO', title: 'Presupuesto publicitario', headline: 'Una inversión adicional que el cliente debe poder arriesgar.', layout: 'panels',
      intro: 'El retainer no incluye inversión en publicidad. Supreme Herbals deberá disponer de un presupuesto mensual separado para posicionamiento, captación y construcción de recurrencia.',
      items: [
        { title: 'Pago directo a las plataformas', description: 'Meta y Google cobran los medios a Supreme Herbals mediante sus propios métodos de pago. Ninguna parte de los USD 1,250 mensuales se utiliza como presupuesto de anuncios.' },
        { title: 'Monto pendiente de aprobación', description: 'No se inventa un presupuesto inicial. Se acordará según liquidez, márgenes, disponibilidad de inventario y tolerancia al riesgo, con límites autorizados por el cliente.' },
        { title: 'Ajustes basados en las ventas', description: 'La distribución y el escalamiento se revisarán con ventas, costo de adquisición, margen y recompra reales. Aumentar inversión no garantiza incrementar beneficios.' },
        { title: 'Primeros 12 meses', description: 'El cliente debe poder sostener un periodo inicial con probables pérdidas. La inversión busca aprendizaje y posicionamiento; no se promete recuperación del gasto ni un plazo de equilibrio.' },
      ],
      note: 'El riesgo económico pertenece exclusivamente a Supreme Herbals. Hipervínculo no financia publicidad, inventario, descuentos, pérdidas ni costos operativos.',
    },
    {
      eyebrow: 'INVERSIÓN', title: 'Nuestra oferta económica', headline: 'USD 1,250 al mes + 3% sobre ventas · 24 meses.', layout: 'investment',
      intro: 'Este es el acuerdo integral ofrecido: desarrollo de Shopify incorporado al retainer, mantenimiento mensual y gestión de publicidad en Meta y Google Ads, sin una tarifa inicial separada por la web.',
      items: [
        { title: 'Retainer mensual', description: 'USD 1,250 · Se paga 100% por adelantado antes de cada periodo mensual de servicio.' },
        { title: 'Comisión adicional sobre ventas', description: '3% sobre las ventas de la tienda Shopify, adicional al retainer mensual. Se calcula sobre ventas, no sobre utilidades, y se liquida mensualmente con el reporte de ventas de Shopify.' },
        { title: 'Ejemplo mensual', description: 'USD 10,000 en ventas × 3% = USD 300 de comisión adicional. Honorarios del mes: USD 1,250 de retainer + USD 300 = USD 1,550. El mismo cálculo proporcional aplica a cualquier monto de ventas.' },
        { title: 'Compromiso de retainer fijo', description: 'USD 30,000 · Equivale a 24 mensualidades de USD 1,250, más la comisión variable del 3% sobre ventas; no supone un cobro único anticipado de las 24 mensualidades.' },
        { title: 'Desarrollo inicial', description: 'Incluido en el retainer bajo el compromiso de 24 meses, junto con catálogo, configuración de tienda e instalación/configuración de la aplicación de suscripciones.' },
        { title: 'Operación mensual incluida', description: 'Mantenimiento ordinario de Shopify, administración de ambas cuentas publicitarias, anuncios estáticos, optimización y reporte mensual.' },
      ],
      note: 'USD 30,000 representa únicamente el retainer fijo de 24 meses: no incluye la comisión adicional del 3% sobre ventas, publicidad ni costos de terceros. Sin compromiso de 24 meses, la web y el servicio mensual deberán cotizarse nuevamente por separado.',
    },
    {
      eyebrow: 'ALCANCE ECONÓMICO', title: 'Costos y responsabilidades', headline: 'Qué no está incluido en nuestros honorarios.', layout: 'table',
      items: [
        { title: 'Plataforma y aplicaciones', description: 'Plan Shopify, temas o licencias de pago, aplicación de suscripciones, conectores y otras herramientas externas; su aprobación y pago corresponden al cliente.' },
        { title: 'Medios y transacciones', description: 'Inversión en Meta/Google, procesamiento de pagos, comisiones de aplicaciones, contracargos, reembolsos e impuestos de la operación.' },
        { title: 'Producto y logística', description: 'Fabricación, inventario, almacenamiento, laboratorio, Amazon MCF/FBA, etiquetas de envío, fletes, seguros y devoluciones.' },
        { title: 'Contenido y cumplimiento', description: 'Fotografía nueva, video, creadores y coordinación; estudios de laboratorio, permisos, registro de marcas y asesoría legal, fiscal o regulatoria.' },
        { title: 'Operación de la marca', description: 'Apertura de canales sociales, atención al consumidor, community management, administración comercial de Amazon y costos de dominio o correo electrónico.' },
      ],
      note: 'No se contratarán servicios opcionales ni se trasladarán costos adicionales sin aprobación previa. Los materiales y documentos del cliente deben entregarse a tiempo para evitar retrasos.',
    },
    {
      eyebrow: 'CONDICIONES DEL SERVICIO', title: 'Plazo, pagos y alcance', headline: 'Una relación de prestación de servicios, no de sociedad.', layout: 'terms',
      items: [
        { title: 'Compromiso mínimo', description: 'Supreme Herbals se compromete a 24 meses de retainer. La fecha de inicio y el calendario de facturación se confirmarán por escrito. No se incorpora una renovación automática a esta propuesta.' },
        { title: 'Pago anticipado', description: 'Cada mensualidad se factura mediante Square y debe pagarse antes del periodo correspondiente. El impago podrá suspender el trabajo y las campañas; no se exige pagar los 24 meses en una sola transacción.' },
        { title: 'Comisión sobre ventas', description: 'Además del retainer mensual, Supreme Herbals pagará a Hipervínculo el 3% sobre las ventas de su tienda Shopify. La comisión se liquida al cierre de cada mes con el reporte de Shopify y se factura por separado del retainer anticipado; no depende de que la operación genere utilidades.' },
        { title: 'Cambios y servicios adicionales', description: 'Las solicitudes que excedan este alcance se cotizan y aprueban por escrito. El precio integral depende del plazo pactado; una modalidad sin ese compromiso requiere una propuesta nueva.' },
        { title: 'Salida anticipada', description: 'La decisión unilateral de detener campañas o dejar de usar la tienda no elimina por sí sola el compromiso de 24 meses. Cualquier terminación anticipada y sus condiciones deberán acordarse por escrito entre las partes.' },
        { title: 'No partnership', description: 'Hipervínculo actúa como proveedor independiente. No participa en utilidades, no asume pérdidas, no adquiere participación en la marca y no garantiza éxito ni rentabilidad.' },
      ],
    },
    {
      eyebrow: 'CONDICIONES DEL SERVICIO', title: 'Operación y límites', headline: 'Responsabilidades claras para ambas partes.', layout: 'terms',
      items: [
        { title: 'Propiedad y confidencialidad', description: 'Las cuentas, dominio y datos de la marca permanecen bajo control del cliente. El uso de materiales requiere sus derechos y autorización. Ambas partes deberán proteger información confidencial y datos personales.' },
        { title: 'Aprobaciones y tiempos', description: 'El lanzamiento depende de materiales, accesos, documentación y aprobaciones del cliente y de terceros. No se promete una fecha hasta validar estos requisitos; los retrasos ajenos a la agencia afectan el calendario.' },
        { title: 'Regulación y decisiones de terceros', description: 'Supreme Herbals responde por legalidad, seguridad, etiquetado, políticas y producto. Hipervínculo no certifica cumplimiento ni controla bloqueos, revisiones, cambios de políticas o disponibilidad de plataformas.' },
        { title: 'Mantenimiento y continuidad', description: 'Mantenimiento de la tienda durante el servicio, dentro de la infraestructura Shopify contratada por el cliente. No incluye hosting externo, administración de correo ni reconstrucción completa por cambios ajenos al alcance.' },
        { title: 'Cierre y entrega', description: 'Al concluir la relación se coordinará la entrega de accesos, configuraciones y materiales del alcance pagado; el cliente deberá mantener sus planes y licencias para la continuidad. Los anuncios se pausarán o transferirán según instrucciones.' },
      ],
      note: 'La aceptación del alcance, fecha de inicio y términos comerciales se formalizará por escrito antes de iniciar. Esta propuesta no sustituye asesoría legal para la marca ni documentación regulatoria.',
    },
    {
      eyebrow: 'IMPLEMENTACIÓN', title: 'Preparación y lanzamiento', headline: 'El siguiente paso es confirmar los insumos.', layout: 'steps',
      items: [
        { title: 'Confirmar el acuerdo', description: 'Aprobar USD 1,250 mensuales por 24 meses más el 3% sobre ventas de Shopify, determinar fecha de inicio y presupuesto de medios que Supreme Herbals está dispuesta a arriesgar.' },
        { title: 'Habilitar las cuentas', description: 'Abrir Shopify, completar pagos y datos empresariales, crear los canales sociales faltantes y conceder accesos administrativos y publicitarios.' },
        { title: 'Entregar catálogo y respaldo', description: 'Facilitar enlace/ASIN de todos los productos Amazon, materiales de marca, etiquetas, pruebas de terceros, certificaciones vigentes y políticas validadas.' },
        { title: 'Resolver logística y suscripción', description: 'Elegir laboratorio o Amazon MCF, confirmar costos e inventario y aprobar la aplicación, frecuencias, descuentos y condiciones de compras recurrentes.' },
        { title: 'Desarrollar, probar y activar', description: 'Construir la tienda, instalar y configurar las integraciones, probar pagos y fulfillment y activar anuncios tras la aprobación del cliente y de las plataformas.' },
      ],
      note: 'Necesitamos confirmar: catálogo de Amazon, canales existentes, documentación disponible, operador logístico y presupuesto inicial de medios.',
    },
  ] satisfies SupremeHerbalsSection[],
  contact: { title: 'Construyamos el\ncanal de la marca.', subtitle: 'Supreme Herbals · Atención: Sr. Klaus', name: 'Miguel Camacho', email: 'info@hipervinculo.net', phone: '+1 (786) 529-0679', website: 'hipervinculo.net', address: '2645 Executive Park Dr, Suite 146\nWeston, FL 33331' },
};