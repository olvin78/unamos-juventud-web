/* Juventud Renovadora UNAMOS — JavaScript principal
   Sin dependencias obligatorias: Lenis es opcional si está cargado. */

'use strict';

/* =========================================================
   1. UTILIDADES
   ========================================================= */

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const movimientoReducido = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* =========================================================
   2. HEADER
   ========================================================= */

function initHeader() {
  const header = $('#site-header');
  if (!header || header.classList.contains('is-solid')) return;

  const actualizar = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  actualizar();
  window.addEventListener('scroll', actualizar, { passive: true });
}

/* =========================================================
   3. MENÚ MÓVIL
   ========================================================= */

function initMenu() {
  const header = $('#site-header');
  const toggle = $('#menu-toggle');
  const panel = $('#menu-panel');
  if (!header || !toggle || !panel) return;

  const icono = $('use', toggle);

  const abrir = (abierto) => {
    toggle.setAttribute('aria-expanded', String(abierto));
    toggle.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    if (icono) icono.setAttribute('href', abierto ? '#i-cerrar' : '#i-menu');
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
   4. APARICIÓN AL DESPLAZARSE (IntersectionObserver)
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
   5. DESPLAZAMIENTO SUAVE (Lenis, opcional)
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
   6. FILTROS (Actualidad: categoría · Actividades: estado)
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
   7. FORMULARIO DE CONTACTO
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
   8. DONACIONES — maqueta de pago (sin pasarela real)
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
   9. PREGUNTAS FRECUENTES (acordeón accesible)
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
   10. AÑO DINÁMICO DEL FOOTER
   ========================================================= */

function initAnio() {
  $$('[data-anio]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

/* =========================================================
   11. ARRANQUE
   ========================================================= */

function iniciar() {
  initHeader();
  initMenu();
  initFiltros();
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
