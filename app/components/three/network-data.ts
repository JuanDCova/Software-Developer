/**
 * Red de nodos determinista, compartida por la escena 3D y por el póster SVG
 * (scripts/generate-poster.ts). Sin dependencias: solo matemática.
 */
export type Vec3 = [number, number, number];

/** Generador pseudoaleatorio con semilla: la red es siempre la misma. */
function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

export const NODE_COUNT = 220;
const LINK_DISTANCE = 1.15;

export function buildNetwork() {
  const random = seeded(7);
  const points: Vec3[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    // Volumen elipsoidal, más ancho que alto, como un sistema en capas.
    const theta = random() * Math.PI * 2;
    const phi = Math.acos(2 * random() - 1);
    const radius = 2.2 + random() * 1.6;
    points.push([
      radius * Math.sin(phi) * Math.cos(theta) * 1.5,
      radius * Math.cos(phi) * 0.8,
      radius * Math.sin(phi) * Math.sin(theta),
    ]);
  }

  const links: [number, number][] = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const a = points[i];
      const b = points[j];
      if (!a || !b) continue;
      const distance = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
      if (distance < LINK_DISTANCE) links.push([i, j]);
    }
  }
  return { points, links };
}
