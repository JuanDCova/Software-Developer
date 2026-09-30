import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { buildNetwork } from "./network-data";

function toBuffers() {
  const { points, links } = buildNetwork();
  return {
    nodes: new Float32Array(points.flat()),
    links: new Float32Array(
      links.flatMap(([a, b]) => [...(points[a] ?? [0, 0, 0]), ...(points[b] ?? [0, 0, 0])]),
    ),
  };
}

function readAccent() {
  const value = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
  return new THREE.Color(value || "#2563eb");
}

function Network({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const { nodes, links } = useMemo(() => toBuffers(), []);
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
        <pointsMaterial color={color} size={0.07} sizeAttenuation transparent opacity={0.9} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[links, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.38} />
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
        camera={{ position: [0, 0, 6.2], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        onCreated={() => setReady(true)}
        aria-hidden="true"
      >
        <Network pointer={pointer} />
      </Canvas>
    </div>
  );
}
