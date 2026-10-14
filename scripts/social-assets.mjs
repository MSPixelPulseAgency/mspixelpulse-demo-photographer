import sharp from "sharp";
import fs from "node:fs/promises";
const covers = JSON.parse(await fs.readFile("src/data/covers.json", "utf8"));
const esc = (s) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
await fs.mkdir("public/social", { recursive: true });
for (const c of covers) {
  const source = "public/images/" + c.image + ".webp";
  const dimensions = await sharp(source).metadata();
  const scale = Math.max(1200 / dimensions.width, 630 / dimensions.height);
  const resizedWidth = Math.ceil(dimensions.width * scale),
    resizedHeight = Math.ceil(dimensions.height * scale);
  const background = await sharp(source)
    .resize(resizedWidth, resizedHeight, { fit: "fill" })
    .extract({
      left: Math.round((resizedWidth - 1200) / 2),
      top: Math.round((resizedHeight - 630) * (c.socialFocal ?? 0.5)),
      width: 1200,
      height: 630,
    })
    .toBuffer();
  const words = c.title.split(" "),
    lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).length > 24 && line) {
      lines.push(line);
      line = w;
    } else line += (line ? " " : "") + w;
  }
  if (line) lines.push(line);
  const displayLines = c.socialLines || lines;
  const overlay = Buffer.from(
    `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="shade"><stop stop-color="#101010" stop-opacity=".82"/><stop offset=".65" stop-color="#101010" stop-opacity=".5"/><stop offset="1" stop-color="#101010" stop-opacity=".16"/></linearGradient></defs><rect width="1200" height="630" fill="url(#shade)"/><path d="M64 92h14l7-9h19l7 9h15v34H64Z" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><circle cx="95" cy="108" r="11" fill="none" stroke="#fff" stroke-width="3"/><text x="147" y="116" fill="#fff" font-family="Georgia" font-size="31" letter-spacing="2">AUREL FRAME</text><path d="M64 173h85" stroke="#C6A46A" stroke-width="2"/>${displayLines.map((l, i) => `<text x="64" y="${267 + i * 75}" fill="#fff" font-family="Georgia" font-size="65">${esc(l)}</text>`).join("")}<text x="64" y="560" fill="#fff" font-family="Arial" font-size="17" letter-spacing="2">PHOTOGRAPHY &amp; CINEMATOGRAPHY</text><text x="64" y="592" fill="#fff" font-family="Arial" font-size="15">A FICTIONAL STUDIO · AN MSPixelPulse DEMO</text></svg>`,
  );
  const name = c.path === "/" ? "home" : c.path.slice(1).replaceAll("/", "-");
  await sharp(background)
    .composite([{ input: overlay }])
    .jpeg({ quality: 84 })
    .toFile("public/social/" + name + ".jpg");
}
console.log(`Generated ${covers.length} unique 1200×630 page previews.`);
