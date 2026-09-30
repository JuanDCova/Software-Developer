import type { Config } from "@react-router/dev/config";

import { projects } from "./app/data/projects";

export default {
  // Sin servidor en runtime: cada ruta se genera como HTML estático para que
  // los crawlers de LinkedIn y WhatsApp lean título, descripción y Open Graph.
  ssr: false,
  prerender({ getStaticPaths }) {
    return [
      ...getStaticPaths(),
      ...projects.map((project) => `/proyectos/${project.slug}`),
      "/404",
    ];
  },
} satisfies Config;
