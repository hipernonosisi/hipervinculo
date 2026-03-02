

## Plan: Agregar enlace a Google My Business en el Homepage

Ya tienen la seccion de Google Reviews en `/preview` con el link a `https://www.google.com/search?q=Hipervinculo+agency+Weston`. Ahora agregaremos una seccion similar en el homepage principal.

### Cambios en `src/pages/Index.tsx`

Agregar una seccion compacta de "Google Reviews" entre la seccion de **Certified Partners & Tools** y la seccion de **FAQ** (despues de linea 718). La seccion incluira:

1. **Estrellas y rating** — 5 estrellas doradas con el rating promedio (5.0)
2. **Texto de social proof** — "Rated 5.0 on Google" / "Calificacion 5.0 en Google" con numero de resenas
3. **Boton/link prominente** — Enlace directo al perfil de Google My Business (`https://www.google.com/search?q=Hipervinculo+agency+Weston`) con el icono de Google y texto "See our reviews on Google" / "Ver nuestras resenas en Google"
4. **Diseno minimalista** — Fondo blanco o gris claro, centrado, con el favicon de Google y estrellas amarillas para reconocimiento inmediato

### Estructura visual

```text
        [Google icon]  ★★★★★  5.0
    "See our reviews on Google →"
```

### Detalles tecnicos

- Se reutiliza el mismo patron de enlace ya usado en `/preview` (linea 691-733)
- Link: `https://www.google.com/search?q=Hipervinculo+agency+Weston` con `target="_blank"`
- Usa `AnimatedSection` para consistencia con el resto del homepage
- Textos bilingues inline con `language === 'es'`
- Solo se modifica `src/pages/Index.tsx`

