import {
  ArrowLeft,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  MapPin,
  Printer,
} from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { Link } from "react-router";

import type { Route } from "./+types/cv";
import { experience } from "~/data/experience";
import { profile } from "~/data/profile";
import { projects } from "~/data/projects";
import { skills } from "~/data/skills";
import { timeline } from "~/data/timeline";
import { pageMeta } from "~/utils/seo";

export const meta: Route.MetaFunction = () =>
  pageMeta({
    title: "Hoja de vida",
    description:
      "Hoja de vida de Juan David Cova Salgado, desarrollador de software: experiencia, formación, proyectos y trayectoria.",
    path: "/cv",
  });

/** Título de bloque del lado principal, con línea inferior como en la hoja de vida. */
function MainHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="border-b-2 border-brand pb-2 font-display text-xl font-bold tracking-[0.12em] text-brand uppercase">
      {children}
    </h2>
  );
}

/** Título de bloque de la barra lateral. */
function SideHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="border-b-2 border-accent pb-2 font-display text-lg font-bold tracking-[0.12em] uppercase">
      {children}
    </h2>
  );
}

const [firstName, ...lastNames] = profile.fullName.split(" ");

/**
 * Hoja de vida en la web, con la estructura de la HDV de Juan David: barra
 * lateral oscura (foto, contacto, formación, habilidades, idiomas) y columna
 * principal (perfil, experiencia, proyectos y trayectoria). Se imprime en A4.
 */
