import { useRef } from "react";

import { Pending } from "~/components/common/pending";
import { Section } from "~/components/common/section";
import { TagList } from "~/components/common/tag";
import { experience } from "~/data/experience";
import { useMotion } from "~/motion/use-motion";

export function Experience() {
  const listRef = useRef<HTMLDivElement>(null);

  // La línea de tiempo se llena a medida que se recorre la sección.
  useMotion(listRef, ({ gsap, MOTION_OK }, mm, list) => {
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        list.querySelector("[data-progress]"),
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: list, start: "top 70%", end: "bottom 60%", scrub: true },
        },
      );
    });
  });

  return (
    <Section id="experiencia" title="Experiencia" accent="laboral">
      <div ref={listRef} className="relative">
        <span
          aria-hidden="true"
          data-progress
          className="absolute top-0 left-0 z-10 h-full w-px origin-top bg-accent"
        />
        <ol className="relative space-y-12 border-l border-line pl-8 md:pl-12">
          {experience.map((entry) => (
            <li key={entry.id} className="reveal relative">
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-[38px] size-3 rotate-45 border-2 border-accent-border bg-accent md:-left-[54px]"
              />
              <div className="font-mono text-sm text-ink-soft">
                {entry.period ?? <Pending label="Periodo" />}
              </div>
              <h3 className="mt-3 display-heading text-[clamp(22px,2.6vw,30px)] text-brand">
                {entry.organization}
              </h3>
              <div className="mt-2 font-display font-bold tracking-[0.06em] text-ink uppercase">
                {entry.role ?? <Pending label="Cargo" />}
              </div>
              <p className="mt-4 max-w-[65ch] leading-relaxed text-ink">{entry.summary}</p>
              {entry.technologies.length > 0 ? (
                <div className="mt-4">
                  <TagList items={entry.technologies} label="Tecnologías" />
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
