import { ArrowDown } from "@phosphor-icons/react";

import type { ArchitectureData } from "~/data/types";

interface ArchitectureDiagramProps {
  architecture: ArchitectureData;
  /** Versión reducida para las cards: solo capas y tecnología. */
  compact?: boolean;
}

/**
 * Diagrama de capas en HTML semántico: se lee con lector de pantalla y se
 * imprime bien. La versión interactiva con nodos se construye sobre estos
 * mismos datos en la tanda 3.
 */
export function ArchitectureDiagram({ architecture, compact = false }: ArchitectureDiagramProps) {
  return (
    <ol className="space-y-1.5" aria-label="Capas de la arquitectura">
      {architecture.layers.map((layer, index) => (
        <li key={layer.name}>
          <div
            className={`rounded-component border border-line bg-surface ${compact ? "px-4 py-3" : "p-5"}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="font-display font-semibold text-brand">{layer.name}</p>
              <p className="font-mono text-xs text-ink-soft">{layer.tech}</p>
            </div>
            {compact ? null : (
              <ul className="mt-3 flex flex-wrap gap-2" aria-label={`Piezas de ${layer.name}`}>
                {layer.nodes.map((node) => (
                  <li
                    key={node}
                    className="rounded-control bg-surface-2 px-2.5 py-1 font-mono text-xs text-ink"
                  >
                    {node}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {index < architecture.layers.length - 1 ? (
            <div className="flex justify-center py-0.5 text-ink-soft" aria-hidden="true">
              <ArrowDown size={14} />
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