export default function Cv() {
  return (
    <div className="cv-page mx-auto w-full max-w-[1120px] px-[clamp(12px,4vw,40px)] pt-28 pb-24 md:pt-32 print:max-w-none print:p-0">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Volver al portafolio
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2.5 bg-accent px-5 py-3 font-display text-[13px] font-bold tracking-[0.14em] text-on-accent uppercase transition-colors chamfer hover:bg-accent-hover"
        >
          <Printer size={18} aria-hidden="true" />
          Imprimir o guardar PDF
        </button>
      </div>

      <article
        aria-label="Hoja de vida"
        className="cv-sheet grid overflow-hidden bg-surface shadow-[0_30px_80px_-40px_rgb(43_48_51/0.45)] chamfer-xl md:grid-cols-[300px_1fr] print:shadow-none"
      >
        <aside className="cv-sidebar bg-brand px-7 py-10 text-bg dark:bg-[#0b0e10] dark:text-ink">
          <picture>
            <source srcSet="/img/juan-david-cova-perfil-320.avif" type="image/avif" />
            <img
              src="/img/juan-david-cova-perfil-320.webp"
              alt={`Retrato de ${profile.fullName}`}
              width={320}
              height={320}
              className="mx-auto size-44 rounded-full object-cover ring-4 ring-accent ring-offset-4 ring-offset-brand dark:ring-offset-[#0b0e10]"
            />
          </picture>

          <section className="mt-10" aria-labelledby="cv-contacto">
            <SideHeading>
              <span id="cv-contacto">Contacto</span>
            </SideHeading>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <EnvelopeSimple size={18} aria-hidden="true" className="shrink-0 text-accent" />
                <a
                  href={`mailto:${profile.links.email}`}
                  className="break-all underline decoration-accent underline-offset-4"
                >
                  {profile.links.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <LinkedinLogo size={18} aria-hidden="true" className="shrink-0 text-accent" />
                <a
                  href={profile.links.linkedin}
                  className="break-all underline decoration-accent underline-offset-4"
                >
                  linkedin.com/in/juancovasoftwaredeveloper
                </a>
              </li>
              <li className="flex items-center gap-3">
                <GithubLogo size={18} aria-hidden="true" className="shrink-0 text-accent" />
                <a
                  href={profile.links.github}
                  className="underline decoration-accent underline-offset-4"
                >
                  github.com/JuanDCova
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} aria-hidden="true" className="shrink-0 text-accent" />
                {profile.location}
              </li>
            </ul>
          </section>

          <section className="mt-9" aria-labelledby="cv-educacion">
            <SideHeading>
              <span id="cv-educacion">Educación</span>
            </SideHeading>
            <ul className="mt-4 space-y-5 text-sm">
              {profile.education.map((item) => (
                <li key={item.program}>
                  <p className="font-bold">{item.institution}</p>
                  <p className="mt-1 opacity-85">{item.program}</p>
                  {item.status ? <p className="mt-1 text-accent">{item.status}</p> : null}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-9" aria-labelledby="cv-habilidades">
            <SideHeading>
              <span id="cv-habilidades">Habilidades</span>
            </SideHeading>
            <ul className="mt-4 space-y-2 text-sm">
              {profile.competencies.map((skill) => (
                <li key={skill} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-[7px] size-1.5 shrink-0 rotate-45 bg-accent"
                  />
                  {skill}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-9" aria-labelledby="cv-stack">
            <SideHeading>
              <span id="cv-stack">Stack</span>
            </SideHeading>
            <dl className="mt-4 space-y-3 text-sm">
              {skills.map((category) => (
                <div key={category.id}>
                  <dt className="font-bold">{category.name}</dt>
                  <dd className="mt-0.5 opacity-85">{category.technologies.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-9" aria-labelledby="cv-idiomas">
            <SideHeading>
              <span id="cv-idiomas">Idiomas</span>
            </SideHeading>
            <ul className="mt-4 space-y-1.5 text-sm">
              {profile.languages.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </section>
        </aside>

        <div className="px-[clamp(20px,4vw,48px)] py-10">
          <header>
            <h1 className="font-display text-[clamp(34px,5vw,56px)] leading-none tracking-[0.01em] text-brand uppercase">
              <span className="font-bold">{firstName}</span> {lastNames.join(" ")}
            </h1>
            <p className="mt-3 font-display text-lg tracking-[0.14em] text-ink-soft uppercase">
              Desarrollador de software
            </p>
            <span aria-hidden="true" className="mt-4 block h-1 w-20 bg-accent" />
          </header>

          <section className="mt-10" aria-labelledby="cv-perfil">
            <MainHeading>
              <span id="cv-perfil">Perfil</span>
            </MainHeading>
            <p className="mt-4 leading-relaxed text-ink-soft">{profile.cvSummary}</p>
          </section>

          <section className="mt-10" aria-labelledby="cv-experiencia">
            <MainHeading>
              <span id="cv-experiencia">Experiencia laboral</span>
            </MainHeading>
            <ol className="relative mt-6 space-y-8 border-l-2 border-brand pl-6">
              {experience.map((entry) => (
                <li key={entry.id} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-1 -left-[31px] size-3 rotate-45 border-2 border-accent-border bg-accent"
                  />
                  <p className="font-display text-lg font-bold text-brand">{entry.role}</p>
                  <p className="font-semibold text-ink">{entry.organization}</p>
                  <p className="font-mono text-sm text-accent-ink">{entry.period}</p>
                  <p className="mt-2 leading-relaxed text-ink-soft">{entry.summary}</p>
                  {entry.id === "unicorsalud" ? (
                    <p className="mt-2 leading-relaxed text-ink-soft">
                      <span className="font-semibold text-ink">Proyecto destacado: </span>
                      <Link
                        to="/proyectos/erp-educacion-superior"
                        className="text-accent-ink underline underline-offset-4"
                      >
                        ERP Universitario
                      </Link>
                      , plataforma modular con backend Django REST, frontend React con TypeScript,
                      PostgreSQL y Docker, con énfasis en validación de datos, APIs, seguridad y
                      separación de responsabilidades.
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-10 break-inside-avoid" aria-labelledby="cv-trayectoria">
            <MainHeading>
              <span id="cv-trayectoria">Trayectoria</span>
            </MainHeading>
            <ol className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {timeline.map((milestone) => (
                <li key={milestone.title} className="border-l-2 border-accent pl-4">
                  <p className="font-mono text-xs font-semibold text-accent-ink uppercase">
                    {milestone.date}
                  </p>
                  <p className="mt-1 font-semibold text-ink">
                    {milestone.slug ? (
                      <Link
                        to={`/proyectos/${milestone.slug}`}
                        className="text-accent-ink underline decoration-accent/50 underline-offset-4 hover:decoration-current"
                      >
                        {milestone.title}
                      </Link>
                    ) : (
                      milestone.title
                    )}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{milestone.detail}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-10" aria-labelledby="cv-proyectos">
            <MainHeading>
              <span id="cv-proyectos">Proyectos</span>
            </MainHeading>
            <ul className="mt-5 divide-y divide-line">
              {projects.map((project) => (
                <li key={project.slug} className="break-inside-avoid py-3.5">
                  <p className="font-semibold text-ink">
                    <Link
                      to={`/proyectos/${project.slug}`}
                      className="text-accent-ink underline decoration-accent/50 underline-offset-4 hover:decoration-current"
                    >
                      {project.title}
                    </Link>
                    <span className="font-normal text-ink-soft">, {project.subtitle}</span>
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    {project.role}. {project.technologies.slice(0, 6).join(", ")}.
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10" aria-labelledby="cv-referencias">
            <MainHeading>
              <span id="cv-referencias">Referencias</span>
            </MainHeading>
            <p className="mt-4 text-ink-soft">
              Referencias laborales disponibles a solicitud por{" "}
              <a
                href={`mailto:${profile.links.email}`}
                className="text-accent-ink underline underline-offset-4"
              >
                correo
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
