# Información institucional pendiente de completar

Espacios reservados en la web que requieren contenido oficial de Juventud Renovadora / Unamos.

No se ha publicado ninguna fecha de fundación, cargo, representante, cifra, cuenta bancaria ni
dato de contacto que no esté confirmado.

## Páginas con marcadores «Pendiente de completar»

| Página | Sección | Qué falta |
|---|---|---|
| `templates/nosotros.html` | Misión y visión | Síntesis editorial basada en la descripción oficial; validación de la organización |
| `templates/nosotros.html` | Trayectoria | Ampliar la cronología con hitos confirmados por la organización |
| `templates/contacto.html` | Correo institucional | Dirección de correo oficial |
| `templates/donaciones.html` | Modalidades de colaboración | Condiciones revisadas legalmente |
| `templates/index.html` · `templates/medioambiente.html` | Sección y página de medioambiente | Texto editorial de propuesta, 3 puntos y objetivos ambientales (redactados como borrador, pendientes de validación oficial) |
| `templates/index.html` | «Nuestra juventud» (01 Educación · 02 Cultura · 03 Participación) | Frases editoriales de apoyo y nota de imágenes ilustrativas, pendientes de validación |
| `templates/index.html` | «¿Quiénes somos?» y «Mantengamos el contacto» | Texto institucional definitivo cuando la organización lo entregue |
| `templates/index.html` | Hero (foto `juventud-renovadora-oficial.banner.png`) | Verificar el origen de la imagen propia (ya no lleva crédito visible: los avisos «Foto: … · CC BY…» se retiraron de todas las páginas) |

## Contenido pendiente en general

- **Fotografías oficiales** de actividades juveniles de Unamos. La portada ya usa fotografías
  **reales de Nicaragua** (Wikimedia Commons, licencias verificables, ver `docs/imagenes.md`),
  pero ilustran contextos generales: no son fotos de actividades organizadas por Juventud
  Renovadora ni de sus integrantes, y así se indica en la propia página.
- **Fotografías nuevas de la portada**: si la organización aporta material propio, sustituye los
  ficheros de `static/img/nicaragua/` y actualiza los créditos de `docs/imagenes.md`.
- **Contenido de medioambiente**: el texto de «Nuestro compromiso con el medioambiente»
  (sección del home y `templates/medioambiente.html`) es **contenido editorial de propuesta**,
  marcado como tal en la propia página, pendiente de validación por la organización.
- **Logotipo oficial** (ahora se usa un logotipo tipográfico temporal `JR`).
- **Noticias y comunicados reales** → sustituir los registros en `/admin/` → Noticias.
- **Actividades reales y calendario** → sustituir los registros en `/admin/` → Actividades.
- **Efemérides** → `/admin/` → Efemérides (fechas públicas verificables: Rubén
  Darío, San Sebastián de Diriamba, Medio Ambiente, Juventud e Independencia de Centroamérica).
  Añadir o corregir entradas actualiza la portada sin tocar el HTML.
- **Canales propios de Juventud Renovadora**: no se han creado cuentas nuevas; en
  `templates/nosotros.html` solo se enlazan los canales oficiales que Unamos publica para la red
  (Facebook `unamosjuventud`, Instagram `juventud_renovadora`, X `Juventud_UNAMOS`) junto con la
  web de Unamos.
- **Páginas legales**: creadas y enlazadas desde el pie de todas las páginas
  (`templates/privacidad.html`, `templates/aviso-legal.html`, `templates/cookies.html`);
  el texto de cada una está pendiente de validación.
- **Formulario de contacto**: frontend preparado, envío pendiente de backend seguro.
- **Donaciones**: no habilitar ningún método de pago sin revisión legal previa.
