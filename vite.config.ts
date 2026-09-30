import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// En Vercel la URL de producción llega por variable de entorno del build.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
process.env.VITE_SITE_URL ??= vercelUrl ? `https://${vercelUrl}` : "http://localhost:4173";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
});
