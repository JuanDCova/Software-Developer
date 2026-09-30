export const site = {
  name: "Juan David Cova",
  role: "Desarrollador full stack",
  title: "Juan David Cova | Desarrollador full stack",
  description:
    "Juan David Cova, desarrollador full stack : frontend, backend, mantenimiento, refactorización y software desde cero.",
  url: (import.meta.env.VITE_SITE_URL ?? "http://localhost:4173").replace(/\/$/, ""),
  locale: "es_CO",
  ogImage: "/og.png",
  /**
   * Mientras falte contenido por confirmar (ver docs/CONTENIDO_PENDIENTE.md)
   * el sitio pide a los buscadores que no lo indexen.
   */
  indexable: true,
} as const;

export const navLinks = [
  { label: "Sobre mí", to: "/#sobre-mi" },
  { label: "Experiencia", to: "/#experiencia" },
  { label: "Stack", to: "/#stack" },
  { label: "Proyectos", to: "/#proyectos" },
  { label: "Contacto", to: "/#contacto" },
] as const;
