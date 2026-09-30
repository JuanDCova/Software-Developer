export interface Milestone {
  date: string;
  title: string;
  detail: string;
  /** Proyecto relacionado, si tiene página propia. */
  slug?: string;
}

/**
 * Progreso de Juan David, en orden. Las fechas de 2026 salen del historial de
 * git de cada repositorio y de la hoja de vida.
 */
export const timeline: Milestone[] = [
  {
    date: "2023 - 2024",
    title: "Desarrollador de Software en SENNOVA",
    detail: "Sistema de Investigación, Desarrollo Tecnológico e Innovación del SENA.",
  },
  {
    date: "2025",
    title: "Soporte Tecnológico en COEM",
    detail: "Soporte corporativo para Constructora Bolívar: incidencias, equipos y usuarios.",
  },
  {
    date: "2026",
    title: "Desarrollador de Software Junior en Corporación Unicorsalud",
    detail: "Aplicaciones empresariales, bases de datos y el ERP institucional.",
  },
  {
    date: "Jul 2026",
    title: "Pracxu, primer LMS propio",
    detail: "Del levantamiento de requisitos y el SRS a la primera versión.",
    slug: "pracxu",
  },
  {
    date: "Jul - Ago 2026",
    title: "Componente académico del ERP Universitario",
    detail: "Calificaciones, horarios, reportes en PDF y seguridad de sesiones.",
    slug: "erp-educacion-superior",
  },
  {
    date: "Sep 2026",
    title: "Nexora Platform y SGTAL",
    detail: "LMS multi-tenant y trazabilidad logística con asistente de IA.",
    slug: "sgtal",
  },
  {
    date: "Hoy",
    title: "Octavo semestre de Ingeniería de Sistemas",
    detail: "UNAD, en curso, mientras trabajo como desarrollador.",
  },
];
