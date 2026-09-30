/**
 * Punto único de entrada a GSAP. Solo se importa con import() dinámico desde
 * efectos del cliente, así no pesa en la carga inicial ni en el prerender.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Movimiento permitido: sin reduced motion. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
/** Movimiento de escritorio: puntero fino, pantalla ancha y sin reduced motion. */
export const DESKTOP_MOTION =
  "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

let lenis: Lenis | null = null;

/**
 * Scroll suave con Lenis sincronizado con ScrollTrigger. Solo en escritorio con
 * puntero fino; en touch y con reduced motion se deja el scroll nativo.
 */
export function startSmoothScroll(): () => void {
  if (lenis || !window.matchMedia(DESKTOP_MOTION).matches) return () => {};

  const instance = new Lenis({ lerp: 0.12, anchors: { offset: -96 } });
  lenis = instance;
  document.documentElement.classList.add("has-smooth-scroll");
  instance.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    instance.destroy();
    document.documentElement.classList.remove("has-smooth-scroll");
    lenis = null;
  };
}

/** Lleva el scroll al inicio sin animación (cambio de ruta). */
export function resetScroll() {
  if (!window.location.hash) lenis?.scrollTo(0, { immediate: true });
  requestAnimationFrame(() => ScrollTrigger.refresh());
}
