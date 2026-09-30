import { Link } from "react-router";

import { profile } from "~/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line print:hidden">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-4 px-[clamp(20px,9vw,118px)] py-10 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <p>
          {profile.name}. Desarrollador full stack en {profile.location}.
        </p>
        <nav aria-label="Enlaces del pie de página" className="flex gap-6">
          <Link to="/proyectos" className="hover:text-ink">
            Proyectos
          </Link>
          <Link to="/cv" className="hover:text-ink">
            CV
          </Link>
          <a
            href={profile.links.github}
            className="hover:text-ink"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
