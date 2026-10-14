# Header y footer — cómo actualizarlos

El header y el footer están **duplicados en las 11 páginas** (todas en `templates/`,
incluida la portada `index.html`).
No existe un sistema de plantillas: es una decisión deliberada para mantener el proyecto simple.

Cualquier cambio debe aplicarse en las 11 páginas para que sigan siendo idénticos.

## Dónde están

| Bloque | Líneas aproximadas | Identificador |
|---|---|---|
| Header | inicio de `<body>` | `<header id="site-header" class="site-header…">` |
| Footer | antes de los `<script>` | `<footer class="bg-tinta text-white/70">` |

```bash
grep -n 'id="site-header"' templates/*.html
grep -n '<footer' templates/*.html
```

## Navegación (Fase 2)

- La navegación de escritorio muestra **7 enlaces**: Inicio · Nosotros · Actualidad ·
  Actividades · Medioambiente · Donaciones · Contacto.
- Se usa el punto de ruptura **`xl` (1280 px)** en lugar de `lg` (1024 px): entre 1024 y 1279 px
  el menú se colapsa en la hamburguesa para no saturar la barra.
  - `class="hidden items-center gap-8 xl:flex"` → lista de enlaces de escritorio.
  - `class="menu-toggle xl:hidden"` → botón hamburguesa.
  - `class="menu-panel xl:hidden"` → panel móvil/tablet.
- `static/js/main.js` cierra el menú al redimensionar a **≥ 1280 px** (misma cifra que el CSS).
- En el footer, el bloque `Navegación` incluye el enlace a `medioambiente.html` (página hermana)
  y el icono de Facebook usa `group-hover:bg-azul` (acento azul de Fase 2).
- El borde superior del footer lleva la línea tricolor
  `<div class="tricolor-edge"></div>` (naranja · verde · azul).

## Diferencias legítimas entre páginas

Solo tres cosas pueden (y deben) cambiar:

1. **Rutas relativas**: todas son hermanas dentro de `templates/` (`contacto.html`,
   `index.html`); los estáticos se referencian con `../static/…`.
2. **Página activa**: el enlace de la página actual lleva `aria-current="page"`.
3. **Header sólido**: en `index.html` el header es transparente sobre el hero
   (`class="site-header"`); en el resto es blanco desde el inicio
   (`class="site-header is-solid"`).
4. **Páginas legales**: `privacidad.html`, `aviso-legal.html` y `cookies.html` no aparecen en la
   navegación principal (ningún enlace del header lleva `aria-current`); sus enlaces están solo en
   la fila legal del pie, entre el copyright y el aviso de fase de desarrollo.

## Cómo hacer un cambio común

1. Edita el bloque en `templates/index.html`.
2. Copia el bloque modificado a las 9 páginas restantes de `templates/`.
3. Ajusta las rutas (añade o quita `../`) y mueve `aria-current="page"` a la página correcta.
4. Abre las 11 páginas y comprueba que el menú, el logo y los enlaces son correctos
   (también a 1100 px → hamburguesa y a 1280 px → navegación completa).
5. `npm run check` para una verificación automática.
