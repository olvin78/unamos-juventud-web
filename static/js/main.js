/* Juventud Renovadora UNAMOS — JavaScript principal
   Sin dependencias obligatorias: Lenis es opcional si está cargado. */

'use strict';

/* =========================================================
   1. DATOS DE DEMOSTRACIÓN  ← SUSTITUIR POR CONTENIDO OFICIAL
   ========================================================= */

const DEMO_NOTICIAS = [
  {
    id: 1,
    fecha: '2026-09-12',
    categoria: 'Comunicado',
    titulo: 'Convocatoria a reunión informativa',
    resumen:
      'Convocatoria abierta a la juventud para participar en un encuentro informativo sobre los ejes de trabajo de la organización.',
    img: 'noticia-1.jpg',
    contenido: [
      'Juventud Renovadora convoca a la juventud de Unamos a una reunión informativa donde se presentarán los ejes de trabajo del periodo y los canales abiertos de participación. El encuentro está pensado como un espacio de diálogo, no solo de anuncios: quienes asistan podrán proponer, preguntar y vincularse a las actividades que se organicen desde la red juvenil.',
      'En la reunión se abordarán tres temas centrales: la agenda de formación política y ciudadana, los espacios de participación comunitaria y los programas de actividades abiertas al público. También se explicará cómo funcionan los grupos de trabajo y cómo cualquier joven interesada o interesado puede sumarse a ellos.',
      'La participación es libre y gratuita. Las personas menores de edad deberán venir acompañadas de su madre, padre o tutor legal. Al finalizar la sesión se abrirá un turno de preguntas y se compartirán los medios de contacto oficiales para mantenerse informado.',
      'Este contenido es una demostración de cómo se vería el detalle de una noticia en el sitio; el texto definitivo deberá ser validado y publicado por la organización.',
    ],
  },
  {
    id: 2,
    fecha: '2026-09-05',
    categoria: 'Formación',
    titulo: 'Taller de participación y liderazgo juvenil',
    resumen:
      'Espacio de formación política y ciudadana orientado a jóvenes interesados en el liderazgo comunitario y la participación pública.',
    img: 'noticia-2.jpg',
    contenido: [
      'El taller de participación y liderazgo juvenil es un espacio de formación dirigido a jóvenes interesados en incidir en su comunidad desde la política y la ciudadanía. La formación combina contenidos teóricos con dinámicas prácticas de debate, trabajo en equipo y diseño de proyectos comunitarios.',
      'Los módulos del taller incluyen: introducción a la participación ciudadana, herramientas de comunicación pública, organización de asambleas y elaboración de propuestas. Cada sesión termina con un ejercicio práctico que las y los participantes podrán aplicar en su propio barrio o comunidad.',
      'Las plazas son limitadas y la inscripción se gestiona a través de los canales oficiales de Juventud Renovadora. No se requiere experiencia previa en política partidaria: el único requisito es el interés por el compromiso comunitario.',
      'Este contenido es una demostración editorial; la programación definitiva del taller será confirmada por la organización.',
    ],
  },
  {
    id: 3,
    fecha: '2026-08-28',
    categoria: 'Actividades',
    titulo: 'Jornada de actividad abierta al público',
    resumen:
      'Jornada abierta a la comunidad con actividades de diálogo, convivencia y compromiso ciudadano.',
    img: 'noticia-3.jpg',
    contenido: [
      'La jornada de actividad abierta reúne actividades de convivencia, diálogo y participación abiertas a toda la comunidad. El objetivo es acercar la organización a la gente joven del municipio en un ambiente distendido, con espacios para escuchar, proponer y conocer de primera mano los proyectos en curso.',
      'La programación incluye mesas de diálogo sobre educación, empleo y participación; dinámicas de equipo; y un espacio cultural donde jóvenes de la región podrán compartir sus talentos. Todas las actividades son gratuitas y no requieren inscripción previa.',
      'La sede y el horario definitivos se anunciarán por los canales oficiales con la debida antelación. Se recomienda seguir las publicaciones para confirmar detalles antes de asistir.',
      'Este contenido es una demostración de la vista de detalle; la información logística real será publicada por la organización.',
    ],
  },
  {
    id: 4,
    fecha: '2026-08-19',
    categoria: 'Organización',
    titulo: 'Reunión de planificación de actividades',
    resumen:
      'Reunión de trabajo interno para organizar la agenda de actividades y prioridades del periodo.',
    img: 'noticia-4.jpg',
    contenido: [
      'La reunión de planificación es un espacio de trabajo interno donde los equipos de Juventud Renovadora organizan la agenda de actividades, asignan responsabilidades y definen prioridades del periodo. Es parte del funcionamiento ordinario de la red juvenil.',
      'En esta ocasión se revisaron los resultados de las actividades recientes, se calendarizaron los próximos encuentros de formación y se acordaron los mecanismos de coordinación con los grupos locales. También se definió el calendario editorial del sitio web: cada actividad y comunicado tendrá su ficha pública.',
      'Las conclusiones de la reunión se comunican a la militancia y al público a través de los canales oficiales, garantizando transparencia en el uso del tiempo y los recursos de la organización.',
      'Este contenido es una demostración; el acta y los acuerdos definitivos serán emitidos por la organización.',
    ],
  },
  {
    id: 5,
    fecha: '2026-08-10',
    categoria: 'Comunidad',
    titulo: 'Espacio de diálogo con la comunidad',
    resumen:
      'Encuentro abierto para escuchar propuestas de la comunidad y fortalecer los vínculos con la juventud.',
    img: 'noticia-5.jpg',
    contenido: [
      'El espacio de diálogo con la comunidad es un encuentro abierto donde Juventud Renovadora escucha las necesidades y propuestas de la gente joven y de las familias de Unamos. La participación de la comunidad no es decorativa: sus aportes alimentan directamente la agenda de actividades de la organización.',
      'Durante el encuentro se recogieron propuestas sobre espacios de recreación, programas de formación y mejoras en los servicios básicos dirigidos a jóvenes. Cada propuesta quedó registrada para su análisis por los equipos de trabajo.',
      'La organización reitera su compromiso de mantener canales de escucha permanentes, no solo en jornadas puntuales. Los comentarios y sugerencias pueden enviarse también a través del formulario de contacto del sitio.',
      'Este contenido es una demostración editorial pendiente de validación institucional.',
    ],
  },
  {
    id: 6,
    fecha: '2026-07-30',
    categoria: 'Educación',
    titulo: 'Ciclo de encuentros educativos',
    resumen:
      'Ciclo de encuentros educativos sobre participación, democracia y ciudadanía dirigido a jóvenes.',
    img: 'noticia-6.jpg',
    contenido: [
      'El ciclo de encuentros educativos ofrece sesiones sobre participación, democracia y ciudadanía dirigidas a jóvenes de la región. Cada sesión combina una breve exposición con un debate moderado, de modo que todas las personas asistentes puedan intervenir y compartir sus puntos de vista.',
      'Los temas del ciclo incluyen: derechos y deberes ciudadanos, participación juvenil en la vida pública, defensa del medio ambiente y cultura nicaragüense. Las sesiones son gratuitas y están abiertas al público en general, con especial interés en el público estudiantil.',
      'Quienes completen el ciclo recibirán un reconocimiento de participación. La programación y las sedes de cada sesión se publicarán con anticipación en los canales oficiales.',
      'Este contenido es una demostración de la vista dinámica de noticia; el programa real será confirmado por la organización.',
    ],
  },
];

