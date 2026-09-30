import { ArrowRight, Database, Stack, Vault } from "@phosphor-icons/react";

import { ButtonLink } from "~/components/common/button-link";
import { StairHeading } from "~/components/common/section";
import { PhotoFrame } from "~/components/hero/photo-frame";
import { profile } from "~/data/profile";

const principleIcons = [Stack, Database, Vault];

/**
 * Sobre mí al estilo de la referencia: texto a la izquierda y la foto pegada al
 * borde derecho de la pantalla, teñida de cian (se destiñe al pasar el cursor).
 */
export function About() {
  return (
    <section
      id="sobre-mi"
      aria-labelledby="sobre-mi-titulo"
      className="bg-[linear-gradient(180deg,var(--bg)_0%,var(--surface)_18%,var(--surface)_100%)]"
    >
      <div className="mx-auto flex w-full max-w-[90rem] flex-wrap items-center gap-10 py-[clamp(60px,10vw,140px)] pl-[clamp(20px,9vw,118px)]">
        <div className="reveal min-w-[280px] flex-[1_1_420px] pr-5">
          <StairHeading id="sobre-mi-titulo" title="Sobre" accent="mí" />
          <div className="mt-8 max-w-[520px] space-y-5 pl-[min(160px,18vw)] text-[clamp(15px,1.6vw,17px)] leading-[1.7] text-ink-soft">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-9 pl-[min(160px,18vw)]">
            <ButtonLink to="/cv" trail>
              Ver trayectoria
            </ButtonLink>
          </div>
        </div>

        <div className="reveal relative flex min-w-[260px] flex-[1_1_360px] justify-end">
          <PhotoFrame />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[90rem] px-[clamp(20px,9vw,118px)] pb-[clamp(60px,8vw,110px)]">
        <p className="reveal max-w-[62ch] border-l-4 border-accent bg-accent-soft p-6 leading-relaxed text-ink chamfer-lg">
          {profile.aiStatement}
        </p>

        <ul className="mt-14 grid gap-10 md:grid-cols-3" aria-label="Principios de trabajo">
          {profile.principles.map((principle, index) => {
            const Icon = principleIcons[index] ?? Stack;
            return (
              <li key={principle.title} className="reveal border-t-2 border-brand pt-6">
                <Icon size={26} aria-hidden="true" className="text-accent-display" />
                <h3 className="mt-4 display-heading text-xl text-brand">{principle.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{principle.body}</p>
              </li>
            );
          })}
        </ul>

        <div className="reveal mt-16">
          <h3 className="font-display text-sm font-bold tracking-[0.14em] text-ink uppercase">
            Cómo construyo
          </h3>
          <ol className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm text-ink-soft">
            {profile.process.map((step, index) => (
              <li key={step} className="inline-flex items-center gap-3">
                <span className="text-ink">{step}</span>
                {index < profile.process.length - 1 ? (
                  <ArrowRight size={14} aria-hidden="true" className="text-accent-display" />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
