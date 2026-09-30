import { useRef } from "react";

import { profile } from "~/data/profile";
import { useMotion } from "~/motion/use-motion";

const { basePath, alt } = profile.photo;
const sizes = "(min-width: 768px) 36vw, 80vw";
const srcSet = (format: string) => `${basePath}-480.${format} 480w, ${basePath}-800.${format} 800w`;

/**
 * Fotografía integrada a la composición: recorte 4:5, revelado con máscara al
 * cargar (CSS), grain fijo y parallax suave al hacer scroll (solo escritorio).
 */
export function PhotoFrame() {
  const frameRef = useRef<HTMLDivElement>(null);

  useMotion(frameRef, ({ gsap, DESKTOP_MOTION }, mm, root) => {
    mm.add(DESKTOP_MOTION, () => {
      const image = root.querySelector("img");
      if (!image) return;
      gsap.fromTo(
        image,
        { yPercent: -4, scale: 1.1 },
        {
          yPercent: 6,
          scale: 1.1,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top+=96", end: "bottom top", scrub: true },
        },
      );
    });
  });

  return (
    <div
      ref={frameRef}
      className="photo-reveal grain relative aspect-[4/5] w-full overflow-hidden rounded-visual bg-surface-2 shadow-[0_40px_80px_-40px_rgb(15_23_42/0.45)]"
    >
      <picture>
        <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
        <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
        <img
          src={`${basePath}-800.webp`}
          alt={alt}
          width={800}
          height={1000}
          fetchPriority="high"
          decoding="async"
          className="size-full object-cover will-change-transform"
        />
      </picture>
    </div>
  );
}
