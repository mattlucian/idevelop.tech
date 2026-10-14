/* eslint-disable no-console -- CLI build step; console is its output */
// Prerender the routes listed in the sitemap into static HTML after `vite build`.
//
// Crawlers and link previews that don't run JavaScript (LinkedIn, Slack, X,
// most AI crawlers) otherwise see only index.html's homepage title and meta.
// Each route is loaded in headless Chrome against `vite preview`, and the
// rendered page is saved as dist/<route>.html, the file SST's CloudFront
// router serves for an extensionless URL. The app still mounts normally on
// top of it in the browser.
//
// The homepage is skipped: index.html already carries its meta and doubles as
// the SPA fallback for unknown routes. Set PRERENDER=false to skip this step.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { preview } from "vite";
import puppeteer from "puppeteer";

async function prerender() {
  const root = join(dirname(fileURLToPath(import.meta.url)), "..");
  const dist = join(root, "dist");

  const sitemap = await readFile(join(dist, "sitemap.xml"), "utf8");
  const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(([, loc]) => new URL(loc).pathname.replace(/\/$/, ""))
    .filter((path) => path !== "");

  const template = await readFile(join(dist, "index.html"), "utf8");
  // Scripts that ship in index.html; anything else in <head> was added at runtime
  const templateScripts = [
    ...template.matchAll(/<script[^>]*src="([^"]+)"/g),
  ].map(([, src]) => src);

  const server = await preview({
    root,
    logLevel: "warn",
    preview: { port: 4179, strictPort: false },
  });
  const origin = server.resolvedUrls?.local[0]?.replace(/\/$/, "");
  if (!origin) throw new Error("prerender: preview server has no local URL");

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let failed = 0;
  try {
    for (const route of routes) {
      const page = await browser.newPage();
      await page.goto(`${origin}${route}`, { waitUntil: "networkidle0" });
      // useMeta sets the canonical URL once the route's view has rendered
      await page.waitForFunction(
        (path) =>
          document
            .querySelector('link[rel="canonical"]')
            ?.getAttribute("href")
            ?.endsWith(path),
        { timeout: 10000 },
        route,
      );

      const html = await page.evaluate((keepScripts) => {
        // Drop scripts and frames injected at runtime (reCAPTCHA, analytics),
        // keeping the app entry and the inline JSON-LD from index.html
        document.querySelectorAll("script").forEach((script) => {
          const src = script.getAttribute("src");
          const isJsonLd = script.type === "application/ld+json";
          if (src ? !keepScripts.includes(src) : !isJsonLd) script.remove();
        });
        document.querySelectorAll("iframe").forEach((frame) => frame.remove());
        // Keep only the app root in <body>; third-party widgets attach outside it
        const app = document.getElementById("app");
        [...document.body.children].forEach((child) => {
          if (child !== app) child.remove();
        });
        return `<!DOCTYPE html>\n${document.documentElement.outerHTML}`;
      }, templateScripts);

      // The app must still be able to mount on top of the saved page
      const missing = templateScripts.filter((src) => !html.includes(src));
      if (missing.length > 0) {
        failed++;
        console.error(`prerender: ${route} is missing ${missing.join(", ")}`);
      }

      const file = join(dist, `${route}.html`);
      await mkdir(dirname(file), { recursive: true });
      await writeFile(file, html);
      console.log(`prerender: ${route} -> dist${route}.html`);
      await page.close();
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.httpServer.close(resolve));
  }

  if (failed > 0) {
    throw new Error(`prerender: ${failed} route(s) failed`);
  }
}

if (process.env.PRERENDER === "false") {
  console.log("prerender: skipped (PRERENDER=false)");
} else {
  await prerender();
}
