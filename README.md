# Juventud Renovadora UNAMOS — Web institucional

Primera versión de la web institucional de **Juventud Renovadora**, espacio de la juventud de
**Unamos** (Nicaragua).

El sitio es **estático** (HTML + Tailwind CSS + JavaScript vanilla) y se sirve en local de dos
formas: con el servidor de desarrollo de Django (que además mantiene el panel `/admin/`) o con
cualquier servidor de ficheros estáticos.

La **Fase 2** añadió la identidad visual tricolor (naranja institucional, verde de
medioambiente, azul complementario) y la sección/página de medioambiente.

La **Fase 3** rediseñó la portada (`index.html`) con identidad nicaragüense: fotografías
auténticas de Wikimedia Commons, secciones de hero, quiénes somos, nuestra juventud,
actualidad, actividades y efemérides, medioambiente, galería «Conoce Nicaragua»,
donaciones y contacto.

La **Fase 4** rediseñó la página `templates/nosotros.html` como presentación institucional:
hero, quiénes somos, misión, visión, principios, ámbitos de trabajo, trayectoria documentada,
preguntas frecuentes y canales oficiales de Juventud Renovadora.

---

## Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 semántico | Marcado de las 10 páginas |
| Tailwind CSS 4 (CLI) | Compilación oficial de estilos → `static/css/output.css` |
| JavaScript vanilla ES6+ | Menú, animaciones, datos demo y formulario |
| Lenis | Desplazamiento suave (opcional, se desactiva con `prefers-reduced-motion`) |
| Lucide (ISC) | Iconografía, embebida como SVG inline |
| Google Fonts | Manrope (títulos) + Inter (cuerpo) |
| Django | Únicamente como servidor y panel de administración (`/admin/`) |

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
├── templates/
│   ├── index.html              Página de inicio (portada Fase 3: 9 secciones)
│   ├── nosotros.html           Sobre nosotros (Fase 4: 9 secciones)
│   ├── actualidad.html         Actualidad
│   ├── actividades.html        Actividades y calendario
│   ├── medioambiente.html      Medioambiente (nueva en Fase 2)
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
│   │   ├── main.js             ← datos demo + interacciones
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
├── config/ · manage.py         proyecto Django (solo admin y servidor)
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

> Django (opcional, solo si quieres usar el servidor de Django o el panel `/admin/`):
> `python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt`

---

## Cómo iniciar el servidor local

**Opción A — con Django (recomendada, incluye el panel de administración):**

```bash
source venv/bin/activate
python manage.py runserver
# http://127.0.0.1:8000   → web
# http://127.0.0.1:8000/admin/
```

**Opción B — servidor estático simple:**

```bash
npm run serve        # http://127.0.0.1:8080
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
2. Mantén el mismo nombre de fichero, o actualiza la referencia en el HTML / en `static/js/main.js`
   (las tarjetas de noticias usan `img: 'noticia-1.jpg'`…).
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
| Titulares, párrafos, secciones | `templates/index.html` o `templates/<pagina>.html` |
| **Noticias de ejemplo** | `static/js/main.js` → `DEMO_NOTICIAS` |
| **Actividades de ejemplo** | `static/js/main.js` → `DEMO_ACTIVIDADES` |
| **Efemérides de la portada** | `static/js/main.js` → `EFEMERIDES` |
| Estados (próxima/finalizada/pendiente) | `static/js/main.js` → `ESTADOS` |
| Colores y tipografías | `static/css/input.css` → bloque `@theme` |

Los datos demo están centralizados a un solo fichero para sustituirlos cuando llegue el
contenido oficial: no hay que tocar ningún HTML para cambiar noticias o actividades.

---

## Cómo actualizar los enlaces

- **Enlaces internos:** las 10 páginas viven en `templates/` y usan rutas relativas entre
  hermanas (`contacto.html`, `index.html`). Django redirige `/` y `/index.html` a
  `/templates/index.html`; los estáticos se referencian como `../static/…`.
- **Enlaces externos (canales oficiales):** aparecen en el footer de las 10 páginas, en
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

El header y el footer están **duplicados a propósito** en las 10 páginas (no hay sistema de
plantillas para mantenerlo sencillo). Si cambias uno, aplica el mismo cambio en las 10 páginas:

```bash
grep -n "site-header" templates/*.html
grep -n "<footer" templates/*.html
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
| 2 | `#conocenos` | blanco | «¿Quiénes somos?», foto vertical de León y botón → `templates/nosotros.html` |
| 3 | `#juventud` | azul suave | «Nuestra juventud»: tres bloques simples alternados — Educación (imagen izquierda), Cultura (imagen derecha), Participación (imagen izquierda), cada uno con título y descripción |
| 4 | `#actualidad` | blanco | Hasta 3 noticias (datos `DEMO_NOTICIAS`) → `templates/actualidad.html` |
| 5 | `#actividades` | naranja suave | «Actividades y efemérides»: agenda de demostración + efemérides reales (`EFEMERIDES`) en dos columnas → `templates/actividades.html` |
| 6 | `#medioambiente` | verde suave | «Nuestro compromiso con el medioambiente» + foto del volcán Mombacho → `templates/medioambiente.html` |
| 7 | `#nicaragua` | azul suave | Galería asimétrica «Conoce Nicaragua» (Ometepe, León, Masaya, Costa Caribe) con pie de foto |
| 8 | `#donaciones` | naranja | Breve llamada a colaborar → `templates/donaciones.html` (sin métodos de pago) |
| 9 | `#contacto` | azul suave | «Mantengamos el contacto» con tres canales oficiales → `templates/contacto.html` |

- Fotografías reales de Nicaragua en `static/img/nicaragua/` (Wikimedia Commons, licencias
  verificables): créditos completos en `docs/imagenes.md`.
- Las efemérides de la portada son fechas públicas verificadas (Rubén Darío, San Sebastián de
  Diriamba, Medio Ambiente, Juventud, Independencia de Centroamérica) y se editan en `EFEMERIDES`;
  las actividades que aparecen a su lado son contenido de muestra y se sustituirán por el
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
npm run check        # abre las 10 páginas con Chromium y verifica enlaces, JS, menú,
                     # breakpoints (1100/1280), responsive, medioambiente, las
                     # 9 secciones de la portada y la página «Sobre nosotros»
                     # (principios, ámbitos, acordeón de preguntas y canales)
```

Comprobación manual: `manage.py check`, y abrir las 10 páginas en el navegador a distintos
tamaños (escritorio, tablet y móvil).

---

## Funcionalidades pendientes

- **Formulario de contacto**: el frontend está validado y preparado, pero el envío está pendiente
  de configurar un servicio seguro (no hay backend). No se envía ni se almacena ningún dato.
- **Donaciones**: no existen cuentas, métodos de pago ni importes. La página es informativa y
  debe revisarse legalmente antes de habilitar cualquier mecanismo de cobro.
- **Contenido institucional**: objetivos, histórico, correo institucional y fotografías oficiales
  pendientes de entrega por la organización (ver `docs/pendientes.md`).
- **Texto de medioambiente**: la sección del home y la página `medioambiente.html` usan
  contenido editorial de propuesta, pendiente de validación oficial.
- **Páginas legales**: existen `templates/privacidad.html`, `templates/aviso-legal.html` y
  `templates/cookies.html`, enlazadas desde el pie de todas las páginas; su texto está pendiente
  de validación.
- **Logotipo oficial**: se usa un logotipo tipográfico temporal.
