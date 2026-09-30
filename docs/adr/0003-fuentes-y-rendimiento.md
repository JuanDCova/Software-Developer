# ADR 0003: Fuentes, motion y rendimiento

Estado: aceptado. Fecha: 2026-09-30. Space Grotesk se reemplazó por Quantico en el ADR 0004, con la misma estrategia (optional + preload).

## Contexto

Con la foto en el hero, Lighthouse móvil marcó CLS de 0.16: al llegar Space Grotesk, el titular cambiaba de líneas y empujaba la foto. Además, sin fuentes web el LCP bajaba unos 0.5 s, pero la identidad visual depende de ellas.

## Decisión

- Fuentes autoalojadas, solo subconjunto latino, declaradas en `app/styles/fonts.css`.
- Space Grotesk (titulares): `font-display: optional` + preload. Nunca cambia el texto después del primer pintado.
- Geist y Geist Mono: `font-display: swap` con alternativas locales de métricas ajustadas (size-adjust y overrides medidos en el navegador), para que el cambio casi no se note.
- GSAP, ScrollTrigger y Lenis se cargan con `import()` después de hidratar. La escena 3D (three + React Three Fiber, unos 240 KB comprimidos) solo se descarga en escritorio con puntero fino, WebGL, 4 o más núcleos y sin reduced motion, cuando el navegador está libre.
- En mobile y con reduced motion no hay scroll suave, ni pin horizontal, ni 3D.

## Consecuencias

- CLS 0 en todas las páginas.
- Lighthouse móvil simulado: rendimiento entre 0.83 y 0.92 en la home y 0.90 a 0.92 en las demás páginas, accesibilidad, buenas prácticas y SEO en 1. El LCP simulado queda entre 3.0 y 3.4 s: la foto es el LCP en mobile y compite con el JavaScript de React. Las mediciones locales varían bastante; hay que confirmarlas en PageSpeed Insights con el deploy real.
- El gate de CI exige rendimiento de 0.80 o más (las corridas locales varían entre 0.83 y 0.92), CLS de 0.05 o menos y SEO de 0.95 o más; el LCP queda como advertencia.
