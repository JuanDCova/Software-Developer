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
 * Visual del hero en el lugar del video de la referencia: la red de nodos.
 * Siempre se ve el póster estático (una captura de la misma red); en
 * escritorio capaz se reemplaza por la escena 3D en vivo cuando el navegador
 * queda libre. En mobile va arriba y el texto queda debajo.
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
      className="pointer-events-none absolute top-0 -left-[12%] -z-20 h-[380px] w-[124%] md:top-0 md:right-[-20%] md:left-auto md:h-full md:w-[99%]"
    >
      <img
        src="/img/red-nodos.svg"
        alt=""
        width={1600}
        height={1000}
        decoding="async"
        className={`absolute inset-0 size-full object-contain transition-opacity duration-1000 ${enabled ? "opacity-0" : "opacity-100"}`}
      />
      {enabled ? (
        <Suspense fallback={null}>
          <NeuralScene />
        </Suspense>
      ) : null}
    </div>
  );
}
