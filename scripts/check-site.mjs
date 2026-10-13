import fs from "node:fs/promises";
const base = process.env.CHECK_URL || "http://localhost:3100";
const sitemap = await (await fetch(base + "/sitemap.xml")).text();
const paths = [
  ...sitemap.matchAll(
    /<loc>https:\/\/photographer.mspixelpulse.com([^<]*)<\/loc>/g,
  ),
].map((m) => m[1] || "/");
const failures = [];
const titles = new Set();
const internal = new Set();
for (const route of paths) {
  const r = await fetch(base + route);
  const html = await r.text();
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  if (r.status !== 200) failures.push(route + " HTTP " + r.status);
  if ((html.match(/<h1[ >]/g) || []).length !== 1)
    failures.push(route + " H1 count");
  if (!title || titles.has(title))
    failures.push(route + " missing/duplicate title");
  titles.add(title);
  if (!html.includes('name="description"'))
    failures.push(route + " missing description");
  if (!html.includes('rel="canonical"'))
    failures.push(route + " missing canonical");
  for (const m of html.matchAll(/href="(\/[^"#]*)"/g))
    if (!m[1].startsWith("/_next")) internal.add(m[1]);
}
for (const path of internal) {
  const r = await fetch(base + path, { method: "HEAD" });
  if (!r.ok) failures.push(path + " broken link " + r.status);
}
const assets = JSON.parse(await fs.readFile("src/data/assets.json", "utf8"));
let images = 0;
for (let i = 0; i < assets.length; i += 8) {
  await Promise.all(
    assets.slice(i, i + 8).map(async (a) => {
      for (const src of [
        a.src,
        a.src.replace(".webp", "-small.webp"),
        a.src.replace(".webp", "-medium.webp"),
      ]) {
        const r = await fetch(base + src, { method: "HEAD" });
        if (!r.ok || !r.headers.get("content-type")?.includes("image"))
          failures.push(src + " failed");
        else images++;
      }
    }),
  );
}
const films = JSON.parse(await fs.readFile("src/data/films.json", "utf8"));
let media = 0;
for (const film of films) {
  for (const src of [
    film.src,
    film.poster,
    film.poster.replace(".webp", "-small.webp"),
  ]) {
    const r = await fetch(base + src, { method: "HEAD" });
    if (!r.ok) failures.push(src + " failed " + r.status);
    else media++;
  }
}
for (const src of [
  "/icon.svg",
  "/apple-touch-icon.png",
  "/camera-mark.svg",
  "/logo-dark.svg",
  "/logo-light.svg",
]) {
  const r = await fetch(base + src, { method: "HEAD" });
  if (!r.ok) failures.push(src + " failed");
}
const missing = await fetch(base + "/this-page-does-not-exist");
if (missing.status !== 404) failures.push("404 status " + missing.status);
console.log(
  JSON.stringify(
    {
      base,
      routes: paths.length,
      uniqueTitles: titles.size,
      internalLinks: internal.size,
      imageVariants: images,
      filmFilesAndPosters: media,
      custom404: missing.status,
      failures,
    },
    null,
    2,
  ),
);
if (failures.length) process.exitCode = 1;
