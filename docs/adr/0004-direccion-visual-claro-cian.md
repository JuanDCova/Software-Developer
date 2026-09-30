# ADR 0004: Dirección visual clara con acento cian

Estado: aceptado. Fecha: 2026-09-30.

## Contexto

Juan David pidió que el sitio se viera más tecnológico y que los colores oscuros y genéricos (slate + azul) no fueran el estándar. Compartió una referencia visual ("Targo"): fondo cálido claro, tipografía Quantico en mayúsculas, titulares escalonados, acento cian, botones con esquinas en chaflán y video de fondo en el hero.

## Decisión

- Fondo `#F2F1F0`, texto `#2B3033`, acento `#15BCDF`. El modo claro es el estándar y ya no sigue al sistema operativo; el oscuro solo aparece con el toggle.
- El cian puro se usa solo como relleno (botones, marcas), con texto `#1A1C1E`. Para texto sobre fondo claro se usan tonos más oscuros del mismo cian que cumplen WCAG AA: `accent-ink` (5.0:1) y `accent-display` para titulares grandes (3.35:1).
- Quantico para titulares, navegación y botones; Geist para párrafos (legibilidad) y Geist Mono para lo técnico.
- Titulares escalonados (`StairHeading`), esquinas rectas y chaflanes (`chamfer`, `chamfer-lg`, `chamfer-xl`).
- **Sin los videos de la referencia.** Están alojados en un CDN de terceros sin licencia conocida y pesan 5 MB. En su lugar, la red de nodos propia: escena 3D en escritorio y un SVG generado con los mismos datos (`npm run poster`) en mobile y mientras carga.
- La foto pasa del hero a "Sobre mí", pegada al borde derecho y teñida de cian con `mix-blend-mode: hue` (como el video teñido de la referencia); se ve a color al pasar el cursor.
- `/cv` reproduce la estructura de la hoja de vida de Juan David (barra lateral y columna principal) y se imprime en A4. Las referencias no se publican: tienen datos de contacto de terceros.

## Consecuencias

- El LCP en mobile vuelve a ser el titular (texto), no la foto.
- Los chaflanes recortan bordes; por eso los elementos con chaflán usan relleno en lugar de borde.
