# JDC Digital Portfolio

Portafolio de Juan David Cova, desarrollador full stack. Proyectos reales con el problema, la arquitectura y el rol de Juan David en cada uno.

React Router (prerender estático) + TypeScript + Tailwind CSS, desplegado en Vercel.

**En vivo:** https://jdc-digital-portfolio.vercel.app

## Empezar

```bash
npm install
npm run dev
```

## Scripts

| Comando             | Qué hace                                                                                  |
| ------------------- | ----------------------------------------------------------------------------------------- |
| `npm run dev`       | Servidor de desarrollo                                                                    |
| `npm run typecheck` | Tipos de rutas y `tsc` estricto                                                           |
| `npm run lint`      | ESLint                                                                                    |
| `npm run test`      | Pruebas de datos con Vitest                                                               |
| `npm run build`     | Build y prerender de todas las rutas, `sitemap.xml`, `robots.txt` y `404.html`            |
| `npm run preview`   | Sirve `build/client` como en producción                                                   |
| `npm run test:e2e`  | Playwright: navegación, prerender y accesibilidad con axe en ambos temas (requiere build) |
| `npm run lhci`      | Lighthouse CI con presupuestos de rendimiento                                             |
| `npm run og`        | Regenera `public/og.png`                                                                  |
| `npm run captures`  | Capturas demo a `public/proyectos/<slug>/` (ver `docs/CAPTURAS.md`)                       |

## Estructura

```
app/
  config/site.ts        URL, SEO y navegación
  data/                 perfil, experiencia, stack y proyectos (contenido tipado)
  components/           hero, about, experience, skills, projects, architecture, contact, common
  routes/               home, proyectos, proyecto, cv, 404, sitemap.xml, robots.txt
  styles/               tokens de color y estilos globales
docs/
  ESPECIFICACION_V2.md  especificación vigente
  CONTENIDO_PENDIENTE.md
  adr/                  decisiones de arquitectura
```

## Contenido

Nada inventado: lo que falta confirmar se muestra como pendiente y el sitio se publica con `noindex` hasta completarlo. Ver [docs/CONTENIDO_PENDIENTE.md](docs/CONTENIDO_PENDIENTE.md).

## Deploy

El repositorio está conectado a Vercel: **cada push a `main` se publica solo** y cada Pull Request recibe una URL de vista previa.

| Comando                  | Qué hace                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| `npm run release`        | Lint, tipos y pruebas; si todo pasa, `git push origin main` y Vercel publica                     |
| `npm run deploy:preview` | Sube la carpeta local a una URL de prueba, sin tocar producción                                  |
| `npm run deploy`         | Build y publicación directa a producción desde la terminal (se salta el CI; solo para urgencias) |

Antes de `release`, haz commit de tus cambios. La primera vez en un equipo nuevo: `npx vercel login`.

Vercel con `vercel.json`: comando `npm run build`, salida `build/client`. La URL de producción se toma de `VERCEL_PROJECT_PRODUCTION_URL`, o de `VITE_SITE_URL` si se define.
