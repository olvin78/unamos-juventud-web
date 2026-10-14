/* Captura todas las páginas en 3 anchos + huella de estilos calculados.
   Uso: node scripts/captura.mjs [prefijo] */
import puppeteer from 'puppeteer-core';

const BASE = 'http://127.0.0.1:8000';
const SHOTS = process.env.SHOTS_DIR || '/tmp/opencode/shots';
const prefijo = process.argv[2] || 'base';

const PAGINAS = [
  ['/', 'inicio'],
  ['/nosotros/', 'nosotros'],
  ['/actualidad/', 'actualidad'],
  ['/noticia/1/', 'noticia'],
  ['/actividades/', 'actividades'],
  ['/medioambiente/', 'medioambiente'],
  ['/donaciones/', 'donaciones'],
  ['/contacto/', 'contacto'],
  ['/privacidad/', 'privacidad'],
];

const ANCHOS = [
  { w: 1440, h: 900, nombre: 'desk' },
  { w: 768, h: 1024, nombre: 'tabl' },
  { w: 390, h: 844, nombre: 'mov' },
];

const b = await puppeteer.launch({
  executablePath: '/snap/bin/chromium',
  headless: 'new',
  args: ['--no-sandbox'],
});

const huella = {};

for (const [ruta, nombre] of PAGINAS) {
  for (const a of ANCHOS) {
    const p = await b.newPage();
    await p.setViewport({ width: a.w, height: a.h });
    await p.goto(BASE + ruta, { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 400));
    await p.screenshot({
      path: `${SHOTS}/${prefijo}-${nombre}-${a.nombre}.png`,
      fullPage: true,
    });
    if (a.nombre === 'desk') {
      huella[nombre] = await p.evaluate(() => {
        const out = {};
        const sel = [
          'h1', 'h2', 'h3', '.btn-primary', '.btn-outline', '.eyebrow',
          '.card', '.chip', '.aviso', '.foto img', '.hero-banda',
          'section', 'footer', '.canal', '.punto',
        ];
        for (const s of sel) {
          const el = document.querySelector(s);
          if (!el) continue;
          const c = getComputedStyle(el);
          out[s] = {
            ff: c.fontFamily.split(',')[0],
            fs: c.fontSize,
            fw: c.fontWeight,
            lh: c.lineHeight,
            col: c.color,
            bg: c.backgroundColor,
            mt: c.marginTop,
            mb: c.marginBottom,
            pt: c.paddingTop,
            pb: c.paddingBottom,
            pl: c.paddingLeft,
            radius: c.borderRadius,
            maxw: c.maxWidth,
          };
        }
        out._doc = {
          scrollW: document.documentElement.scrollWidth,
          clientW: document.documentElement.clientWidth,
          alto: document.body.scrollHeight,
        };
        return out;
      });
    }
    await p.close();
  }
}

const fs = await import('fs');
fs.writeFileSync(`${SHOTS}/${prefijo}-huella.json`, JSON.stringify(huella, null, 1));
console.log('capturas y huella escritas con prefijo', prefijo);
await b.close();
