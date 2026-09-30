import { Link } from "react-router";

import { Section } from "~/components/common/section";
import { projectsUsing, skills } from "~/data/skills";

/**
 * Stack sin porcentajes: cada tecnología muestra los proyectos donde se usó.
 * Es la versión accesible de la Technology Network de la spec; la red visual
 * se monta sobre estos mismos datos en la tanda de motion.
 */
export function Stack() {
  return (
    <Section
      id="stack"
      title="Stack"
      lead="Sin porcentajes de dominio. Cada tecnología enlaza a los proyectos donde la usé."
    >
      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
        {skills.map((category) => (
          <div key={category.id} className="reveal">
            <h3 className="border-b border-line pb-3 font-display text-lg font-semibold text-brand">
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
