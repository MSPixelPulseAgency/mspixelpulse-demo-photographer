/* Requires ffmpeg. Source URLs and commercial permissions are documented in films.json. */
import fs from "node:fs/promises";
import { execFileSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";
const films = JSON.parse(await fs.readFile("src/data/films.json", "utf8"));
const temp = await fs.mkdtemp(path.join(os.tmpdir(), "aurel-films-"));
await fs.mkdir("public/films", { recursive: true });
for (const film of films) {
  const r = await fetch(film.download);
  if (!r.ok) throw Error(`${film.id}: download failed (${r.status})`);
  const raw = path.join(temp, film.id + ".mp4"),
    poster = path.join(temp, film.id + ".png");
  await fs.writeFile(raw, Buffer.from(await r.arrayBuffer()));
  execFileSync("ffmpeg", [
    "-y",
    "-loglevel",
    "error",
    "-i",
    raw,
    "-t",
    "12",
    "-an",
    "-vf",
    "scale=1280:-2",
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "27",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "public" + film.src,
  ]);
  execFileSync("ffmpeg", [
    "-y",
    "-loglevel",
    "error",
    "-ss",
    "1",
    "-i",
    raw,
    "-frames:v",
    "1",
    "-vf",
    "scale=1280:-2",
    poster,
  ]);
  await sharp(poster)
    .webp({ quality: 82 })
    .toFile("public" + film.poster);
}
await fs.rm(temp, { recursive: true });
