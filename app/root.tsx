import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import type { Route } from "./+types/root";
import { Footer } from "~/components/common/footer";
import { Navbar } from "~/components/navigation/navbar";
import { NotFound } from "~/routes/404";
import { personJsonLd } from "~/utils/seo";
import { themeInitScript } from "~/utils/theme";

import quantico from "../node_modules/@fontsource/quantico/files/quantico-latin-700-normal.woff2?url";

import "./styles/globals.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
  { rel: "manifest", href: "/manifest.webmanifest" },
  // La fuente de titulares usa font-display: optional; con preload llega antes del primer pintado.
  ...[quantico].map((href) => ({
    rel: "preload",
    href,
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous" as const,
  })),
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-CO" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f2f1f0" />
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

/** Scroll suave (Lenis + ScrollTrigger) cargado en diferido, solo en escritorio. */
function useSmoothScroll() {
  const { pathname } = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    let stop: (() => void) | undefined;
    let cancelled = false;
    import("~/motion/gsap").then(({ startSmoothScroll }) => {
      if (!cancelled) stop = startSmoothScroll();
    });
    return () => {
      cancelled = true;
      stop?.();
    };
  }, []);

  // Cada página nueva empieza arriba y recalcula sus ScrollTriggers.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    import("~/motion/gsap").then(({ resetScroll }) => resetScroll());
  }, [pathname]);
}

export default function App() {
  useSmoothScroll();
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
