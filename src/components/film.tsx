"use client";
import { useEffect, useRef, useState } from "react";
import { CameraMark } from "./brand";
import { Play, Pause } from "lucide-react";
import films from "@/data/films.json";
export function Film({
  id,
  title,
  description,
  className = "",
}: {
  id: string;
  title?: string;
  description?: string;
  className?: string;
}) {
  const film = films.find((f) => f.id === id)!;
  const video = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false),
    [playing, setPlaying] = useState(false),
    [failed, setFailed] = useState(false),
    [waiting, setWaiting] = useState(false),
    [hasFrame, setHasFrame] = useState(false);
  const label = title || film.title;
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) element.pause();
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  function toggle() {
    if (!video.current) return;
    if (playing) {
      video.current.pause();
      return;
    }
    document.querySelectorAll("video").forEach((v) => {
      if (v !== video.current) v.pause();
    });
    if (!loaded) {
      video.current.src = film.src;
      video.current.poster = film.poster;
      setLoaded(true);
    }
    // Keep play inside the user gesture for WebKit and mobile media policies.
    video.current.play().catch(() => setPlaying(false));
  }
  return (
    <figure className={`film ${className}`}>
      <div className="film-screen">
        {(!hasFrame || failed) && (
          <img
            className="film-poster"
            src={film.poster.replace(".webp", "-small.webp")}
            srcSet={`${film.poster.replace(".webp", "-small.webp")} 720w, ${film.poster} 1280w`}
            sizes="(max-width:700px) 86vw, 65vw"
            width={film.width}
            height={film.height}
            loading="lazy"
            alt={`${label} — stock footage poster`}
          />
        )}
        <video
          ref={video}
          preload="none"
          muted
          playsInline
          controls={loaded && !failed}
          onWaiting={() => setWaiting(true)}
          onCanPlay={() => setWaiting(false)}
          onPlaying={() => {
            setPlaying(true);
            setHasFrame(true);
            setWaiting(false);
          }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onError={() => {
            setFailed(true);
            setPlaying(false);
            setWaiting(false);
          }}
          aria-label={`${label}. Silent licensed stock footage; illustrative studio concept.`}
        />
        <button
          className={`film-play glass-control ${playing ? "playing" : ""}`}
          onClick={toggle}
          disabled={failed}
          aria-label={`${playing ? "Pause film" : "Play film"} — ${label}`}
        >
          {playing ? <Pause size={20} /> : <Play size={22} />}
          <span>{playing ? "Pause film" : "Play film"}</span>
        </button>
        {waiting && (
          <span className="film-loading glass-control" role="status">
            <CameraMark size={32} /> Loading film…
          </span>
        )}
        <span className="film-time">
          {Math.round(film.duration)} SEC / SILENT EDIT
        </span>
        {failed && (
          <p className="film-fallback" role="status">
            The film could not load. Enjoy the still frame instead.
          </p>
        )}
      </div>
      <figcaption>
        <div>
          <span className="eyebrow">Stock film study</span>
          <h3>{label}</h3>
        </div>
        <p>
          {description || film.title}. Licensed stock footage, not a studio
          commission.
        </p>
      </figcaption>
    </figure>
  );
}
export function FilmCollection() {
  return (
    <div className="film-collection">
      <Film
        id="garden-film"
        title="The garden, in motion"
        description="A quiet portrait in the green between celebrations"
      />
      <Film
        id="the-preparation"
        title="Before the first look"
        description="The delicate details of getting ready"
      />
      <Film
        id="gathering-in-motion"
        title="An evening together"
        description="Light, conversation and the atmosphere of a gathering"
      />
    </div>
  );
}
