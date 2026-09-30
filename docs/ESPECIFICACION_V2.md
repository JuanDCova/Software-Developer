# JDC Digital Portfolio: especificación v2

Esta versión reemplaza a `JDC_Digital_Portfolio_Especificacion_Maestra.pdf` (v1) donde las dos se contradicen. Todo lo que no se menciona aquí sigue igual que en la v1.

## Por qué hay una v2

La v1 es sólida en visión, pero está pensada con los efectos primero: preloader, cursor custom, 3D y tres mecanismos para mostrar proyectos. Un reclutador decide en segundos, casi siempre desde el celular y desde un enlace de LinkedIn. Lo que convence es entender rápido quién es Juan David, ver prueba real y que el sitio cargue al instante. La v2 reordena todo alrededor de eso.

Principio rector (sin cambios): primero experiencia y arquitectura, después efectos.

## Decisiones tomadas

- Idioma: solo español (`lang="es-CO"`, rutas en español).
- En los conflictos entre la v1 y las skills del proyecto, mandan las skills. La skill que manda en diseño es `design-taste-frontend`; su checklist final (sección 14) es el criterio de aceptación visual.
- El contenido sale de los repositorios reales de Juan David. Lo que no se puede verificar queda marcado como pendiente, nunca inventado.

## Registro de cambios frente a la v1

| v1                                                     | v2                                                                                                                                                                                                | Razón                                                                         |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Preloader "LOADING EXPERIENCE 100%"                    | Se elimina. Entrada del hero de menos de 800 ms que no bloquea el texto                                                                                                                           | Daña el LCP y gasta los primeros segundos del reclutador                      |
| Cursor contextual custom                               | Se elimina. Estados hover y focus claros                                                                                                                                                          | Patrón prohibido por la skill, mala accesibilidad                             |
| "SCROLL ↓" en el hero                                  | Se elimina                                                                                                                                                                                        | Scroll cues prohibidos                                                        |
| Inter para el cuerpo                                   | Space Grotesk (display) + Geist (cuerpo) + Geist Mono (técnico), autoalojadas                                                                                                                     | Inter desaconsejada por defecto                                               |
| Lucide React                                           | Phosphor Icons                                                                                                                                                                                    | Lucide desaconsejada                                                          |
| Navy `#1E3A5F` + azul `#2563EB` como dos acentos       | Un solo acento (azul). El navy queda como tinta de titulares en modo claro. Sin glows                                                                                                             | Máximo un acento                                                              |
| GSAP + Framer Motion + Lenis desde el inicio           | Tanda 1 solo con CSS (scroll-driven animations). GSAP para scroll y Motion para estados de UI llegan en la tanda 2, nunca en el mismo componente. Lenis solo desktop y apagado con reduced motion | Regla de no mezclar librerías; rendimiento                                    |
| Hero "SOFTWARE DEVELOPER / Building digital solutions" | Hero asimétrico con posicionamiento concreto y dos CTAs: "Ver proyectos" y "Ver CV"                                                                                                               | El genérico no diferencia                                                     |
| Grid + carrusel + horizontal + destacados              | 3 casos destacados en bento + índice completo en `/proyectos`. El showcase horizontal único llega en la tanda 2                                                                                   | Sin layouts repetidos                                                         |
| Número en cada card                                    | Se elimina                                                                                                                                                                                        | Numeración decorativa prohibida                                               |
| Skills y Technology Network separados                  | Una sola sección: cada tecnología muestra los proyectos donde se usó. La red visual se monta sobre los mismos datos                                                                               | Densidad de contenido, evidencia en vez de porcentajes                        |
| "How I Build" como sección                             | Tira corta de verbos dentro de "Sobre mí"; el proceso real se ve en cada caso                                                                                                                     | Sin etiquetas "Paso 1, 2, 3"                                                  |
| Rutas `/projects/[slug]`                               | `/proyectos`, `/proyectos/:slug`, `/cv`                                                                                                                                                           | Sitio en español                                                              |
| Vite SPA                                               | React Router en modo framework con `prerender` y `ssr: false`                                                                                                                                     | LinkedIn y WhatsApp no ejecutan JS; cada ruta necesita su HTML con Open Graph |
| `main / develop / feature`                             | `main` + ramas cortas + Preview de Vercel por PR                                                                                                                                                  | Proyecto de una persona                                                       |

