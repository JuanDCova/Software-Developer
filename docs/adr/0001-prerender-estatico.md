# ADR 0001: Prerender estático con React Router

Estado: aceptado. Fecha: 2026-09-30.

## Contexto

La especificación v1 pedía React + Vite + React Router como SPA y, al mismo tiempo, vistas previas correctas al compartir cada URL en LinkedIn, WhatsApp o correo. Esos crawlers no ejecutan JavaScript: en una SPA todas las rutas devuelven el mismo HTML vacío con los mismos metadatos.

## Decisión

Usar React Router en modo framework con `ssr: false` y `prerender`. En el build se genera un HTML por ruta (`/`, `/proyectos`, cada `/proyectos/:slug`, `/cv`, `/404`) con su título, descripción, canonical y Open Graph. `sitemap.xml` y `robots.txt` son rutas de recurso que también se prerenderizan, así que los slugs salen de los mismos datos que las páginas. Después del build, `scripts/postbuild.mjs` copia `/404/index.html` a `/404.html` para que Vercel lo sirva en rutas que no existen.

## Consecuencias

- Se mantiene el stack de la v1 (React, TypeScript, Vite, React Router) y se despliega como sitio estático en Vercel, sin servidor.
- No hay `action` ni `headers` en rutas: no existe servidor en runtime. Un formulario de contacto necesitaría una función aparte.
- Agregar un proyecto en `app/data/projects.ts` basta para que tenga página, sitemap y metadatos.