const DEMO_ACTIVIDADES = [
  {
    fecha: '2026-11-21',
    nombre: 'Foro de participación ciudadana',
    descripcion:
      'Foro abierto para debatir propuestas de participación ciudadana; fecha y lugar por confirmar.',
    modalidad: 'Mixta',
    estado: 'proxima',
  },
  {
    fecha: '2026-11-08',
    nombre: 'Asamblea informativa juvenil',
    descripcion:
      'Asamblea informativa para presentar la agenda de trabajo y los canales de participación juvenil.',
    modalidad: 'Presencial',
    estado: 'proxima',
  },
  {
    fecha: '2026-10-25',
    nombre: 'Taller de comunicación digital',
    descripcion:
      'Taller en línea sobre comunicación digital y difusión de contenidos para jóvenes.',
    modalidad: 'Virtual',
    estado: 'proxima',
  },
  {
    fecha: '2026-10-18',
    nombre: 'Jornada de voluntariado',
    descripcion:
      'Jornada de voluntariado con actividades comunitarias; pendiente de confirmación de fecha y sede.',
    modalidad: 'Presencial',
    estado: 'pendiente',
  },
  {
    fecha: '2026-09-27',
    nombre: 'Encuentro de bienvenida',
    descripcion:
      'Encuentro de bienvenida para nuevas y nuevos integrantes de la red juvenil.',
    modalidad: 'Presencial',
    estado: 'finalizada',
  },
  {
    fecha: '2026-09-13',
    nombre: 'Reunión de planificación',
    descripcion:
      'Reunión de planificación de actividades del periodo.',
    modalidad: 'Presencial',
    estado: 'finalizada',
  },
];

