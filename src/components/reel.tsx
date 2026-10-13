"use client";
import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Picture } from "./ui";
export function Reel() {
  const frames = [
    "romantic-outdoor-portrait",
    "garden-wedding-portrait",
    "wedding-hands-detail",
    "beach-wedding-vows",
  ];
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
        setPlaying(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(
      () => setActive((i) => (i + 1) % frames.length),
      5500,
    );
    return () => clearInterval(timer);
  }, [playing, frames.length]);
  return (
    <div className="reel">
      {frames.map((name, i) => (
        <Picture
          key={name}
          name={name}
          className={i === active ? "reel-frame active" : "reel-frame"}
        />
      ))}
      <div className="reel-overlay">
        <span className="eyebrow">
          A study in motion / animated photography
        </span>
        <h2>
          Some feelings
          <br />
          are <em>forever.</em>
        </h2>
        <button
          className="reel-control"
          onClick={() => setPlaying(!playing)}
          aria-label={
            playing
              ? "Pause the sequence — animated photography"
              : "Play the sequence — animated photography"
          }
        >
          {playing ? <Pause size={18} /> : <Play size={18} />}{" "}
          {playing ? "Pause" : "Play"} the sequence
        </button>
        <span className="reel-count">0{active + 1} — 04</span>
      </div>
    </div>
  );
}
