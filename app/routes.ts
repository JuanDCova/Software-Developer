import { index, route } from "@react-router/dev/routes";
import type { RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("proyectos", "routes/proyectos.tsx"),
  route("proyectos/:slug", "routes/proyecto.tsx"),
  route("cv", "routes/cv.tsx"),
  route("sitemap.xml", "routes/sitemap.ts"),
  route("robots.txt", "routes/robots.ts"),
  // Cualquier otra ruta. Se prerenderiza en /404 y se copia a 404.html.
  route("*", "routes/404.tsx"),
] satisfies RouteConfig;
