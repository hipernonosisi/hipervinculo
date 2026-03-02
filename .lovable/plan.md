

## Plan: Narrativas de Caso de Estudio + Seccion de Resultados en Homepage

### Punto 3: Agregar narrativas "Reto - Solucion" al Portfolio

**Archivo: `src/data/portfolioData.ts`**
- Agregar campos opcionales `challenge` y `solution` (bilingues) a la interfaz `PortfolioProject`

**Contenido por proyecto:**

| Proyecto | Reto | Solucion |
|---|---|---|
| Step Solution USA | Sin presencia digital para captar distribuidores ni sistema de pedidos | Sistema de leads con formularios inteligentes, dashboard admin y flujo de pedidos (+320% leads) |
| **ZERMA** | Lider mundial en maquinaria de reciclaje sin presencia digital en espanol para penetrar LATAM | Alianza de +16 anos: plataforma bilingue con catalogo, sistema de cotizacion y SEO — +200% cotizaciones, 3x alcance LATAM |
| Filtro Laser | Producto industrial de alta precision sin presencia digital | Landing tecnica con specs, chatbot IA y flujo de contacto rapido — lanzada en 2 dias |
| Pulverizadores | Equipos especializados sin canal digital para mercado hispanohablante | Sitio con video, specs detalladas, asistente IA y cotizacion — 50+ leads calificados/ano |
| **Stillwater** | Dependencia total de referidos, sin canal digital para generar llamadas | Sitio con booking para llamadas, especiales de primera visita y membresias — de 2-3 a 20+ llamadas/dia |
| **Rasetta** | Sitio que no reflejaba calidad premium ni atraia leads de calidad | Identidad visual elegante optimizada para atraer y convertir **leads de alta calidad** (+180% consultas) |
| **Lajex** | Plomeria local sin visibilidad digital para atraer clientes calificados | Sitio bilingue con chat IA y segmentacion por condado — enfocado en **leads de calidad** (de 1-2 a 7-8 clientes/semana) |
| **Delios** | Estudio premium en Madrid sin canal digital para captar leads ni agendar consultas | Landing con renders 3D, Calendly, WhatsApp y Meta Ads — **generando leads y 3 consultas en las primeras 24h** |

**Archivo: `src/pages/CaseStudy.tsx`**
- Agregar seccion visual entre overview y outcomes con dos bloques: "The Challenge" y "Our Solution"
- Solo se muestra si el proyecto tiene los campos `challenge` y `solution`
- Usa `AnimatedSection` existente para animaciones consistentes

**Archivo: `src/lib/i18n.ts`**
- Agregar traducciones: "The Challenge" / "El Reto", "Our Solution" / "Nuestra Solucion"

---

### Punto 4: Seccion de Resultados Agregados en Homepage

**Archivo: `src/pages/Index.tsx`**
- Agregar barra horizontal de metricas debajo del hero, antes de "Proven Results"
- Contadores animados con framer-motion (patron similar a `GrowthMetricsCard`)

```text
+320%           |  20+ calls/day  |  24h            |  3.8%
Best lead       |  Record daily   |  Fastest time   |  Best visitor
increase        |  call volume    |  to first       |  to booking
achieved        |  achieved       |  results        |  rate
```

- Fondo verde oscuro (#2d4a2d) con numeros blancos grandes
- Textos bilingues (EN/ES)

---

### Archivos a modificar

1. `src/data/portfolioData.ts` — Agregar interfaz + datos de `challenge` y `solution`
2. `src/pages/CaseStudy.tsx` — Seccion narrativa "Challenge + Solution"
3. `src/pages/Index.tsx` — Barra de metricas agregadas
4. `src/lib/i18n.ts` — Traducciones nuevas

### Detalles tecnicos

- Campos `challenge` y `solution` opcionales (`challenge?: { en: string; es: string }`) para no romper compatibilidad
- La seccion narrativa usa `AnimatedSection` existente con dos tarjetas lado a lado (stack en movil)
- Los contadores del homepage usan `motion.div` con animacion de entrada
- Todo sigue el patron bilingue existente con `useLanguage()`
