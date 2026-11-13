# Auditoría SEO de Hipervínculo

## Alcance
Corregir la auditoría en su orden, manteniendo el diseño y los textos salvo los cambios solicitados. No modificar formularios, IDs de Analytics/Meta ni contratos particulares de propuestas.

Datos confirmados: **$92M+ en ventas rastreadas**, oferta general **sin contratos**, web desde **$3,000** y gestión Google Ads desde **$1,250/mes**. Usar el contacto de Weston y las tres redes del documento.

## 1. Resolver primero las páginas vacías
- Generar HTML estático por página pública en inglés y español durante la compilación, reutilizando su contenido real y conservando la interactividad.
- Incluir texto, enlaces, H1 y metadatos propios antes de ejecutar JavaScript.
- Cubrir las rutas solicitadas, los nueve casos y los servicios adicionales que realmente existen.
- Comprobar los archivos generados sin JavaScript antes de continuar con las demás correcciones.

El alojamiento admite archivos estáticos y ofrece una página de respaldo para rutas desconocidas. La entrega exacta por ruta deberá comprobarse también tras publicar: funcionar en el editor no demuestra que el dominio publicado ya cambió. Si no se puede entregar correctamente, detener esta parte y presentar la actualización a la plantilla con renderizado en servidor como alternativa, sin migrar automáticamente.

## 2. Rutas, metadatos e idiomas
- Una sola descripción y título por página, con los textos del documento; Open Graph y Twitter coherentes.
- Canónica propia de Amazon Ads y título propio para aplicaciones empresariales; metadatos completos de los casos.
- Español en `/es/...`, canónicas propias y hreflang recíprocos `en`, `es`, `x-default`; compatibilidad con enlaces antiguos `?lang=es`.
- Normalizar `/services/`, `/About` y `/index.html`. Enviar las seis rutas inexistentes a Services; las demás desconocidas a NotFound.
- NotFound sin canónica ni schema y con noindex. También noindex en Book, Audit y Preview; conservar noindex de propuestas y dominios de desarrollo.

## 3. Contenido y datos estructurados
- H1 real de la home separado de su animación decorativa; cifras finales de Amazon presentes en HTML.
- Unificar cifras, condiciones y precios en ambas lenguas, sin alterar compromisos específicos de propuestas.
- Reutilizar en About el fundador, reseñas y testimonios existentes en Preview, sin inventarlos.
- Organization y ProfessionalService vinculados por `@id`, logo real y contacto correcto; quitar SearchAction, credenciales y foundingDate.
- BreadcrumbList en interiores. Verificar coordenadas antes de incluirlas; no inventarlas.

## 4. Imágenes, velocidad y móvil
- WebP y variantes de tamaño para imágenes de contenido, preservando su aspecto; dimensiones y carga diferida fuera de la primera pantalla.
- Corregir tamaño de la imagen social y del icono PWA.
- Conservar la separación por rutas existente y eliminar cargas anticipadas innecesarias.
- Diferir las descargas de Meta y Contentsquare conservando IDs y eventos. Optimizar fuentes sin cambiar la fuente visible.
- Llamada en cabecera móvil, botones flotantes sin tapar campos/acciones y enlaces del pie/redes con altura mínima de 44 px.

## 5. Archivos y comprobación
- Sitemap con URLs reales, español en `/es/` y lastmod actual; llms.txt y llms-full.txt coherentes; nombre de aplicación Hipervínculo.
- Tests de cifras, precios, permanencia, rutas, canónicas e idiomas; verificar HTML sin JavaScript e interactividad en móvil/escritorio.
- Entregar lista de realizado, pendiente y motivo; los cambios llegan al dominio público al publicar.

## Detalles técnicos y límites
- Compartir catálogo de rutas/metadatos entre SEO, generación estática y sitemap; límite explícito de páginas generadas.
- Separar el árbol de páginas del router de navegador para generar HTML; resolver páginas diferidas y usar hidratación solo sobre contenido prerenderizado.
- Evitar duplicados entre HTML y Helmet; idioma inicial determinado por la ruta para evitar discrepancias.
- No usar configuraciones de otros alojamientos: no tienen efecto aquí.
- React no controla códigos HTTP 404 ni redirecciones HTTP permanentes en este alojamiento estático. Aplicar normalización en navegador y noindex; registrar los códigos HTTP como limitación mientras no haya una función de alojamiento confirmada.
