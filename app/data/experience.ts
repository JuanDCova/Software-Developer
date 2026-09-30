import type { ExperienceEntry } from "./types";

/**
 * Los cargos y las fechas no se pueden deducir de los repositorios.
 * Lo que está en `null` lo confirma Juan David (docs/CONTENIDO_PENDIENTE.md).
 */
export const experience: ExperienceEntry[] = [
  {
    id: "unicorsalud",
    role: null,
    organization: "Unicorsalud",
    period: null,
    summary:
      "Desarrollo del ERP institucional en un equipo de cuatro personas: módulo académico, estudiantes y calificaciones, reportes en PDF, admisión y matrícula, y seguridad de sesiones.",
    technologies: [
      "Django",
      "Django REST Framework",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Docker",
    ],
  },
  {
    id: "independiente",
    role: null,
    organization: "Proyectos independientes",
    period: null,
    summary:
      "Plataformas a medida: trazabilidad de activos y logística (SGTAL), un LMS y CMS multi-tenant (Nexora) y un LMS de cursos cortos (Pracxu), desde el levantamiento de requisitos hasta el despliegue.",
    technologies: ["Django", "React", "TypeScript", "PostgreSQL", "Celery", "Redis", "Docker"],
  },
];
