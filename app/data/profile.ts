export interface Education {
  institution: string;
  program: string;
  /** Solo si se conoce con certeza. */
  status?: string;
}

export const profile = {
  name: "Juan David Cova",
  fullName: "Juan David Cova Salgado",
  /** Titular escalonado del hero: tres líneas a la izquierda y tres desplazadas. */
  heroLines: [
    ["Construyo,", "mantengo", "y escalo"],
    ["software", "para tu", "empresa"],
  ] as const,
  headline: "Desarrollador full stack",
  intro:
    "Desarrollador full stack. Frontend, backend, mantenimiento, refactorización e implementación: listo para el próximo reto.",
  about: [
    "Desarrollo software: empecé en SENNOVA, el sistema de investigación e innovación del SENA, y hoy soy desarrollador en la Corporación Unicorsalud mientras curso octavo semestre de Ingeniería de Sistemas.",
    "Me adapto a lo que el proyecto necesite: crear un sistema desde cero, mantener y refactorizar uno existente, implementarlo o sumarme al frontend o al backend. Trabajo sobre todo con Django, React y TypeScript, y aprendo rápido lo que haga falta para el siguiente desafío.",
  ],
  /** Experiencia integrando IA dentro del software (asistentes en SGTAL y Nexora). */
  aiStatement:
    "Integro inteligencia artificial dentro del software para que haga trabajo real: asistentes que responden las preguntas de los usuarios, automatización de tareas repetitivas y apoyo para resolver problemas. Ya lo apliqué en SGTAL y en Nexora, conectando los modelos con los datos y las reglas de cada negocio de forma segura.",
  principles: [
    {
      title: "La lógica vive en servicios",
      body: "Las reglas del negocio van en una capa de servicios transaccional, no en vistas ni serializers.",
    },
    {
      title: "La base de datos también valida",
      body: "Constraints para lo que nunca debe pasar: reservas cruzadas, stock negativo, fechas desordenadas.",
    },
    {
      title: "Nada se borra",
      body: "Desactivación, auditoría y movimientos inmutables en lugar de eliminar registros.",
    },
  ],
  /** Perfil de la hoja de vida, tal como la presenta Juan David. */
  cvSummary:
    "Desarrollador de software desde 2023 y estudiante de octavo semestre de Ingeniería de Sistemas. Experiencia en desarrollo full stack, gestión de bases de datos, mantenimiento y refactorización de sistemas existentes, y creación de productos desde cero. También cuento con experiencia en soporte técnico y resolución de incidencias. Me adapto rápido a nuevas tecnologías y busco nuevos desafíos donde entregar soluciones estables y bien documentadas.",
  /** Competencias de la hoja de vida (además del stack técnico). */
  competencies: [
    "Desarrollo web full stack",
    "Mantenimiento y refactorización",
    "Integración de IA en software",
    "Gestión de bases de datos",
    "Análisis de requerimientos",
    "Documentación técnica",
    "Soporte técnico",
    "Mantenimiento de equipos",
    "Resolución de incidencias",
    "Trabajo en equipo",
  ],
  process: ["Descubrir", "Diseñar", "Modelar", "Desarrollar", "Probar", "Desplegar"],
  location: "Colombia",
  education: [
    {
      institution: "UNAD, Universidad Nacional Abierta y a Distancia",
      program: "Ingeniería de Sistemas",
      status: "En curso, octavo semestre",
    },
    {
      institution: "SENA, Centro Industrial y de Aviación",
      program: "Tecnólogo en Análisis y Desarrollo de Sistemas de Información",
    },
  ] satisfies Education[],
  languages: ["Español nativo", "Inglés técnico"],
  links: {
    github: "https://github.com/JuanDCova",
    linkedin: "https://www.linkedin.com/in/juancovasoftwaredeveloper/",
    email: "juancoava0@gmail.com",
  },
  /** Foto recortada 4:5 en /public/img, en AVIF y WebP (480 y 800 px de ancho). */
  photo: {
    basePath: "/img/juan-david-cova",
    alt: "Juan David Cova sonriendo en una terraza al atardecer, con saco beige y camisa blanca",
  },
} as const;
