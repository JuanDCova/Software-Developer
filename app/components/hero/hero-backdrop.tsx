import { lazy, Suspense, useEffect, useState } from "react";

const NeuralScene = lazy(() => import("~/components/three/neural-scene"));

const CAN_RUN_3D =
  "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Decide si vale la pena cargar la escena 3D: escritorio, puntero fino, sin
 * reduced motion, WebGL disponible y al menos 4 núcleos. Espera a que el
 * navegador esté libre para no competir con el primer render.
 */
export function HeroBackdrop() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const capable =
      window.matchMedia(CAN_RUN_3D).matches &&
      (navigator.hardwareConcurrency ?? 4) >= 4 &&
      supportsWebGL();
    if (!capable) return;

    const start = () => setEnabled(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = setTimeout(start, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_right,transparent_0%,transparent_30%,black_70%)]"
    >
      {enabled ? (
        <Suspense fallback={null}>
          <NeuralScene />
        </Suspense>
      ) : null}
    </div>
  );
}
