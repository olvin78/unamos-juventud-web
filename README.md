# Juventud Renovadora UNAMOS — Web institucional

Primera versión de la web institucional de **Juventud Renovadora**, espacio de la juventud de
**Unamos** (Nicaragua).

El sitio es una **aplicación Django** con plantillas (HTML + Tailwind CSS + JavaScript vanilla):
las páginas se generan en el servidor con clases de Django (`TemplateView`, `ListView`,
`DetailView`), el contenido vive en la **base de datos** (modelos `web.models`, editables desde
`/admin/`) y se sirve con `python manage.py runserver`.

La **Fase 2** añadió la identidad visual tricolor (naranja institucional, verde de
medioambiente, azul complementario) y la sección/página de medioambiente.

La **Fase 3** rediseñó la portada (`templates/index.html`) con identidad nicaragüense: fotografías
auténticas de Wikimedia Commons, secciones de hero, quiénes somos, nuestra juventud,
actualidad, actividades y efemérides, medioambiente, galería «Conoce Nicaragua»,
donaciones y contacto.

La **Fase 4** rediseñó la página `templates/nosotros.html` como presentación institucional:
hero, quiénes somos, misión, visión, principios, ámbitos de trabajo, trayectoria documentada,
preguntas frecuentes y canales oficiales de Juventud Renovadora.

La **Fase 5** migró el sitio a **Django con clases**: `templates/base.html` concentra header y
footer, cada página hereda con `{% extends %}`, los listados se renderizan en el servidor
(`{% for %}`) y las rutas son limpias con nombres de URL (`{% url 'nosotros' %}` →
`/nosotros/`, `/actualidad/`, `/noticia/1/`).

La **Fase 6** llevó el contenido a **base de datos**: `Noticia`, `Actividad` (calendario) y
`Efemeride` son modelos de Django con migraciones, se gestionan desde `/admin/` y las vistas
leen con ORM (`Noticia.objects…`). El aspecto no cambió: sigue siendo Tailwind CSS + JS vanilla
para menú, filtros y animaciones.

---

## Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 semántico | Marcado de las 11 páginas |
| Tailwind CSS 4 (CLI) | Compilación oficial de estilos → `static/css/output.css` |
| JavaScript vanilla ES6+ | Menú, filtros, animaciones, formulario y donaciones |
| Lenis | Desplazamiento suave (opcional, se desactiva con `prefers-reduced-motion`) |
| Lucide (ISC) | Iconografía, embebida como SVG inline |
| Google Fonts | Manrope (títulos) + Inter (cuerpo) |
| Django 6 | Vistas con clases (`TemplateView` · `ListView` · `DetailView`), plantillas con herencia y rutas limpias; panel `/admin/` |

No se usan React, Next.js, Vue, Angular, bases de datos ni CDN de desarrollo de Tailwind.

---

## Identidad visual (Fase 2)

Colores y tipografías se definen **una sola vez** en `static/css/input.css`, dentro del bloque
`@theme`. Los hex solo aparecen ahí; el resto del CSS y las clases utilitarias usan esos tokens.

| Rol | Token | Valor | Uso |
|---|---|---|---|
| Institucional (predominante) | `--color-naranja` | `#F97316` | Botones, acentos, selección |
| Texto pequeño naranja | `--color-naranja-oscuro` | `#C2410C` | Eyebrows, enlaces, foco (contraste AA) |
| Medioambiente / naturaleza | `--color-verde` | `#16A34A` | Sección de medioambiente, puntos, botón verde |
| Texto sobre verde claro | `--color-verde-profundo` | `#14532D` | Botón verde, títulos sobre verde |
| Complementario | `--color-azul` | `#2563EB` | Agenda, enlaces, etiquetas, fondos suaves |
| Texto / fondo | `--color-tinta`, `--color-blanco` | `#111827`, `#FFFFFF` | Cuerpo y fondo |

Además hay alias semánticos (`--color-primary`, `--color-secondary`, `--color-tertiary`,
`--color-background-soft`, `--color-text`) y fondos suaves `*-suave` (`#FFF7ED`, `#F0FDF4`,
`#EFF6FF`). Para cambiar el color de la web, edita esos tokens y recompila: no hay hex sueltos.

Componentes de color: `.eyebrow--verde` / `.eyebrow--azul`, `.btn-verde`, `.btn-azul`,
`.chip--azul`, `.aviso--azul`, `.punto`, `.hero-rule` (barra tricolor del hero) y
`.tricolor-edge` (línea tricolor del footer).

> **Nota de contraste:** el texto pequeño naranja usa `#C2410C` (AA). El botón primario
> `.btn-primary` mantiene `#F97316` con texto blanco (2.8:1) como decisión de marca.

