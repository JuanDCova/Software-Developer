# JDC Digital Portfolio

Portafolio de Juan David Cova. Especificación vigente: `docs/ESPECIFICACION_V2.md` (reemplaza al PDF donde se contradicen). Lo que falta de contenido: `docs/CONTENIDO_PENDIENTE.md`.

## Stack

React Router en modo framework con `ssr: false` + `prerender` (ver `docs/adr/0001-prerender-estatico.md`), TypeScript estricto, Tailwind v4, Phosphor Icons, fuentes con Fontsource. Deploy estático en Vercel desde `build/client`.

## Comandos

`npm run dev`, `npm run typecheck`, `npm run lint`, `npm run test`, `npm run build`, `npm run test:e2e` (hace falta build), `npm run lhci`, `npm run poster` (SVG de la red), `npm run og` (regenera `public/og.png`).

## Reglas

- Sitio solo en español. Cero guiones largos (U+2014) y en-dash (U+2013) en texto visible; `app/data/content.test.ts` lo verifica sobre los datos.
- Contenido verificable: nada de cargos, fechas, métricas, capturas o enlaces inventados. Lo que falte va como `null` y se muestra con `<Pending>`.
- Cada proyecto dice qué hizo Juan David (`myRole`) y si una IA escribió parte del código (`aiAssisted`).
- Colores solo desde los tokens (`bg-bg`, `text-ink`, `text-ink-soft`, `bg-accent`, `text-accent-ink`, `text-accent-display`...). Cian puro solo como relleno. Claro por defecto (ADR 0004).
- Forma: esquinas rectas y chaflanes (`chamfer`, `chamfer-lg`, `chamfer-xl`); titulares con `display-heading` o `StairHeading`.
- Motion: solo transform y opacity, siempre con `prefers-reduced-motion`. Sin preloader, sin cursor custom, sin scroll cues, sin `window.addEventListener("scroll")`.
- GSAP, ScrollTrigger y Lenis solo vía `app/motion/` (`useMotion` hace el import dinámico y limpia al desmontar). No se usa la librería Motion.
- Escena 3D en `app/components/three/`, cargada por `HeroBackdrop` solo en escritorio.
- Fuentes en `app/styles/fonts.css` (ver `docs/adr/0003-fuentes-y-rendimiento.md`).
- Commits sin líneas Co-Authored-By.

## Skills del proyecto

Están en `.agents/skills/` (ignoradas por git; se restauran con `npx skills experimental_install`) y Claude Code no las carga solo. Léelas por ruta:

- `.agents/skills/design-taste-frontend/SKILL.md`: manda en diseño. Correr el checklist de la sección 14 antes de dar algo por terminado.
- `.agents/skills/ui-ux-pro-max/`: buscador. `python -B .agents/skills/ui-ux-pro-max/scripts/search.py "<consulta>" --domain ux|typography|gsap|landing` o `--stack react|threejs`. No usar `--design-system --persist`: para este proyecto devolvió un resultado que no encaja.
- `.agents/skills/hyperframes-animation/`: para video (reels y clips de proyectos), no para animar el sitio. Útil como referencia de GSAP en `adapters/gsap-*.md`.
