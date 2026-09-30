# Contenido pendiente

Lo confirma o entrega Juan David antes de publicar. Mientras falte algo, `site.indexable` sigue en `false` (meta `noindex`) y la interfaz muestra "por confirmar" donde corresponde. No se inventa nada: cargos, fechas, métricas, enlaces ni capturas.

## Identidad y contacto

- [ ] Foto real (vertical, buena luz, fondo simple). Va en `public/` y su ruta en `profile.photo` (`app/data/profile.ts`).
- [ ] Correo público para reclutadores (`profile.links.email`). El correo institucional no se usa.
- [ ] URL de LinkedIn (`profile.links.linkedin`).
- [ ] Formación académica para `/cv`.

## Experiencia (no se puede deducir de los repositorios)

- [ ] Cargo y periodo en Unicorsalud (`app/data/experience.ts`).
- [ ] Periodo y forma de trabajo en los proyectos independientes (freelance, por contrato, propios).

## Revisar lo que escribí a partir de los repositorios

- [ ] Tu rol en cada proyecto (`myRole` en `app/data/projects.ts`). Lo saqué de tus commits; corrige lo que no sea exacto.
- [ ] La frase sobre cómo trabajas con IA (`profile.aiStatement`) y los avisos `aiAssisted` de Nexora, Palatsi y este portafolio.
- [ ] SGTAL: el historial tiene solo 6 commits tuyos y no muestra uso de IA. Si usaste IA, hay que decirlo igual que en los demás.
- [ ] Estado real de cada proyecto (hoy todos dicen "En desarrollo"). Si el ERP UC está en producción, cámbialo.
- [ ] Palatsi y Pracxu: ¿son clientes reales? ¿Se puede nombrar a la marca?
- [ ] `ERP-prototype-product`: parece la versión producto del ERP UC (identidad "Nimbus"). ¿Lo incluimos como proyecto aparte o como parte del ERP?

## Permisos y privacidad

- [ ] Permiso de Unicorsalud para mostrar el ERP (hoy marcado como confidencial: sin repositorio ni capturas).
- [ ] Permiso de Palatsi (también confidencial).
- [ ] Qué repositorios pueden quedar públicos para enlazarlos (`github` en cada proyecto). Hoy solo se enlaza el de este portafolio.
- [ ] Autorización para levantar cada proyecto con sus datos demo y tomar capturas (sin datos reales de personas).

## Métricas

- [ ] Resultados comprobables por proyecto (`results`). Ejemplos válidos: usuarios activos, procesos que dejaron de hacerse a mano, tiempo ahorrado medido. Si no hay base real, queda vacío.

## Publicación

- [ ] Conectar el repositorio a Vercel (o autorizar que lo haga con la CLI).
- [ ] Dominio propio (opcional).
- [ ] Cuando todo lo anterior esté listo: `site.indexable = true` en `app/config/site.ts`.
