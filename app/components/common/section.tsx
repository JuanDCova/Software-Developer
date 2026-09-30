import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  /** Texto corto bajo el título, máximo 25 palabras. */
  lead?: string;
  children: ReactNode;
  className?: string;
}

/** Sección de la home con título accesible (aria-labelledby) y ancho contenido. */
export function Section({ id, title, lead, children, className = "" }: SectionProps) {
  const headingId = `${id}-titulo`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-32 ${className}`}
    >
      <div className="reveal max-w-[65ch]">
        <h2
          id={headingId}
          className="font-display text-3xl font-semibold tracking-tight text-brand md:text-5xl"
        >
          {title}
        </h2>
        {lead ? <p className="mt-4 text-lg leading-relaxed text-ink-soft">{lead}</p> : null}
      </div>
      <div className="mt-12 md:mt-16">{children}</div>
    </section>
  );
}