---

## Estructura de directorios

```
unamos-juventud-web/
│
├── web/                        app Django: modelos, vistas y URLs
│   ├── models.py               ← Noticia · Actividad (calendario) · Efemeride
│   ├── admin.py                ← gestión del contenido desde /admin/
│   ├── migrations/             ← migraciones de la base de datos
│   ├── fixtures/               ← contenido inicial (loaddata contenido_inicial)
│   ├── views.py                ← InicioView · PaginaView · *ListView · NoticiaDetailView
│   ├── urls.py                 ← rutas con nombre (path('nosotros/', …, name='nosotros'))
│   └── apps.py
│
├── templates/
│   ├── base.html               ← header, footer, <head> y bloques comunes
│   ├── index.html              Portada (9 secciones, header transparente)
│   ├── nosotros.html           Sobre nosotros (9 secciones)
│   ├── actualidad.html         Actualidad (listado, render en servidor)
│   ├── noticia.html            Detalle de noticia (/noticia/<id>/)
│   ├── actividades.html        Actividades y calendario (render en servidor)
│   ├── medioambiente.html      Medioambiente
│   ├── donaciones.html         Donaciones
│   ├── contacto.html           Contacto
│   ├── privacidad.html         Política de privacidad (texto pendiente)
│   ├── aviso-legal.html        Aviso legal (texto pendiente)
│   └── cookies.html            Política de cookies (texto pendiente)
│
├── static/
│   ├── css/
│   │   ├── input.css           ← fuente de estilos (Tailwind 4 + sistema de color)
│   │   └── output.css          ← compilado (no editar a mano)
│   ├── js/
│   │   ├── main.js             ← menú, filtros, animaciones y formularios
│   │   └── vendor/lenis.min.js
│   └── img/
│       ├── logos/              logo.svg, favicon.svg (temporales)
│   ├── banners/            imágenes de cabecera
│   ├── noticias/           imágenes de tarjetas
│   ├── medioambiente/      imágenes de la página de medioambiente
│   ├── nicaragua/          fotografías reales de Nicaragua (portada y «Sobre nosotros»)
│   └── iconos/             reservado
│
├── docs/                       documentación auxiliar
├── config/                     proyecto Django (settings + urls de enrutado)
├── package.json
├── .gitignore
└── README.md
```

---

## Instalación

```bash
cd unamos-juventud-web
npm install          # Tailwind CLI + Lenis (+ puppeteer-core para las comprobaciones)
```

> Django (necesario para servir el sitio):
> `python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt`

---

## Cómo iniciar el servidor local

```bash
source venv/bin/activate
python manage.py runserver      # o: npm run serve
# http://127.0.0.1:8000        → web
# http://127.0.0.1:8000/admin/ → panel de administración
```

---

## Cómo compilar Tailwind

```bash
npm run build        # compila y minifica static/css/output.css
npm run dev          # modo watch, recompila al guardar
```

`input.css` es el único fichero de estilos que se debe editar. `output.css` es un fichero
generado: nunca se edita a mano.

---

## Cómo modificar las imágenes

1. Coloca el fichero en la carpeta correspondiente:
   - `static/img/banners/` → imágenes grandes (hero, secciones).
   - `static/img/noticias/` → imágenes de tarjetas de noticias.
   - `static/img/medioambiente/` → fotografías de la página de medioambiente.
   - `static/img/nicaragua/` → fotografías reales de Nicaragua usadas en la portada.
   - `static/img/logos/` → logotipo y favicon.
2. Mantén el mismo nombre de fichero, o actualiza el campo **Imagen** de la noticia en
   `/admin/` (por ejemplo: `noticia-1.jpg`).
3. Recompila no hace falta: Tailwind no interviene en las imágenes.

Las imágenes de `banners/`, `noticias/` y `medioambiente/` son **fotografías libres (CC0)**
usadas como material ilustrativo. Las de `nicaragua/` son **fotografías reales de Nicaragua**
procedentes de Wikimedia Commons con licencias verificables (CC0 · CC BY · CC BY-SA ·
dominio público): revisa `docs/imagenes.md` para los créditos completos y las condiciones de
cada licencia antes de reutilizarlas.

**Logotipo:** de momento se usa un logotipo tipográfico temporal (monograma `JR` + nombre).
Sustitúyelo por el oficial cuando exista: en el HTML aparece el bloque
`<span class="grid h-11 w-11 …">JR</span>` dentro del `<header>` y del `<footer>` de cada página.

---

## Cómo editar los textos

