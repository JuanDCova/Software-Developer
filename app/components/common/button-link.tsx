import type { ReactNode } from "react";
import { Link } from "react-router";

type Variant = "primary" | "secondary";

const base =
  "group/btn inline-flex items-center justify-center gap-3 whitespace-nowrap px-[30px] py-[16px] font-display text-[clamp(13px,2.2vw,15px)] font-bold uppercase tracking-[0.14em] transition-[background-color,box-shadow,transform] duration-200 active:scale-[0.98] chamfer-lg";

const variants: Record<Variant, string> = {
  primary:
    "border border-accent-border bg-accent text-on-accent shadow-[0_0_0_1px_rgb(21_188_223/0.35),0_10px_30px_-12px_rgb(15_163_194/0.6)] hover:bg-accent-hover hover:shadow-[0_0_0_1px_rgb(21_188_223/0.55),0_14px_36px_-10px_rgb(15_163_194/0.85)]",
  secondary: "bg-brand text-bg hover:bg-ink-soft",
};

interface ButtonLinkProps {
  to: string;
  children: ReactNode;
  variant?: Variant;
  /** Enlaces externos o archivos: se usa <a> en lugar de la navegación del router. */
  external?: boolean;
  /** Línea final de 22 px, como en la referencia visual. */
  trail?: boolean;
  className?: string;
}

/** Botón con esquinas en chaflán. Un solo estilo primario (cian) en todo el sitio. */
export function ButtonLink({
  to,
  children,
  variant = "primary",
  external,
  trail = false,
  className = "",
}: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {trail ? (
        <span
          aria-hidden="true"
          className="h-px w-[22px] bg-current transition-[width] duration-300 group-hover/btn:w-[32px]"
        />
      ) : null}
    </>
  );
  if (external) {
    return (
      <a href={to} className={classes} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link to={to} className={classes}>
      {content}
    </Link>
  );
}
