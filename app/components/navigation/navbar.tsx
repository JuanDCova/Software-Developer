import { FileText, List, X } from "@phosphor-icons/react";
import { useEffect, useId, useState } from "react";
import { Link } from "react-router";

import { LogoMark } from "~/components/brand/logo-mark";
import { ThemeToggle } from "~/components/common/theme-toggle";
import { navLinks } from "~/config/site";

/**
 * Barra superior fija: marca, enlaces en mayúsculas y CTA en chaflán hacia el
 * CV. En mobile el menú se despliega como una lista apilada.
 */
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
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md print:hidden">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-[72px] w-full max-w-[90rem] items-center gap-[clamp(20px,4vw,56px)] px-[clamp(20px,4vw,48px)]"
      >
        <Link to="/" aria-label="jdc, ir al inicio" className="shrink-0">
          <LogoMark />
        </Link>

        <ul className="hidden items-center gap-[30px] lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="font-display text-[15px] font-bold tracking-[0.06em] whitespace-nowrap text-ink uppercase transition-colors hover:text-accent-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/cv"
            className="hidden items-center gap-2.5 bg-brand px-[22px] py-[12px] font-display text-[13px] font-bold tracking-[0.14em] text-bg uppercase transition-colors chamfer hover:bg-ink-soft sm:inline-flex"
          >
            <FileText size={17} weight="regular" aria-hidden="true" />
            Ver CV
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex size-11 items-center justify-center bg-brand text-bg chamfer lg:hidden"
          >
            {open ? <X size={20} aria-hidden="true" /> : <List size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div id={panelId} hidden={!open} className="border-t border-line bg-bg lg:hidden">
        <ul className="flex flex-col gap-1 px-[clamp(20px,4vw,48px)] py-5">
          {[...navLinks, { label: "Ver CV", to: "/cv" }].map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center font-display text-lg font-bold tracking-[0.06em] text-ink uppercase"
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
