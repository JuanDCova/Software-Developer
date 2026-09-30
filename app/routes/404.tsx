import { ButtonLink } from "~/components/common/button-link";
import { pageMeta } from "~/utils/seo";

export const meta = () => pageMeta({ title: "Página no encontrada", path: "/404" });

export function NotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-40 pb-32 sm:px-6">
      <p className="font-mono text-sm text-ink-soft">Error 404</p>
      <h1 className="mt-4 display-heading text-[clamp(40px,7vw,80px)] text-brand">
        Página no encontrada
      </h1>
      <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-ink-soft">
        La dirección no existe o cambió. Los proyectos siguen en su lugar.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink to="/proyectos">Ver proyectos</ButtonLink>
        <ButtonLink to="/" variant="secondary">
          Ir al inicio
        </ButtonLink>
      </div>
    </div>
  );
}

export default NotFound;
