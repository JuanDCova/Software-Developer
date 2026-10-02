import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = ["/", "/proyectos", "/proyectos/orbitra", "/proyectos/erp-educacion-superior", "/cv"];

test.describe("home", () => {
  test("el hero dice quién es y qué hace, con los dos CTAs", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Construyo, mantengo y escalo software para tu empresa",
    );
    await expect(page.getByRole("link", { name: "Ver proyectos" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Ver CV" }).first()).toBeVisible();
  });

  test("tiene todas las secciones del menú", async ({ page }) => {
    await page.goto("/");
    for (const name of [
      "Sobre mí",
      "Experiencia laboral",
      "Stack tecnológico",
      "Proyectos destacados",
      "Hablemos de tu reto",
    ]) {
      await expect(page.getByRole("region", { name, exact: true })).toBeAttached();
    }
  });

  test("el toggle de tema invierte el tema y se recuerda", async ({ page }) => {
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
    await page.getByRole("link", { name: "Orbitra", exact: true }).click();
    await expect(page).toHaveURL(/\/proyectos\/orbitra$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Orbitra");
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
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.addInitScript((theme) => localStorage.setItem("jdc-theme", theme), scheme);
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

test.describe("contenido real", () => {
  test("foto, correo y LinkedIn están publicados", async ({ page }) => {
    await page.goto("/");
    const photo = page.getByRole("img", { name: /Juan David Cova/ });
    await expect(photo).toBeVisible();
    expect(await photo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    await expect(page.getByRole("link", { name: "juancoava0@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:juancoava0@gmail.com",
    );
    await expect(page.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/juancovasoftwaredeveloper/",
    );
    await expect(page.getByText("por confirmar")).toHaveCount(0);
  });

  test("el CV trae formación e idiomas", async ({ page }) => {
    await page.goto("/cv");
    await expect(page.getByText("Ingeniería de Sistemas", { exact: true })).toBeVisible();
    await expect(page.getByText(/Inglés técnico/)).toBeVisible();
  });
});

test.describe("interacción de escritorio", () => {
  test.skip(({ isMobile }) => isMobile, "Solo en escritorio");

  test("la red de tecnologías muestra dónde se usó cada una", async ({ page }) => {
    await page.goto("/#stack");
    await page.locator("#stack").getByText("PostgreSQL", { exact: true }).first().hover();
    await expect(page.getByText(/^PostgreSQL: .*Orbitra/)).toBeVisible();
  });

  test("el showcase de proyectos se fija y avanza en horizontal", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#proyectos")).toHaveClass(/is-horizontal/);
    const track = page.locator(".showcase-track");
    const before = await track.evaluate((el) => el.getBoundingClientRect().x);
    const top = await page.evaluate(
      () => document.getElementById("proyectos")!.getBoundingClientRect().top + window.scrollY,
    );
    await page.evaluate((y) => window.scrollTo(0, y + 900), top);
    await expect
      .poll(() => track.evaluate((el) => el.getBoundingClientRect().x))
      .toBeLessThan(before - 300);
  });

  test("con reduced motion los proyectos se leen apilados", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.waitForTimeout(500);
    await expect(page.locator("#proyectos")).not.toHaveClass(/is-horizontal/);
  });
});

test("el modo claro es el estándar aunque el sistema esté en oscuro", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).not.toHaveAttribute("data-theme", "dark");
  const background = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(background).toBe("rgb(242, 241, 240)");
});

test("la hoja de vida tiene la estructura de la HDV", async ({ page }) => {
  await page.goto("/cv");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Juan David Cova Salgado");
  for (const name of [
    "Contacto",
    "Educación",
    "Habilidades",
    "Idiomas",
    "Perfil",
    "Experiencia laboral",
    "Trayectoria",
    "Proyectos",
    "Referencias",
  ]) {
    await expect(page.getByRole("heading", { name, exact: true, level: 2 })).toBeVisible();
  }
  await expect(page.getByRole("img", { name: /Retrato de Juan David Cova Salgado/ })).toBeVisible();
});

test.describe("navegación desde la home con movimiento activo", () => {
  test.skip(({ isMobile }) => isMobile, "El pin horizontal solo existe en escritorio");

  for (const name of ["Ver CV", "Ver trayectoria"]) {
    test(`"${name}" abre el CV sin la vista de error`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      await page.goto("/");
      await expect(page.locator("#proyectos")).toHaveClass(/is-horizontal/);
      await page.getByRole("link", { name }).first().click();
      await expect(page).toHaveURL(/\/cv$/);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Juan David Cova Salgado");
      await expect(page.getByText("Algo salió mal")).toHaveCount(0);
      expect(errors.filter((e) => !e.includes("THREE."))).toEqual([]);
    });
  }

  test("ir a un proyecto desde la red de tecnologías no rompe la página", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#proyectos")).toHaveClass(/is-horizontal/);
    await page
      .locator("#stack")
      .getByRole("link", { name: "Orbitra", exact: true })
      .first()
      .click();
    await expect(page).toHaveURL(/\/proyectos\/orbitra$/);
    await expect(page.getByText("Algo salió mal")).toHaveCount(0);
  });
});

test.describe("capturas de proyectos", () => {
  test("la captura principal se abre en el visor y se navega con el teclado", async ({ page }) => {
    await page.goto("/proyectos/orbitra");
    await page.getByRole("button", { name: "Ampliar captura: Panel principal" }).click();
    const viewer = page.getByRole("dialog", { name: "Capturas de Orbitra" });
    await expect(viewer).toBeVisible();
    await expect(viewer.getByText("Panel principal (1 de 3)")).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(viewer.getByText("Lista de órdenes (2 de 3)")).toBeVisible();
    const image = viewer.getByRole("img", { name: /Lista de órdenes de Orbitra/ });
    await expect
      .poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth))
      .toBeGreaterThan(0);
    await page.keyboard.press("Escape");
    await expect(viewer).toBeHidden();
  });

  test("un proyecto confidencial no publica capturas", async ({ page }) => {
    await page.goto("/proyectos");
    await expect(page.getByText("Proyecto confidencial")).toHaveCount(1);
    await page.goto("/proyectos/erp-educacion-superior");
    await expect(page.getByRole("button", { name: /Ampliar captura/ })).toHaveCount(0);
  });
});
