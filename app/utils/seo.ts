import type { MetaDescriptor } from "react-router";

import { site } from "~/config/site";
import { profile } from "~/data/profile";

export function absoluteUrl(path: string) {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

interface PageMeta {
  /** Título propio de la página; se completa con el nombre del sitio. */
  title?: string;
  description?: string;
  path: string;
}

/** Metadatos completos por ruta: título, canonical, Open Graph y Twitter/X. */
export function pageMeta({ title, description, path }: PageMeta): MetaDescriptor[] {
  const pageTitle = title ? `${title} | ${site.name}` : site.title;
  const pageDescription = description ?? site.description;
  const url = absoluteUrl(path);
  const image = absoluteUrl(site.ogImage);

  return [
    { title: pageTitle },
    { name: "description", content: pageDescription },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: site.locale },
    { property: "og:site_name", content: site.name },
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: pageDescription },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: `${site.name}, ${site.role}` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: pageTitle },
    { name: "twitter:description", content: pageDescription },
    { name: "twitter:image", content: image },
    ...(site.indexable ? [] : [{ name: "robots", content: "noindex, nofollow" }]),
  ];
}

export function personJsonLd() {
  const sameAs = [profile.links.github, profile.links.linkedin];
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    address: { "@type": "PostalAddress", addressCountry: "CO" },
    sameAs,
    knowsAbout: ["Django", "Django REST Framework", "React", "TypeScript", "PostgreSQL"],
  };
}
