import { Pending } from "~/components/common/pending";
import { Section } from "~/components/common/section";
import { Tag } from "~/components/common/tag";
import { experience } from "~/data/experience";

export function Experience() {
  return (
    <Section id="experiencia" title="Experiencia">
      <ol className="relative space-y-12 border-l border-line pl-8 md:pl-12">
        {experience.map((entry) => (
          <li key={entry.id} className="reveal relative">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[37px] size-2.5 rounded-full border-2 border-accent bg-bg md:-left-[53px]"
            />
            <div className="font-mono text-sm text-ink-soft">
              {entry.period ?? <Pending label="Periodo" />}
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold text-brand">
              {entry.organization}
            </h3>
            <div className="mt-1 text-ink-soft">{entry.role ?? <Pending label="Cargo" />}</div>
            <p className="mt-4 max-w-[65ch] leading-relaxed text-ink">{entry.summary}</p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tecnologías">
              {entry.technologies.map((technology) => (
                <li key={technology}>
                  <Tag>{technology}</Tag>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
