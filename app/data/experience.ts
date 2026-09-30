import type { ExperienceEntry } from "./types";

/** Cargos y fechas tomados de la hoja de vida de Juan David. */
export const experience: ExperienceEntry[] = [
  {
    id: "unicorsalud",
    role: "Desarrollador de Software Junior",
    organization: "Corporación Unicorsalud",
    period: "2026 - Actualidad",
    summary:
      "Desarrollo y mantenimiento de aplicaciones empresariales y del ERP institucional en un equipo de cuatro personas: módulo académico, estudiantes y calificaciones, reportes en PDF, admisión y matrícula, y seguridad de sesiones. Análisis de requerimientos y documentación técnica.",
    technologies: [
      "Python",
      "Django",
      "Django REST Framework",
      "React",
      "TypeScript",
      "PostgreSQL",
      "SQL Server",
      "Docker",
    ],
  },
  {
    id: "independiente",
    role: "Desarrollador full stack",
    organization: "Proyectos independientes",
    period: "2026",
    summary:
      "Plataformas a medida, desde el levantamiento de requisitos hasta el despliegue: trazabilidad de activos y logística con asistente de IA (SGTAL), un LMS y CMS multi-tenant (Nexora) y un LMS de cursos cortos (Pracxu).",
    technologies: ["Django", "React", "TypeScript", "PostgreSQL", "Celery", "Redis", "Docker"],
  },
  {
    id: "coem",
    role: "Soporte Tecnológico",
    organization: "COEM",
    period: "2025 - 2026",
    summary:
      "Soporte corporativo y gestión tecnológica para Constructora Bolívar: atención de incidencias, configuración de equipos y sistemas operativos, y soporte a usuarios.",
    technologies: [],
  },
  {
    id: "sennova",
    role: "Desarrollador de Software",
    organization: "SENNOVA, SENA",
    period: "2023 - 2024",
    summary:
      "Desarrollo de software en SENNOVA, el Sistema de Investigación, Desarrollo Tecnológico e Innovación del Servicio Nacional de Aprendizaje (SENA).",
    technologies: [],
  },
];
