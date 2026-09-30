import { ArrowRight, ArrowUpRight, LockSimple } from "@phosphor-icons/react";
import { useRef } from "react";
import { Link } from "react-router";

import { ArchitectureDiagram } from "~/components/architecture/architecture-diagram";
import { ButtonLink } from "~/components/common/button-link";
import { StairHeading } from "~/components/common/section";
import { Tag } from "~/components/common/tag";
import { getFeaturedProjects, projects, statusLabels } from "~/data/projects";
import type { Project } from "~/data/types";
import { useMotion } from "~/motion/use-motion";

const tones = ["bg-accent-soft", "bg-surface-2", "bg-surface"];

function Panel({ project, tone }: { project: Project; tone: string }) {
  return (
    <article
      className={`showcase-panel group relative grid gap-8 overflow-hidden p-6 chamfer-xl sm:p-8 lg:grid-cols-[1fr_1.05fr] lg:gap-10 ${tone}`}
    >
      <div className="flex flex-col">
        <p className="font-mono text-xs text-ink-soft">
          {project.category}, {project.year}. {statusLabels[project.status]}
        </p>
        <h3 className="mt-4 display-heading text-[clamp(30px,4vw,52px)] text-brand">
          <Link
            to={`/proyectos/${project.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none after:focus-visible:rounded-card after:focus-visible:outline-2 after:focus-visible:outline-accent"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-lg text-ink-soft">{project.subtitle}</p>
        <p className="mt-6 max-w-[52ch] leading-relaxed text-ink">{project.description}</p>

        <p className="mt-6 text-sm font-semibold text-ink">{project.role}</p>
        <p className="mt-1 max-w-[52ch] text-sm leading-relaxed text-ink-soft">
          {project.myRole[0]}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tecnologías principales">
          {project.technologies.slice(0, 6).map((technology) => (
            <li key={technology}>
              <Tag>{technology}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-8 text-sm">
          <span className="inline-flex items-center gap-1.5 font-semibold text-accent-ink">
            Ver caso completo
            <ArrowUpRight
              size={16}
              weight="bold"
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
          {project.confidential ? (
            <span className="inline-flex items-center gap-1.5 text-ink-soft">
              <LockSimple size={16} aria-hidden="true" />
              Código privado
            </span>
          ) : null}
        </div>
      </div>

      {project.architecture ? (
        <div className="self-center">
          <ArchitectureDiagram architecture={project.architecture} variant="dense" />
        </div>
      ) : null}
    </article>
  );
}

/**
 * Showcase de proyectos destacados. En escritorio con movimiento permitido la
 * sección se fija y los casos avanzan en horizontal con el scroll; en mobile,
 * con reduced motion o sin JavaScript se leen apilados.
 */
export function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const featured = getFeaturedProjects();

  useMotion(sectionRef, ({ gsap, DESKTOP_MOTION }, mm, section) => {
    mm.add(DESKTOP_MOTION, () => {
      const track = section.querySelector<HTMLElement>(".showcase-track");
      if (!track) return;
      section.classList.add("is-horizontal");
      const distance = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => section.classList.remove("is-horizontal");
    });
  });

  return (
    <section
      ref={sectionRef}
      id="proyectos"
      aria-labelledby="proyectos-titulo"
      className="showcase py-[clamp(72px,10vw,140px)]"
    >
      <div className="mx-auto w-full max-w-[90rem] px-[clamp(20px,9vw,118px)]">
        <div className="reveal">
          <StairHeading id="proyectos-titulo" title="Proyectos" accent="destacados" />
          <p className="showcase-lead mt-8 max-w-[520px] pl-[min(160px,18vw)] text-[clamp(15px,1.6vw,17px)] leading-[1.7] text-ink-soft">
            Casos reales con el problema, la arquitectura y lo que hice yo en cada uno.
          </p>
        </div>
      </div>

      <div className="showcase-viewport mt-12 md:mt-16">
        <ul className="showcase-track">
          {featured.map((project, index) => (
            <li key={project.slug} className="showcase-item reveal">
              <Panel project={project} tone={tones[index % tones.length] ?? tones[0]!} />
            </li>
          ))}
          <li className="showcase-item showcase-end">
            <div className="flex h-full flex-col justify-center gap-6 border-2 border-dashed border-line-strong p-8 sm:p-10">
              <p className="display-heading text-[clamp(24px,2.6vw,34px)] text-brand">
                {projects.length - featured.length} proyectos más, con el mismo nivel de detalle.
              </p>
              <div>
                <ButtonLink to="/proyectos" variant="secondary">
                  Ver los {projects.length} proyectos
                  <ArrowRight size={16} weight="bold" aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
