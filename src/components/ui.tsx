/* Images use pre-generated local responsive WebP variants; no paid image service required. */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { photo } from "@/data/media";
export function Picture({
  name,
  className = "",
  priority = false,
  sizes = "(max-width: 600px) 86vw, (max-width: 950px) 45vw, 33vw",
}: {
  name: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const p = photo(name);
  return (
    <img
      className={className}
      src={p.src}
      srcSet={[
        `${p.src.replace(".webp", "-small.webp")} ${Math.min(720, p.width)}w`,
        ...(p.width > 1200
          ? [`${p.src.replace(".webp", "-medium.webp")} 1200w`]
          : []),
        `${p.src} ${p.width}w`,
      ].join(", ")}
      sizes={sizes}
      alt={p.alt}
      width={p.width}
      height={p.height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
export function Action({
  href = "/contact",
  children = "Let’s tell your story",
  light = false,
}: {
  href?: string;
  children?: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      prefetch={false}
      className={`action ${light ? "light" : ""}`}
      href={href}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden />
    </Link>
  );
}
export function Heading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
}) {
  return (
    <div className="section-heading reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="page-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}
export function CTA() {
  return (
    <section className="contact-cta reveal">
      <span className="eyebrow">The next chapter</span>
      <h2>
        Your story deserves
        <br />a beautiful <em>frame.</em>
      </h2>
      <p>Start with a conversation. Let the rest unfold.</p>
      <Action>Begin your inquiry</Action>
      <span className="fine-print">
        Explore the demo experience — no booking or submission is made.
      </span>
    </section>
  );
}
