import type { Project } from "~/data/types";

/**
 * Capturas reales con datos demo, generadas con `node scripts/captures.mjs`.
 * Convención de archivos por vista: `{vista}-1440.{avif,webp}` y
 * `{vista}-720.{avif,webp}` en `public/proyectos/<slug>/`.
 * En datos solo se guarda la ruta webp de 1440; el resto se deriva.
 */

const VIEW_LABELS: Record<string, string> = {
  dashboard: "Panel principal",
  ordenes: "Lista de órdenes",
  logistica: "Módulo de logística",
  catalogo: "Catálogo",
  login: "Inicio de sesión",
  home: "Página principal",
  cursos: "Catálogo de cursos",
  "curso-detalle": "Detalle de curso",
  proyecto: "Detalle de proyecto",
};

function viewLabel(src: string): string {
  const base =
    src
      .split("/")
      .pop()
      ?.replace(/-1440\.webp$/, "") ?? "";
  return VIEW_LABELS[base] ?? "Captura";
}

function siblings(webp1440: string) {
  const base = webp1440.replace(/-1440\.webp$/, "");
  return {
    avif1440: `${base}-1440.avif`,
    avif720: `${base}-720.avif`,
    webp720: `${base}-720.webp`,
  };
}

export function ProjectImage({
  src,
  alt,
  eager = false,
  className = "",
}: {
  src: string;
  alt: string;
  eager?: boolean;
  className?: string;
}) {
  const { avif1440, avif720, webp720 } = siblings(src);
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`${avif720} 720w, ${avif1440} 1440w`}
        sizes="(max-width: 768px) 100vw, 1200px"
      />
      <source
        type="image/webp"
        srcSet={`${webp720} 720w, ${src} 1440w`}
        sizes="(max-width: 768px) 100vw, 1200px"
      />
      <img
        src={src}
        alt={alt}
        width={1440}
        height={900}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={className}
      />
    </picture>
  );
}

/** Bloque de capturas para la página de detalle de un proyecto. */
export function ProjectCaptures({ project }: { project: Project }) {
  const views = [project.image, ...project.gallery].filter((src): src is string => src !== null);
  if (views.length === 0) return null;
  const [hero, ...rest] = views;
  return (
    <div>
      {hero ? (
        <figure className="overflow-hidden rounded-card border border-line">
          <ProjectImage
            src={hero}
            alt={`${viewLabel(hero)} de ${project.title}, con datos de demostración`}
            className="block h-auto w-full"
          />
        </figure>
      ) : null}
      {rest.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {rest.map((src) => (
            <figure key={src} className="overflow-hidden rounded-card border border-line">
              <ProjectImage
                src={src}
                alt={`${viewLabel(src)} de ${project.title}, con datos de demostración`}
                className="block h-auto w-full"
              />
            </figure>
          ))}
        </div>
      ) : null}
      <p className="mt-4 text-sm text-ink-soft">
        Capturas reales de la aplicación corriendo con datos de demostración. Sin datos de personas
        reales.
      </p>
    </div>
  );
}
