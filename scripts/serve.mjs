import { createServer } from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";

const root = resolve("out");
const port = Number(process.env.PORT || 3000);
if (!existsSync(resolve(root, "index.html"))) {
  console.error("Primero ejecuta npm run build para generar out/.");
  process.exit(1);
}
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8", ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml", ".webp": "image/webp", ".jpg": "image/jpeg",
  ".png": "image/png", ".woff": "font/woff", ".woff2": "font/woff2", ".ico": "image/x-icon",
};
createServer(async (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" }); res.end(); return;
  }
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url || "/", "http://localhost").pathname); }
  catch { res.writeHead(400); res.end("Bad request"); return; }
  if (pathname.includes("\0")) { res.writeHead(400); res.end("Bad request"); return; }
  let file = resolve(root, `.${pathname}`);
  if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403); res.end("Forbidden"); return; }
  let status = 200;
  try {
    const info = await stat(file);
    if (info.isDirectory()) file = resolve(file, "index.html");
    if (!(await stat(file)).isFile()) throw new Error("Not a file");
  } catch { file = resolve(root, "404.html"); status = 404; }
  const headers = { "Content-Type": types[extname(file)] || "application/octet-stream", "X-Content-Type-Options": "nosniff" };
  if (pathname.startsWith("/_next/static/")) headers["Cache-Control"] = "public, max-age=31536000, immutable";
  res.writeHead(status, headers);
  if (req.method === "HEAD") { res.end(); return; }
  createReadStream(file).on("error", () => res.destroy()).pipe(res);
}).listen(port, "127.0.0.1", () => console.log(`El Prado — producción local: http://127.0.0.1:${port}`));
