import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE_URL || 'http://127.0.0.1:8000';
const CHROME = process.env.CHROME_BIN || '/snap/bin/chromium';
const SHOTS = process.env.SHOTS_DIR || '/tmp/opencode/shots';

const PAGINAS = [
  ['/', 'inicio'],
  ['/templates/nosotros.html', 'nosotros'],
  ['/templates/actualidad.html', 'actualidad'],
  ['/noticia/1/', 'noticia'],
  ['/templates/actividades.html', 'actividades'],
  ['/templates/medioambiente.html', 'medioambiente'],
  ['/templates/donaciones.html', 'donaciones'],
  ['/templates/contacto.html', 'contacto'],
  ['/templates/privacidad.html', 'privacidad'],
  ['/templates/aviso-legal.html', 'aviso-legal'],
  ['/templates/cookies.html', 'cookies'],
];

const fallos = [];
const ok = (m) => console.log(`  ok   ${m}`);
const fallo = (m) => {
  fallos.push(m);
  console.log(`  FALLO ${m}`);
};

mkdirSync(SHOTS, { recursive: true });

/* Recorre la página para disparar las animaciones de aparición (IntersectionObserver)
   antes de las capturas de página completa. */
async function revelarTodo(pagina) {
  const alto = await pagina.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < alto; y += 500) {
    await pagina.evaluate((v) => window.scrollTo(0, v), y);
    await new Promise((r) => setTimeout(r, 60));
  }
  await pagina.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 300));
}

const navegador = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'shell',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});

