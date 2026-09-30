export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "jdc-theme";

/**
 * Script que corre en <head> antes de pintar: aplica el tema guardado.
 * Si no hay tema guardado no hace nada y manda prefers-color-scheme (CSS).
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t}}catch(e){}})();`;

function effectiveTheme(): Theme {
  const explicit = document.documentElement.dataset.theme;
  if (explicit === "light" || explicit === "dark") return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function toggleTheme() {
  const next: Theme = effectiveTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Sin almacenamiento (modo privado): el cambio vale solo para esta visita.
  }
}
