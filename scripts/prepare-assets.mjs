import fs from "node:fs/promises";
import sharp from "sharp";
const entries = JSON.parse(
  await fs.readFile("src/data/assets.json", "utf8"),
).map(({ name, id, alt }) => ({ name, id, alt }));
await fs.mkdir("public/images", { recursive: true });
const assets = [];
for (let i = 0; i < entries.length; i += 6) {
  await Promise.all(
    entries.slice(i, i + 6).map(async (e) => {
      const source = `https://images.pexels.com/photos/${e.id}/pexels-photo-${e.id}.jpeg?auto=compress&cs=tinysrgb&w=1800`;
      const response = await fetch(source);
      if (!response.ok) throw Error(e.name + ": " + response.status);
      const bytes = Buffer.from(await response.arrayBuffer());
      const meta = await sharp(bytes).metadata();
      await sharp(bytes)
        .resize({ width: 1800, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(`public/images/${e.name}.webp`);
      await sharp(bytes)
        .resize({ width: 720, withoutEnlargement: true })
        .webp({ quality: 77 })
        .toFile(`public/images/${e.name}-small.webp`);
      await sharp(bytes)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 74 })
        .toFile(`public/images/${e.name}-medium.webp`);
      assets.push({
        ...e,
        src: `/images/${e.name}.webp`,
        source: `https://www.pexels.com/photo/${e.id}/`,
        license: "https://www.pexels.com/license/",
        width: meta.width,
        height: meta.height,
      });
    }),
  );
  console.log("Prepared", Math.min(i + 6, entries.length));
}
assets.sort(
  (a, b) =>
    entries.findIndex((e) => e.name === a.name) -
    entries.findIndex((e) => e.name === b.name),
);
await fs.writeFile("src/data/assets.json", JSON.stringify(assets, null, 2));
await fs.writeFile(
  "ASSET-LICENSES.md",
  "# Asset permissions\n\nPhotography: Pexels License, verified 2026-10-13 at https://www.pexels.com/license/. Free commercial website use; no endorsement is implied. These are illustrative stock images, never AUREL FRAME client work. Individual source URLs and dimensions are recorded in src/data/assets.json. WebP variants are generated locally. Do not resell stock photos or use the pictured people as fictional staff.\n\nFonts: Cormorant Garamond and Manrope, Google Fonts, SIL Open Font License; distributed via next/font.\n\nBrand: original typographic wordmark and geometric AF monogram created for this project. No camera clipart.\n",
);
