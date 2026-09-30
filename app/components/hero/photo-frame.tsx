import { profile } from "~/data/profile";

/**
 * Espacio de la fotografía personal. Mientras no exista la foto real se
 * muestra un espacio reservado explícito, nunca una imagen de relleno.
 */
export function PhotoFrame() {
  if (!profile.photo) {
    return (
      <div className="relative flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden rounded-visual border border-dashed border-line-strong bg-surface-2 p-8 text-center">
        <p className="font-display text-6xl font-bold tracking-tight text-ink-soft">JDC</p>
        <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-ink-soft">
          Aquí va la fotografía de Juan David con el tratamiento final. Pendiente de entrega.
        </p>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-visual border border-line">
      <img
        src={profile.photo}
        alt={`${profile.name}, desarrollador full stack`}
        width={800}
        height={1000}
        fetchPriority="high"
        className="size-full object-cover"
      />
    </div>
  );
}
