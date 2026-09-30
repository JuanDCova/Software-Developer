export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "jdc-theme";

/**
 * Script que corre en <head> antes de pintar: aplica el tema guardado.
 * El claro es el estándar del sitio; el oscuro solo si el visitante lo eligió.
 */
export const themeInitScript = `(function(){try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark"){document.documentElement.dataset.theme="dark"}}catch(e){}})();`;

export function toggleTheme() {
  const next: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  if (next === "dark") document.documentElement.dataset.theme = "dark";
  else delete document.documentElement.dataset.theme;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Sin almacenamiento (modo privado): el cambio vale solo para esta visita.
  }
}
