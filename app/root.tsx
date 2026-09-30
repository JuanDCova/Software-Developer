import type { ReactNode } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { Footer } from "~/components/common/footer";
import { Navbar } from "~/components/navigation/navbar";
import { NotFound } from "~/routes/404";
import { personJsonLd } from "~/utils/seo";
import { themeInitScript } from "~/utils/theme";

import "./styles/globals.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
  { rel: "manifest", href: "/manifest.webmanifest" },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-CO" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f8fafc" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#020617" media="(prefers-color-scheme: dark)" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
      </head>
      <body className="min-h-dvh">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-control focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
        >
          Saltar al contenido
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main id="contenido">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <>
        <Navbar />
        <main id="contenido">
          <NotFound />
        </main>
      </>
    );
  }

  const details = import.meta.env.DEV && error instanceof Error ? error.message : null;
  return (
    <main id="contenido" className="mx-auto max-w-2xl px-4 pt-40 pb-24">
      <h1 className="font-display text-4xl font-semibold text-brand">Algo salió mal</h1>
      <p className="mt-4 text-ink-soft">La página no pudo cargarse. Intenta recargarla.</p>
      {details ? <pre className="mt-6 overflow-x-auto text-sm">{details}</pre> : null}
    </main>
  );
}
