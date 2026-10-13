"use client";
import { useEffect, useRef } from "react";
export function CameraTransitions() {
  const overlay = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const click = (event: MouseEvent) => {
      const anchor = (event.target as Element).closest("a[data-shutter]");
      if (
        !anchor ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      overlay.current?.classList.remove("exposing");
      requestAnimationFrame(() => overlay.current?.classList.add("exposing"));
      clearTimeout(timer);
      timer = setTimeout(
        () => overlay.current?.classList.remove("exposing"),
        400,
      );
    };
    document.addEventListener("click", click);
    return () => {
      document.removeEventListener("click", click);
      clearTimeout(timer);
    };
  }, []);
  return (
    <div ref={overlay} className="shutter-transition" aria-hidden="true">
      <span />
      <span />
    </div>
  );
}
