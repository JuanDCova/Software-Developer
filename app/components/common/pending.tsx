interface PendingProps {
  /** Qué falta, en pocas palabras: "Cargo", "Correo", "Foto". */
  label: string;
  /** Sobre fondos oscuros de marca: hereda el color del texto. */
  inverse?: boolean;
  className?: string;
}

/**
 * Marca visible de contenido que falta confirmar. Nunca se reemplaza por un
 * dato inventado. Mientras exista alguna, el sitio se publica con noindex.
 */
export function Pending({ label, inverse = false, className = "" }: PendingProps) {
  const tone = inverse ? "border-current/50 text-current" : "border-line-strong text-ink-soft";
  return (
    <span
      className={`inline-flex items-center rounded-control border border-dashed px-2 py-0.5 font-mono text-xs ${tone} ${className}`}
    >
      {label} por confirmar
    </span>
  );
}
