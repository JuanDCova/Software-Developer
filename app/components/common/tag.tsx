import type { ReactNode } from "react";

/**
 * Tecnología o metadato como texto: sin borde ni fondo para que no parezca un
 * botón. Solo lo que navega tiene aspecto de enlace o de botón.
 */
export function Tag({ children }: { children: ReactNode }) {
  return <span className="font-mono text-xs tracking-wide text-ink-soft">{children}</span>;
}

/** Lista de tecnologías en línea, separadas por barras finas. */
export function TagList({ items, label }: { items: readonly string[]; label: string }) {
  return (
    <ul className="flex flex-wrap items-center gap-y-1" aria-label={label}>
      {items.map((item, index) => (
        <li key={item} className="inline-flex items-center">
          <Tag>{item}</Tag>
          {index < items.length - 1 ? (
            <span aria-hidden="true" className="mx-2.5 h-3 w-px bg-line-strong" />
          ) : null}
        </li>
      ))}
    </ul>
  );
}
