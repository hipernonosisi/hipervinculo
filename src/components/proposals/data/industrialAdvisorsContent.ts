export interface IASection {
  id: string;
  nav: string;
  title: string;
  intro: string;
  blocks?: { title: string; text?: string; bullets?: string[] }[];
  table?: { headers: string[]; rows: string[][] };
  note?: string;
}

export const iaPricing = [
  { label: 'Gestión mensual', amount: 'USD 1.500', detail: 'Al mes · una cuenta de Google Ads' },
  { label: 'Puesta en marcha', amount: 'USD 1.000', detail: 'Pago único · al inicio' },
  { label: 'Inversión publicitaria', amount: 'USD 3.000–5.000', detail: 'Al mes · aparte, directamente a Google' },
];

export const iaQuestions = [
  '¿Qué presupuesto mensual desean invertir en Google Ads, adicional a los honorarios de gestión?',
  '¿Qué CRM utilizan para registrar y dar seguimiento a los contactos? Si no utilizan uno, ¿cómo los gestionan actualmente?',
  'De las campañas de Google Ads que ya realizaron, ¿qué inversión y resultados obtuvieron? ¿Podemos revisar esa cuenta y su histórico?',
  '¿Quién atenderá los leads y cómo se hará el seguimiento?',
];

export const iaSections: IASection[] = [
  {
    id: 'contexto', nav: 'El punto de partida', title: 'Lo que entendemos de Industrial Advisors',
    intro: 'Entendemos que una instalación industrial debe funcionar para la operación de una empresa, no solamente encajar en un mapa.',
    blocks: [
      { title: 'Información publicada por la compañía', text: 'Industrial Advisors / IA Miami asesora y comercializa inmuebles industriales en el sur de Florida. Su oficina está en Miami Lakes; esa ubicación no limita la totalidad de su mercado.', bullets: ['Alquiler y venta de propiedades industriales; representación de empresas que buscan instalaciones.', 'Optimización de instalaciones y planificación de expansión.', 'Asesoría en aviación/MRO (mantenimiento y reparación de aeronaves), fabricación y almacenamiento frigorífico.', 'Evaluación de potencia eléctrica, altura libre, muelles, distribución, zonificación y crecimiento.'] },
      { title: 'Nuestra interpretación estratégica', text: 'Proponemos conectar la búsqueda de un inmueble con necesidades reales de operación, expansión y reubicación. Su conocimiento técnico permite ofrecer una solución inmobiliaria compatible con el negocio, más allá de una propiedad.' },
      { title: 'Un punto de partida que respetamos', text: 'El cliente confirma que ya realizó Google Ads. Revisaremos los resultados antes de emitir conclusiones. La web acaba de renovarse y será el destino de nuestras campañas.' },
    ],
    note: 'Fuente del contexto corporativo: información publicada en iamiami.com. No se presenta como experiencia ni resultados de Hipervínculo.',
  },
  {
    id: 'estrategia', nav: 'Nuestro servicio', title: 'Qué podemos hacer por ustedes',
    intro: 'Conectar Industrial Advisors con empresas que ya están buscando su próxima instalación industrial.',
    blocks: [
      { title: 'Entender antes de invertir', bullets: ['Auditar la cuenta y las campañas anteriores.', 'Revisar inversión, términos de búsqueda, anuncios y conversiones históricas.', 'Identificar qué conviene conservar, corregir o probar.', 'Investigar la demanda y la competencia.'] },
      { title: 'Configurar, gestionar y mejorar', bullets: ['Crear o reestructurar campañas de búsqueda y anuncios.', 'Configurar o revisar la medición de contactos.', 'Optimizar continuamente y revisar la calidad de las consultas con su equipo.', 'Informar con claridad sobre inversión y oportunidades comerciales.'] },
    ],
    note: 'Toda la estrategia utiliza su web actual. No proponemos rediseño, nueva web, landing pages ni migración del sitio.',
  },
  {
    id: 'objetivos', nav: 'Objetivos y medición', title: 'La calidad comercial es el criterio',
    intro: 'Buscamos generar consultas cualificadas de personas y empresas interesadas en alquilar o comprar inmuebles y en soluciones industriales.',
    blocks: [
      { title: 'Del interés a la oportunidad', text: 'Búsqueda → anuncio → web actual → consulta → cualificación → visita o reunión → oportunidad → cierre.' },
      { title: 'Qué consideramos una consulta cualificada', bullets: ['Necesidad compatible con los servicios y las zonas atendidas.', 'Superficie o requisitos operativos identificables.', 'Presupuesto y plazo que su equipo pueda evaluar.', 'Contacto real con capacidad de decidir o influir.'] },
      { title: 'Qué mediremos', bullets: ['Consultas recibidas y consultas cualificadas.', 'Coste por consulta y por consulta cualificada.', 'Visitas o reuniones agendadas y oportunidades comerciales.', 'Operaciones cerradas y comisiones atribuibles, cuando haya datos.'] },
    ],
    note: 'Las impresiones, los clics y el CTR (porcentaje de clics sobre impresiones) ayudan a diagnosticar. No sustituyen la calidad de los contactos ni garantizan operaciones.',
  },
  {
    id: 'campanas', nav: 'Líneas de campaña', title: 'Búsquedas con intención explícita',
    intro: 'Priorizaremos Google Search: anuncios que aparecen cuando alguien busca una instalación o asesoría industrial. Organizaremos las campañas por intención, con un objetivo comercial común.',
    table: { headers: ['Línea', 'Ejemplos / criterio'], rows: [
      ['A · Alquiler industrial', 'warehouse for lease Miami Lakes\nindustrial space for rent Medley\nwarehouse for rent Hialeah'],
      ['B · Compra industrial', 'warehouse for sale Miami\nindustrial property for sale Hialeah\nbuy warehouse Medley'],
      ['C · Asesoría y búsqueda', 'industrial real estate advisor Miami\nindustrial tenant representation Miami\nwarehouse relocation South Florida'],
      ['D · Instalaciones especializadas', 'Fabricación, aviación/MRO y almacenamiento frigorífico. Solo con demanda relevante y capacidad real de atenderla; no asumimos inventario disponible.'],
      ['E · Marca', 'Industrial Advisors / IA Miami. Evaluaremos su utilidad, con presupuesto limitado según competencia y rendimiento orgánico.'],
    ] },
    note: 'Son hipótesis de palabras clave, pendientes de validar con Keyword Planner y el histórico; no son datos de volumen ni CPC. No activaremos todas las líneas automáticamente: concentraremos el presupuesto inicial y ampliaremos según evidencia.',
  },
  {
    id: 'anuncios', nav: 'Mensajes y anuncios', title: 'Anuncios ligados a necesidades reales',
    intro: 'Trabajaremos ubicación, alquiler o compra, disponibilidad confirmada, superficie y características verificadas, requisitos operativos y asesoría durante la búsqueda y negociación.',
    blocks: [
      { title: 'Alquiler · ejemplo ilustrativo', bullets: ['Warehouse Space in Miami', 'Explore Industrial Options', 'Speak With Industrial Advisors'] },
      { title: 'Compra · ejemplo ilustrativo', bullets: ['Industrial Property for Sale', 'Find Your Next Facility', 'Discuss Your Requirements'] },
      { title: 'Español · ejemplo ilustrativo', bullets: ['Alquiler Industrial en Miami', 'Opciones para tu Empresa', 'Habla con un Asesor'] },
    ],
    note: 'Estos textos no son anuncios aprobados. No anunciaremos una propiedad como disponible sin confirmación de Industrial Advisors.',
  },
  {
    id: 'segmentacion', nav: 'Segmentación', title: 'Relevancia y control del presupuesto',
    intro: 'Empezaremos donde coincidan inventario, demanda y capacidad comercial. La segmentación se validará con su equipo antes del lanzamiento.',
    blocks: [
      { title: 'Zonas e idiomas', bullets: ['Miami Lakes, Hialeah, Medley, Doral, Opa-Locka y otras zonas pertinentes, pendientes de validación.', 'Inglés y español con anuncios coherentes y destinos adecuados dentro de la web existente.', 'Segmentación por presencia física para el piloto local.', 'Una campaña separada, si procede, para empresas externas que buscan instalarse en el sur de Florida.'] },
      { title: 'Control de búsquedas', bullets: ['Concordancias exacta y de frase como punto inicial: controlan qué búsquedas pueden activar los anuncios.', 'Revisión de consultas y negativas para empleo, vivienda, almacenamiento personal y otras búsquedas irrelevantes.', 'Evitaremos exclusiones generales que bloqueen demanda industrial válida.'] },
    ],
    note: 'Performance Max, Display y YouTube podrán evaluarse posteriormente. No forman parte del lanzamiento base.',
  },
  {
    id: 'web', nav: 'Su web actual', title: 'La web que acaban de lanzar',
    intro: 'Las campañas dirigirán el tráfico a la web que Industrial Advisors acaba de lanzar.',
    blocks: [
      { title: 'Un destino relevante para cada anuncio', text: 'Usaremos las páginas, fichas y secciones existentes más adecuadas. Comprobaremos los destinos antes de lanzar; no asumimos que exista una página individual por propiedad.' },
      { title: 'Verificación previa', bullets: ['Funcionamiento de formularios y botones de contacto.', 'Experiencia móvil y recepción correcta de consultas.', 'Disponibilidad de las propiedades promocionadas.', 'Etiquetas de medición y acciones que pueden registrarse.'] },
      { title: 'Coordinación técnica, sin rediseño', text: 'Si una ficha no se puede enlazar o una acción no puede medirse, explicaremos su efecto y coordinaremos la solución con quien administra su web. Las recomendaciones se limitarán a lo necesario para medir y recibir contactos.' },
    ],
  },
  {
    id: 'crm', nav: 'Medición y CRM', title: 'Seguir el contacto, no solo el clic',
    intro: 'La medición conecta la inversión con las consultas. El seguimiento comercial permite saber cuáles fueron cualificadas y qué operaciones avanzaron.',
    blocks: [
      { title: 'Medición estándar incluida', bullets: ['Revisión o configuración de Google Tag Manager y GA4 cuando corresponda: etiquetas y analítica de la web.', 'Conversiones de formularios enviados correctamente y prevención de duplicados.', 'Llamadas reales cuando sea técnicamente viable. Los clics en teléfono son señales secundarias, no equivalen automáticamente a un lead.', 'Identificación de la campaña de origen.', 'Conversiones mejoradas para leads cuando corresponda y se cumplan los requisitos aplicables.'] },
      { title: 'Devolver calidad a Google Ads', text: 'Un CRM es un registro de contactos y su avance comercial. Sus etapas pueden devolverse a Google Ads para orientar la optimización. Si no utilizan uno, proponemos un registro compartido sencillo; no necesitan comprar un CRM para comenzar.' },
      { title: 'Alcance técnico', text: 'Evaluaremos su sistema antes de prometer una conexión automática. Integraciones personalizadas, desarrollos y licencias se presupuestan por separado.' },
    ],
  },
  {
    id: 'gestion', nav: 'Gestión continua', title: 'Una gestión con revisión constante',
    intro: 'Gestionaremos el presupuesto y las campañas con una rutina clara, coordinada con el equipo que atiende las consultas.',
    blocks: [
      { title: 'Durante el lanzamiento', text: 'Revisión frecuente del gasto, las búsquedas, los anuncios, las conversiones y las primeras consultas.' },
      { title: 'Semanalmente', bullets: ['Revisar consultas de búsqueda y añadir negativas.', 'Ajustar anuncios y presupuestos.', 'Comprobar destinos y disponibilidad.', 'Revisar la calidad de los leads con el cliente.'] },
      { title: 'Mensualmente', bullets: ['Informe de inversión y resultados.', 'Reunión de seguimiento.', 'Recomendaciones de distribución del presupuesto.', 'Próximas pruebas.'] },
    ],
    note: 'La estrategia de puja se decidirá tras revisar el histórico y la medición. No fijamos un CPA (coste por adquisición) objetivo arbitrario.',
  },
  {
    id: 'plan', nav: 'Plan de 90 días', title: 'Evaluar, aprender y decidir',
    intro: 'Proponemos 90 días como periodo inicial de evaluación. No es una garantía de cierres ni una permanencia contractual obligatoria.',
    blocks: [
      { title: 'Mes 01 · Preparar y lanzar', text: 'Auditoría, investigación, medición, configuración y lanzamiento, sujetos a accesos y aprobaciones.' },
      { title: 'Mes 02 · Depurar y optimizar', text: 'Depuración de búsquedas y optimización según las consultas y la calidad de los contactos recibidos.' },
      { title: 'Mes 03 · Evaluar y proyectar el siguiente paso', text: 'Evaluación de calidad, oportunidades y posibilidades de ampliar inversión a partir de evidencia real.' },
    ],
    note: 'Los cierres inmobiliarios pueden tardar más que el periodo piloto. Deben seguirse posteriormente para evaluar la contribución comercial de las campañas.',
  },
  {
    id: 'inversion', nav: 'Inversión', title: 'Inversión transparente, desde el inicio',
    intro: 'Honorarios de Hipervínculo y publicidad separados. Todos los importes están expresados en USD.',
    blocks: [
      { title: 'USD 1.000 · Puesta en marcha · pago único', bullets: ['Auditoría de la cuenta anterior e investigación y estructura inicial.', 'Creación o reestructuración de campañas y anuncios.', 'Configuración o revisión de medición estándar y verificación previa al lanzamiento.'] },
      { title: 'USD 1.500 · Gestión mensual', bullets: ['Una cuenta de Google Ads y las líneas de búsqueda acordadas.', 'Anuncios en inglés y español cuando corresponda.', 'Optimización continua, consultas y negativas, y revisión de medición.', 'Informe, reunión mensual y coordinación sobre calidad de leads.'] },
    ],
    table: { headers: ['Concepto', 'Primer mes', 'Meses posteriores'], rows: [
      ['Publicidad · directamente a Google', 'USD 3.000–5.000', 'USD 3.000–5.000'],
      ['Gestión · Hipervínculo', 'USD 1.500', 'USD 1.500'],
      ['Puesta en marcha · Hipervínculo', 'USD 1.000', 'No se repite'],
      ['Total mensual', 'USD 5.500–7.500', 'USD 4.500–6.500'],
    ] },
    note: 'La gestión cubre hasta USD 10.000/mes de publicidad. Una ampliación de inversión o alcance se presupuestará y acordará antes de aplicarse. El rango publicitario del piloto es preliminar: se validará con el histórico y la demanda, y no garantiza resultados.',
  },
  {
    id: 'condiciones', nav: 'Condiciones', title: 'Condiciones del servicio',
    intro: 'Un alcance definido y una relación transparente entre Industrial Advisors e Hipervínculo.',
    blocks: [
      { title: 'Pagos y propiedad', bullets: ['Puesta en marcha y gestión mensual pagadas por adelantado.', 'Google factura la publicidad directamente al cliente.', 'Cuenta, datos e histórico bajo propiedad y control del cliente.'] },
      { title: 'Servicios no incluidos', bullets: ['Licencias y herramientas de terceros.', 'Integraciones complejas de CRM o desarrollo adicional, presupuestados aparte.', 'Creación o rediseño de web, nuevas landing pages, SEO y gestión de redes sociales.'] },
      { title: 'Expectativas responsables', text: 'No garantizamos cantidad de leads, costes por lead, posiciones en Google, ventas, rentabilidad ni operaciones cerradas. El resultado depende también del inventario, la demanda y el seguimiento comercial.' },
    ],
  },
  {
    id: 'responsabilidades', nav: 'Responsabilidades', title: 'Lo que necesitamos de su equipo',
    intro: 'La publicidad abre conversaciones. Su equipo aporta disponibilidad actualizada, conocimiento de las propiedades y seguimiento comercial.',
    blocks: [
      { title: 'Para preparar y lanzar', bullets: ['Accesos a Google Ads y analítica.', 'Coordinación con el administrador de su web.', 'Inventario y disponibilidad actualizados.', 'Aprobación de anuncios y datos de propiedades.'] },
      { title: 'Para aprender y mejorar', bullets: ['Atención oportuna a los contactos.', 'Información sobre calidad y avance comercial.'] },
    ],
  },
  {
    id: 'lanzamiento', nav: 'Preparar el lanzamiento', title: 'Información para preparar el lanzamiento',
    intro: 'Estas cuatro respuestas nos permitirán ajustar el plan inicial y coordinar el trabajo con su equipo.',
    blocks: iaQuestions.map((title, i) => ({ title: `${i + 1}. ${title}` })),
    note: 'Podrán copiar las respuestas o enviarlas por correo a Hipervínculo. No se guardan automáticamente.',
  },
  {
    id: 'cierre', nav: 'Siguiente paso', title: 'Coordinar el lanzamiento',
    intro: 'Una estrategia de Google Ads sobre su web actual, con inversión transparente y seguimiento de oportunidades comerciales.',
    blocks: [
      { title: 'Hipervínculo · Miguel Camacho', text: 'info@hipervinculo.net · +1 (786) 529-0679\n2645 Executive Park Dr, Suite 146, Weston, FL 33331' },
      { title: 'Próximo paso', text: 'Revisemos el histórico, confirmemos la inversión publicitaria y coordinemos accesos y aprobaciones para preparar el lanzamiento.' },
    ],
  },
];