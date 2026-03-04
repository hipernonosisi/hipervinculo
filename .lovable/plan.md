

## Propuesta para Valores Inmobiliarios de America LLC

### Resumen
Crear una nueva propuesta en español para el cliente **William Javier Cadenas** de **Valores Inmobiliarios de America LLC** (Hotel), siguiendo exactamente el patrón de Costa Firme (propuesta en español, 8 páginas A4).

### Archivos a crear

1. **`src/components/proposals/data/valoresInmobiliariosProposalContent.ts`**
   - Clonar estructura de `costaFirmeProposalContent` en español
   - Cover: "Propuesta de Servicios" / "Preparada para Valores Inmobiliarios de America LLC" / tagline: "Attn: William Javier Cadenas"
   - Personalizar descripciones al sector hotelero/hospedaje (leads de huéspedes, reservaciones, servicios de alojamiento)
   - Precios estándar: $3,000 web, $1,250/mes ads, $50/día media spend
   - clientInfo: company, phone (+58 412-2477615), demás campos vacíos

2. **`src/components/proposals/ValoresInmobiliariosProposal.tsx`**
   - Clonar `CostaFirmeProposal.tsx`, importar el nuevo content data
   - PDF download: "Propuesta-Valores-Inmobiliarios-America.pdf"

3. **`src/components/proposals/pdf/ValoresInmobiliariosPDFDocument.tsx`**
   - Clonar `CostaFirmePDFDocument.tsx`, importar nuevo content data

### Archivos a modificar

4. **`src/pages/Admin.tsx`**
   - Importar `ValoresInmobiliariosProposal`
   - Agregar botón selector "Valores Inmobiliarios" en el tab de Proposals
   - Agregar renderizado condicional `{activeProposal === 'valoresinmobiliarios' && <ValoresInmobiliariosProposal />}`

### Personalización hotelera
Las descripciones se adaptarán al sector hotel: "generar reservaciones", "captar huéspedes calificados", "servicios de hospedaje", etc., manteniendo la misma estructura de 8 páginas y todos los términos estándar.

