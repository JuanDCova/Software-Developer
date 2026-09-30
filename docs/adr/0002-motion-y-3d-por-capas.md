# ADR 0002: Motion y 3D por capas

Estado: aceptado. Fecha: 2026-09-30.

## Contexto

La v1 pide GSAP, ScrollTrigger, Framer Motion, Lenis y Three.js desde el inicio, además de preloader y cursor custom. La skill `design-taste-frontend` prohíbe el cursor custom y los scroll cues, pide no mezclar GSAP con Motion en el mismo árbol de componentes y exige que cada animación tenga un motivo. Los objetivos de rendimiento son LCP menor a 2.5 s, CLS menor a 0.1 e INP menor a 200 ms.

## Decisión

1. Tanda 1: sin librerías de animación. Entrada del hero y aparición al hacer scroll con CSS (`animation-timeline: view()`), solo `transform` y `opacity`. El titular del hero no anima su opacidad para no retrasar el LCP.
2. Tanda 2: GSAP + ScrollTrigger solo para lo que depende del scroll (showcase horizontal con pin, timeline). Motion solo para estados de UI (menú, transiciones). Cada uno en componentes hoja separados.
3. Tanda 3: la escena 3D del hero con React Three Fiber se carga con import dinámico después del LCP, con un póster estático de respaldo, menos detalle en equipos modestos y nada con reduced motion.
4. Sin preloader ni cursor custom.

## Consecuencias

- La primera versión pesa poco y ya es publicable.
- Cada capa de motion se agrega con su prueba de Lighthouse; si baja el puntaje, no entra.
