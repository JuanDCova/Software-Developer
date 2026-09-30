import type { ReactNode } from "react";

interface StairHeadingProps {
  id: string;
  /** Primera línea del titular. */
  title: string;
  /** Segunda línea en cian, escalonada hacia la derecha. */
  accent?: string;
  as?: "h1" | "h2";
  className?: string;
}

/** Titular escalonado en mayúsculas: segunda línea en cian desplazada. */
export function StairHeading({
  id,
  title,
  accent,
  as: Tag = "h2",
  className = "",
}: StairHeadingProps) {
  return (
    <Tag
      id={id}
      className={`display-heading text-[clamp(34px,6.5vw,72px)] text-brand ${className}`}
    >
      <span className="block">{title}</span>
      {accent ? " " : null}
      {accent ? (
        <span className="block pl-[min(160px,18vw)] text-accent-display">{accent}</span>
      ) : null}
    </Tag>
  );
}

interface SectionProps {
  id: string;
  title: string;
  accent?: string;
  /** Texto corto bajo el título, máximo 25 palabras. */
  lead?: string;
  children: ReactNode;
  className?: string;
}

/** Sección de la home con titular escalonado accesible (aria-labelledby). */
export function Section({ id, title, accent, lead, children, className = "" }: SectionProps) {
  const headingId = `${id}-titulo`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`mx-auto w-full max-w-[90rem] px-[clamp(20px,9vw,118px)] py-[clamp(72px,10vw,140px)] ${className}`}
    >
      <div className="reveal">
        <StairHeading id={headingId} title={title} accent={accent} />
        {lead ? (
          <p className="mt-8 max-w-[520px] pl-[min(160px,18vw)] text-[clamp(15px,1.6vw,17px)] leading-[1.7] text-ink-soft">
            {lead}
          </p>
        ) : null}
      </div>
      <div className="mt-14 md:mt-20">{children}</div>
    </section>
  );
}
