export type ProjectStatus = "en-produccion" | "en-desarrollo" | "prototipo";

export interface ArchitectureLayer {
  /** Nombre de la capa: "Interfaz", "API", "Dominio", "Datos". */
  name: string;
  /** Tecnología o pieza principal de la capa. */
  tech: string;
  /** Módulos o responsabilidades que viven en la capa. */
  nodes: string[];
}

export interface ArchitectureData {
  layers: ArchitectureLayer[];
  /** Decisiones de diseño que explican por qué la arquitectura es así. */
  decisions: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  year: number;
  category: string;
  technologies: string[];
  /** Ruta en /public. `null` mientras no exista una captura real con datos demo. */
  image: string | null;
  gallery: string[];
  featured: boolean;
  github?: string;
  demo?: string;
  status: ProjectStatus;
  problem: string;
  solution: string;
  role: string;
  /** Qué hice yo, verificable en el historial de git. */
  myRole: string[];
  team: string;
  /** Si parte del código se generó con asistentes de IA, se dice aquí. */
  aiAssisted?: string;
  /** Código o datos de un tercero: no se enlaza el repositorio ni se publican capturas reales. */
  confidential: boolean;
  features: string[];
  challenges: string[];
  /** Solo resultados con base real. Vacío significa que aún no hay métricas verificadas. */
  results: string[];
  architecture?: ArchitectureData;
}

export interface ExperienceEntry {
  id: string;
  /** `null` = dato que falta confirmar; la interfaz lo marca como pendiente. */
  role: string | null;
  organization: string;
  period: string | null;
  summary: string;
  technologies: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  technologies: string[];
}
