import { ArrowLeft, ArrowRight, GithubLogo, LockSimple, Robot } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { Link } from "react-router";

import type { Route } from "./+types/proyecto";
import { ArchitectureDiagram } from "~/components/architecture/architecture-diagram";
import { Tag } from "~/components/common/tag";
import { getProjectBySlug, projects, statusLabels } from "~/data/projects";
import { NotFound } from "~/routes/404";
import { pageMeta } from "~/utils/seo";

export const meta: Route.MetaFunction = ({ params }) => {
  const project = getProjectBySlug(params.slug);
  if (!project) return pageMeta({ title: "Página no encontrada", path: "/404" });
  return pageMeta({
    title: project.title,
    description: project.description,
    path: `/proyectos/${project.slug}`,
  });
};

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="reveal border-t border-line py-12 md:py-16">
      <div className="grid gap-6 md:grid-cols-[14rem_1fr] md:gap-12">
        <h2 id={id} className="font-display text-2xl font-semibold text-brand">
          {title}
        </h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="grid grid-cols-[auto_1fr] gap-3 leading-relaxed">
          <span aria-hidden="true" className="mt-2.5 h-px w-3 bg-accent" />
          <span className="max-w-[65ch]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Proyecto({ params }: Route.ComponentProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) return <NotFound />;

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="mx-auto w-full max-w-6xl px-4 pt-36 pb-24 sm:px-6 md:pt-44">
      <Link
        to="/proyectos"
        className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Todos los proyectos
      </Link>

      <header className="mt-8 max-w-4xl">
        <p className="font-mono text-sm text-ink-soft">
          {project.category}, {project.year}. {statusLabels[project.status]}
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance text-brand md:text-6xl">
          {project.title}
        </h1>
        <p className="mt-3 text-xl text-ink-soft">{project.subtitle}</p>
        <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-ink">
          {project.longDescription}
        </p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-control border border-line-strong px-4 font-semibold hover:bg-surface-2"
            >
              <GithubLogo size={18} aria-hidden="true" />
              Código en GitHub
            </a>
          ) : null}
          {project.confidential ? (
            <p className="inline-flex items-center gap-2 text-ink-soft">
              <LockSimple size={18} aria-hidden="true" />
              Código y datos privados de un tercero: sin repositorio ni capturas reales.
            </p>
          ) : null}
        </div>
      </header>

      <div className="mt-16">
        <Block id="problema" title="Problema">
          <p className="max-w-[65ch] text-lg leading-relaxed">{project.problem}</p>
        </Block>

        <Block id="solucion" title="Solución">
          <p className="max-w-[65ch] text-lg leading-relaxed">{project.solution}</p>
        </Block>

        <Block id="mi-rol" title="Mi rol">
          <p className="font-semibold text-ink">{project.role}</p>
          <p className="mt-1 text-ink-soft">{project.team}</p>
          <div className="mt-6">
            <List items={project.myRole} />
          </div>
          {project.aiAssisted ? (
            <p className="mt-8 grid max-w-[65ch] grid-cols-[auto_1fr] gap-3 rounded-component bg-accent-soft p-5 leading-relaxed">
              <Robot size={22} aria-hidden="true" className="text-accent-ink" />
              <span>{project.aiAssisted}</span>
            </p>
          ) : null}
        </Block>

        {project.architecture ? (
          <Block id="arquitectura" title="Arquitectura">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
              <ArchitectureDiagram architecture={project.architecture} />
              <div>
                <h3 className="font-semibold text-ink">Decisiones</h3>
                <div className="mt-4">
                  <List items={project.architecture.decisions} />
                </div>
              </div>
            </div>
          </Block>
        ) : null}

        <Block id="tecnologia" title="Tecnología">
          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <li key={technology}>
                <Tag>{technology}</Tag>
              </li>
            ))}
          </ul>
        </Block>

        <Block id="funcionalidades" title="Funcionalidades">
          <ul className="grid gap-4 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="rounded-component border border-line bg-surface p-5 leading-relaxed"
              >
                {feature}
              </li>
            ))}
          </ul>
        </Block>

        <Block id="retos" title="Retos">
          <List items={project.challenges} />
        </Block>

        <Block id="resultados" title="Resultados">
          {project.results.length > 0 ? (
            <List items={project.results} />
          ) : (
            <p className="max-w-[65ch] leading-relaxed text-ink-soft">
              Todavía no hay métricas verificadas para publicar. Este espacio se llena solo con
              datos que se puedan comprobar.
            </p>
          )}
        </Block>
      </div>

      {next && next.slug !== project.slug ? (
        <nav aria-label="Siguiente proyecto" className="mt-8 border-t border-line pt-12">
          <Link
            to={`/proyectos/${next.slug}`}
            className="group inline-flex flex-col gap-2 text-brand"
          >
            <span className="text-sm text-ink-soft">Siguiente proyecto</span>
            <span className="inline-flex items-center gap-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {next.title}
              <ArrowRight
                size={28}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </Link>
        </nav>
      ) : null}
    </article>
  );
}
