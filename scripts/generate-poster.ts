// Genera public/img/red-nodos.svg: la misma red de la escena 3D proyectada en
// 2D con la misma cámara. Es el visual del hero en mobile y mientras carga el 3D.
// Uso: npm run poster
import { writeFileSync } from "node:fs";

import { buildNetwork } from "../app/components/three/network-data.ts";

const WIDTH = 1600;
const HEIGHT = 1000;
const CAMERA_Z = 6.2;
const FOV = (50 * Math.PI) / 180;
const focal = HEIGHT / 2 / Math.tan(FOV / 2);
// Misma inclinación inicial que la escena (sin mouse): leve giro para dar profundidad.
const ROT_Y = 0.35;

const { points, links } = buildNetwork();
const projected = points.map(([x, y, z]) => {
  const rx = x * Math.cos(ROT_Y) + z * Math.sin(ROT_Y);
  const rz = -x * Math.sin(ROT_Y) + z * Math.cos(ROT_Y);
  const depth = CAMERA_Z - rz;
  return { x: WIDTH / 2 + (rx * focal) / depth, y: HEIGHT / 2 - (y * focal) / depth, depth };
});

const r = (n: number) => Math.round(n * 10) / 10;
const lines = links
  .map(([a, b]) => {
    const p = projected[a];
    const q = projected[b];
    return p && q ? `M${r(p.x)} ${r(p.y)}L${r(q.x)} ${r(q.y)}` : "";
  })
  .join("");
const dots = projected
  .map((p) => {
    const size = r(Math.max(2.5, 18 / p.depth));
    return `<rect x="${r(p.x - size / 2)}" y="${r(p.y - size / 2)}" width="${size}" height="${size}"/>`;
  })
  .join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}"><path d="${lines}" fill="none" stroke="#15bcdf" stroke-opacity=".38" stroke-width="1.2"/><g fill="#15bcdf" fill-opacity=".9">${dots}</g></svg>`;

writeFileSync(new URL("../public/img/red-nodos.svg", import.meta.url), svg);
console.log(
  `red-nodos.svg: ${points.length} nodos, ${links.length} enlaces, ${(svg.length / 1024).toFixed(1)} KB`,
);
