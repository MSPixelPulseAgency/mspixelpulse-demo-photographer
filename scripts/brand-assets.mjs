import sharp from "sharp";
import fs from "node:fs/promises";
const svg = await fs.readFile("public/icon.svg");
const iconPng = await sharp(svg).resize(64, 64).png().toBuffer();
await fs.writeFile("public/favicon.png", iconPng);
const ico = Buffer.alloc(22);
ico.writeUInt16LE(1, 2);
ico.writeUInt16LE(1, 4);
ico[6] = 64;
ico[7] = 64;
ico.writeUInt16LE(1, 10);
ico.writeUInt16LE(32, 12);
ico.writeUInt32LE(iconPng.length, 14);
ico.writeUInt32LE(22, 18);
await fs.writeFile("src/app/favicon.ico", Buffer.concat([ico, iconPng]));
const background = await sharp("public/images/romantic-outdoor-portrait.webp")
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .modulate({ brightness: 0.6 })
  .toBuffer();
const overlay = Buffer.from(
  '<svg width="1200" height="630"><text x="75" y="295" fill="#f6f2ec" font-size="86" font-family="Georgia">AUREL FRAME</text><text x="80" y="355" fill="#f6f2ec" font-size="24" font-family="Arial" letter-spacing="3">EVERY MOMENT, BEAUTIFULLY REMEMBERED.</text><text x="80" y="570" fill="#f6f2ec" font-size="18" font-family="Arial">FICTIONAL PHOTOGRAPHY STUDIO · AN MSPixelPulse DEMO</text></svg>',
);
await sharp(background)
  .composite([{ input: overlay }])
  .jpeg({ quality: 85 })
  .toFile("public/social-preview.jpg");
