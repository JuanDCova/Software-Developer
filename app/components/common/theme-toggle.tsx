import { Moon, Sun } from "@phosphor-icons/react";

import { toggleTheme } from "~/utils/theme";

/** Cambia entre modo claro y oscuro. Los iconos los resuelve CSS según el tema efectivo. */
export function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Cambiar entre modo claro y oscuro"
      className="group inline-flex size-10 items-center justify-center rounded-control border border-line text-ink transition-colors hover:bg-surface-2 active:scale-[0.96]"
    >
      <span className="show-when-light transition-transform duration-300 group-hover:-rotate-12">
        <Moon size={18} weight="regular" aria-hidden="true" />
      </span>
      <span className="show-when-dark transition-transform duration-300 group-hover:rotate-45">
        <Sun size={18} weight="regular" aria-hidden="true" />
      </span>
    </button>
  );
}
