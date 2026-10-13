import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stories } from "@/data/site";
import { Picture, CTA } from "@/components/ui";
import { Gallery } from "@/components/gallery";
export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = stories.find((s) => s.slug === slug);
  return s
    ? {
        title: s.title + " — Stock Editorial Collection",
        description:
          s.subtitle +
          " An illustrative photography mood board by AUREL FRAME.",
        alternates: { canonical: "/portfolio/" + slug },
      }
    : {};
}
export default async function Story({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) notFound();
  const next = stories[(stories.indexOf(story) + 1) % stories.length];
  return (
    <>
      <section className="story-hero">
        <Picture name={story.cover} priority sizes="100vw" />
        <div>
          <span className="eyebrow">
            {story.category} / Illustrative stock editorial
          </span>
          <h1>{story.title}</h1>
          <p>{story.subtitle}</p>
        </div>
      </section>
      <section className="section story-description">
        <span className="eyebrow">The collection notes</span>
        <p>{story.description}</p>
      </section>
      <section className="section">
        <Gallery names={story.images} />
      </section>
      <section className="section next-story">
        <span className="eyebrow">The next chapter</span>
        <Link prefetch={false} href={"/portfolio/" + next.slug}>
          <h2>{next.title} ↗</h2>
        </Link>
      </section>
      <CTA />
    </>
  );
}
