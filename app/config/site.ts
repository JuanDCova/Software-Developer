export const site = {
  name: "Juan David Cova",
  role: "Desarrollador full stack",
  title: "Juan David Cova | Desarrollador full stack",
  description:
    "Desarrollador full stack. Construyo ERP, LMS y plataformas de logística con Django, React y PostgreSQL.",
  url: (import.meta.env.VITE_SITE_URL ?? "http://localhost:4173").replace(/\/$/, ""),
  locale: "es_CO",
  ogImage: "/og.png",
  /**
   * Mientras falte contenido por confirmar (ver docs/CONTENIDO_PENDIENTE.md)
   * el sitio pide a los buscadores que no lo indexen.
   */
  indexable: false,
} as const;

export const navLinks = [
  { label: "Sobre mí", to: "/#sobre-mi" },
  { label: "Experiencia", to: "/#experiencia" },
  { label: "Stack", to: "/#stack" },
  { label: "Proyectos", to: "/#proyectos" },
  { label: "Contacto", to: "/#contacto" },
] as const;
