import { ArrowRight, Database, Stack, Vault } from "@phosphor-icons/react";

import { Section } from "~/components/common/section";
import { profile } from "~/data/profile";

const principleIcons = [Stack, Database, Vault];

export function About() {
  return (
    <Section id="sobre-mi" title="Sobre mí">
      <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <div className="reveal space-y-6 text-lg leading-relaxed text-ink">
          {profile.about.map((paragraph) => (
            <p key={paragraph} className="max-w-[60ch]">
              {paragraph}
            </p>
          ))}
          <p className="max-w-[60ch] rounded-component bg-accent-soft p-5 text-base leading-relaxed text-ink">
            {profile.aiStatement}
          </p>
        </div>

        <ul className="reveal space-y-8" aria-label="Principios de trabajo">
          {profile.principles.map((principle, index) => {
            const Icon = principleIcons[index] ?? Stack;
            return (
              <li key={principle.title} className="grid grid-cols-[auto_1fr] gap-4">
                <span className="mt-1 inline-flex size-10 items-center justify-center rounded-control bg-surface-2 text-accent-ink">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-brand">
                    {principle.title}
                  </h3>
                  <p className="mt-1 leading-relaxed text-ink-soft">{principle.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="reveal mt-16 border-t border-line pt-8">
        <h3 className="text-sm font-semibold text-ink">Cómo construyo</h3>
        <ol className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm text-ink-soft">
          {profile.process.map((step, index) => (
            <li key={step} className="inline-flex items-center gap-3">
              <span className="text-ink">{step}</span>
              {index < profile.process.length - 1 ? (
                <ArrowRight size={14} aria-hidden="true" className="text-line-strong" />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
