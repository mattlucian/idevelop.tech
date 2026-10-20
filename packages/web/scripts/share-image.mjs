/* eslint-disable no-console -- CLI tool; console is its output */
// Render an article's link preview image (1200x630) from its metadata in
// src/data/articles.ts, in the style of the site-wide share image.
//
//   npm run share-image -- <slug>
//
// Writes public/images/articles/<slug>.png. Set the article's `ogImage` to
// "/images/articles/<slug>.png" so its page uses it. The file lives in
// public/ so the URL stays fixed for link previewers that cache it.

import { readFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import puppeteer from "puppeteer";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const escapeHtml = (text) =>
  text.replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );

async function loadSiteData() {
  // Vite resolves the `@/` alias and TypeScript in the data files
  const server = await createServer({
    root,
    logLevel: "error",
    server: { middlewareMode: true, hmr: false },
    appType: "custom",
  });
  try {
    const { articles, articleTypeLabels } = await server.ssrLoadModule(
      "/src/data/articles.ts",
    );
    const { AUTHOR } = await server.ssrLoadModule("/src/constants/index.ts");
    return { articles, articleTypeLabels, AUTHOR };
  } finally {
    await server.close();
  }
}

function cardHtml({ eyebrow, title, summary, byline, logo }) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #fff;
    background:
      radial-gradient(circle at 6% 4%, rgba(6, 182, 212, 0.22), transparent 30%),
      radial-gradient(circle at 96% 100%, rgba(168, 85, 247, 0.2), transparent 32%),
      #0a0a0a;
  }
  .card {
    height: 100%; padding: 72px 90px 64px;
    display: flex; flex-direction: column;
  }
  /* The logo file is black; show it white like the site-wide share image */
  .logo {
    height: 76px; width: auto; align-self: flex-start;
    filter: brightness(0) invert(1);
  }
  .main { margin: auto 0; }
  .eyebrow {
    font-size: 22px; font-weight: 600; letter-spacing: 0.14em;
    text-transform: uppercase; color: #22d3ee;
  }
  h1 {
    margin-top: 18px; font-size: 60px; line-height: 1.12; font-weight: 700;
    background: linear-gradient(90deg, #22d3ee, #67e8f9 55%, #c084fc);
    -webkit-background-clip: text; background-clip: text; color: transparent;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
    overflow: hidden;
  }
  p {
    margin-top: 22px; max-width: 960px;
    font-size: 26px; line-height: 1.4; color: #d1d5db;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .footer {
    display: flex; justify-content: space-between;
    font-size: 24px; color: #9ca3af;
  }
</style></head><body><div class="card">
  <img class="logo" src="${logo}" alt="">
  <div class="main">
    <div class="eyebrow">${escapeHtml(eyebrow)}</div>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(summary)}</p>
  </div>
  <div class="footer"><span>${escapeHtml(byline)}</span><span>idevelop.tech</span></div>
</div></body></html>`;
}

const slug = process.argv[2];
if (!slug) {
  throw new Error("usage: npm run share-image -- <slug>");
}

const { articles, articleTypeLabels, AUTHOR } = await loadSiteData();
const article = articles.find((a) => a.slug === slug);
if (!article) {
  throw new Error(`share-image: no article with slug "${slug}"`);
}

const logoPng = await readFile(
  join(root, "public/images/brand/logo-black.png"),
);
const html = cardHtml({
  eyebrow: articleTypeLabels[article.type].eyebrow,
  title: article.title,
  summary: article.summary,
  byline: `${AUTHOR.name} · ${AUTHOR.company}`,
  logo: `data:image/png;base64,${logoPng.toString("base64")}`,
});

const out = join(root, "public/images/articles", `${slug}.png`);
await mkdir(dirname(out), { recursive: true });
const browser = await puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.setContent(html, { waitUntil: "load" });
  await page.screenshot({ path: out, type: "png" });
} finally {
  await browser.close();
}
console.log(`share-image: wrote ${out.replace(`${root}/`, "")}`);
