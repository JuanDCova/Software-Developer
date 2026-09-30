// Genera public/og.png (1200x630) para las vistas previas de LinkedIn, WhatsApp y X.
// Usa las mismas fuentes y colores del sitio. Uso: npm run og
import { readFileSync } from "node:fs";
import { chromium } from "@playwright/test";

const font = (pkg, file) =>
  readFileSync(
    new URL(`../node_modules/@fontsource-variable/${pkg}/files/${file}`, import.meta.url),
  ).toString("base64");

const display = font("space-grotesk", "space-grotesk-latin-wght-normal.woff2");
const body = font("geist", "geist-latin-wght-normal.woff2");
const photo = readFileSync(
  new URL("../public/img/juan-david-cova-800.webp", import.meta.url),
).toString("base64");
const mono = font("geist-mono", "geist-mono-latin-wght-normal.woff2");

const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
@font-face { font-family: Display; src: url(data:font/woff2;base64,${display}) format("woff2"); font-weight: 300 700; }
@font-face { font-family: Body; src: url(data:font/woff2;base64,${body}) format("woff2"); font-weight: 100 900; }
@font-face { font-family: Mono; src: url(data:font/woff2;base64,${mono}) format("woff2"); font-weight: 100 800; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #020617; color: #f8fafc; font-family: Body; padding: 72px 80px; display: flex; flex-direction: column; justify-content: space-between; position: relative; }
.photo { position: absolute; right: 64px; top: 64px; width: 402px; height: 502px; border-radius: 32px; object-fit: cover; }
.name { font-family: Mono; font-size: 26px; color: #94a3b8; }
h1 { font-family: Display; font-weight: 600; font-size: 68px; line-height: 1.04; letter-spacing: -0.02em; max-width: 12ch; margin-top: 28px; }
.stack { font-family: Mono; font-size: 24px; color: #94a3b8; display: flex; gap: 28px; }
.bar { width: 96px; height: 6px; background: #2563eb; border-radius: 3px; margin-bottom: 28px; }
</style></head><body>
<div><p class="name">Juan David Cova</p><h1>Desarrollador full stack de sistemas de gestión</h1></div>
<img class="photo" src="data:image/webp;base64,${photo}">
<div><div class="bar"></div><div class="stack"><span>Django</span><span>React</span><span>TypeScript</span><span>PostgreSQL</span></div></div>
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
