import type { ReactNode } from "react";
import { Link } from "react-router";

type Variant = "primary" | "secondary";

const base =
  "inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-control px-5 text-sm font-semibold transition-[transform,background-color,border-color,color] duration-200 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-ink dark:hover:bg-[#1d4ed8]",
  secondary: "border border-line-strong text-ink hover:border-ink-soft hover:bg-surface-2",
};

interface ButtonLinkProps {
  to: string;
  children: ReactNode;
  variant?: Variant;
  /** Enlaces externos o archivos: se usa <a> en lugar de la navegación del router. */
  external?: boolean;
  className?: string;
}

export function ButtonLink({
  to,
  children,
  variant = "primary",
  external,
  className = "",
}: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a href={to} className={classes} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={classes}>
      {children}
    </Link>
  );
}
