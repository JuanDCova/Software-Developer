export const profile = {
  name: "Juan David Cova",
  headline: "Desarrollador full stack de sistemas de gestión",
  intro:
    "Construyo ERP, LMS y plataformas de logística con Django, React y PostgreSQL, desde el modelo de datos hasta el despliegue.",
  about: [
    "Trabajo sobre todo con Django REST Framework en el backend y React con TypeScript en el frontend. Me interesan los sistemas donde las reglas del negocio importan: flujos de aprobación, inventarios que no pueden descuadrarse, permisos por rol.",
    "He participado en un ERP institucional con módulos académicos, de contratación y contables, y he construido por mi cuenta plataformas de logística y de formación virtual.",
  ],
  /** Cómo trabajo con IA. Se dice de frente porque el historial de git lo muestra. */
  aiStatement:
    "Uso asistentes de IA como parte de mi flujo de trabajo. Defino la arquitectura y los criterios, reviso cada cambio y respondo por el resultado. En cada proyecto indico qué parte hice yo.",
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
  links: {
    github: "https://github.com/JuanDCova",
    /** Pendientes: los entrega Juan David antes de publicar. */
    linkedin: null as string | null,
    email: null as string | null,
  },
  /** Ruta en /public de la foto tratada. `null` hasta que exista. */
  photo: null as string | null,
} as const;
