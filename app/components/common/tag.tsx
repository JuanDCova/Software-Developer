import type { ReactNode } from "react";

/** Etiqueta técnica en mono. Se usa para tecnologías y metadatos. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-control border border-line bg-surface px-2.5 py-1 font-mono text-xs text-ink-soft">
      {children}
    </span>
  );
}
