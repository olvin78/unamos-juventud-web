# Header y footer — cómo actualizarlos

Header, pie, menú móvil y `<head>` viven **una sola vez** en `templates/base.html`.
Las 11 páginas los heredan con `{% extends "base.html" %}`, así que cualquier cambio en
`base.html` se aplica a todo el sitio.

## Dónde están

| Bloque | Contenido | Identificador |
|---|---|---|
| `<head>` | título, meta, fuentes, `output.css` | bloques `title`, `description`, `og_*` |
| Header | logo, navegación y menú hamburguesa | `<header id="site-header" class="site-header…">` |
| Main | hueco para el contenido de cada página | `{% block content %}` |
| Footer | navegación, información legal y canales | `<footer class="bg-tinta text-white/70">` |

```bash
grep -n 'site-header' templates/base.html
grep -n '<footer' templates/base.html
```

## Cada página hereda así

```django
{% extends "base.html" %}

{% block title %}Sobre nosotros — Juventud Renovadora UNAMOS{% endblock %}
{% block content %}
  …contenido de la página…
{% endblock %}
```

## Estado del menú (aria-current)

- `web/views.py` expone `pagina` en el contexto (`PaginaMixin`); `base.html` compara
  `{{ pagina }}` con el nombre de cada enlace para añadir `aria-current="page"`.
- La portada no lleva `cabecera_transparente` → el header queda transparente sobre el hero
  (en el resto de páginas `is-solid` y el `<main>` recibe `pt-[var(--header-h)]`).

## Navegación

- La navegación de escritorio muestra **7 enlaces**: Inicio · Quiénes somos · Actualidad ·
  Actividades · Medioambiente · Contacto · Donaciones.
- Se usa el punto de ruptura **`xl` (1280 px)** en lugar de `lg` (1024 px): entre 1024 y 1279 px
  el menú se colapsa en la hamburguesa para no saturar la barra.
  - `class="hidden items-center gap-8 xl:flex"` → lista de enlaces de escritorio.
  - `class="menu-toggle xl:hidden"` → botón hamburguesa.
  - `class="menu-panel xl:hidden"` → panel móvil/tablet.
- `static/js/main.js` cierra el menú al redimensionar a **≥ 1280 px** (misma cifra que el CSS).
- Los enlaces del pie y del menú usan `{% url '…' %}`: las rutas se cambian en `web/urls.py`.

## Páginas legales

`/privacidad/`, `/aviso-legal/` y `/cookies/` no aparecen en la navegación principal: solo en la
fila «Información legal» del pie, que además marca `aria-current` cuando corresponde.
