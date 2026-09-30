import { useRef } from "react";

import { profile } from "~/data/profile";
import { useMotion } from "~/motion/use-motion";

const { basePath, alt } = profile.photo;
const sizes = "(min-width: 768px) 44vw, 90vw";
const srcSet = (format: string) => `${basePath}-480.${format} 480w, ${basePath}-800.${format} 800w`;

/**
 * Retrato a color natural, sin filtros: la foto habla sola. La identidad la
 * ponen la forma y la composición, no el color: recorte en chaflán, un marco
 * cian desplazado detrás (profundidad, mismo lenguaje angular del sitio) y una
 * sombra teñida del tono de marca. En escritorio el marco y la foto se mueven a
 * distinta velocidad al hacer scroll (parallax de dos capas).
 */
export function PhotoFrame() {
  const rootRef = useRef<HTMLDivElement>(null);

  useMotion(rootRef, ({ gsap, DESKTOP_MOTION }, mm, root) => {
    mm.add(DESKTOP_MOTION, () => {
      const trigger = { trigger: root, start: "top bottom", end: "bottom top", scrub: true };
      const image = root.querySelector("img");
      const frame = root.querySelector("[data-frame]");
      if (image) {
        gsap.fromTo(
          image,
          { yPercent: -4, scale: 1.08 },
          { yPercent: 4, scale: 1.08, ease: "none", scrollTrigger: trigger },
        );
      }
      if (frame) {
        gsap.fromTo(frame, { y: 24 }, { y: -24, ease: "none", scrollTrigger: trigger });
      }
    });
  });

  return (
    <div ref={rootRef} className="relative w-full max-w-[644px] pb-6 pl-6 md:pb-8 md:pl-8">
      {/* Marco desplazado: capa cian + capa de fondo 2px adentro = contorno en chaflán. */}
      <div
        aria-hidden="true"
        data-frame
        className="absolute top-8 right-8 bottom-0 left-0 bg-accent chamfer-xl md:top-10 md:right-10"
      >
        <div className="absolute inset-[2px] bg-surface chamfer-xl" />
      </div>

      {/* La sombra va en un contenedor con drop-shadow: box-shadow se recortaría con el chaflán. */}
      <div className="relative drop-shadow-[0_28px_40px_rgb(43_48_51/0.28)]">
        <div className="photo-reveal relative aspect-[4/5] w-full overflow-hidden bg-surface-2 chamfer-xl">
          <picture>
            <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
            <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
            <img
              src={`${basePath}-800.webp`}
              alt={alt}
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              className="size-full object-cover will-change-transform"
            />
          </picture>
        </div>
      </div>
    </div>
  );
}
