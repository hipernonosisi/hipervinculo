
# Plan: Replicar Exactamente hipervinculo.net

## Objetivo
Copiar fielmente el sitio web original incluyendo tipografía, colores, estructura, animaciones y todos los estilos visuales.

---

## 1. Tipografía Correcta

### Problema Actual
- Estás usando **Lora** (serif) + **DM Sans** (sans-serif)
- El sitio original usa **Gilroy** (sans-serif geométrico premium)

### Solución
Gilroy es una fuente comercial. Usaremos una alternativa gratuita de Google Fonts que es prácticamente idéntica:

- **Alternativa**: **Plus Jakarta Sans** o **Outfit** (ambas muy similares a Gilroy)
- Headlines: Plus Jakarta Sans Bold/Extra Bold
- Body: Plus Jakarta Sans Regular/Medium

---

## 2. Colores Exactos

| Uso | Color Actual | Color Original |
|-----|--------------|----------------|
| Headlines principales | Navy (#1a2d3d) | Dark Green (#203B2C) |
| Palabra destacada (eCommerce) | Verde primario | Verde marca (#3C5C2E) |
| CTA buttons | Lima (#9DC209) | Correcto |
| Fondos secciones | Correcto | Correcto |

---

## 3. Estructura del Hero (Página Principal)

```text
+----------------------------------------------------------+
|  ☆ Digital Growth Agency                                  |
|                                                           |
|  Your growth              +-------------------------+     |
|  partner for              | Growth Metrics      📈  |     |
|  ambitious                |                         |     |
|  eCommerce.               | Revenue Growth  +250%   |     |
|                           | ████████████████        |     |
|  [Description text...]    | ROAS Improvement +180%  |     |
|                           | ██████                  |     |
|  [Request Free Audit]     +-------------------------+     |
|  [View Our Services]                                      |
+----------------------------------------------------------+
```

### Elementos a implementar:
1. Badge "Digital Growth Agency" con estrella
2. Headline con rotación de palabras ("eCommerce" cambia)
3. Tarjeta de métricas flotante a la derecha
4. Dos botones CTA
5. Fondo con líneas/curvas decorativas sutiles

---

## 4. Archivos a Modificar

| Archivo | Cambios |
|---------|---------|
| `src/index.css` | Cambiar fuentes a Plus Jakarta Sans, ajustar colores |
| `src/pages/Index.tsx` | Reestructurar hero con tarjeta de métricas, headlines rotativos mejorados |
| `src/components/layout/Header.tsx` | Ajustar tipografía de navegación |
| `src/components/layout/Footer.tsx` | Mantener estructura actual (ya correcta) |

---

## 5. Detalles Técnicos

### Fuentes (Google Fonts)
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
```

### Variables CSS actualizadas
```css
:root {
  --font-heading: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
  --dark-green: #203B2C;
  --brand-green: #3C5C2E;
  --lime: #9DC209;
}
```

### Hero con Métricas
- Agregar tarjeta "Growth Metrics" al lado derecho
- Progress bars animados para Revenue Growth y ROAS
- Números que incrementan con animación

---

## 6. Resultado Esperado

Después de implementar estos cambios:
- ✅ Tipografía idéntica al original (usando alternativa gratuita)
- ✅ Colores exactos del brand
- ✅ Estructura del hero con métricas flotantes
- ✅ Animaciones de rotación de headlines
- ✅ Sin gradientes (solo colores sólidos)
- ✅ Mismo espaciado y proporciones

---

## Nota Importante sobre Gilroy

Gilroy es una fuente premium de Radomir Tinkov. Si tienes la licencia de Gilroy, puedo configurar el proyecto para usar archivos de fuente locales (.woff2) en lugar de Google Fonts, lo que daría un resultado 100% idéntico.
