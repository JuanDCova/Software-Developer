import { absoluteUrl } from "~/utils/seo";

/**
 * Se permite el rastreo siempre: LinkedInBot y WhatsApp respetan robots.txt y,
 * si se bloquea, no generan la vista previa. La indexación se controla con la
 * meta robots (site.indexable).
 */
export function loader() {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
