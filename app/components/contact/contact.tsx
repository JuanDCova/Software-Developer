import { EnvelopeSimple, FileText, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { Link } from "react-router";

import { Pending } from "~/components/common/pending";
import { profile } from "~/data/profile";

interface ContactLink {
  label: string;
  href: string | null;
  display: string;
  icon: Icon;
  internal?: boolean;
}

const contactLinks: ContactLink[] = [
  {
    label: "Correo",
    href: profile.links.email ? `mailto:${profile.links.email}` : null,
    display: profile.links.email ?? "",
    icon: EnvelopeSimple,
  },
  {
    label: "LinkedIn",
    href: profile.links.linkedin,
    display: "Perfil de LinkedIn",
    icon: LinkedinLogo,
  },
  {
    label: "GitHub",
    href: profile.links.github,
    display: "github.com/JuanDCova",
    icon: GithubLogo,
  },
  { label: "CV", href: "/cv", display: "Versión imprimible", icon: FileText, internal: true },
];

export function Contact() {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-titulo"
      className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6 md:pb-32"
    >
      <div className="reveal rounded-visual bg-brand px-6 py-14 text-bg sm:px-12 md:py-20 dark:bg-surface dark:text-ink">
        <h2
          id="contacto-titulo"
          className="max-w-[18ch] font-display text-4xl font-semibold tracking-tight md:text-6xl"
        >
          Contacto
        </h2>
        <p className="mt-6 max-w-[48ch] text-lg leading-relaxed opacity-80">
          Si tu equipo construye sistemas de gestión con Django y React, me interesa conversar.
        </p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {contactLinks.map((item) => {
            const Glyph = item.icon;
            const content = (
              <>
                <Glyph size={22} aria-hidden="true" className="shrink-0" />
                <span className="flex flex-col">
                  <span className="text-sm opacity-70">{item.label}</span>
                  <span className="font-medium">{item.display}</span>
                </span>
              </>
            );
            const itemClass =
              "flex min-h-16 items-center gap-4 rounded-component border border-current/20 px-5 py-4";

            if (!item.href) {
              return (
                <li key={item.label} className={itemClass}>
                  <Glyph size={22} aria-hidden="true" className="shrink-0 opacity-60" />
                  <span className="flex flex-col gap-1">
                    <span className="text-sm opacity-70">{item.label}</span>
                    <Pending label={item.label} inverse />
                  </span>
                </li>
              );
            }
            return (
              <li key={item.label}>
                {item.internal ? (
                  <Link
                    to={item.href}
                    className={`${itemClass} transition-colors hover:bg-current/10`}
                  >
                    {content}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`${itemClass} transition-colors hover:bg-current/10`}
                  >
                    {content}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
