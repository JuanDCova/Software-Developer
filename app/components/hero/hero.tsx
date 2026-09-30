import { ArrowRight } from "@phosphor-icons/react";

import { ButtonLink } from "~/components/common/button-link";
import { profile } from "~/data/profile";

import { PhotoFrame } from "./photo-frame";

/**
 * Hero asimétrico: texto a la izquierda, foto a la derecha.
 * Cuatro elementos de texto como máximo: nombre, titular, bajada y CTAs.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-titulo"
      className="mx-auto grid min-h-[100dvh] w-full max-w-6xl items-center gap-12 px-4 pt-28 pb-16 sm:px-6 md:grid-cols-[1.25fr_0.75fr] md:gap-16 md:pt-24"
    >
      <div className="hero-enter">
        <p
          className="text-base font-medium text-ink-soft"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          {profile.name}
        </p>
        <h1
          id="hero-titulo"
          className="mt-4 font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-brand sm:text-5xl lg:text-6xl"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {profile.headline}
        </h1>
        <p
          className="mt-6 max-w-[48ch] text-lg leading-relaxed text-ink-soft"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          {profile.intro}
        </p>
        <div
          className="mt-10 flex flex-wrap items-center gap-3"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <ButtonLink to="/#proyectos">
            Ver proyectos
            <ArrowRight size={16} weight="bold" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink to="/cv" variant="secondary">
            Ver CV
          </ButtonLink>
        </div>
      </div>

      <div className="mx-auto w-full max-w-xs md:max-w-none">
        <PhotoFrame />
      </div>
    </section>
  );
}
