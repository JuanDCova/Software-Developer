import type { Route } from "./+types/proyectos";
import { ProjectCard } from "~/components/projects/project-card";
import { projects } from "~/data/projects";
import { pageMeta } from "~/utils/seo";

export const meta: Route.MetaFunction = () =>
  pageMeta({
    title: "Proyectos",
    description:
      "ERP, logística, LMS y comercio: proyectos de Juan David Cova con el problema, la arquitectura y su rol en cada uno.",
    path: "/proyectos",
  });

export default function Proyectos() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-36 pb-24 sm:px-6 md:pt-44">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-brand md:text-6xl">
        Proyectos
      </h1>
      <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-ink-soft">
        Cada caso dice qué problema resuelve, cómo está construido y qué parte hice yo. Cuando una
        IA escribió parte del código, también lo digo.
      </p>

      <ul className="mt-14 grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <li key={project.slug} className="reveal">
            <ProjectCard
              project={project}
              tone={index % 3 === 0 ? "accent" : index % 3 === 1 ? "neutral" : "deep"}
              headingLevel="h2"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
