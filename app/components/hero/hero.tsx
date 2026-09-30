import { Fragment } from "react";
import type { CSSProperties } from "react";

import { ButtonLink } from "~/components/common/button-link";
import { profile } from "~/data/profile";

import { HeroBackdrop } from "./hero-backdrop";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

/** Sangría de la segunda mitad del titular escalonado (igual que el CTA). */
const STAIR = "min(238px,28vw)";

/**
 * Hero escalonado: tres líneas a la izquierda y tres desplazadas, la última en
 * cian. Detrás, la red 3D (escritorio) o su póster (mobile) ocupa la derecha
 * y un velo del color de fondo protege la lectura.
 */
export function Hero() {
  const [first, second] = profile.heroLines;

  return (
    <section
      aria-labelledby="hero-titulo"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-bg pt-[72px]"
    >
      <HeroBackdrop />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 hidden w-[70%] bg-[linear-gradient(90deg,var(--bg)_0%,var(--bg)_55%,color-mix(in_srgb,var(--bg)_85%,transparent)_78%,transparent_100%)] md:block"
      />

      <div className="hero-enter mt-[300px] flex flex-1 flex-col justify-center px-5 pb-10 md:mt-0 md:pr-5 md:pb-[min(clamp(36px,6vw,80px),7vh)] md:pl-[clamp(20px,9vw,118px)]">
        <p
          className="font-display text-[clamp(12px,1.4vw,14px)] font-bold tracking-[0.14em] text-ink-soft uppercase"
          style={order(0)}
        >
          {profile.name}, desarrollador full stack
        </p>

        <h1
          id="hero-titulo"
          className="mt-[min(clamp(20px,3vw,40px),4vh)] display-heading text-[clamp(34px,10vw,56px)] text-brand md:text-[min(clamp(34px,7.6vw,80px),9.2vh)]"
        >
          {[...first, ...second].map((word, index) => (
            <Fragment key={word}>
              <span
                className="block"
                style={index >= first.length ? { paddingLeft: STAIR } : undefined}
              >
                <span
                  className={`kinetic-word ${index === first.length + second.length - 1 ? "text-accent-display" : ""}`}
                  style={order(index)}
                >
                  {word}
                </span>
              </span>
              {index < first.length + second.length - 1 ? " " : null}
            </Fragment>
          ))}
        </h1>

        <div
          className="mt-[min(clamp(24px,4vw,44px),5vh)] md:pl-[min(238px,28vw)]"
          style={order(2)}
        >
          <p className="max-w-[46ch] text-[clamp(15px,1.6vw,17px)] leading-[1.7] text-ink-soft">
            {profile.intro}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ButtonLink to="/#proyectos" trail>
              Ver proyectos
            </ButtonLink>
            <ButtonLink to="/cv" variant="secondary">
              Ver CV
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
