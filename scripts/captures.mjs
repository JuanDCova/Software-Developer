// Capturas con datos demo para el portafolio (tanda 4).
// Uso: node scripts/captures.mjs --site nexora|lms|sgtal|portfolio
// Requiere el stack correspondiente arriba (ver docs/CAPTURAS.md).
// Salida: public/proyectos/<slug>/{vista}-1440.{avif,webp} + {vista}-720.{avif,webp}
import { mkdirSync } from "node:fs";
import { rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const site = process.argv.find((a) => a.startsWith("--site="))?.split("=")[1];

const SITES = {
  nexora: {
    slug: "nexora-platform",
    baseUrl: "http://localhost:3000",
    views: [
      { name: "login", path: "/login" },
      { name: "catalogo", path: "/catalogo" },
      {
        name: "dashboard",
        path: "/dashboard",
        login: { email: "admin@demo.local", password: "Admin12345!" },
      },
    ],
  },
  lms: {
    slug: "pracxu",
    baseUrl: "http://localhost:3000",
    views: [
      { name: "home", path: "/" },
      { name: "cursos", path: "/cursos" },
      { name: "curso-detalle", path: "/cursos/python-desde-cero" },
    ],
  },
  sgtal: {
    slug: "sgtal",
    baseUrl: "http://localhost:3000",
    loginPath: "/login",
    loginFields: { email: "#email", password: "#pass", submitName: "Entrar" },
    login: { email: "admin@sgtal.co", password: "Sgtal2026*" },
    views: [
      { name: "dashboard", path: "/app", login: true },
      { name: "ordenes", path: "/app/ordenes", login: true },
      { name: "logistica", path: "/app/logistica", login: true },
    ],
  },
  portfolio: {
    slug: "jdc-digital-portfolio",
    baseUrl: "http://127.0.0.1:4173",
    views: [
      { name: "home", path: "/" },
      { name: "proyecto", path: "/proyectos/sgtal" },
    ],
  },
};

async function captureView(browser, outDir, siteConfig, view) {
  const { baseUrl } = siteConfig;
  const loginPath = siteConfig.loginPath ?? "/login";
  const fields = siteConfig.loginFields ?? {
    email: "#login-email",
    password: "#login-pass",
    submitName: "Entrar",
  };
  const creds = view.login === true ? siteConfig.login : view.login;
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  await page.addStyleTag({ content: "::-webkit-scrollbar{display:none}*{scrollbar-width:none}" });

  async function settle() {
    // Algunos frontends hacen polling: networkidle puede no llegar nunca.
    try {
      await page.waitForLoadState("networkidle", { timeout: 8000 });
    } catch {
      // Sigue adelante: espera fija para hidratar y asentar animaciones.
    }
    await page.waitForTimeout(1500);
  }

  if (creds) {
    await page.goto(`${baseUrl}${loginPath}`, { waitUntil: "domcontentloaded" });
    await settle();
    await page.locator(fields.email).fill(creds.email);
    await page.locator(fields.password).fill(creds.password);
    await Promise.all([
      page.waitForURL((url) => !url.pathname.includes(loginPath), { timeout: 15000 }),
      page.getByRole("button", { name: fields.submitName }).click(),
    ]);
    await page.goto(`${baseUrl}${view.path}`, { waitUntil: "domcontentloaded" });
    await settle();
  } else {
    await page.goto(`${baseUrl}${view.path}`, { waitUntil: "domcontentloaded" });
    await settle();
  }

  const png = join(outDir, `${view.name}.png`);
  await page.screenshot({ path: png });
  await page.close();

  for (const width of [1440, 720]) {
    const resized = sharp(png).resize({ width });
    await resized
      .clone()
      .avif({ quality: 60 })
      .toFile(join(outDir, `${view.name}-${width}.avif`));
    await resized
      .clone()
      .webp({ quality: 75 })
      .toFile(join(outDir, `${view.name}-${width}.webp`));
  }
  await rm(png, { force: true });
  console.log(`ok ${view.name}: ${view.name}-{1440,720}.{avif,webp}`);
}

const config = SITES[site];
if (!config) {
  console.error(`sitio desconocido: ${site}. Usa --site=${Object.keys(SITES).join("|")}`);
  process.exit(1);
}

const outDir = join(root, "public", "proyectos", config.slug);
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
try {
  for (const view of config.views) await captureView(browser, outDir, config, view);
} finally {
  await browser.close();
}
console.log(`capturas listas en public/proyectos/${config.slug}/`);
