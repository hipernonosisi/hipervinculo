

## Plan: Destacar certificaciones de Google Ads y Meta Ads

Actualmente la seccion de "Tools and Media Platforms" (linea 664-691 en `Index.tsx`) muestra todas las plataformas como tarjetas iguales sin diferenciar las certificaciones oficiales. La idea es dar protagonismo visual a Google Ads y Meta Ads como **partners certificados**, separandolos del resto.

### Cambios en `src/pages/Index.tsx`

**Opcion de diseno**: Dividir la seccion en dos niveles visuales:

1. **Nivel superior** — Dos tarjetas grandes destacadas para Google Ads (Certified Partner) y Meta Ads (Certified Buyer Professional), con un icono de verificacion/escudo y un badge "Certified" en verde. Estas tarjetas tendran borde verde (#8BC34A), fondo blanco, y seran mas grandes que el resto.

2. **Nivel inferior** — Las demas plataformas (Shopify, Amazon, Helium 10, Elevar, MNTN, Polar Analytics) se mantienen como tarjetas mas pequenas en grid de 3x2 o 6 columnas, sin badge de certificacion.

**Estructura visual:**

```text
         [  Google Ads  ]    [  Meta Ads   ]
         [  Certified   ]    [  Certified  ]
         [  Partner     ]    [  Buyer Pro  ]

  Shopify | Amazon | Helium10 | Elevar | MNTN | Polar
```

### Cambios especificos

- Separar el array `partners` en dos: `certifiedPartners` (Google Ads, Meta Ads) y `toolPartners` (el resto)
- Las tarjetas certificadas tendran: borde `#8BC34A`, un icono `ShieldCheck`, y un badge verde con texto "Certified"
- Las tarjetas de herramientas se mantienen iguales pero en un grid mas compacto (3 cols en desktop, 2 en movil)
- Actualizar el subtitulo de la seccion para incluir "Certified Partners & Tools" / "Partners Certificados y Herramientas"

### Archivo a modificar

- `src/pages/Index.tsx` — Unicamente la seccion de partners (lineas 664-691)

No se requieren cambios en otros archivos.

