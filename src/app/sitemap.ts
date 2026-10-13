import type { MetadataRoute } from "next";
import { brand, nav, stories, articles } from "@/data/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    ...nav.slice(1).map((n) => "/" + n.toLowerCase()),
    "/privacy",
    "/credits",
    ...stories.map((s) => "/portfolio/" + s.slug),
    ...articles.map((a) => "/journal/" + a.slug),
  ].map((path) => ({
    url: brand.url + (path === "/" ? "" : path),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