const ESTADOS = {
  proxima: { texto: 'Próxima', clase: 'chip--proxima' },
  finalizada: { texto: 'Finalizada', clase: 'chip--finalizada' },
  pendiente: { texto: 'Pendiente de confirmación', clase: 'chip--pendiente' },
};

/* Efemérides de referencia (fechas públicas verificables; año solo para el formato).
   Añadir o corregir entradas aquí actualiza la portada automáticamente. */
const EFEMERIDES = [
  {
    fecha: '2026-01-18',
    titulo: 'Nacimiento de Rubén Darío',
    detalle: 'Poeta nacional de Nicaragua (1867)',
    tipo: 'Cultura',
  },
  {
    fecha: '2026-01-20',
    titulo: 'Fiestas de San Sebastián',
    detalle: 'Fiestas patronales de Diriamba',
    tipo: 'Cultura',
  },
  {
    fecha: '2026-06-05',
    titulo: 'Día Mundial del Medio Ambiente',
    detalle: 'Convocatoria de Naciones Unidas',
    tipo: 'Ambiente',
  },
  {
    fecha: '2026-08-12',
    titulo: 'Día Internacional de la Juventud',
    detalle: 'Proclamado por Naciones Unidas',
    tipo: 'Juventud',
  },
  {
    fecha: '2026-09-15',
    titulo: 'Independencia de Centroamérica',
    detalle: '1821',
    tipo: 'Historia',
  },
];

/* =========================================================
   2. ICONOS (Lucide, ISC) EMbebidos
   ========================================================= */

const ICON = {
  arrowRight:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  mapPin:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>',
  menu:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>',
  close:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
};

/* =========================================================
   3. UTILIDADES
   ========================================================= */

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const movimientoReducido = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const fechaCorta = (iso) => {
  const [a, m, d] = iso.split('-').map(Number);
  const fecha = new Date(a, m - 1, d);
  return {
    dia: String(d).padStart(2, '0'),
    mes: fecha.toLocaleDateString('es', { month: 'short' }).replace('.', ''),
    anio: a,
    compacta: fecha.toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' }),
  };
};

/* =========================================================
   4. HEADER
   ========================================================= */

function initHeader() {
  const header = $('#site-header');
  if (!header || header.classList.contains('is-solid')) return;

  const actualizar = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  actualizar();
  window.addEventListener('scroll', actualizar, { passive: true });
}

/* =========================================================
   5. MENÚ MÓVIL
   ========================================================= */

