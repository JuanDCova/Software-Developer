import {
  Check,
  Copy,
  EnvelopeSimple,
  FileText,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router";

import { profile } from "~/data/profile";

interface ContactLink {
  label: string;
  href: string;
  display: string;
  icon: Icon;
  internal?: boolean;
}

const { email, linkedin, github } = profile.links;

const contactLinks: ContactLink[] = [
  { label: "LinkedIn", href: linkedin, display: "juancovasoftwaredeveloper", icon: LinkedinLogo },
  { label: "GitHub", href: github, display: "github.com/JuanDCova", icon: GithubLogo },
  { label: "CV", href: "/cv", display: "Versión imprimible", icon: FileText, internal: true },
];

const itemClass =
  "chamfer flex min-h-16 items-center gap-4 bg-current/[0.07] px-5 py-4 transition-colors hover:bg-current/15";

/** Copia el correo al portapapeles con confirmación visible y anunciada. */
function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex size-14 shrink-0 items-center justify-center bg-accent text-on-accent transition-colors chamfer hover:bg-accent-hover active:scale-[0.96]"
      aria-label={copied ? "Correo copiado" : "Copiar correo"}
    >
      {copied ? <Check size={20} aria-hidden="true" /> : <Copy size={20} aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {copied ? "Correo copiado al portapapeles" : ""}
      </span>
    </button>
  );
}

export function Contact() {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-titulo"
      className="mx-auto w-full max-w-[90rem] px-[clamp(20px,9vw,118px)] pb-[clamp(72px,10vw,140px)]"
    >
      <div className="reveal relative overflow-hidden bg-brand px-6 py-14 text-bg chamfer-xl sm:px-12 md:py-20 dark:bg-surface dark:text-ink">
        <h2 id="contacto-titulo" className="display-heading text-[clamp(40px,7vw,88px)]">
          <span className="block">Hablemos</span>{" "}
          <span className="block pl-[min(160px,18vw)] text-accent">de tu reto</span>
        </h2>
        <p className="mt-6 max-w-[48ch] text-lg leading-relaxed opacity-80">
          Crear algo desde cero, mantener lo que ya existe o reforzar tu equipo: cuéntame el reto.
        </p>

        <div className="mt-12 flex items-center gap-3">
          <a
            href={`mailto:${email}`}
            className={`${itemClass} min-w-0 flex-1 font-display text-base font-semibold sm:text-2xl`}
          >
            <EnvelopeSimple size={24} aria-hidden="true" className="shrink-0" />
            <span className="truncate">{email}</span>
          </a>
          <CopyEmail />
        </div>

        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {contactLinks.map((item) => {
            const Glyph = item.icon;
            const content = (
              <>
                <Glyph size={22} aria-hidden="true" className="shrink-0" />
                <span className="flex min-w-0 flex-col">
                  <span className="text-sm opacity-70">{item.label}</span>
                  <span className="truncate font-medium">{item.display}</span>
                </span>
              </>
            );
            return (
              <li key={item.label}>
                {item.internal ? (
                  <Link to={item.href} className={itemClass}>
                    {content}
                  </Link>
                ) : (
                  <a href={item.href} target="_blank" rel="noreferrer" className={itemClass}>
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
