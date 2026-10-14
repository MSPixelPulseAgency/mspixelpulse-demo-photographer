import sharp from "sharp";
import fs from "node:fs/promises";
const svg = Buffer.from(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none"><rect width="80" height="80" fill="#000000"/><path d="M14 27h12l6-8h16l6 8h12v34H14Z" stroke="#FFFFFF" stroke-width="3.8" stroke-linejoin="round"/><circle cx="40" cy="44" r="12" stroke="#FFFFFF" stroke-width="3.8"/></svg>',
);
for (const name of ["icon.svg", "favicon.svg"])
  await fs.writeFile("public/" + name, svg);
const sizes = [16, 32, 48],
  pngs = [];
for (const n of sizes) {
  const png = await sharp(svg).resize(n, n).png().toBuffer();
  pngs.push(png);
  if (n < 48) await fs.writeFile(`public/favicon-${n}x${n}.png`, png);
}
await sharp(svg).resize(64, 64).png().toFile("public/favicon.png");
await sharp(svg).resize(180, 180).png().toFile("public/apple-touch-icon.png");
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
for (let i = 0; i < sizes.length; i++) {
  const p = 6 + 16 * i;
  header[p] = header[p + 1] = sizes[i];
  header.writeUInt16LE(1, p + 4);
  header.writeUInt16LE(32, p + 6);
  header.writeUInt32LE(pngs[i].length, p + 8);
  header.writeUInt32LE(offset, p + 12);
  offset += pngs[i].length;
}
const ico = Buffer.concat([header, ...pngs]);
for (const name of ["public/favicon.ico", "src/app/favicon.ico"])
  await fs.writeFile(name, ico);
console.log("Black/white favicon suite generated.");
