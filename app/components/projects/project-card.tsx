import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router";

import { ArchitectureDiagram } from "~/components/architecture/architecture-diagram";
import { TagList } from "~/components/common/tag";
import { statusLabels } from "~/data/projects";
import type { Project } from "~/data/types";

type Tone = "accent" | "neutral" | "deep";

const tones: Record<Tone, string> = {
  accent: "bg-accent-soft",
  neutral: "bg-surface-2",
  deep: "bg-surface",
};

interface ProjectCardProps {
  project: Project;
  /** La card principal del bento muestra la arquitectura con más detalle. */
  size?: "large" | "regular";
  tone?: Tone;
  headingLevel?: "h3" | "h2";
}

/**
 * Card de proyecto. El visual es la arquitectura real del sistema, no una
 * captura inventada: las capturas con datos demo llegan con el contenido.
 */
export function ProjectCard({
  project,
  size = "regular",
  tone = "neutral",
  headingLevel: Heading = "h3",
}: ProjectCardProps) {
  const visibleTech = project.technologies.slice(0, size === "large" ? 6 : 4);

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden chamfer-xl ${tones[tone]} transition-transform duration-300 hover:-translate-y-0.5`}
    >
      {project.architecture && project.image === null ? (
        <div className="p-4 pb-0 sm:p-6 sm:pb-0">
          <ArchitectureDiagram
            architecture={project.architecture}
            variant={size === "large" ? "full" : "compact"}
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="font-mono text-xs text-ink-soft">
          {project.category}, {project.year}. {statusLabels[project.status]}
        </p>
        <Heading className="mt-3 display-heading text-[28px] text-brand">
          <Link
            to={`/proyectos/${project.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none after:focus-visible:rounded-card after:focus-visible:outline-2 after:focus-visible:outline-accent"
          >
            {project.title}
          </Link>
        </Heading>
        <p className="mt-2 leading-relaxed text-ink-soft">{project.description}</p>

        <div className="mt-6">
          <TagList items={visibleTech} label="Tecnologías principales" />
        </div>

        <p className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold text-accent-ink">
          Ver proyecto
          <ArrowUpRight
            size={16}
            weight="bold"
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </p>
      </div>
    </article>
  );
}