## Lo que se agrega

- Ruta `/cv` imprimible (el navegador la guarda como PDF).
- Sección "Mi rol" obligatoria en cada proyecto, y aviso explícito cuando una IA escribió parte del código.
- Proyectos confidenciales (código de terceros) sin enlace al repositorio ni capturas reales.
- `site.indexable = false` mientras falte contenido: meta `noindex` pero `robots.txt` abierto, para que las vistas previas de LinkedIn funcionen.
- Pruebas: datos (Vitest), extremo a extremo, prerender y accesibilidad con axe en ambos temas (Playwright), Lighthouse CI con presupuestos.

## Proyectos

Salen de los repositorios locales de Juan David. Detalle en `app/data/projects.ts`.

| Proyecto              | Destacado | Autoría                                                                |
| --------------------- | --------- | ---------------------------------------------------------------------- |
| ERP UC (Unicorsalud)  | Sí        | Equipo de 4; módulo académico, estudiantes, PDF, seguridad de sesiones |
| SGTAL                 | Sí        | Autor único                                                            |
| Nexora Platform       | Sí        | Propio, con partes hechas por Claude Code                              |
| Palatsi Beauty OS     | No        | Mayormente generado por Claude Code; se muestra como dirección técnica |
| Pracxu                | No        | Autor único, incluye SRS                                               |
| JDC Digital Portfolio | No        | Especificación propia, código generado con IA                          |

## Design system

- Tokens en `app/styles/tokens.css`, expuestos a Tailwind en `app/styles/globals.css`.
- Radios: 8 px controles, 16 px componentes, 24 px cards, 32 px visuales.
- Tema: `data-theme` en `<html>`; sin valor manda `prefers-color-scheme`. Script en `<head>` para no parpadear.
- Motion: solo `transform` y `opacity`; todo se apaga con `prefers-reduced-motion`.
- Cero guiones largos en el texto del sitio (hay una prueba que lo verifica).

## Roadmap

| Tanda     | Alcance                                                                                                       |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| 1 (hecha) | Spec v2, base técnica, design system, contenido, páginas, SEO, pruebas, CI                                    |
| 2         | Motion: showcase horizontal con pin, títulos cinéticos, parallax, timeline de experiencia, red de tecnologías |
| 3         | 3D del hero con R3F en diferido y póster de respaldo; diagramas de arquitectura interactivos                  |
| 4         | Foto tratada, capturas con datos demo, clips con HyperFrames, dominio y analítica                             |

## Definition of Done (ajustada)

Responsive completo, modo claro y oscuro, prerender con Open Graph por ruta, accesibilidad sin violaciones serias de axe, Lighthouse móvil de 95 o más en rendimiento, accesibilidad y buenas prácticas, LCP menor a 2.5 s, CLS menor a 0.1, contenido verificado (ver `docs/CONTENIDO_PENDIENTE.md`), y todo el checklist de la sección 14 de `design-taste-frontend`.

### Estado de rendimiento (tanda 1)

Lighthouse móvil simulado (4G lento): accesibilidad y buenas prácticas en 100, CLS menor a 0.05, pero rendimiento entre 0.92 y 0.93 con LCP cerca de 2.6 s. La causa medida son las fuentes web: sin ellas el LCP baja a 2.2 s. Ya se cambió JetBrains Mono por Geist Mono (17 KB menos). El gate de CI queda temporalmente en rendimiento de 0.90 y LCP de 3 s para no bloquear; la meta sigue siendo 0.95 y 2.5 s. Opciones para la tanda 2: subconjunto de glifos propio para Space Grotesk y Geist, y medir en el deploy real de Vercel (HTTP/2, brotli, CDN). SEO sale en 0.66 solo por el `noindex` intencional.
