import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/data/seo";
import { articles } from "@/data/site";
import { PageIntro, CTA } from "@/components/ui";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  return a ? pageMetadata("/journal/" + slug, a.title, a.intro) : {};
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  return (
    <>
      <PageIntro
        eyebrow={a.category + " / 4 min read / Demo editorial"}
        title={a.title}
        text={a.intro}
        image={a.image}
      />
      <article className="section prose article-body">
        <p className="fine-print">
          Written for the AUREL FRAME fictional studio concept. Planning notes
          are general suggestions, not a contractual promise.
        </p>
        <blockquote className="article-pullquote">{a.intro}</blockquote>
        {a.sections.map(([t, p]) => (
          <section key={t}>
            <h2>{t}</h2>
            <p>{p}</p>
          </section>
        ))}
        <p>
          Explore{" "}
          <Link prefetch={false} href="/services">
            the photography services
          </Link>
          , compare{" "}
          <Link prefetch={false} href="/investment">
            illustrative collections
          </Link>{" "}
          or walk through{" "}
          <Link prefetch={false} href="/experience">
            the sample experience
          </Link>
          .
        </p>
      </article>
      <section className="section related">
        <span className="eyebrow">Keep reading</span>
        {articles
          .filter((v) => v.slug !== slug)
          .slice(0, 2)
          .map((v) => (
            <Link prefetch={false} href={"/journal/" + v.slug} key={v.slug}>
              <h3>{v.title} ↗</h3>
            </Link>
          ))}
      </section>
      <CTA />
    </>
  );
}