| Qué | Dónde |
|---|---|
| Titulares, párrafos, secciones | `templates/<pagina>.html` (dentro de `{% block content %}`) |
| **Noticias, actividades y efemérides** | panel **`/admin/`** (modelos de `web/models.py`) |
| Cabecera, pie y menú | `templates/base.html` |
| Colores y tipografías | `static/css/input.css` → bloque `@theme` |
| Rutas y nombres de URL | `web/urls.py` (espacio de nombres `web`) |

El contenido se administra desde Django (alta, baja y edición), sin tocar plantillas ni
JavaScript. Las migraciones guardan el esquema: `python manage.py makemigrations web` tras
cambiar un modelo. El fichero `web/fixtures/contenido_inicial.json` siembra el contenido de
demostración: `python manage.py loaddata contenido_inicial`.

---

## Cómo actualizar los enlaces

- **Enlaces internos:** las plantillas usan `{% url 'nosotros' %}` y `{% static '…' %}`, así
  que las rutas se definen una sola vez en `web/urls.py`:
  `/` · `/nosotros/` · `/actualidad/` · `/actividades/` · `/medioambiente/` · `/donaciones/` ·
  `/contacto/` · `/noticia/<id>/` y las legales (`/privacidad/`, `/aviso-legal/`, `/cookies/`).
  Las direcciones antiguas (`/templates/nosotros.html`, `index.html`, …) **redirigen** a las
  nuevas para no romper enlaces externos.
- **Enlaces externos (canales oficiales):** aparecen en el pie (`templates/base.html`), en
  `templates/contacto.html` y en `templates/nosotros.html`:
  - https://unamosnic.org/
  - https://www.instagram.com/unamosnica/
  - https://www.facebook.com/share/1ADHnHSRpG/
  - Canales de Juventud Renovadora (solo en `templates/nosotros.html`):
    https://www.facebook.com/unamosjuventud · https://www.instagram.com/juventud_renovadora ·
    https://x.com/Juventud_UNAMOS
  Todos abren con `target="_blank" rel="noopener noreferrer"`.

---

## Actualizar header y footer

Header, pie, menú y `<head>` están **una sola vez** en `templates/base.html`; cada página los
hereda con `{% extends "base.html" %}`. Un cambio ahí se aplica a las 11 páginas:

```bash
grep -n "site-header" templates/base.html
grep -n "<footer" templates/base.html
```

La navegación de escritorio tiene 7 enlaces y usa el punto de ruptura **`xl` (1280 px)**:
entre 1024 y 1279 px se muestra la hamburguesa. `main.js` sincroniza ese umbral al
redimensionar.

Guía completa en `docs/header-footer.md`.

---

## Sección y página de medioambiente (Fase 2)

- **Home (`index.html`)**: sección editorial `#medioambiente` con fondo verde suave, foto a la
  izquierda, etiqueta «SOSTENIBILIDAD», tres puntos con iconos Lucide (Leaf · Earth · Trees) y
  botón «Conocer más» → `templates/medioambiente.html`.
- **`templates/medioambiente.html`**: página propia con hero verde, aviso de contenido
  editorial, biodiversidad, educación ambiental y sostenibilidad.
- Todos los textos de esta área son **contenido editorial de propuesta**, marcados como tales en
  la página y pendientes de validación (ver `docs/pendientes.md`).

---

## Portada renovada (Fase 3)

`index.html` se rediseñó como portada editorial con identidad nicaragüense. El orden de las
secciones alterna los colores institucionales para que ningún fondo saturado quede junto a otro:

| # | Sección (`id`) | Fondo | Contenido |
|---|---|---|---|
| 1 | Hero | foto + degradado | «Juventud Renovadora», descripción, botones «Conócenos» y «Explorar actividades» y detalle tricolor |
| 2 | `#conocenos` | blanco | «¿Quiénes somos?», foto vertical de León y botón → `/nosotros/` |
| 3 | `#juventud` | azul suave | «Nuestra juventud»: tres bloques simples alternados — Educación (imagen izquierda), Cultura (imagen derecha), Participación (imagen izquierda), cada uno con título y descripción |
| 4 | `#actualidad` | blanco | Hasta 3 noticias (`NOTICIAS`, render en servidor) → `/actualidad/` |
| 5 | `#actividades` | naranja suave | «Actividades y efemérides»: agenda + efemérides (`ACTIVIDADES`, `EFEMERIDES`) en dos columnas → `/actividades/` |
| 6 | `#medioambiente` | verde suave | «Nuestro compromiso con el medioambiente» + foto del volcán Mombacho → `/medioambiente/` |
| 7 | `#nicaragua` | azul suave | Galería asimétrica «Conoce Nicaragua» (Ometepe, León, Masaya, Costa Caribe) con pie de foto |
| 8 | `#donaciones` | naranja | Breve llamada a colaborar → `/donaciones/` (sin métodos de pago) |
| 9 | `#contacto` | azul suave | «Mantengamos el contacto» con tres canales oficiales → `/contacto/` |

