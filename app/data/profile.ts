export interface Education {
  institution: string;
  program: string;
  status: string;
}

export const profile = {
  name: "Juan David Cova",
  headline: "Desarrollador full stack de sistemas de gestión",
  intro:
    "Construyo ERP, LMS y plataformas de logística con Django, React y PostgreSQL, desde el modelo de datos hasta el despliegue.",
  about: [
    "Soy desarrollador de software en la Corporación Unicorsalud y estudiante de octavo semestre de Ingeniería de Sistemas. Trabajo sobre todo con Django REST Framework en el backend y React con TypeScript en el frontend.",
    "Me interesan los sistemas donde las reglas del negocio importan: flujos de aprobación, inventarios que no pueden descuadrarse, permisos por rol. Participo en un ERP para instituciones de educación superior y he construido por mi cuenta plataformas de logística y de formación virtual.",
  ],
  /** Cómo trabajo con IA. Se dice de frente porque el historial de git lo muestra. */
  aiStatement:
    "Uso asistentes de IA como parte de mi flujo de trabajo y también los integro en los productos. Defino la arquitectura y los criterios, reviso cada cambio y respondo por el resultado. En cada proyecto indico qué parte hice yo.",
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
      status: "Titulado",
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
