import { projects } from "./projects";
import type { SkillCategory } from "./types";

/**
 * Solo tecnologías con trabajo propio verificable en los repositorios.
 * No hay porcentajes de dominio: la prueba es el proyecto donde se usó.
 * Next.js, Terraform y AWS aparecen en Palatsi, pero ese código lo generó
 * una IA, así que no se listan como habilidades propias.
 */
export const skills: SkillCategory[] = [
  {
    id: "backend",
    name: "Backend",
    technologies: ["Python", "Django", "Django REST Framework", "Celery", "JWT"],
  },
  {
    id: "frontend",
    name: "Frontend",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Radix UI"],
  },
  {
    id: "datos",
    name: "Datos",
    technologies: ["PostgreSQL", "Redis", "S3 / MinIO"],
  },
  {
    id: "devops",
    name: "DevOps",
    technologies: ["Docker", "Nginx", "GitHub Actions"],
  },
];

/** Proyectos donde se usó una tecnología, para mostrar la evidencia junto al nombre. */
export function projectsUsing(technology: string) {
  return projects.filter(
    (project) => project.technologies.includes(technology) && project.slug !== "palatsi-beauty-os",
  );
}
