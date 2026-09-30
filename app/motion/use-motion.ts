import { useEffect } from "react";
import type { RefObject } from "react";

import type * as Motion from "./gsap";

type MotionModule = typeof Motion;

/**
 * Carga GSAP bajo demanda y ejecuta `setup` dentro de un gsap.context con
 * alcance en `scope`. Al desmontar se revierte todo (tweens y ScrollTriggers).
 * `setup` recibe gsap.matchMedia para declarar variantes por media query; con
 * reduced motion simplemente no se registra nada y queda el estado final.
 */
export function useMotion<T extends HTMLElement>(
  scope: RefObject<T | null>,
  setup: (motion: MotionModule, mm: gsap.MatchMedia, root: T) => void,
) {
  useEffect(() => {
    let revert: (() => void) | undefined;
    let cancelled = false;

    import("./gsap").then((motion) => {
      const root = scope.current;
      if (cancelled || !root) return;
      const mm = motion.gsap.matchMedia(root);
      setup(motion, mm, root);
      revert = () => mm.revert();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
    // `setup` se define en el componente y describe una animación fija.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope]);
}
