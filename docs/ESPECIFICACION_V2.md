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
| Inter para el cuerpo                                   | Quantico (display) + Geist (cuerpo) + Geist Mono (técnico), autoalojadas                                                                                                                          | Inter desaconsejada por defecto                                               |
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
| ERP Universitario     | Sí        | Equipo de 4; módulo académico, estudiantes, PDF, seguridad de sesiones |
| SGTAL                 | Sí        | Autor único                                                            |
| Nexora Platform       | Sí        | Propio, con partes hechas por Claude Code                              |
| Palatsi Beauty OS     | No        | Mayormente generado por Claude Code; se muestra como dirección técnica |
| Pracxu                | No        | Autor único, incluye SRS                                               |
| JDC Digital Portfolio | No        | Especificación propia, código generado con IA                          |

## Design system

Ver `docs/adr/0004-direccion-visual-claro-cian.md`.

- Tokens en `app/styles/tokens.css`: fondo cálido `#F2F1F0`, texto `#2B3033`, acento cian `#15BCDF`. Claro por defecto; oscuro solo con el toggle.
- Quantico (titulares y UI, mayúsculas), Geist (párrafos), Geist Mono (técnico).
- Esquinas rectas y chaflanes (`chamfer`, `chamfer-lg`, `chamfer-xl`); titulares escalonados con segunda línea en cian.
- Motion: solo `transform` y `opacity`; todo se apaga con `prefers-reduced-motion`.
- Cero guiones largos en el texto del sitio (hay una prueba que lo verifica).

## Roadmap

| Tanda | Estado  | Alcance                                                                                                                                                                                         |
| ----- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | Hecha   | Spec v2, base técnica, design system, contenido, páginas, SEO, pruebas, CI                                                                                                                      |
| 2     | Hecha   | Titular cinético, foto con máscara y parallax, línea de tiempo que se llena con el scroll, red de tecnologías interactiva, showcase horizontal fijado, scroll suave con Lenis (solo escritorio) |
| 3     | Hecha   | Red 3D del hero con React Three Fiber, cargada en diferido y solo en escritorio; diagramas de arquitectura con resaltado por capa                                                               |
| 4     | Parcial | Hecho: foto, OG con foto, contacto real, formación. Falta: capturas con datos demo, métricas, dominio y analítica                                                                               |

## Definition of Done (ajustada)

Responsive completo, modo claro y oscuro, prerender con Open Graph por ruta, accesibilidad sin violaciones serias de axe, CLS menor a 0.05, contenido verificado (ver `docs/CONTENIDO_PENDIENTE.md`), y todo el checklist de la sección 14 de `design-taste-frontend`.

Rendimiento: ver `docs/adr/0003-fuentes-y-rendimiento.md`. La meta sigue siendo 0.95 en Lighthouse móvil; hoy la medición local da entre 0.83 y 0.92.
