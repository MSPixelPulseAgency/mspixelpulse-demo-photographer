import sharp from "sharp";
import fs from "node:fs/promises";
const svg = await fs.readFile("public/icon.svg");
await sharp(svg).resize(180, 180).png().toFile("public/apple-touch-icon.png");
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
  '<svg width="1200" height="630"><g transform="translate(78 90) scale(1.6)" color="#f8f5f0"><path d="M9 19h12l5-7h13l5 7h11a4 4 0 0 1 4 4v27a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V23a4 4 0 0 1 4-4Z" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M10 15h9M48 25h5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="32" cy="36" r="13" stroke="currentColor" stroke-width="2.2"/><circle cx="32" cy="36" r="8.5" stroke="currentColor" stroke-width="1.4"/><path d="m32 28 6 8-6 8-6-8 6-8Z" stroke="currentColor" stroke-width="1.2"/></g><text x="75" y="295" fill="#f6f2ec" font-size="86" font-family="Georgia">AUREL FRAME</text><text x="80" y="355" fill="#f6f2ec" font-size="24" font-family="Arial" letter-spacing="3">EVERY MOMENT, BEAUTIFULLY REMEMBERED.</text><text x="80" y="570" fill="#f6f2ec" font-size="18" font-family="Arial">FICTIONAL PHOTOGRAPHY STUDIO · AN MSPixelPulse DEMO</text></svg>',
);
await sharp(background)
  .composite([{ input: overlay }])
  .jpeg({ quality: 85 })
  .toFile("public/social-preview.jpg");
