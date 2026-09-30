import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = ["/", "/proyectos", "/proyectos/sgtal", "/proyectos/erp-unicorsalud", "/cv"];

test.describe("home", () => {
  test("el hero dice quién es y qué hace, con los dos CTAs", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Desarrollador full stack de sistemas de gestión",
    );
    await expect(page.getByRole("link", { name: "Ver proyectos" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Ver CV" }).first()).toBeVisible();
  });

  test("tiene todas las secciones del menú", async ({ page }) => {
    await page.goto("/");
    for (const name of ["Sobre mí", "Experiencia", "Stack", "Proyectos", "Contacto"]) {
      await expect(page.getByRole("region", { name, exact: true })).toBeAttached();
    }
  });

  test("el toggle de tema invierte el tema y se recuerda", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    await page.getByRole("button", { name: /modo claro y oscuro/ }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });
});

test.describe("navegación", () => {
  test("menú móvil abre, navega y se cierra", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Solo en mobile");
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Abrir menú" });
    await toggle.click();
    await page.getByRole("link", { name: "Experiencia" }).click();
    await expect(page).toHaveURL(/#experiencia/);
    await expect(page.getByRole("button", { name: "Abrir menú" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  test("Escape cierra el menú móvil", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Solo en mobile");
    await page.goto("/");
    await page.getByRole("button", { name: "Abrir menú" }).click();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Abrir menú" })).toBeVisible();
  });

  test("de la lista de proyectos al detalle", async ({ page }) => {
    await page.goto("/proyectos");
    await page.getByRole("link", { name: "SGTAL", exact: true }).click();
    await expect(page).toHaveURL(/\/proyectos\/sgtal$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("SGTAL");
    await expect(page.getByRole("region", { name: "Mi rol" })).toBeVisible();
    await expect(page.getByRole("region", { name: "Arquitectura" })).toBeVisible();
  });

  test("una ruta que no existe muestra la página 404", async ({ page }) => {
    await page.goto("/esto-no-existe");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Página no encontrada");
  });
});

test.describe("prerender", () => {
  // Lo que ve un crawler sin JavaScript (LinkedIn, WhatsApp): HTML crudo.
  for (const path of pages) {
    test(`${path} trae título, Open Graph y contenido en el HTML`, async ({ request }) => {
      const html = await (await request.get(path)).text();
      expect(html).toMatch(/<title>[^<]*Juan David Cova[^<]*<\/title>/);
      expect(html).toContain('property="og:image"');
      expect(html).toContain('rel="canonical"');
      expect(html).toMatch(/<h1[^>]*>/);
    });
  }
});

test.describe("accesibilidad", () => {
  for (const path of pages) {
    for (const scheme of ["light", "dark"] as const) {
      test(`${path} en modo ${scheme} sin violaciones serias de axe`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: "reduce" });
        await page.goto(path);
        const results = await new AxeBuilder({ page }).analyze();
        const serious = results.violations.filter((v) =>
          ["critical", "serious"].includes(v.impact ?? ""),
        );
        expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
      });
    }
  }
});

test("no hay errores de consola ni de hidratación", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  for (const path of [...pages, "/ruta-inexistente"]) {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
  }
  expect(errors).toEqual([]);
});
