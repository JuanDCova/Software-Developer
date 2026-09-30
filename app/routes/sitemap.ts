import { projects } from "~/data/projects";
import { absoluteUrl } from "~/utils/seo";

/** Se prerenderiza como build/client/sitemap.xml a partir de los slugs reales. */
export function loader() {
  const paths = ["/", "/proyectos", "/cv", ...projects.map((p) => `/proyectos/${p.slug}`)];
  const urls = paths.map((path) => `  <url><loc>${absoluteUrl(path)}</loc></url>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