function initMenu() {
  const header = $('#site-header');
  const toggle = $('#menu-toggle');
  const panel = $('#menu-panel');
  if (!header || !toggle || !panel) return;

  const abrir = (abierto) => {
    toggle.setAttribute('aria-expanded', String(abierto));
    toggle.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    toggle.innerHTML = abierto ? ICON.close : ICON.menu;
    panel.classList.toggle('is-open', abierto);
    header.classList.toggle('menu-open', abierto);
    document.body.style.overflow = abierto ? 'hidden' : '';

    if (abierto) {
      const primero = $('a', panel);
      if (primero) primero.focus();
    } else {
      toggle.focus({ preventScroll: true });
    }
  };

  toggle.addEventListener('click', () => {
    abrir(toggle.getAttribute('aria-expanded') !== 'true');
  });

  $$('a', panel).forEach((enlace) => enlace.addEventListener('click', () => abrir(false)));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') abrir(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1280 && toggle.getAttribute('aria-expanded') === 'true') {
      abrir(false);
    }
  });
}

/* =========================================================
   6. APARICIÓN AL DESPLAZARSE (IntersectionObserver)
   ========================================================= */

function initReveal() {
  const elementos = $$('[data-reveal]');
  if (!elementos.length) return;

  if (movimientoReducido() || !('IntersectionObserver' in window)) {
    elementos.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('is-visible');
          observer.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  elementos.forEach((el) => observer.observe(el));
}

/* =========================================================
   7. DESPLAZAMIENTO SUAVE (Lenis, opcional)
   ========================================================= */

function initLenis() {
  if (movimientoReducido() || typeof window.Lenis !== 'function') return;

  const lenis = new window.Lenis({ duration: 1.1, smoothWheel: true });

  const raf = (tiempo) => {
    lenis.raf(tiempo);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  $$('a[href*="#"]').forEach((enlace) => {
    enlace.addEventListener('click', (e) => {
      const url = new URL(enlace.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const destino = document.querySelector(url.hash);
      if (!destino) return;
      e.preventDefault();
      lenis.scrollTo(destino, { offset: -90 });
    });
  });
}

/* =========================================================
   8. RENDER DE TARJETAS DE NOTICIAS
   ========================================================= */

function renderNoticias() {
  $$('[data-noticias]').forEach((contenedor) => {
    const raiz = contenedor.dataset.root || '.';
    const base = contenedor.dataset.base || '';
    const limite = Number(contenedor.dataset.count || 3);
    const conDestacada = 'destacada' in contenedor.dataset;

    contenedor.innerHTML = DEMO_NOTICIAS.slice(0, limite)
      .map((n, i) => {
        const fecha = fechaCorta(n.fecha);
        const esDestacada = conDestacada && i === 0;
        return `
      <article class="card${esDestacada ? ' card--destacada' : ''}" id="noticia-${n.id}"
               data-categoria="${n.categoria}" data-reveal>
        <div class="card__media">
          <img src="${raiz}/static/img/noticias/${n.img}"
               alt="Imagen ilustrativa: ${n.titulo}"
               width="960" height="640" loading="lazy" decoding="async">
        </div>
        <div class="card__body">
          <div class="flex flex-wrap items-center gap-3">
            ${esDestacada ? '<span class="chip chip--naranja">Destacada</span>' : ''}
            <span class="chip chip--cat">${n.categoria}</span>
          </div>
          <h3 class="font-display text-[1.15rem] font-bold leading-snug">${n.titulo}</h3>
          <p class="text-[0.95rem] leading-relaxed text-gris">${n.resumen}</p>
          <div class="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
            <a class="link-arrow" href="/noticia/${n.id}/">
              Leer más ${ICON.arrowRight}
            </a>
            <time class="text-xs font-semibold uppercase tracking-wider text-gris/70"
                  datetime="${n.fecha}">${fecha.compacta}</time>
          </div>
        </div>
      </article>`;
      })
      .join('');
  });
}

/* =========================================================
   8b. FILTROS (Actualidad: categoría · Actividades: estado)
   ========================================================= */

function initFiltros() {
  $$('[data-filtros]').forEach((grupo) => {
    const seccion = grupo.closest('section') || document;
    const contenedor = seccion.querySelector('[data-noticias], [data-actividades]');
    const avisoVacio = seccion.querySelector('[data-filtros-vacio]');
    if (!contenedor) return;

    const atributo = grupo.dataset.filtroAttr || 'categoria';
    const selector = contenedor.hasAttribute('data-noticias') ? '.card' : '.actividad';
    const botones = $$('[data-filtro]', grupo);

    botones.forEach((btn) => {
      btn.addEventListener('click', () => {
        const valor = btn.dataset.filtro;

        botones.forEach((b) => {
          const activo = b === btn;
          b.classList.toggle('is-activo', activo);
          b.setAttribute('aria-pressed', String(activo));
        });

        let visibles = 0;
        $$(selector, contenedor).forEach((item) => {
          const mostrar = valor === 'todas' || item.dataset[atributo] === valor;
          item.classList.toggle('is-oculto', !mostrar);
          if (mostrar) visibles += 1;
        });

        if (avisoVacio) avisoVacio.hidden = visibles > 0;
      });
    });
  });
}

/* =========================================================
   9. RENDER DE ACTIVIDADES
   ========================================================= */

function renderActividades() {
  $$('[data-actividades]').forEach((contenedor) => {
    const limite = Number(contenedor.dataset.count || 3);

    contenedor.innerHTML = DEMO_ACTIVIDADES.slice(0, limite)
      .map((a) => {
        const f = fechaCorta(a.fecha);
        const estado = ESTADOS[a.estado];
        return `
      <article class="actividad" data-estado="${a.estado}" data-reveal>
        <div class="actividad__fecha">
          <span class="dia">${f.dia}</span>
          <span class="mes">${f.mes} ${f.anio}</span>
        </div>
        <div class="min-w-0">
          <h3 class="font-display text-lg font-bold leading-snug">${a.nombre}</h3>
          <p class="mt-1.5 text-sm leading-relaxed text-gris">${a.descripcion}</p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <span class="chip ${estado.clase}">${estado.texto}</span>
          <span class="chip chip--azul">${ICON.mapPin}${a.modalidad}</span>
        </div>
      </article>`;
      })
      .join('');
  });
}

/* =========================================================
   10. RENDER DE EFEMÉRIDES
   ========================================================= */

function renderEfemerides() {
  $$('[data-efemerides]').forEach((contenedor) => {
    const limite = Number(contenedor.dataset.count || 5);

    contenedor.innerHTML = EFEMERIDES.slice(0, limite)
      .map((e) => {
        const f = fechaCorta(e.fecha);
        return `
      <li class="efemeride" data-reveal>
        <time class="efemeride__fecha" datetime="${e.fecha}">${f.dia} ${f.mes}</time>
        <div class="efemeride__cuerpo">
          <p class="efemeride__titulo">${e.titulo}</p>
          <p class="efemeride__detalle">${e.detalle}</p>
        </div>
        <span class="chip chip--azul">${e.tipo}</span>
      </li>`;
      })
      .join('');
  });
}

/* =========================================================
   11. FORMULARIO DE CONTACTO
   ========================================================= */

function initFormulario() {
  const form = $('[data-formulario]');
  if (!form) return;

  const estado = $('[data-form-estado]', form);
  form.noValidate = true;

  const validarCampo = (campo) => {
    const field = campo.closest('.field');
    let error = '';

    if (campo.validity.valueMissing) {
      error = 'Este campo es obligatorio.';
    } else if (campo.validity.typeMismatch) {
      error = 'Introduce un correo electrónico válido, por ejemplo nombre@correo.com.';
    } else if (campo.validity.tooShort) {
      error = `Escribe al menos ${campo.minLength} caracteres.`;
    }

    field.classList.toggle('is-invalid', Boolean(error));
    const mensaje = $('.mensaje-error', field);
    if (mensaje) mensaje.textContent = error;
    campo.setAttribute('aria-invalid', String(Boolean(error)));
    return !error;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const campos = $$('[data-campo]', form);
    const validos = campos.map(validarCampo).every(Boolean);

    if (!validos) {
      const primero = form.querySelector('.field.is-invalid [data-campo]');
      if (primero) primero.focus();
      estado.textContent = 'Revisa los campos marcados: hay datos incompletos o con formato incorrecto.';
      estado.className = 'aviso aviso--error';
      return;
    }

    estado.innerHTML =
      '<strong>Envío pendiente de configuración.</strong> El formulario es válido, pero todavía no existe un servicio de recepción seguro: no se ha enviado ni almacenado ningún dato.';
    estado.className = 'aviso aviso--pendiente';
    estado.focus?.();
  });

  $$('[data-campo]', form).forEach((campo) => {
    campo.addEventListener('blur', () => {
      if (campo.closest('.field').classList.contains('is-invalid')) validarCampo(campo);
    });
    campo.addEventListener('input', () => {
      if (campo.closest('.field').classList.contains('is-invalid')) validarCampo(campo);
    });
  });
}

/* =========================================================
   11b. DONACIONES — maqueta de pago (sin pasarela real)
   Los datos de tarjeta nunca salen del navegador.
   ========================================================= */

function initDonacion() {
  const form = $('[data-form-donacion]');
  const estado = $('[data-donacion-estado]');
  if (!form || !estado) return;

  form.noValidate = true;

  const soloDigitos = (v) => v.replace(/\D+/g, '');

  function luhn(numero) {
    let suma = 0;
    let doble = false;
    for (let i = numero.length - 1; i >= 0; i--) {
      let d = Number(numero[i]);
      if (doble) {
        d *= 2;
        if (d > 9) d -= 9;
      }
      suma += d;
      doble = !doble;
    }
    return suma % 10 === 0;
  }

  const marcar = (campo, mensaje) => {
    const field = campo.closest('.field');
    field.classList.toggle('is-invalid', Boolean(mensaje));
    const msg = $('.mensaje-error', field);
    if (msg) msg.textContent = mensaje || '';
    campo.setAttribute('aria-invalid', String(Boolean(mensaje)));
    return !mensaje;
  };

  const validar = (campo) => {
    const valor = campo.value.trim();
    const digitos = soloDigitos(valor);

    if (campo.id === 'don-monto') {
      if (!digitos) return marcar(campo, 'Indica el monto a donar.');
      if (Number(digitos) < 10) return marcar(campo, 'El monto mínimo es C$ 10.');
      return marcar(campo, '');
    }
    if (campo.id === 'don-nombre') {
      if (valor.length < 3) return marcar(campo, 'Escribe el nombre tal como figura en la tarjeta.');
      return marcar(campo, '');
    }
    if (campo.id === 'don-tarjeta') {
      if (digitos.length < 15 || digitos.length > 16)
        return marcar(campo, 'El número de tarjeta tiene 15 o 16 dígitos.');
      if (!luhn(digitos)) return marcar(campo, 'Revisa el número: no es válido.');
      return marcar(campo, '');
    }
    if (campo.id === 'don-caducidad') {
      const m = /^(\d{2})\/(\d{2})$/.exec(valor);
      if (!m) return marcar(campo, 'Usa el formato MM/AA, por ejemplo 09/28.');
      const mes = Number(m[1]);
      const anio = 2000 + Number(m[2]);
      if (mes < 1 || mes > 12) return marcar(campo, 'El mes va de 01 a 12.');
      if (new Date(anio, mes, 0, 23, 59, 59) < new Date())
        return marcar(campo, 'La tarjeta está caducada.');
      return marcar(campo, '');
    }
    if (campo.id === 'don-cvc') {
      if (digitos.length < 3 || digitos.length > 4) return marcar(campo, 'El CVC tiene 3 o 4 dígitos.');
      return marcar(campo, '');
    }
    return marcar(campo, '');
  };

  const mostrarEstado = (html, clase) => {
    estado.hidden = false;
    estado.className = `mt-4 ${clase}`;
    estado.innerHTML = html;
    estado.focus?.();
  };

  const PENDIENTE =
    '<strong>Pago de demostración.</strong> No se ha procesado ningún cobro ni se ha enviado ningún dato: la pasarela todavía no está conectada.';

  $$('[data-pago]', document).forEach((btn) => {
    btn.addEventListener('click', () => {
      const cual = btn.dataset.pago === 'stripe' ? 'Stripe' : 'PayPal';
      mostrarEstado(
        `<strong>${cual}: aún no está conectado.</strong> Este botón no abre ninguna pasarela real; cuando la organización valide la cuenta, redirigirá al pago oficial.`,
        'aviso aviso--pendiente'
      );
    });
  });

  $$('[data-campo-don]', form).forEach((campo) => {
    campo.addEventListener('input', () => {
      const tipo = campo.dataset.formato;
      if (tipo === 'tarjeta') {
        const d = soloDigitos(campo.value).slice(0, 16);
        campo.value = d.replace(/(\d{4})(?=\d)/g, '$1 ');
      } else if (tipo === 'caducidad') {
        const d = soloDigitos(campo.value).slice(0, 4);
        campo.value = d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
      } else if (tipo === 'cvc') {
        campo.value = soloDigitos(campo.value).slice(0, 4);
      } else if (campo.id === 'don-monto') {
        campo.value = soloDigitos(campo.value).slice(0, 7);
      }
      if (campo.closest('.field').classList.contains('is-invalid')) validar(campo);
    });
    campo.addEventListener('blur', () => {
      if (campo.value) validar(campo);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const campos = $$('[data-campo-don]', form);
    const validos = campos.map(validar).every(Boolean);

    if (!validos) {
      const primero = form.querySelector('.field.is-invalid [data-campo-don]');
      if (primero) primero.focus();
      mostrarEstado(
        '<strong>Revisa los campos marcados.</strong> Hay datos incompletos o con formato incorrecto.',
        'aviso aviso--error'
      );
      return;
    }

    mostrarEstado(PENDIENTE, 'aviso aviso--pendiente');
  });
}

/* =========================================================
   12. PREGUNTAS FRECUENTES (acordeón accesible)
   ========================================================= */

function initFaq() {
  $$('[data-faq]').forEach((lista) => {
    const botones = $$('.faq__pregunta', lista);

    botones.forEach((boton) => {
      const panel = document.getElementById(boton.getAttribute('aria-controls'));
      if (!panel) return;

      boton.addEventListener('click', () => {
        const abierto = boton.getAttribute('aria-expanded') === 'true';

        botones.forEach((otro) => {
          if (otro === boton) return;
          otro.setAttribute('aria-expanded', 'false');
          const otroPanel = document.getElementById(otro.getAttribute('aria-controls'));
          if (otroPanel) otroPanel.hidden = true;
        });

        boton.setAttribute('aria-expanded', String(!abierto));
        panel.hidden = abierto;
      });
    });
  });
}

/* =========================================================
   13. AÑO DINÁMICO DEL FOOTER
   ========================================================= */

function initAnio() {
  $$('[data-anio]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

/* =========================================================
   14. ARRANQUE
   ========================================================= */

function iniciar() {
  initHeader();
  initMenu();
  renderNoticias();
  renderActividades();
  initFiltros();
  renderEfemerides();
  initFaq();
  initReveal();
  initLenis();
  initFormulario();
  initDonacion();
  initAnio();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciar);
} else {
  iniciar();
}
