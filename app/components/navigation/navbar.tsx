import { List, X } from "@phosphor-icons/react";
import { useEffect, useId, useState } from "react";
import { Link } from "react-router";

import { ThemeToggle } from "~/components/common/theme-toggle";
import { navLinks } from "~/config/site";

/** Menú flotante: una línea en desktop, panel desplegable en mobile. */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 print:hidden">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 rounded-component border border-line bg-surface/80 px-4 shadow-[0_8px_30px_-12px_rgb(15_23_42/0.18)] backdrop-blur-md sm:px-5"
      >
        <Link
          to="/"
          className="font-display text-lg font-bold tracking-tight text-brand"
          aria-label="JDC, ir al inicio"
        >
          JDC
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="rounded-control px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/cv"
            className="hidden h-10 items-center rounded-control bg-accent px-4 text-sm font-semibold text-on-accent transition-transform active:scale-[0.98] sm:inline-flex"
          >
            Ver CV
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex size-10 items-center justify-center rounded-control border border-line text-ink lg:hidden"
          >
            {open ? <X size={18} aria-hidden="true" /> : <List size={18} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div
        id={panelId}
        hidden={!open}
        className="mx-auto mt-2 w-full max-w-6xl rounded-component border border-line bg-surface p-2 shadow-lg lg:hidden"
      >
        <ul>
          {[...navLinks, { label: "Ver CV", to: "/cv" }].map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center rounded-control px-3 text-base text-ink hover:bg-surface-2"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
