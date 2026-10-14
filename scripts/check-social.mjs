import fs from "node:fs/promises";
import sharp from "sharp";
const base = process.env.CHECK_URL || "http://localhost:3113";
const covers = JSON.parse(await fs.readFile("src/data/covers.json", "utf8"));
const errors = [],
  images = new Set();
const decode = (s) => s.replaceAll("&amp;", "&");
for (const c of covers) {
  const response = await fetch(base + c.path);
  const html = await response.text();
  const meta = (name, attr = "property") =>
    decode(
      html.match(
        new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`),
      )?.[1] || "",
    );
  const image = meta("og:image"),
    twitter = meta("twitter:image", "name");
  if (
    !image.startsWith("https://photographer.mspixelpulse.com/social/") ||
    image !== twitter
  )
    errors.push(c.path + " mismatched/non-absolute preview");
  if (images.has(image)) errors.push(c.path + " duplicate image");
  images.add(image);
  for (const key of ["og:title", "og:description", "og:url"])
    if (!meta(key)) errors.push(c.path + " missing " + key);
  for (const key of ["twitter:title", "twitter:description", "twitter:card"])
    if (!meta(key, "name")) errors.push(c.path + " missing " + key);
  const imagePath = new URL(image).pathname,
    r = await fetch(base + imagePath);
  if (!r.ok) errors.push(imagePath + " HTTP " + r.status);
  const dimensions = await sharp(Buffer.from(await r.arrayBuffer())).metadata();
  if (dimensions.width !== 1200 || dimensions.height !== 630)
    errors.push(imagePath + " incorrect dimensions");
  const canonical = html.match(/rel="canonical" href="([^"]*)"/)?.[1];
  if (
    canonical !==
    "https://photographer.mspixelpulse.com" + (c.path === "/" ? "" : c.path)
  )
    errors.push(c.path + " wrong canonical " + canonical);
}
for (const icon of [
  "/favicon.svg",
  "/favicon.ico",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/apple-touch-icon.png",
]) {
  const r = await fetch(base + icon);
  if (!r.ok) errors.push(icon + " missing");
}
const svg = await fs.readFile("public/favicon.svg", "utf8");
if (!svg.includes("#000000") || !svg.includes("#FFFFFF"))
  errors.push("favicon colours");
const { data, info } = await sharp("public/favicon-16x16.png")
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
if (info.width !== 16 || info.height !== 16 || data[0] || data[1] || data[2])
  errors.push("favicon dimensions/background");
console.log(
  JSON.stringify(
    {
      base,
      pageSpecificPreviews: images.size,
      dimensions: "1200×630",
      favicon: "black/white suite",
      errors,
    },
    null,
    2,
  ),
);
if (errors.length) process.exitCode = 1;
