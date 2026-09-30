import { ArrowRight } from "@phosphor-icons/react";
import { Fragment } from "react";
import type { CSSProperties } from "react";

import { ButtonLink } from "~/components/common/button-link";
import { profile } from "~/data/profile";

import { HeroBackdrop } from "./hero-backdrop";
import { PhotoFrame } from "./photo-frame";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * Hero asimétrico: texto a la izquierda, foto a la derecha y la red 3D detrás.
 * Cuatro elementos de texto como máximo: nombre, titular, bajada y CTAs.
 */
export function Hero() {
  const words = profile.headline.split(" ");

  return (
    <section aria-labelledby="hero-titulo" className="relative isolate overflow-hidden">
      <HeroBackdrop />
      <div className="mx-auto grid min-h-[100dvh] w-full max-w-6xl items-center gap-12 px-4 pt-28 pb-16 sm:px-6 md:grid-cols-[1.25fr_0.75fr] md:gap-16 md:pt-24">
        <div className="hero-enter">
          <p className="text-base font-medium text-ink-soft" style={order(0)}>
            {profile.name}
          </p>
          <h1
            id="hero-titulo"
            className="kinetic mt-4 font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-brand sm:text-5xl lg:text-6xl"
            style={order(1)}
          >
            {words.map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                <span className="kinetic-word" style={order(index)}>
                  {word}
                </span>
                {index < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </h1>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-ink-soft" style={order(2)}>
            {profile.intro}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3" style={order(3)}>
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
      </div>
    </section>
  );
}
