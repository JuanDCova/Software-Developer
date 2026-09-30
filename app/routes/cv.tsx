import { Printer } from "@phosphor-icons/react";

import type { Route } from "./+types/cv";
import { Pending } from "~/components/common/pending";
import { experience } from "~/data/experience";
import { profile } from "~/data/profile";
import { projects } from "~/data/projects";
import { skills } from "~/data/skills";
import { pageMeta } from "~/utils/seo";

export const meta: Route.MetaFunction = () =>
  pageMeta({
    title: "CV",
    description: "Hoja de vida de Juan David Cova, desarrollador full stack. Versión imprimible.",
    path: "/cv",
  });

function CvSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid break-inside-avoid gap-4 border-t border-line py-8 md:grid-cols-[10rem_1fr] print:grid-cols-[8rem_1fr] print:py-4">
      <h2 className="font-display text-lg font-semibold text-brand">{title}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

/** CV en una página imprimible. El botón usa el diálogo de impresión para guardar en PDF. */
export default function Cv() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 pt-36 pb-24 sm:px-6 md:pt-44 print:max-w-none print:p-0">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <header>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-brand md:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-2 text-lg text-ink-soft">{profile.headline}</p>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-ink-soft">
            <span>{profile.location}</span>
            <a href={profile.links.github} className="underline underline-offset-4">
              github.com/JuanDCova
            </a>
            {profile.links.email ?? <Pending label="Correo" />}
            {profile.links.linkedin ?? <Pending label="LinkedIn" />}
          </p>
        </header>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex h-11 items-center gap-2 rounded-control bg-accent px-4 text-sm font-semibold text-on-accent active:scale-[0.98] print:hidden"
        >
          <Printer size={18} aria-hidden="true" />
          Imprimir o guardar PDF
        </button>
      </div>

      <div className="mt-12">
        <CvSection title="Perfil">
          <p className="max-w-[70ch] leading-relaxed">{profile.intro}</p>
          <p className="mt-3 max-w-[70ch] leading-relaxed text-ink-soft">{profile.about[0]}</p>
        </CvSection>

        <CvSection title="Experiencia">
          <ul className="space-y-6">
            {experience.map((entry) => (
              <li key={entry.id}>
                <p className="font-semibold">
                  {entry.organization}
                  <span className="font-normal text-ink-soft">
                    {" "}
                    {entry.role ?? <Pending label="Cargo" />}{" "}
                    {entry.period ?? <Pending label="Periodo" />}
                  </span>
                </p>
                <p className="mt-1 max-w-[70ch] leading-relaxed text-ink-soft">{entry.summary}</p>
              </li>
            ))}
          </ul>
        </CvSection>

        <CvSection title="Proyectos">
          <ul className="space-y-5">
            {projects.map((project) => (
              <li key={project.slug}>
                <p className="font-semibold">
                  {project.title}
                  <span className="font-normal text-ink-soft">, {project.subtitle}</span>
                </p>
                <p className="mt-1 text-ink-soft">
                  {project.role}. {project.technologies.slice(0, 6).join(", ")}.
                </p>
              </li>
            ))}
          </ul>
        </CvSection>

        <CvSection title="Stack">
          <dl className="grid gap-3 sm:grid-cols-2">
            {skills.map((category) => (
              <div key={category.id}>
                <dt className="font-semibold">{category.name}</dt>
                <dd className="text-ink-soft">{category.technologies.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </CvSection>

        <CvSection title="Formación">
          <Pending label="Formación académica" />
        </CvSection>
      </div>
    </div>
  );
}
