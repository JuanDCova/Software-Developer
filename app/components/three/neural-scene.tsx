import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/** Generador pseudoaleatorio con semilla: la red es siempre la misma. */
function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

const NODE_COUNT = 140;
const LINK_DISTANCE = 1.15;

function buildNetwork() {
  const random = seeded(7);
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    // Volumen elipsoidal, más ancho que alto, como un sistema en capas.
    const theta = random() * Math.PI * 2;
    const phi = Math.acos(2 * random() - 1);
    const radius = 2.2 + random() * 1.6;
    points.push(
      new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta) * 1.5,
        radius * Math.cos(phi) * 0.8,
        radius * Math.sin(phi) * Math.sin(theta),
      ),
    );
  }

  const segments: number[] = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const a = points[i];
      const b = points[j];
      if (a && b && a.distanceTo(b) < LINK_DISTANCE) segments.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }

  return {
    nodes: new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])),
    links: new Float32Array(segments),
  };
}

function readAccent() {
  const value = getComputedStyle(document.documentElement).getPropertyValue("--accent-ink").trim();
  return new THREE.Color(value || "#2563eb");
}

function Network({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const { nodes, links } = useMemo(() => buildNetwork(), []);
  const [color, setColor] = useState(readAccent);

  // El color sigue al tema: cambia con el toggle y con el sistema operativo.
  useEffect(() => {
    const update = () => setColor(readAccent());
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", update);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", update);
    };
  }, []);

  useFrame((_, delta) => {
    const current = group.current;
    if (!current) return;
    current.rotation.y += delta * 0.04;
    // La cámara no se mueve: el sistema se inclina levemente hacia el mouse.
    const target = pointer.current;
    current.rotation.x += ((target?.y ?? 0) * 0.25 - current.rotation.x) * 0.04;
    current.rotation.z += ((target?.x ?? 0) * -0.12 - current.rotation.z) * 0.04;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodes, 3]} />
        </bufferGeometry>
        <pointsMaterial color={color} size={0.055} sizeAttenuation transparent opacity={0.9} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[links, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.22} />
      </lineSegments>
    </group>
  );
}

/**
 * Red de nodos del hero ("digital neural network / engineering system").
 * Se carga en diferido y solo en escritorio; deja de renderizar fuera de vista.
 */
export default function NeuralScene() {
  const wrapper = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const observer = new IntersectionObserver(([entry]) =>
      setVisible(Boolean(entry?.isIntersecting)),
    );
    if (wrapper.current) observer.observe(wrapper.current);

    return () => {
      window.removeEventListener("pointermove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapper}
      className="size-full transition-opacity duration-1000"
      style={{ opacity: ready ? 1 : 0 }}
    >
      <Canvas
        dpr={[1, 1.5]}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0, 7.5], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        onCreated={() => setReady(true)}
        aria-hidden="true"
      >
        <Network pointer={pointer} />
      </Canvas>
    </div>
  );
}
