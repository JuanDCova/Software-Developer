import { ArrowRight } from "@phosphor-icons/react";

import { ButtonLink } from "~/components/common/button-link";
import { Section } from "~/components/common/section";
import { getFeaturedProjects, projects } from "~/data/projects";

import { ProjectCard } from "./project-card";

/** Bento de tres casos: uno grande y dos apilados, cada uno con fondo distinto. */
export function FeaturedProjects() {
  const [main, ...rest] = getFeaturedProjects();
  if (!main) return null;
  const tones = ["neutral", "deep"] as const;

  return (
    <Section
      id="proyectos"
      title="Proyectos"
      lead="Casos reales con el problema, la arquitectura y lo que hice yo en cada uno."
    >
      <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        <div className="reveal">
          <ProjectCard project={main} size="large" tone="accent" />
        </div>
        <div className="grid gap-6">
          {rest.map((project, index) => (
            <div key={project.slug} className="reveal">
              <ProjectCard project={project} tone={tones[index % tones.length]} />
            </div>
          ))}
        </div>
      </div>

      <div className="reveal mt-12">
        <ButtonLink to="/proyectos" variant="secondary">
          Ver los {projects.length} proyectos
          <ArrowRight size={16} weight="bold" aria-hidden="true" />
        </ButtonLink>
      </div>
    </Section>
  );
}
