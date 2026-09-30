import { describe, expect, it } from "vitest";

import { experience } from "./experience";
import { profile } from "./profile";
import { getFeaturedProjects, getProjectBySlug, projects } from "./projects";
import { projectsUsing, skills } from "./skills";

/** Recorre cualquier objeto y devuelve todos sus textos. */
function collectStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === "object") return Object.values(value).flatMap(collectStrings);
  return [];
}

describe("proyectos", () => {
  it("tienen slugs únicos en formato URL", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    expect(getProjectBySlug("sgtal")?.title).toBe("SGTAL");
  });

  it("hay exactamente tres destacados y todos traen arquitectura", () => {
    const featured = getFeaturedProjects();
    expect(featured).toHaveLength(3);
    for (const project of featured) expect(project.architecture?.layers.length).toBeGreaterThan(0);
  });

  it("todo proyecto dice qué hice yo", () => {
    for (const project of projects) {
      expect(project.myRole.length, project.slug).toBeGreaterThan(0);
      expect(project.team.length, project.slug).toBeGreaterThan(0);
    }
  });

  it("los proyectos confidenciales no enlazan código ni demos", () => {
    for (const project of projects.filter((p) => p.confidential)) {
      expect(project.github, project.slug).toBeUndefined();
      expect(project.demo, project.slug).toBeUndefined();
    }
  });

  it("las imágenes apuntan a /public", () => {
    for (const project of projects) {
      for (const src of [project.image, ...project.gallery].filter(Boolean)) {
        expect(src).toMatch(/^\//);
      }
    }
  });
});

describe("stack", () => {
  it("cada tecnología listada tiene al menos un proyecto propio como evidencia", () => {
    for (const category of skills) {
      for (const technology of category.technologies) {
        expect(projectsUsing(technology).length, technology).toBeGreaterThan(0);
      }
    }
  });
});

describe("texto del sitio", () => {
  it("no usa guiones largos ni en-dash (regla de design-taste-frontend)", () => {
    const texts = collectStrings([projects, skills, experience, profile]);
    const offending = texts.filter((text) => /[\u2013\u2014]/.test(text));
    expect(offending).toEqual([]);
  });
});
