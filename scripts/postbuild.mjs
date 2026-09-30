// Vercel y la mayoría de hosts estáticos sirven /404.html para rutas que no
// existen. React Router lo prerenderiza en /404/index.html; aquí se copia.
import { copyFileSync, existsSync } from "node:fs";

const source = new URL("../build/client/404/index.html", import.meta.url);
const target = new URL("../build/client/404.html", import.meta.url);

if (!existsSync(source)) {
  console.error("postbuild: no existe build/client/404/index.html");
  process.exit(1);
}
copyFileSync(source, target);
console.log("postbuild: 404.html listo");
