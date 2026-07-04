# Plan: Segundo producto digital — Publicidad en Amazon Sin Quemar tu Dinero

## Propuesta
Crear una landing de venta tipo VSL + checkout para el ebook de Amazon PPC, reutilizando la infraestructura de pagos, delivery por email y base de datos que ya existe para la guía Amazon FBA Sin Inventario.

## Supuestos
- Precio: **$67 USD, pago único** (antes $97 por ejemplo, -31%).
- URL propuesta: `/publicidad-en-amazon`.
- Pago: Stripe Checkout con `mode: payment`, igual que el ebook FBA.
- Entrega: email automático con link seguro de descarga del PDF.
- No se pide página de oferta de remarketing ni dashboard de analytics en esta versión.

## Decisiones pendientes
- Slug final de la landing.
- Si la landing lleva **VSL de ~90 s** o un **hero estático con poster/cover**. El plan incluye ambos activos, pero se puede omitir el video si prefieren reducir alcance.

## Entregables

1. **Landing `/publicidad-en-amazon`**
   - Hero con VSL (o poster), headline, bullets de promesa, precio tachado + oferta, CTA a checkout.
   - Sección de beneficios.
   - Mini-índice / capítulos destacados (del PDF ya entregado).
   - Plantillas incluidas.
   - FAQ.
   - Sticky CTA/header.
   - Checkout integrado: formulario + redirección a Stripe Checkout.
   - Rastreo: Meta Pixel `InitiateCheckout`, GA4, eventos de formulario y pageview.

2. **Página de éxito `/publicidad-en-amazon/gracias`**
   - Confirma pago, dispara Pixel `Purchase`, descarga el PDF desde link firmado.
   - Reutilizar lógica actual adaptada por producto.

3. **Funciones de backend (reutilizadas y extendidas)**
   - `create-ebook-checkout`: aceptar parámetro `product_key` (`amazon-ppc`) y mapear a nuevo `price_id`.
   - `verify-ebook-payment`: detectar producto según sesión y enviar email con asunto/copy correcto.
   - `download-ebook`: servir el nuevo path en bucket `ebooks` según `product_key`.
   - Agregar/columna `product_key` en tablas `ebook_leads`, `ebook_purchases` y `ebook_download_logs` para segmentar correctamente.

4. **Producto Stripe**
   - Crear producto + price de $67 USD one-time en Stripe.
   - Actualizar functions con el nuevo `price_id`.

5. **Storage**
   - Subir el PDF rellenable al bucket `ebooks` bajo `publicidad-en-amazon/Publicidad_en_Amazon_SQTD_RELLENABLE_Hipervinculo.pdf`.

6. **Assets generados**
   - Poster/cover 3D de la guía.
   - Si se avanza con VSL: video de ~90 s + thumbnail, generados vía kie.ai (de acuerdo a la regla de media del proyecto) usando el contenido del PDF como guión. Si no, un hero estático con el poster.

7. **Emails**
   - Actualizar template de cliente y admin para "Publicidad en Amazon Sin Quemar tu Dinero".

## Detalles técnicos

### Nuevos archivos
- `src/pages/AmazonPpcEbook.tsx`
- `src/pages/AmazonPpcEbookSuccess.tsx`

### Archivos a modificar
- `src/App.tsx`: import + rutas `/publicidad-en-amazon` y `/publicidad-en-amazon/gracias`.
- `supabase/functions/create-ebook-checkout/index.ts`: mapeo `product_key -> price_id`.
- `supabase/functions/verify-ebook-payment/index.ts`: lógica de producto, email y CAPI.
- `supabase/functions/download-ebook/index.ts`: mapeo `product_key -> file_path`.
- `src/integrations/supabase/types.ts`: agregar `product_key` a `ebook_leads`, `ebook_purchases`, `ebook_download_logs`.

### Base de datos
- Migration para agregar `product_key text default 'amazon-fba'` en las 3 tablas y actualizar RLS/policies (los `GRANT` ya están en las tablas existentes).

### Pagos
- Usar `stripe--create_stripe_product_and_price` o la API de Stripe con el secret existente para crear `price_...`.

### Animaciones / UX
- Replicar animaciones Framer Motion del ebook FBA.
- VSLPlayer con comportamiento tap-to-watch en mobile y autoplay mute.

### SEO básico
- Title: "Publicidad en Amazon Sin Quemar tu Dinero · Guía PDF 2026"
- Description: aprender a rentabilizar Amazon PPC estructurando campañas, negativas y optimización semanal.

### Costos/limites
- Generación de video/imagen con kie.ai consume créditos del balance existente.

## Próximo paso
Confirmar slug definitivo y si incluimos VSL o solo poster/cover estático. Una vez aprobado, pasamos a implementación.