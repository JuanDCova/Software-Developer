import { useRef } from "react";

import { profile } from "~/data/profile";
import { useMotion } from "~/motion/use-motion";

const { basePath, alt } = profile.photo;
const sizes = "(min-width: 768px) 44vw, 90vw";
const srcSet = (format: string) => `${basePath}-480.${format} 480w, ${basePath}-800.${format} 800w`;

/**
 * Fotografía pegada al borde derecho, con un velo cian en mix-blend-mode: hue
 * (como el video teñido de la referencia). Al pasar el cursor el velo se va y
 * aparece la foto a color. Parallax suave en escritorio.
 */
export function PhotoFrame() {
  const frameRef = useRef<HTMLDivElement>(null);

  useMotion(frameRef, ({ gsap, DESKTOP_MOTION }, mm, root) => {
    mm.add(DESKTOP_MOTION, () => {
      const image = root.querySelector("img");
      if (!image) return;
      gsap.fromTo(
        image,
        { yPercent: -5, scale: 1.12 },
        {
          yPercent: 5,
          scale: 1.12,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
  });

  return (
    <div
      ref={frameRef}
      className="photo-reveal grain group relative aspect-[4/5] w-full max-w-[644px] overflow-hidden bg-surface-2 chamfer-xl"
    >
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-accent mix-blend-hue transition-opacity duration-700 group-hover:opacity-0"
      />
    </div>
  );
}
