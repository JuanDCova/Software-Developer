import { Link } from "react-router";

import { Section } from "~/components/common/section";
import { projectsUsing, skills } from "~/data/skills";

import { TechnologyNetwork } from "./technology-network";

/**
 * Stack sin porcentajes: cada tecnología muestra los proyectos donde se usó.
 * Arriba va la red de tecnologías (escritorio); las listas son la versión
 * accesible y la única vista en mobile.
 */
export function Stack() {
  return (
    <Section
      id="stack"
      title="Stack"
      accent="tecnológico"
      lead="Sin porcentajes de dominio. Cada tecnología enlaza a los proyectos donde la usé."
    >
      <div className="reveal mb-16 md:mb-24">
        <TechnologyNetwork />
      </div>
      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
        {skills.map((category) => (
          <div key={category.id} className="reveal">
            <h3 className="border-b-2 border-brand pb-3 display-heading text-lg text-brand">
              {category.name}
            </h3>
            <ul className="mt-4 space-y-4">
              {category.technologies.map((technology) => {
                const evidence = projectsUsing(technology);
                return (
                  <li key={technology}>
                    <p className="font-mono text-sm text-ink">{technology}</p>
                    <p className="mt-1 text-sm text-ink-soft">
                      {evidence.map((project, index) => (
                        <span key={project.slug}>
                          <Link
                            to={`/proyectos/${project.slug}`}
                            className="underline decoration-line-strong underline-offset-4 hover:text-accent-ink hover:decoration-current"
                          >
                            {project.title}
                          </Link>
                          {index < evidence.length - 1 ? ", " : null}
                        </span>
                      ))}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