- Fotografías reales de Nicaragua en `static/img/nicaragua/` (Wikimedia Commons, licencias
  verificables): créditos completos en `docs/imagenes.md`.
- Las efemérides de la portada son fechas públicas verificadas (Rubén Darío, San Sebastián de
  Diriamba, Medio Ambiente, Juventud, Independencia de Centroamérica) y se editan en `/admin/` →
  Efemérides; las actividades de la agenda son contenido de muestra y se sustituirán por el
  calendario oficial cuando la organización lo valide.
- La navegación, el menú, las animaciones de aparición y el resto de páginas no se tocaron.

---

## Página «Sobre nosotros» (Fase 4)

`templates/nosotros.html` se rediseñó como presentación institucional. El orden de las secciones
alterna fondo claro y blanco, con la sección de contacto en azul como en el resto del sitio:

| # | Sección (`id`) | Fondo | Contenido |
|---|---|---|---|
| 1 | Hero | hueso | «SOBRE NOSOTROS» · «Conoce Juventud Renovadora», descripción oficial (16–35 años), chips y foto de jóvenes |
| 2 | `#quienes` | blanco | Dos columnas de texto explicativo + enlace discreto a la ficha oficial de Unamos |
| 3 | `#mision` | hueso | Foto a la izquierda y misión destacada (síntesis de objetivos publicados) con chips naranja/azul |
| 4 | `#vision` | blanco | Visión en tipografía amplia; comentario HTML interno con la nota de validación |
| 5 | `#principios` | hueso | 5 principios en cuadrícula con iconos Lucide: democracia, derechos humanos, libertades, inclusión, diálogo |
| 6 | `#ambitos` | blanco | 4 ámbitos con iconos azules (formación ciudadana, participación juvenil, liderazgo, diálogo y propuestas) + foto |
| 7 | `#trayectoria` | hueso | 3 referencias documentadas (fechas y fuentes en `unamosnic.org`) |
| 8 | `#preguntas` | blanco | 5 preguntas frecuentes en acordeón accesible (`aria-expanded` / `aria-controls`, teclado incluido) |
| 9 | `#contacto` | azul suave | Formulario, web oficial de Unamos y 4 canales: Facebook, Instagram, X y web de Unamos |

- **Fuentes**: texto basado en la ficha oficial de Juventud Renovadora
  (`unamosnic.org/nuestras-redes/`), el programa de Unamos (`/quienes-somos/`) y dos publicaciones
  fechadas de 2020 enlazadas desde «Nuestra trayectoria».
- **Acordeón**: `initFaq()` en `static/js/main.js` (solo una pregunta abierta a la vez);
  estilos `.faq*` y `.principio*` en `static/css/input.css`.
- **Fotos**: 3 imágenes de `static/img/nicaragua/` sin crédito visible en la página
  (créditos y licencias en `docs/imagenes.md`).
- Sin cargos, fechas, cifras ni datos de contacto que no estén publicados por la organización.

---

## Comprobaciones

```bash
npm run check        # abre las 11 páginas con Chromium y verifica enlaces, JS, menú,
                     # breakpoints (1100/1280), responsive, medioambiente, las
                     # 9 secciones de la portada y la página «Sobre nosotros»
                     # (principios, ámbitos, acordeón de preguntas y canales)
```

Comprobación manual: `manage.py check`, y abrir las 11 páginas en el navegador a distintos
tamaños (escritorio, tablet y móvil).

---

## Funcionalidades pendientes

- **Formulario de contacto**: el frontend está validado y preparado, pero el envío está pendiente
  de configurar un servicio seguro (no hay backend). No se envía ni se almacena ningún dato.
- **Donaciones**: no existen cuentas, métodos de pago ni importes. La página es informativa y
  debe revisarse legalmente antes de habilitar cualquier mecanismo de cobro.
- **Contenido institucional**: objetivos, histórico, correo institucional y fotografías oficiales
  pendientes de entrega por la organización (ver `docs/pendientes.md`).
- **Texto de medioambiente**: la sección del home y la página `/medioambiente/` usan
  contenido editorial de propuesta, pendiente de validación oficial.
- **Páginas legales**: existen `/privacidad/`, `/aviso-legal/` y `/cookies/`, enlazadas desde el
  pie de todas las páginas; su texto está pendiente de validación.
- **Cuentas de `/admin/`**: crear el usuario administrador con
  `python manage.py createsuperuser` antes de publicar contenido.
- **Logotipo oficial**: se usa un logotipo tipográfico temporal.
