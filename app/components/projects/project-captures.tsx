import { ArrowLeft, ArrowRight, ArrowsOut, LockSimple, X } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent, ReactNode, RefObject } from "react";

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

export function viewLabel(src: string): string {
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

function captureAlt(project: Project, src: string) {
  return `${viewLabel(src)} de ${project.title}, con datos de demostración`;
}

export function ProjectImage({
  src,
  alt,
  sizes = "(min-width: 768px) 50vw, 100vw",
  eager = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  eager?: boolean;
  className?: string;
}) {
  const { avif1440, avif720, webp720 } = siblings(src);
  return (
    <picture>
      <source type="image/avif" srcSet={`${avif720} 720w, ${avif1440} 1440w`} sizes={sizes} />
      <source type="image/webp" srcSet={`${webp720} 720w, ${src} 1440w`} sizes={sizes} />
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

/**
 * Marco de captura: una barra con la ruta de la vista y el aviso de datos demo,
 * y la imagen en 16:10. El chaflán del marco sigue el lenguaje del sitio y
 * separa la captura (clara u oscura) del fondo de la página.
 */
export function CaptureFrame({
  project,
  src,
  sizes,
  eager,
  className = "",
}: {
  project: Project;
  src: string;
  sizes?: string;
  eager?: boolean;
  className?: string;
}) {
  return (
    <figure className={`overflow-hidden bg-brand chamfer-lg dark:bg-line ${className}`}>
      <figcaption className="flex h-8 items-center justify-between gap-4 px-4 font-mono text-[11px] text-bg dark:text-ink-soft">
        <span className="truncate">
          {project.slug} / {viewLabel(src).toLowerCase()}
        </span>
        <span className="shrink-0 text-accent">datos demo</span>
      </figcaption>
      <div className="aspect-[16/10] overflow-hidden">
        <div data-capture className="capture-zoom size-full">
          <ProjectImage
            src={src}
            alt={captureAlt(project, src)}
            sizes={sizes}
            eager={eager}
            className="block size-full object-cover object-top"
          />
        </div>
      </div>
    </figure>
  );
}

/** Visual para proyectos confidenciales sin capturas ni arquitectura publicada. */
export function ConfidentialVisual() {
  return (
    <div className="relative grid aspect-[16/10] place-items-center overflow-hidden bg-brand chamfer-lg dark:bg-surface-2">
      <img
        src="/img/red-nodos.svg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 size-full object-cover opacity-40"
      />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <span className="grid size-12 place-items-center bg-accent text-on-accent chamfer">
          <LockSimple size={22} weight="bold" aria-hidden="true" />
        </span>
        <p className="display-heading text-lg text-bg dark:text-ink">Proyecto confidencial</p>
        <p className="max-w-[30ch] text-sm text-bg/75 dark:text-ink-soft">
          Sin capturas públicas por confidencialidad.
        </p>
      </div>
    </div>
  );
}

/**
 * Visor a pantalla completa con <dialog>: Escape cierra, las flechas cambian de
 * captura y el foco vuelve al botón que lo abrió (lo hace el navegador).
 */
function useLightbox() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const open = (start: number) => {
    setIndex(start);
    dialogRef.current?.showModal();
  };
  return { dialogRef, index, setIndex, open };
}

function Lightbox({
  project,
  views,
  dialogRef,
  index,
  onIndex,
}: {
  project: Project;
  views: string[];
  dialogRef: RefObject<HTMLDialogElement | null>;
  index: number;
  onIndex: (index: number) => void;
}) {
  const src = views[index] ?? views[0]!;
  const many = views.length > 1;
  const step = (delta: number) => onIndex((index + delta + views.length) % views.length);
  const close = () => dialogRef.current?.close();
  const control =
    "grid size-11 place-items-center bg-surface text-ink chamfer transition-colors hover:bg-accent hover:text-on-accent";

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  };
  // Un clic en el fondo (fuera del contenido) cierra el visor.
  const onClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={`Capturas de ${project.title}`}
      onKeyDown={onKeyDown}
      onClick={onClick}
      data-lenis-prevent
      className="lightbox max-h-none max-w-none bg-transparent p-4 sm:p-8"
    >
      <div className="flex w-[min(calc(100vw-2rem),1280px)] flex-col gap-4">
        <div className="flex items-center justify-between gap-4 text-bg dark:text-ink">
          <p className="font-mono text-sm" aria-live="polite">
            {viewLabel(src)}
            {many ? ` (${index + 1} de ${views.length})` : null}
          </p>
          <button type="button" onClick={close} className={control} aria-label="Cerrar">
            <X size={18} weight="bold" aria-hidden="true" />
          </button>
        </div>
        <ProjectImage
          key={src}
          src={src}
          alt={captureAlt(project, src)}
          sizes="100vw"
          eager
          className="lightbox-image block max-h-[78dvh] w-full object-contain"
        />
        {many ? (
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              className={control}
              aria-label="Captura anterior"
            >
              <ArrowLeft size={18} weight="bold" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className={control}
              aria-label="Captura siguiente"
            >
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>
    </dialog>
  );
}

/**
 * La captura queda como figura normal y un botón transparente encima la abre en
 * el visor (un <button> no puede contener una <figure>).
 */
function Openable({
  label,
  onOpen,
  children,
}: {
  label: string;
  onOpen: () => void;
  children: ReactNode;
}) {
  return (
    <div className="group/capture relative">
      {children}
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Ampliar captura: ${label}`}
        className="absolute inset-0 cursor-zoom-in focus-visible:outline-offset-4"
      >
        <span
          aria-hidden="true"
          className="absolute right-3 bottom-3 grid size-10 place-items-center bg-accent text-on-accent opacity-0 transition-opacity duration-300 chamfer group-focus-within/capture:opacity-100 group-hover/capture:opacity-100"
        >
          <ArrowsOut size={18} weight="bold" />
        </span>
      </button>
    </div>
  );
}

function projectViews(project: Project) {
  return [project.image, ...project.gallery].filter((src): src is string => src !== null);
}

/** Captura principal de la página de detalle, justo debajo del encabezado. */
export function ProjectHeroCapture({ project }: { project: Project }) {
  const views = projectViews(project);
  const { dialogRef, index, setIndex, open } = useLightbox();
  const hero = views[0];
  if (!hero) return null;

  return (
    <>
      <Openable label={viewLabel(hero)} onOpen={() => open(0)}>
        <CaptureFrame
          project={project}
          src={hero}
          eager
          sizes="(min-width: 1440px) 1200px, 90vw"
          className="hero-capture"
        />
      </Openable>
      <Lightbox
        project={project}
        views={views}
        dialogRef={dialogRef}
        index={index}
        onIndex={setIndex}
      />
    </>
  );
}

/** Las demás vistas, en cuadrícula, con el mismo visor. */
export function ProjectCaptures({ project }: { project: Project }) {
  const views = projectViews(project);
  const { dialogRef, index, setIndex, open } = useLightbox();
  const rest = views.slice(1);
  if (rest.length === 0) return null;

  return (
    <div>
      <ul className={`grid gap-5 ${rest.length > 1 ? "sm:grid-cols-2" : "max-w-3xl"}`}>
        {rest.map((src, position) => (
          <li key={src} className="reveal">
            <Openable label={viewLabel(src)} onOpen={() => open(position + 1)}>
              <CaptureFrame project={project} src={src} sizes="(min-width: 768px) 40vw, 90vw" />
            </Openable>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm text-ink-soft">
        Capturas reales de la aplicación corriendo con datos de demostración, sin datos de personas
        reales. Haz clic en una para verla en grande.
      </p>
      <Lightbox
        project={project}
        views={views}
        dialogRef={dialogRef}
        index={index}
        onIndex={setIndex}
      />
    </div>
  );
}
