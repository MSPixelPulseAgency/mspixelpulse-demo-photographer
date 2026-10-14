import type { Metadata } from "next";
import covers from "./covers.json";
export function socialPath(path: string) {
  return (
    "/social/" +
    (path === "/" ? "home" : path.slice(1).replaceAll("/", "-")) +
    ".jpg"
  );
}
export function pageMetadata(
  path: string,
  title: string,
  description: string,
): Metadata {
  const cover = covers.find((c) => c.path === path);
  const image = {
    url: socialPath(path),
    width: 1200,
    height: 630,
    alt: cover?.title || title,
  };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "AUREL FRAME",
      title,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
