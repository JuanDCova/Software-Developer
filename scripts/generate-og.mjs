// Genera public/og.png (1200x630) para las vistas previas de LinkedIn, WhatsApp y X.
// Usa la misma identidad del sitio: fondo cálido, Quantico, cian y la red de nodos.
// Uso: npm run og (requiere haber corrido npm run poster)
import { readFileSync } from "node:fs";
import { chromium } from "@playwright/test";

const b64 = (path) => readFileSync(new URL(path, import.meta.url)).toString("base64");
const quantico = b64("../node_modules/@fontsource/quantico/files/quantico-latin-700-normal.woff2");
const geist = b64("../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2");
const photo = b64("../public/img/juan-david-cova-800.webp");
const network = b64("../public/img/red-nodos.svg");

const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
@font-face { font-family: Q; src: url(data:font/woff2;base64,${quantico}) format("woff2"); font-weight: 700; }
@font-face { font-family: G; src: url(data:font/woff2;base64,${geist}) format("woff2"); font-weight: 100 900; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #f2f1f0; color: #2b3033; font-family: G; position: relative; overflow: hidden; }
.net { position: absolute; right: -240px; top: -60px; width: 1100px; opacity: .9; }
.photo { position: absolute; right: 64px; top: 64px; width: 400px; height: 502px; object-fit: cover;
  clip-path: polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 28px 100%, 0 calc(100% - 28px)); }
.text { position: absolute; left: 72px; top: 64px; }
.name { font-family: Q; font-size: 20px; letter-spacing: .14em; color: #5d6164; text-transform: uppercase; }
h1 { font-family: Q; font-size: 62px; line-height: .98; letter-spacing: .01em; text-transform: uppercase; margin-top: 26px; }
h1 span { display: block; }
.in { padding-left: 150px; }
.cyan { color: #0e8fae; }
.cta { position: absolute; left: 72px; bottom: 60px; font-family: Q; font-size: 17px; letter-spacing: .14em; text-transform: uppercase;
  background: #15bcdf; color: #1a1c1e; padding: 16px 28px;
  clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px)); }
</style></head><body>
<img class="net" src="data:image/svg+xml;base64,${network}">
<img class="photo" src="data:image/webp;base64,${photo}">
<div class="text">
  <p class="name">Juan David Cova</p>
  <h1><span>Construyo</span><span>sistemas</span><span>que</span><span class="in">organizan</span><span class="in">tu</span><span class="in cyan">empresa</span></h1>
</div>
<p class="cta">Desarrollador full stack</p>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.evaluate(() => globalThis.document.fonts.ready);
await page.screenshot({
  path: new URL("../public/og.png", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"),
});
await browser.close();
console.log("public/og.png generado");