try {
  const pagina = await navegador.newPage();
  await pagina.setViewport({ width: 1440, height: 900 });
  const errores = [];
  pagina.on('console', (msg) => {
    if (msg.type() === 'error') errores.push(`console: ${msg.text()}`);
  });
  pagina.on('pageerror', (err) => errores.push(`pageerror: ${err.message}`));

  console.log(`\n== Páginas (${BASE}) ==`);
  for (const [ruta, nombre] of PAGINAS) {
    errores.length = 0;
    const respuesta = await pagina.goto(BASE + ruta, { waitUntil: 'networkidle2', timeout: 30000 });
    if (respuesta.status() !== 200) fallo(`${ruta} → HTTP ${respuesta.status()}`);
    else ok(`${ruta} → 200`);

    const datos = await pagina.evaluate(() => ({
      titulo: document.title,
      h1: document.querySelectorAll('h1').length,
      header: !!document.getElementById('site-header'),
      footer: !!document.querySelector('footer'),
      anio: document.querySelector('[data-anio]')?.textContent,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      css: getComputedStyle(document.querySelector('.btn-primary')).backgroundColor,
      fuente: getComputedStyle(document.body).fontFamily,
      imgRotas: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
      noticias: document.querySelectorAll('[data-noticias] .card').length,
      actividades: document.querySelectorAll('[data-actividades] .actividad').length,
      enlaces: [...document.querySelectorAll('a[href]')]
        .map((a) => a.getAttribute('href'))
        .filter((h) => h && !h.startsWith('http') && !h.startsWith('mailto') && !h.startsWith('#')),
    }));

    if (datos.h1 !== 1) fallo(`${ruta} → ${datos.h1} elementos <h1> (debe ser 1)`);
    else ok(`${ruta} → 1 <h1>`);
    if (!datos.header || !datos.footer) fallo(`${ruta} → falta header/footer`);
    if (datos.css !== 'rgb(249, 115, 22)') fallo(`${ruta} → CSS no aplicado (btn-primary = ${datos.css})`);
    if (datos.overflow > 2) fallo(`${ruta} → scroll horizontal de ${datos.overflow}px`);
    if (datos.imgRotas.length) fallo(`${ruta} → imágenes rotas: ${datos.imgRotas.join(', ')}`);
    if (datos.anio !== String(new Date().getFullYear())) fallo(`${ruta} → año dinámico no renderizado`);
    if (errores.length) fallo(`${ruta} → errores JS: ${errores.join(' | ')}`);
    else ok(`${ruta} → sin errores de JS`);

    const navEscritorio = await pagina.evaluate(
      () => !!document.querySelector('header nav[aria-label="Navegación principal"]')?.offsetParent
    );
    if (!navEscritorio) fallo(`${ruta} → navegación de escritorio oculta a 1440px`);

    const tieneMedioambiente = await pagina.evaluate(() => {
      const nav = document.querySelector('header nav[aria-label="Navegación principal"]');
      return !!nav?.querySelector('a[href$="medioambiente.html"]');
    });
    if (!tieneMedioambiente) fallo(`${ruta} → falta «Medioambiente» en la navegación`);
    else ok(`${ruta} → enlace «Medioambiente» en la navegación`);

    if (ruta.includes('medioambiente')) {
      const editorial = await pagina.evaluate(() => ({
        aviso: document.querySelector('.aviso--azul')?.textContent || '',
        eyebrowVerde: !!document.querySelector('.eyebrow--verde'),
        figuras: document.querySelectorAll('figure img').length,
      }));
      if (!editorial.aviso.includes('Contenido editorial'))
        fallo(`${ruta} → falta el aviso de contenido editorial`);
      else ok(`${ruta} → aviso de contenido editorial presente`);
      if (!editorial.eyebrowVerde) fallo(`${ruta} → falta la identidad verde (eyebrow--verde)`);
      if (editorial.figuras < 3) fallo(`${ruta} → figuras con imagen: ${editorial.figuras}`);
      else ok(`${ruta} → 3 fotografías con pie ilustrativo`);
    }

    if (ruta === '/') {
      if (datos.noticias !== 3) fallo(`/ → noticias renderizadas: ${datos.noticias}`);
      else ok('/ → 3 tarjetas de noticias');
      if (datos.actividades !== 3) fallo(`/ → actividades renderizadas: ${datos.actividades}`);
      else ok('/ → 3 actividades');

        const ambiente = await pagina.evaluate(() => {
        const seccion = document.getElementById('medioambiente');
        return {
          existe: !!seccion,
          titulo: seccion?.querySelector('h2')?.textContent?.trim() || '',
          puntos: seccion?.querySelectorAll('.punto').length || 0,
          iconosVerdes: seccion?.querySelectorAll('.punto__icono').length || 0,
          boton: seccion?.querySelector('a.btn-verde')?.getAttribute('href') || '',
          bg: seccion ? getComputedStyle(seccion).backgroundColor : '',
          eyebrow: !!seccion?.querySelector('.eyebrow--verde'),
          heroRule: !!document.querySelector('.hero-rule'),
          agendaAzul: !!document.querySelector('#actividades .eyebrow--azul'),
        };
      });
      if (!ambiente.existe) fallo('/ → falta la sección #medioambiente');
      else if (ambiente.titulo !== 'Nuestro compromiso con el medioambiente')
        fallo(`/ → título de la sección: «${ambiente.titulo}»`);
      else ok('/ → sección «Nuestro compromiso con el medioambiente»');
      if (ambiente.puntos !== 3 || ambiente.iconosVerdes !== 3)
        fallo(`/ → puntos informativos: ${ambiente.puntos}, iconos: ${ambiente.iconosVerdes}`);
      else ok('/ → 3 puntos con iconos verdes');
      if (ambiente.boton !== 'medioambiente.html')
        fallo(`/ → botón «Conocer más» apunta a: ${ambiente.boton}`);
      else ok('/ → «Conocer más» enlaza a medioambiente.html');
      if (ambiente.bg !== 'rgb(240, 253, 244)') fallo(`/ → fondo de la sección: ${ambiente.bg}`);
      if (!ambiente.eyebrow) fallo('/ → falta la etiqueta verde SOSTENIBILIDAD');
      if (!ambiente.heroRule) fallo('/ → falta el detalle tricolor del hero');
      else ok('/ → hero con detalle tricolor (naranja · verde · azul)');
      if (ambiente.agendaAzul) fallo('/ → la Agenda sigue usando acento azul (debe ser naranja)');
      else ok('/ → Agenda con acento naranja (sin acento azul)');

      const portada = await pagina.evaluate(() => {
        const btn = (texto) =>
          [...document.querySelectorAll('a.btn')].find((a) => a.textContent.trim().startsWith(texto));
        return {
          heroH1: document.getElementById('titulo-hero')?.textContent?.trim() || '',
          heroDesc: document.querySelector('#titulo-hero + p, [class*="max-w-2xl"]')?.textContent?.trim() || '',
          conoce: btn('Conócenos')?.getAttribute('href') || '',
          explora: btn('Explorar actividades')?.getAttribute('href') || '',
          heroFoto: document.querySelector('section img[src*="nicaragua/"]')?.getAttribute('src') || '',
          heroCredito: !!document.querySelector('section .foto-credito a[href*="commons.wikimedia"]'),
          secciones: ['conocenos', 'juventud', 'actualidad', 'actividades', 'medioambiente', 'nicaragua', 'donaciones', 'contacto']
            .filter((id) => document.getElementById(id)),
          bloquesJuventud: document.querySelectorAll('#juventud article').length,
          fotosJuventud: document.querySelectorAll('#juventud figure.foto').length,
          titulosJuventud: [...document.querySelectorAll('#juventud h3')].map((h) => h.textContent.trim()),
          galeria: document.querySelectorAll('#nicaragua figure.foto').length,
          pieLugares: [...document.querySelectorAll('#nicaragua figcaption strong')].map((s) => s.textContent.trim()),
          btnDonaciones: document.querySelector('#donaciones a.btn-dark')?.getAttribute('href') || '',
          canales: document.querySelectorAll('#contacto .canal').length,
          efemerides: document.querySelectorAll('[data-efemerides] .efemeride').length,
          bloquesAgenda: document.querySelectorAll('#actividades .bloque-titulo').length,
          btnCalendario: document.querySelector('#actividades a.btn')?.getAttribute('href') || '',
          fotosNuevas: document.querySelectorAll('img[src*="static/img/nicaragua/"], img[src*="static/img/banners/"]').length,
        };
      });
      if (portada.heroH1 !== 'Juventud Renovadora') fallo(`/ → h1 del hero: «${portada.heroH1}»`);
      else ok('/ → h1 «Juventud Renovadora»');
      if (portada.conoce !== 'nosotros.html') fallo(`/ → botón «Conócenos»: ${portada.conoce}`);
      else ok('/ → «Conócenos» enlaza a nosotros.html');
      if (portada.explora !== 'actividades.html') fallo(`/ → botón «Explorar actividades»: ${portada.explora}`);
      else ok('/ → «Explorar actividades» enlaza a actividades.html');
      if (!portada.heroFoto) fallo('/ → el hero no usa una fotografía de static/img/nicaragua/');
      else ok(`/ → foto de Nicaragua en el hero (${portada.heroFoto})`);
      if (portada.heroCredito) fallo('/ → el hero ya no debe mostrar crédito de foto');
      else ok('/ → hero sin crédito de foto visible');
      if (portada.secciones.length !== 8) fallo(`/ → secciones de portada: ${portada.secciones.join(', ')}`);
      else ok('/ → 8 secciones de portada');
      if (portada.bloquesJuventud !== 3 || portada.fotosJuventud !== 3)
        fallo(`/ → «Nuestra juventud»: ${portada.bloquesJuventud} bloques, ${portada.fotosJuventud} fotos`);
      else if (portada.titulosJuventud.join(' · ') !== 'Educación · Cultura · Participación')
        fallo(`/ → títulos de juventud: ${portada.titulosJuventud.join(' · ')}`);
      else ok('/ → «Nuestra juventud»: 3 bloques imagen + título + descripción');
      if (portada.galeria !== 4) fallo(`/ → galería «Conoce Nicaragua»: ${portada.galeria} figuras (esperadas 4)`);
      else ok('/ → galería «Conoce Nicaragua» con 4 figuras');
      if (portada.pieLugares.length !== 4 || !portada.pieLugares.includes('Isla de Ometepe'))
        fallo(`/ → pies de galería: ${portada.pieLugares.join(' · ')}`);
      else ok('/ → pies de galería con lugares reales');
      if (portada.btnDonaciones !== 'donaciones.html') fallo(`/ → botón de donaciones: ${portada.btnDonaciones}`);
      else ok('/ → donaciones enlazan a donaciones.html');
      if (portada.canales !== 3) fallo(`/ → canales de contacto: ${portada.canales}`);
      else ok('/ → 3 canales de contacto');
      if (portada.efemerides < 3) fallo(`/ → efemérides renderizadas: ${portada.efemerides}`);
      else ok(`/ → ${portada.efemerides} efemérides renderizadas`);
      if (portada.bloquesAgenda !== 2) fallo(`/ → bloques de agenda: ${portada.bloquesAgenda} (esperados 2)`);
      else ok('/ → Agenda separada: Actividades y Efemérides');
      if (portada.btnCalendario !== 'actividades.html') fallo(`/ → «Consultar calendario»: ${portada.btnCalendario}`);
      else ok('/ → «Consultar calendario» enlaza a actividades.html');
      if (portada.fotosNuevas !== 10) fallo(`/ → fotos de static/img/nicaragua/ en portada: ${portada.fotosNuevas} (esperadas 10)`);
      else ok('/ → 10 fotografías de Nicaragua en la portada');
    }
    if (ruta.includes('nosotros')) {
      const nos = await pagina.evaluate(() => ({
        h1: document.querySelector('h1')?.textContent?.trim() || '',
        principios: document.querySelectorAll('.principio').length,
        ambitos: document.querySelectorAll('[data-ambitos] .punto').length,
        faq: document.querySelectorAll('.faq__item').length,
        faqCerradas: [...document.querySelectorAll('.faq__pregunta')].every(
          (b) => b.getAttribute('aria-expanded') === 'false'
        ),
        faqEnlazadas: [...document.querySelectorAll('.faq__pregunta')].every((b) =>
          Boolean(document.getElementById(b.getAttribute('aria-controls')))
        ),
        hitos: document.querySelectorAll('[data-trayectoria] .hito').length,
        canales: document.querySelectorAll('[data-canales-jr] .canal').length,
        enlaceRedes: !!document.querySelector('a[href="https://unamosnic.org/nuestras-redes/"]'),
        imagenes: document.querySelectorAll('main img').length,
        creditos: document.querySelectorAll('main figcaption.foto-credito').length,
        imgsRotas: [...document.querySelectorAll('main img')].filter(
          (i) => i.complete && i.naturalWidth === 0
        ).length,
      }));

      if (nos.h1 !== 'Conoce Juventud Renovadora') fallo(`${ruta} → h1: «${nos.h1}»`);
      else ok(`${ruta} → h1 «Conoce Juventud Renovadora»`);
      if (nos.principios !== 5) fallo(`${ruta} → principios: ${nos.principios} (esperados 5)`);
      else ok(`${ruta} → 5 principios`);
      if (nos.ambitos !== 4) fallo(`${ruta} → ámbitos de trabajo: ${nos.ambitos} (esperados 4)`);
      else ok(`${ruta} → 4 ámbitos de trabajo`);
      if (nos.faq !== 5 || !nos.faqCerradas || !nos.faqEnlazadas)
        fallo(`${ruta} → FAQ: ${nos.faq} ítems, cerradas: ${nos.faqCerradas}, enlazadas: ${nos.faqEnlazadas}`);
      else ok(`${ruta} → 5 preguntas con acordeón accesible`);
      if (nos.hitos < 3) fallo(`${ruta} → trayectoria: ${nos.hitos} referencias (mínimo 3)`);
      else ok(`${ruta} → trayectoria con ${nos.hitos} referencias documentadas`);
      if (nos.canales !== 4) fallo(`${ruta} → canales: ${nos.canales} (esperados 4)`);
      else ok(`${ruta} → 4 canales oficiales`);
      if (!nos.enlaceRedes) fallo(`${ruta} → falta el enlace a unamosnic.org/nuestras-redes/`);
      else ok(`${ruta} → enlace a la ficha oficial`);
      if (nos.imagenes !== 3 || nos.creditos !== 0)
        fallo(`${ruta} → fotos: ${nos.imagenes}, créditos: ${nos.creditos} (esperados 3 y 0)`);
      else ok(`${ruta} → 3 fotografías ilustrativas sin crédito visible`);
      if (nos.imgsRotas) fallo(`${ruta} → imágenes rotas: ${nos.imgsRotas}`);

      await pagina.click('.faq__pregunta');
      await new Promise((r) => setTimeout(r, 200));
      const faqAbierta = await pagina.evaluate(() => {
        const b = document.querySelector('.faq__pregunta');
        const p = document.getElementById(b.getAttribute('aria-controls'));
        return { exp: b.getAttribute('aria-expanded'), oculto: p.hidden };
      });
      if (faqAbierta.exp !== 'true' || faqAbierta.oculto)
        fallo(`${ruta} → el acordeón no se abre con clic (${JSON.stringify(faqAbierta)})`);
      else ok(`${ruta} → el acordeón se abre con clic`);

      await pagina.click('.faq__item:nth-child(2) .faq__pregunta');
      await new Promise((r) => setTimeout(r, 200));
      const unaSola = await pagina.evaluate(() => {
        const abiertas = [...document.querySelectorAll('.faq__pregunta')].filter(
          (b) => b.getAttribute('aria-expanded') === 'true'
        );
        return abiertas.length;
      });
      if (unaSola !== 1) fallo(`${ruta} → preguntas abiertas a la vez: ${unaSola} (esperadas 1)`);
      else ok(`${ruta} → solo una pregunta abierta a la vez`);

      await pagina.evaluate(() => window.scrollTo(0, 0));
      await new Promise((r) => setTimeout(r, 250));
    }

    if (ruta.includes('actualidad') && datos.noticias !== 6)
      fallo(`${ruta} → noticias renderizadas: ${datos.noticias}`);

    if (ruta.startsWith('/noticia/')) {
      const det = await pagina.evaluate(() => ({
        titulo: document.querySelector('h1')?.textContent.trim() || '',
        categoria: document.querySelector('.chip--cat')?.textContent.trim() || '',
        parrafos: document.querySelectorAll('article .space-y-5 p').length,
        foto: document.querySelector('article figure img')?.getAttribute('src') || '',
        volver: !!document.querySelector('a[href="/templates/actualidad.html"]'),
        siguiente: !!document.querySelector('a[href="/noticia/2/"]'),
      }));
      if (!det.titulo.includes('reunión informativa'))
        fallo(`${ruta} → título de la noticia: «${det.titulo}»`);
      else ok(`${ruta} → título renderizado por Django`);
      if (det.categoria !== 'Comunicado') fallo(`${ruta} → categoría: «${det.categoria}»`);
      if (det.parrafos < 4) fallo(`${ruta} → párrafos del cuerpo: ${det.parrafos}`);
      else ok(`${ruta} → cuerpo del artículo renderizado`);
      if (!det.foto.includes('static/img/noticias/')) fallo(`${ruta} → imagen del artículo: ${det.foto}`);
      if (!det.volver || !det.siguiente) fallo(`${ruta} → faltan enlaces de navegación (volver/siguiente)`);
      else ok(`${ruta} → navegación anterior/siguiente/volver`);
      const noExiste = await pagina.goto(BASE + '/noticia/99/', { waitUntil: 'networkidle2' });
      if (noExiste.status() !== 404) fallo(`/noticia/99/ → HTTP ${noExiste.status()} (esperado 404)`);
      else ok('/noticia/99/ → HTTP 404 para id inexistente');
      const vieja = await pagina.goto(BASE + '/templates/noticia.html?id=2', { waitUntil: 'networkidle2' });
      if (vieja.status() !== 200 || !pagina.url().endsWith('/noticia/2/'))
        fallo(`templates/noticia.html?id=2 → redirige a ${pagina.url()}`);
      else ok('templates/noticia.html?id=2 → redirige a /noticia/2/');
      await pagina.goto(BASE + ruta, { waitUntil: 'networkidle2' });
    }
    if (ruta.includes('nosotros')) {
      const nos = await pagina.evaluate(() => ({
        h1: document.querySelector('h1')?.textContent?.trim() || '',
        principios: document.querySelectorAll('.principio').length,
        ambitos: document.querySelectorAll('[data-ambitos] .punto').length,
        faq: document.querySelectorAll('.faq__item').length,
        faqCerradas: [...document.querySelectorAll('.faq__pregunta')].every(
          (b) => b.getAttribute('aria-expanded') === 'false'
        ),
        faqEnlazadas: [...document.querySelectorAll('.faq__pregunta')].every((b) =>
          Boolean(document.getElementById(b.getAttribute('aria-controls')))
        ),
        hitos: document.querySelectorAll('[data-trayectoria] .hito').length,
        canales: document.querySelectorAll('[data-canales-jr] .canal').length,
        enlaceRedes: !!document.querySelector('a[href="https://unamosnic.org/nuestras-redes/"]'),
        imagenes: document.querySelectorAll('main img').length,
        creditos: document.querySelectorAll('main figcaption.foto-credito').length,
        imgsRotas: [...document.querySelectorAll('main img')].filter(
          (i) => i.complete && i.naturalWidth === 0
        ).length,
      }));

      if (nos.h1 !== 'Conoce Juventud Renovadora') fallo(`${ruta} → h1: «${nos.h1}»`);
      else ok(`${ruta} → h1 «Conoce Juventud Renovadora»`);
      if (nos.principios !== 5) fallo(`${ruta} → principios: ${nos.principios} (esperados 5)`);
      else ok(`${ruta} → 5 principios`);
      if (nos.ambitos !== 4) fallo(`${ruta} → ámbitos de trabajo: ${nos.ambitos} (esperados 4)`);
      else ok(`${ruta} → 4 ámbitos de trabajo`);
      if (nos.faq !== 5 || !nos.faqCerradas || !nos.faqEnlazadas)
        fallo(`${ruta} → FAQ: ${nos.faq} ítems, cerradas: ${nos.faqCerradas}, enlazadas: ${nos.faqEnlazadas}`);
      else ok(`${ruta} → 5 preguntas con acordeón accesible`);
      if (nos.hitos < 3) fallo(`${ruta} → trayectoria: ${nos.hitos} referencias (mínimo 3)`);
      else ok(`${ruta} → trayectoria con ${nos.hitos} referencias documentadas`);
      if (nos.canales !== 4) fallo(`${ruta} → canales: ${nos.canales} (esperados 4)`);
      else ok(`${ruta} → 4 canales oficiales`);
      if (!nos.enlaceRedes) fallo(`${ruta} → falta el enlace a unamosnic.org/nuestras-redes/`);
      else ok(`${ruta} → enlace a la ficha oficial`);
      if (nos.imagenes !== 3 || nos.creditos !== 0)
        fallo(`${ruta} → fotos: ${nos.imagenes}, créditos: ${nos.creditos} (esperados 3 y 0)`);
      else ok(`${ruta} → 3 fotografías ilustrativas sin crédito visible`);
      if (nos.imgsRotas) fallo(`${ruta} → imágenes rotas: ${nos.imgsRotas}`);

      await pagina.click('.faq__pregunta');
      await new Promise((r) => setTimeout(r, 200));
      const faqAbierta = await pagina.evaluate(() => {
        const b = document.querySelector('.faq__pregunta');
        const p = document.getElementById(b.getAttribute('aria-controls'));
        return { exp: b.getAttribute('aria-expanded'), oculto: p.hidden };
      });
      if (faqAbierta.exp !== 'true' || faqAbierta.oculto)
        fallo(`${ruta} → el acordeón no se abre con clic (${JSON.stringify(faqAbierta)})`);
      else ok(`${ruta} → el acordeón se abre con clic`);

      await pagina.click('.faq__item:nth-child(2) .faq__pregunta');
      await new Promise((r) => setTimeout(r, 200));
      const unaSola = await pagina.evaluate(() => {
        const abiertas = [...document.querySelectorAll('.faq__pregunta')].filter(
          (b) => b.getAttribute('aria-expanded') === 'true'
        );
        return abiertas.length;
      });
      if (unaSola !== 1) fallo(`${ruta} → preguntas abiertas a la vez: ${unaSola} (esperadas 1)`);
      else ok(`${ruta} → solo una pregunta abierta a la vez`);

      await pagina.evaluate(() => window.scrollTo(0, 0));
      await new Promise((r) => setTimeout(r, 250));
    }

    if (ruta.includes('actualidad') && datos.noticias !== 6)
      fallo(`${ruta} → noticias renderizadas: ${datos.noticias}`);

    if (ruta.includes('noticia.html')) {
      const det = await pagina.evaluate(() => ({
        titulo: document.querySelector('[data-noticia-titulo]')?.textContent.trim() || '',
        categoria: document.querySelector('[data-noticia-meta] .chip--cat')?.textContent.trim() || '',
        parrafos: document.querySelectorAll('[data-noticia] p').length,
        foto: document.querySelector('[data-noticia] figure img')?.getAttribute('src') || '',
        volver: !!document.querySelector('a[href="actualidad.html"]'),
        siguiente: !!document.querySelector('a[href="noticia.html?id=2"]'),
      }));
      if (!det.titulo.includes('reunión informativa'))
        fallo(`${ruta} → título de la noticia: «${det.titulo}»`);
      else ok(`${ruta} → título dinámico correcto`);
      if (det.categoria !== 'Comunicado') fallo(`${ruta} → categoría: «${det.categoria}»`);
      if (det.parrafos < 3) fallo(`${ruta} → párrafos del cuerpo: ${det.parrafos}`);
      else ok(`${ruta} → cuerpo del artículo renderizado`);
      if (!det.foto.includes('static/img/noticias/')) fallo(`${ruta} → imagen del artículo: ${det.foto}`);
      if (!det.volver || !det.siguiente) fallo(`${ruta} → faltan enlaces de navegación (volver/siguiente)`);
      else ok(`${ruta} → navegación anterior/siguiente/volver`);
      await pagina.goto(BASE + '/templates/noticia.html?id=99', { waitUntil: 'networkidle2' });
      const noExiste = await pagina.evaluate(
        () => document.querySelector('h1')?.textContent.trim() || ''
      );
      if (!noExiste.includes('no encontrada')) fallo(`${ruta} → id inexistente: «${noExiste}»`);
      else ok(`${ruta} → estado «no encontrado» para id inexistente`);
      await pagina.goto(BASE + ruta, { waitUntil: 'networkidle2' });
    }
    if (ruta.includes('actividades') && datos.actividades !== 6)
      fallo(`${ruta} → actividades renderizadas: ${datos.actividades}`);

    await pagina.screenshot({ path: `${SHOTS}/${nombre}-desktop.png`, fullPage: false });
  }

  console.log('\n== Enlaces internos ==');
  const enlaces = new Set();
  for (const [ruta] of PAGINAS) {
    await pagina.goto(BASE + ruta, { waitUntil: 'domcontentloaded' });
    const hrefs = await pagina.evaluate(() =>
      [...document.querySelectorAll('a[href]')].map((a) => a.href)
    );
    hrefs
      .filter((h) => h.startsWith(BASE))
      .forEach((h) => enlaces.add(h.split('#')[0]));
  }
  for (const enlace of [...enlaces]) {
    const r = await fetch(enlace);
    if (r.status !== 200) fallo(`enlace roto ${enlace} → ${r.status}`);
  }
  ok(`${enlaces.size} enlaces internos comprobados`);

  console.log('\n== Responsive (móvil 390×844) ==');
  await pagina.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await pagina.goto(BASE + '/', { waitUntil: 'networkidle2' });

  const movil = await pagina.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    toggleVisible: !!document.getElementById('menu-toggle')?.offsetParent,
    navEscritorioOculta: !document.querySelector('header nav[aria-label="Navegación principal"]')?.offsetParent,
    heroAlto: document.querySelector('section')?.getBoundingClientRect().height,
    h1: getComputedStyle(document.querySelector('h1')).fontSize,
  }));
  if (movil.overflow > 2) fallo(`móvil → scroll horizontal de ${movil.overflow}px`);
  else ok('móvil → sin scroll horizontal');
  if (!movil.toggleVisible) fallo('móvil → botón de menú invisible');
  if (movil.navEscritorioOculta) ok('móvil → navegación de escritorio oculta');
  else fallo('móvil → la navegación de escritorio sigue visible');
  if (movil.heroAlto < 500) fallo(`móvil → hero demasiado bajo (${movil.heroAlto}px)`);
  else ok(`móvil → hero ${Math.round(movil.heroAlto)}px, h1 ${movil.h1}`);

  await pagina.click('#menu-toggle');
  await new Promise((r) => setTimeout(r, 450));
  const abierto = await pagina.evaluate(() => ({
    expandido: document.getElementById('menu-toggle').getAttribute('aria-expanded'),
    panel: document.getElementById('menu-panel').classList.contains('is-open'),
    foco: document.activeElement?.textContent?.trim().slice(0, 20),
    overflow: document.body.style.overflow,
  }));
  if (abierto.expandido !== 'true' || !abierto.panel) fallo('menú móvil → no se abre correctamente');
  else ok(`menú móvil → abierto (foco en: ${abierto.foco})`);
  if (abierto.overflow !== 'hidden') fallo('menú móvil → no bloquea el scroll del body');
  await pagina.screenshot({ path: `${SHOTS}/inicio-movil-menu.png` });

  await pagina.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 450));
  const cerrado = await pagina.evaluate(() =>
    document.getElementById('menu-toggle').getAttribute('aria-expanded')
  );
  if (cerrado !== 'false') fallo('menú móvil → Escape no lo cierra');
  else ok('menú móvil → Escape lo cierra');

  const enlaceMovil = await pagina.evaluate(() => {
    const a = document.querySelector('#menu-panel a');
    return a ? { visible: !!a.offsetParent, href: a.getAttribute('href') } : null;
  });
  if (!enlaceMovil?.visible) fallo('menú móvil → enlaces no visibles');

  await pagina.goto(BASE + '/', { waitUntil: 'networkidle2' });
  await revelarTodo(pagina);
  await pagina.screenshot({ path: `${SHOTS}/inicio-movil.png`, fullPage: true });

  console.log('\n== Tablet (834×1112) ==');
  await pagina.setViewport({ width: 834, height: 1112 });
  await pagina.goto(BASE + '/', { waitUntil: 'networkidle2' });
  await revelarTodo(pagina);
  const tablet = await pagina.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    navVisible: !!document.querySelector('header nav[aria-label="Navegación principal"]')?.offsetParent,
  }));
  if (tablet.overflow > 2) fallo(`tablet → scroll horizontal de ${tablet.overflow}px`);
  if (tablet.navVisible) fallo('tablet → navegación de escritorio visible a 834px (debería ser menú hamburguesa)');
  else ok('tablet → menú hamburguesa a 834px');
  await pagina.screenshot({ path: `${SHOTS}/inicio-tablet.png`, fullPage: true });

  console.log('\n== Puntos de ruptura de navegación ==');
  await pagina.setViewport({ width: 1100, height: 900 });
  await pagina.goto(BASE + '/', { waitUntil: 'networkidle2' });
  const compacto = await pagina.evaluate(() => ({
    nav: !!document.querySelector('header nav[aria-label="Navegación principal"]')?.offsetParent,
    toggle: !!document.getElementById('menu-toggle')?.offsetParent,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }));
  if (compacto.nav) fallo('1100px → navegación visible (con 6 enlaces saturaría)');
  else ok('1100px → menú hamburguesa (navegación sin saturar)');
  if (!compacto.toggle) fallo('1100px → botón de menú invisible');
  if (compacto.overflow > 2) fallo(`1100px → scroll horizontal de ${compacto.overflow}px`);

  await pagina.setViewport({ width: 1280, height: 900 });
  await pagina.goto(BASE + '/', { waitUntil: 'networkidle2' });
  const ancho = await pagina.evaluate(() => ({
    nav: !!document.querySelector('header nav[aria-label="Navegación principal"]')?.offsetParent,
    toggle: !!document.getElementById('menu-toggle')?.offsetParent,
    enlaces: document.querySelectorAll('header nav[aria-label="Navegación principal"] a').length,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }));
  if (!ancho.nav) fallo('1280px → navegación de escritorio oculta');
  else ok(`1280px → navegación visible con ${ancho.enlaces} enlaces`);
  if (ancho.toggle) fallo('1280px → el menú hamburguesa sigue visible');
  if (ancho.overflow > 2) fallo(`1280px → scroll horizontal de ${ancho.overflow}px`);

  console.log('\n== Medioambiente (móvil 390×844) ==');
  await pagina.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await pagina.goto(BASE + '/templates/medioambiente.html', { waitUntil: 'networkidle2' });
  const medMovil = await pagina.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    menu: !!document.getElementById('menu-toggle')?.offsetParent,
    activo: !!document.querySelector('#menu-panel a[aria-current="page"]')?.textContent.includes('Medioambiente'),
    imgRotas: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length,
  }));
  if (medMovil.overflow > 2) fallo(`medioambiente móvil → scroll horizontal de ${medMovil.overflow}px`);
  else ok('medioambiente móvil → sin scroll horizontal');
  if (!medMovil.menu) fallo('medioambiente móvil → menú hamburguesa invisible');
  if (!medMovil.activo) fallo('medioambiente móvil → «Medioambiente» sin aria-current');
  else ok('medioambiente móvil → enlace activo marcado');
  if (medMovil.imgRotas) fallo(`medioambiente móvil → ${medMovil.imgRotas} imágenes rotas`);
  await pagina.screenshot({ path: `${SHOTS}/medioambiente-movil.png`, fullPage: true });

  console.log('\n== Sobre nosotros (móvil 390×844) ==');
  await pagina.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await pagina.goto(BASE + '/templates/nosotros.html', { waitUntil: 'networkidle2' });
  const nosMovil = await pagina.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    menu: !!document.getElementById('menu-toggle')?.offsetParent,
    activo: !!document.querySelector('#menu-panel a[aria-current="page"]')?.textContent.includes('Quiénes somos'),
    faq: document.querySelectorAll('.faq__pregunta').length,
    faqAncho: [...document.querySelectorAll('.faq__pregunta')].every(
      (b) => b.getBoundingClientRect().width <= 390
    ),
    imgRotas: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length,
  }));
  if (nosMovil.overflow > 2) fallo(`nosotros móvil → scroll horizontal de ${nosMovil.overflow}px`);
  else ok('nosotros móvil → sin scroll horizontal');
  if (!nosMovil.menu) fallo('nosotros móvil → menú hamburguesa invisible');
  if (!nosMovil.activo) fallo('nosotros móvil → «Quiénes somos» sin aria-current');
  else ok('nosotros móvil → enlace activo marcado');
  if (nosMovil.faq !== 5 || !nosMovil.faqAncho)
    fallo(`nosotros móvil → FAQ: ${nosMovil.faq} preguntas, ancho correcto: ${nosMovil.faqAncho}`);
  else ok('nosotros móvil → 5 preguntas a ancho completo');
  if (nosMovil.imgRotas) fallo(`nosotros móvil → imágenes rotas: ${nosMovil.imgRotas}`);
  await revelarTodo(pagina);
  await pagina.screenshot({ path: `${SHOTS}/nosotros-movil.png`, fullPage: true });

  console.log('\n== Formulario de contacto ==');
  await pagina.setViewport({ width: 1440, height: 900 });
  await pagina.goto(BASE + '/templates/contacto.html', { waitUntil: 'networkidle2' });
  await pagina.click('button[type="submit"]');
  await new Promise((r) => setTimeout(r, 250));
  const erroresForm = await pagina.evaluate(() => ({
    invalidos: document.querySelectorAll('.field.is-invalid').length,
    estado: document.querySelector('[data-form-estado]').textContent.trim().slice(0, 60),
    noRedirige: location.pathname.endsWith('contacto.html'),
  }));
  if (erroresForm.invalidos !== 4) fallo(`formulario → campos marcados: ${erroresForm.invalidos} (esperados 4)`);
  else ok('formulario → valida los 4 campos vacíos');
  if (!erroresForm.estado.includes('Revisa')) fallo(`formulario → estado inesperado: ${erroresForm.estado}`);
  else ok('formulario → mensaje de error visible');

  await pagina.type('#nombre', 'Ana Pérez');
  await pagina.type('#correo', 'ana@correo.com');
  await pagina.type('#asunto', 'Consulta general');
  await pagina.type('#mensaje', 'Quisiera recibir más información sobre las actividades.');
  await pagina.click('button[type="submit"]');
  await new Promise((r) => setTimeout(r, 250));
  const pendiente = await pagina.evaluate(() => ({
    invalidos: document.querySelectorAll('.field.is-invalid').length,
    estado: document.querySelector('[data-form-estado]').textContent.trim(),
  }));
  if (pendiente.invalidos !== 0) fallo('formulario → sigue marcando errores con datos válidos');
  else if (!pendiente.estado.includes('pendiente de configuración'))
    fallo(`formulario → no indica el estado real: ${pendiente.estado.slice(0, 80)}`);
  else ok('formulario → indica que el envío está pendiente de configuración (sin simular éxito)');
  await pagina.screenshot({ path: `${SHOTS}/contacto.png`, fullPage: true });

  console.log('\n== prefers-reduced-motion ==');
  await pagina.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await pagina.goto(BASE + '/', { waitUntil: 'networkidle2' });
  const reducido = await pagina.evaluate(() => {
    const el = document.querySelector('[data-reveal]');
    return el ? getComputedStyle(el).opacity : null;
  });
  if (reducido !== '1') fallo(`reduced-motion → elemento con opacity ${reducido} (debe ser 1)`);
  else ok('reduced-motion → el contenido es visible sin animación');
  await pagina.emulateMediaFeatures([]);

  console.log('\n== Capturas ==');
  await pagina.setViewport({ width: 1440, height: 900 });
  await pagina.goto(BASE + '/', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 600));
  await pagina.screenshot({ path: `${SHOTS}/inicio-hero.png` });
  await revelarTodo(pagina);
  await pagina.screenshot({ path: `${SHOTS}/inicio-completo.png`, fullPage: true });
  await pagina.goto(BASE + '/templates/medioambiente.html', { waitUntil: 'networkidle2' });
  await revelarTodo(pagina);
  await pagina.screenshot({ path: `${SHOTS}/medioambiente-completo.png`, fullPage: true });
  await pagina.goto(BASE + '/templates/nosotros.html', { waitUntil: 'networkidle2' });
  await revelarTodo(pagina);
  await pagina.screenshot({ path: `${SHOTS}/nosotros-completo.png`, fullPage: true });
} finally {
  await navegador.close();
}

console.log('\n==============================');
if (fallos.length) {
  console.log(`RESULTADO: ${fallos.length} fallo(s)`);
  fallos.forEach((f) => console.log(' - ' + f));
  process.exit(1);
} else {
  console.log('RESULTADO: todas las comprobaciones OK');
}
