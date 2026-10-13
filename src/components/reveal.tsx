"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.dataset.reveals = "true";
    const observer = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}
