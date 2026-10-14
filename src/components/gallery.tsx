"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X, Plus } from "lucide-react";
import { gallery, categories } from "@/data/site";
import { photo } from "@/data/media";
import { Picture } from "./ui";
import { FilmCollection } from "./film";
export function usePhotoViewer(
  rows: { name: string; src: string; alt: string }[],
) {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const touch = useRef(0);
  function close() {
    setIndex(null);
    dialog.current?.close();
    lastFocus.current?.focus();
  }
  useEffect(() => {
    if (index !== null) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [index]);
  function move(delta: number) {
    setIndex((i) =>
      i === null ? null : (i + delta + rows.length) % rows.length,
    );
  }
  return {
    open: (name: string, element: HTMLElement) => {
      lastFocus.current = element;
      const at = rows.findIndex((p) => p.name === name);
      if (at >= 0) setIndex(at);
    },
    viewer: (
      <dialog
        className="lightbox glass-modal"
        aria-label="Photography fullscreen viewer"
        ref={dialog}
        onCancel={close}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") move(1);
          if (e.key === "ArrowLeft") move(-1);
        }}
        onTouchStart={(e) => {
          touch.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const d = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(d) > 45) move(d < 0 ? 1 : -1);
        }}
      >
        <button
          className="lightbox-close"
          onClick={close}
          aria-label="Close image"
        >
          <X />
        </button>
        {index !== null && rows[index] && (
          <>
            <img src={rows[index].src} alt={rows[index].alt} />
            <div className="lightbox-bottom">
              <button onClick={() => move(-1)} aria-label="Previous image">
                <ArrowLeft />
              </button>
              <p aria-live="polite">
                {rows[index].alt}
                <small>
                  {index + 1} / {rows.length} · Stock image / demo editorial
                </small>
              </p>
              <button onClick={() => move(1)} aria-label="Next image">
                <ArrowRight />
              </button>
            </div>
          </>
        )}
      </dialog>
    ),
  };
}

export function Gallery({ names }: { names?: string[] }) {
  const [category, setCategory] = useState("All");
  const rows = names
    ? names.map(photo)
    : gallery.filter((p) => category === "All" || p.tags.includes(category));
  const { open, viewer } = usePhotoViewer(rows);
  return (
    <div className="gallery-section">
      {!names && (
        <div className="filters" aria-label="Photography category">
          {categories
            .filter(
              (c) =>
                c === "All" ||
                c === "Wedding Films" ||
                gallery.some((p) => p.tags.includes(c)),
            )
            .map((c) => (
              <button
                key={c}
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
        </div>
      )}
      {category === "Wedding Films" ? (
        <FilmCollection />
      ) : (
        <>
          <p className="gallery-note">
            {rows.length} frames · Illustrative stock photography · Select an
            image to explore
          </p>
          <div className="masonry">
            {rows.map((p) => (
              <button
                key={p.name}
                className="gallery-image"
                onClick={(e) => open(p.name, e.currentTarget)}
                aria-label={"View " + p.alt}
              >
                <Picture
                  name={p.name}
                  sizes="(max-width:600px) 43vw, (max-width:950px) 45vw, 28vw"
                />
                <span>
                  {p.alt}
                  <Plus size={19} />
                </span>
              </button>
            ))}
          </div>
        </>
      )}
      {viewer}
    </div>
  );
}
