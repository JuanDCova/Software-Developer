import { ArrowDown } from "@phosphor-icons/react";

import type { ArchitectureData } from "~/data/types";

type Variant = "full" | "dense" | "compact";

interface ArchitectureDiagramProps {
  architecture: ArchitectureData;
  /**
   * full: página del proyecto. dense: showcase (cabe en una pantalla).
   * compact: cards, solo capas y tecnología.
   */
  variant?: Variant;
}

const box: Record<Variant, string> = {
  full: "p-5",
  dense: "px-4 py-3",
  compact: "px-4 py-3",
};

/**
 * Diagrama de capas en HTML semántico: se lee con lector de pantalla y se
 * imprime bien. Al pasar el cursor o enfocar una capa, se resalta.
 */
export function ArchitectureDiagram({ architecture, variant = "full" }: ArchitectureDiagramProps) {
  return (
    <ol
      className={variant === "full" ? "space-y-1.5" : "space-y-1"}
      aria-label="Capas de la arquitectura"
    >
      {architecture.layers.map((layer, index) => (
        <li key={layer.name}>
          <div
            className={`group/layer rounded-component border border-line bg-surface transition-[border-color,transform] duration-300 hover:-translate-y-px hover:border-accent ${box[variant]}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="font-display font-semibold text-brand">{layer.name}</p>
              <p className="font-mono text-xs text-ink-soft">{layer.tech}</p>
            </div>
            {variant === "compact" ? null : (
              <ul
                className={`flex flex-wrap ${variant === "full" ? "mt-3 gap-2" : "mt-2 gap-1.5"}`}
                aria-label={`Piezas de ${layer.name}`}
              >
                {layer.nodes.map((node) => (
                  <li
                    key={node}
                    className={`rounded-control bg-surface-2 font-mono text-ink transition-colors group-hover/layer:bg-accent-soft ${
                      variant === "full" ? "px-2.5 py-1 text-xs" : "px-2 py-0.5 text-[11px]"
                    }`}
                  >
                    {node}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {index < architecture.layers.length - 1 ? (
            <div
              className={`flex justify-center text-ink-soft ${variant === "full" ? "py-0.5" : ""}`}
              aria-hidden="true"
            >
              <ArrowDown size={variant === "full" ? 14 : 12} />
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
