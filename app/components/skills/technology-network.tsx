import { useMemo, useRef, useState } from "react";
import { Link } from "react-router";

import { projectsUsing, skills } from "~/data/skills";
import { useMotion } from "~/motion/use-motion";

const WIDTH = 1000;
const HEIGHT = 620;
const CENTER = { x: WIDTH / 2, y: HEIGHT / 2 };

type Active = { kind: "tech" | "project"; id: string } | null;

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
}

function ring(labels: { id: string; label: string }[], rx: number, ry: number, offset = 0) {
  return labels.map((item, index): Node => {
    const angle = -Math.PI / 2 + offset + (index * 2 * Math.PI) / labels.length;
    return { ...item, x: CENTER.x + rx * Math.cos(angle), y: CENTER.y + ry * Math.sin(angle) };
  });
}

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

/**
 * Red de tecnologías alrededor de Juan David: cada tecnología se conecta con
 * los proyectos donde se usó. Hover o foco resaltan las conexiones; la misma
 * información existe como lista accesible debajo (y es la única vista en mobile).
 */
export function TechnologyNetwork() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Active>(null);

  const { techNodes, projectNodes, edges } = useMemo(() => {
    const techs = skills.flatMap((category) => category.technologies);
    const usage = new Map(techs.map((tech) => [tech, projectsUsing(tech)]));
    const projectList = [
      ...new Map(
        [...usage.values()].flat().map((project) => [project.slug, project.title]),
      ).entries(),
    ].map(([id, label]) => ({ id, label }));

    return {
      techNodes: ring(
        techs.map((tech) => ({ id: tech, label: tech })),
        420,
        255,
      ),
      projectNodes: ring(projectList, 185, 118, Math.PI / projectList.length),
      edges: techs.flatMap((tech) =>
        (usage.get(tech) ?? []).map((project) => ({ tech, project: project.slug })),
      ),
    };
  }, []);

  const connected = useMemo(() => {
    if (!active) return null;
    const related = edges.filter((edge) =>
      active.kind === "tech" ? edge.tech === active.id : edge.project === active.id,
    );
    return {
      techs: new Set(related.map((edge) => edge.tech)),
      projects: new Set(related.map((edge) => edge.project)),
    };
  }, [active, edges]);

  const nodeById = (id: string) =>
    techNodes.find((node) => node.id === id) ?? projectNodes.find((node) => node.id === id);

  const caption = (() => {
    if (!active || !connected)
      return "Pasa el cursor por una tecnología para ver dónde la usé. Los proyectos abren su caso.";
    if (active.kind === "tech") {
      const names = projectNodes.filter((p) => connected.projects.has(p.id)).map((p) => p.label);
      return `${active.id}: ${names.join(", ")}.`;
    }
    const title = projectNodes.find((p) => p.id === active.id)?.label ?? "";
    return `${title}: ${[...connected.techs].join(", ")}.`;
  })();

  useMotion(rootRef, ({ gsap, MOTION_OK }, mm, root) => {
    mm.add(MOTION_OK, () => {
      const trigger = { trigger: root, start: "top 75%" };
      gsap.from(root.querySelectorAll("[data-edge]"), {
        strokeDashoffset: 1,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.008,
        scrollTrigger: trigger,
      });
      gsap.from(root.querySelectorAll("[data-node]"), {
        scale: 0.6,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.6)",
        stagger: 0.025,
        scrollTrigger: trigger,
      });
    });
  });

  const isDim = (kind: "tech" | "project", id: string) =>
    Boolean(connected) &&
    !(kind === "tech" ? connected?.techs.has(id) : connected?.projects.has(id)) &&
    !(active?.kind === kind && active.id === id);

  return (
    <div ref={rootRef} className="hidden md:block" onMouseLeave={() => setActive(null)}>
      <div className="relative aspect-[1000/620] w-full">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="absolute inset-0 size-full overflow-visible"
          aria-hidden="true"
        >
          {projectNodes.map((node) => (
            <line
              key={`c-${node.id}`}
              x1={CENTER.x}
              y1={CENTER.y}
              x2={node.x}
              y2={node.y}
              pathLength={1}
              strokeDasharray={1}
              data-edge
              className="stroke-line-strong"
              strokeWidth={1.5}
            />
          ))}
          {edges.map((edge) => {
            const from = nodeById(edge.tech);
            const to = nodeById(edge.project);
            if (!from || !to) return null;
            const lit =
              connected?.techs.has(edge.tech) &&
              connected.projects.has(edge.project) &&
              (active?.kind === "tech" ? active.id === edge.tech : active?.id === edge.project);
            return (
              <line
                key={`${edge.tech}-${edge.project}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                pathLength={1}
                strokeDasharray={1}
                data-edge
                strokeWidth={lit ? 1.6 : 1}
                className={`transition-[stroke,opacity] duration-300 ${
                  lit
                    ? "stroke-accent opacity-100"
                    : connected
                      ? "stroke-line opacity-40"
                      : "stroke-line-strong opacity-50"
                }`}
              />
            );
          })}
        </svg>

        <div
          data-node
          className="absolute -translate-x-1/2 -translate-y-1/2 bg-bg px-2 py-1 display-heading text-xl whitespace-nowrap text-accent-display"
          style={{ left: "50%", top: "50%" }}
        >
          Juan David
        </div>

        {projectNodes.map((node) => (
          <Link
            key={node.id}
            to={`/proyectos/${node.id}`}
            onMouseEnter={() => setActive({ kind: "project", id: node.id })}
            onFocus={() => setActive({ kind: "project", id: node.id })}
            onBlur={() => setActive(null)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 px-3.5 py-2 font-display text-sm font-bold tracking-[0.04em] whitespace-nowrap uppercase transition-[opacity,background-color,color] duration-300 chamfer ${
              active?.kind === "project" && active.id === node.id
                ? "bg-accent text-on-accent"
                : "bg-brand text-bg"
            } ${isDim("project", node.id) ? "opacity-35" : "opacity-100"}`}
            style={{ left: pct(node.x, WIDTH), top: pct(node.y, HEIGHT) }}
          >
            <span data-node className="block">
              {node.label}
            </span>
          </Link>
        ))}

        {techNodes.map((node) => (
          // Las tecnologías no navegan: son texto que resalta sus conexiones al pasar el cursor.
          <span
            key={node.id}
            onMouseEnter={() => setActive({ kind: "tech", id: node.id })}
            className={`absolute -translate-x-1/2 -translate-y-1/2 bg-bg px-1.5 py-0.5 font-mono text-xs whitespace-nowrap transition-[opacity,color] duration-300 ${
              active?.kind === "tech" && active.id === node.id
                ? "font-semibold text-accent-ink"
                : "text-ink"
            } ${isDim("tech", node.id) ? "opacity-35" : "opacity-100"}`}
            style={{ left: pct(node.x, WIDTH), top: pct(node.y, HEIGHT) }}
          >
            <span data-node className="block">
              {node.label}
            </span>
          </span>
        ))}
      </div>
      <p aria-live="polite" className="mt-6 min-h-6 text-center text-sm text-ink-soft">
        {caption}
      </p>
    </div>
  );
}
