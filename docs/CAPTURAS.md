# Capturas con datos demo

Cómo regenerar las capturas de `public/proyectos/<slug>/` (tanda 4, punto 1).
Reglas: solo aplicaciones corriendo con seeds de demostración, nunca con
datos reales de personas. ERP y Palatsi son confidenciales y no llevan capturas.

## Requisitos

- Docker con Compose v2 y los repos hermanos en `../` (`GCAL`, `nexora-platform`, `LMS`).
- `sharp` como devDependency (ya instalado) y Chromium de Playwright (`npx playwright install chromium`).

## Proceso por proyecto (uno a la vez, todos usan los puertos 3000/8000/5432)

```powershell
# Nexora (seed demo automático al arrancar el api)
docker compose -p capturas-nexora up -d --build   # en ../nexora-platform
node scripts/captures.mjs --site=nexora
docker compose -p capturas-nexora down

# Pracxu (seed manual)
docker compose -p lms-capturas up -d --build      # en ../LMS
docker compose -p lms-capturas exec backend python manage.py seed_data
node scripts/captures.mjs --site=lms
docker compose -p lms-capturas down

# Orbitra (cargas por comandos)
docker compose -p orbitra-capturas up -d --build    # en ../GCAL
docker compose -p orbitra-capturas run --rm backend python manage.py migrate
docker compose -p orbitra-capturas run --rm backend python manage.py cargar_base
docker compose -p orbitra-capturas run --rm backend python manage.py cargar_demo
docker compose -p orbitra-capturas run --rm backend python manage.py cargar_punta_a_punta
node scripts/captures.mjs --site=orbitra
docker compose -p orbitra-capturas down

# Portafolio (de sí mismo, sobre el build de producción)
npm run build
# servir build/client en 127.0.0.1:4173 y luego:
node scripts/captures.mjs --site=portfolio
```

El `-p` crea volúmenes frescos por corrida: la base siempre queda solo con
datos demo y no se toca ningún volumen con datos reales.

## Salida

Por vista: `{vista}-1440.{avif,webp}` y `{vista}-720.{avif,webp}` a 1440x900.
En `app/data/projects.ts` solo se registra la ruta webp de 1440 en `image` /
`gallery`; `app/components/projects/project-captures.tsx` deriva el resto por
convención. El test `las capturas existen en public/` lo verifica.
