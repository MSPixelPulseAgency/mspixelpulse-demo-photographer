import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Picture, Action, Heading, CTA } from "@/components/ui";
import { Reel } from "@/components/reel";
import { stories, services } from "@/data/site";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <section className="hero">
        <Picture
          name="romantic-outdoor-portrait"
          priority
          className="hero-image"
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="hero-topline">
          <span>Wedding · Event · Portrait</span>
          <span>Canada & United States / Studio concept</span>
        </div>
        <div className="hero-content">
          <span className="eyebrow">
            For the moments that become everything
          </span>
          <h1>
            Beautiful Stories.
            <br />
            <em>Timelessly</em> Captured.
          </h1>
          <p>
            Honest emotion. An editorial eye.
            <br />
            Photographs that feel like the way you remember.
          </p>
          <div className="hero-actions">
            <Action href="/portfolio" light>
              Explore the portfolio
            </Action>
            <Link prefetch={false} className="text-link" href="/contact">
              Inquire now <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <div className="hero-bottom">
          <a href="#introduction">
            Scroll to discover <ArrowDown size={15} />
          </a>
          <span>01 / The beginning</span>
          <span className="hero-demo">An MSPixelPulse photography demo</span>
        </div>
      </section>
      <section id="introduction" className="intro section reveal">
        <span className="eyebrow">The Aurel perspective</span>
        <h2>
          Not just how it looked.
          <br />
          <em>How it felt.</em>
        </h2>
        <div className="intro-bottom">
          <span className="monogram" aria-hidden>
            AF
          </span>
          <p>
            Some moments are too meaningful to simply document. They deserve to
            be seen, felt and remembered. AUREL FRAME is a fictional studio
            shaped around a simple idea: beautiful photographs begin with
            genuine connection.
          </p>
          <Action href="/about">Meet the studio</Action>
        </div>
      </section>
      <section className="featured section">
        <div className="section-line">
          <Heading
            eyebrow="Selected stories / 01—03"
            title={
              <>
                A little romance.
                <br />A lasting <em>impression.</em>
              </>
            }
          />
          <Action href="/portfolio">View all collections</Action>
        </div>
        <div className="story-grid">
          {stories.slice(0, 3).map((s, i) => (
            <Link
              prefetch={false}
              href={"/portfolio/" + s.slug}
              className="story-card reveal"
              key={s.slug}
            >
              <div className="image-wrap">
                <Picture name={s.cover} />
                <span className="image-arrow">
                  <ArrowUpRight />
                </span>
              </div>
              <div className="story-caption">
                <span className="eyebrow">
                  0{i + 1} / {s.category}
                </span>
                <h3>{s.title}</h3>
                <p>{s.subtitle}</p>
                <small>Illustrative stock editorial</small>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="service-preview section">
        <div className="service-heading">
          <Heading
            eyebrow="The signature offerings"
            title={
              <>
                Life happens.
                <br />
                <em>We frame it.</em>
              </>
            }
            text="From the first yes to a room full of possibility. Explore a considered approach to every kind of gathering."
          />
          <Action href="/services">Explore the services</Action>
        </div>
        <div className="service-list">
          {services.map((s) => (
            <Link
              prefetch={false}
              href={"/services#service-" + s.number}
              key={s.title}
            >
              <small>{s.number}</small>
              <h3>{s.title}</h3>
              <ArrowUpRight size={23} />
            </Link>
          ))}
        </div>
      </section>
      <section className="editorial-band">
        <Picture name="garden-wedding-portrait" sizes="100vw" />
        <div>
          <span className="eyebrow">The quiet between the moments</span>
          <h2>
            Presence over posing.
            <br />
            <em>Feeling over perfection.</em>
          </h2>
        </div>
      </section>
      <section className="section love-stories">
        <Heading
          eyebrow="More than a day"
          title={
            <>
              Every chapter has
              <br />
              its own <em>light.</em>
            </>
          }
        />
        <div className="duo-grid">
          {stories.slice(4, 6).map((s) => (
            <Link
              prefetch={false}
              className="story-card reveal"
              href={"/portfolio/" + s.slug}
              key={s.slug}
            >
              <div className="image-wrap">
                <Picture name={s.cover} />
              </div>
              <span className="eyebrow">{s.category} / Stock mood board</span>
              <h3>
                {s.title} <ArrowUpRight size={22} />
              </h3>
            </Link>
          ))}
        </div>
      </section>
      <section className="cinema">
        <Reel />
        <p className="cinema-note">
          A cinematic photography sequence · Licensed stills, rather than studio
          film footage.
        </p>
      </section>
      <section className="section studio-split">
        <div className="studio-images reveal">
          <Picture
            name="ari-fictional-photographer"
            className="studio-primary"
          />
          <Picture name="timeless-wedding-details" className="studio-detail" />
        </div>
        <div className="studio-copy reveal">
          <span className="eyebrow">Behind the frame</span>
          <h2>
            A thoughtful eye.
            <br />
            An open <em>heart.</em>
          </h2>
          <p>
            Imagine a photographer who knows when to guide you, and when to
            quietly step back. That is the creative philosophy behind this
            studio concept.
          </p>
          <p>
            Natural light, honest expression and a little cinematic magic. A
            contemporary approach with memories at its centre.
          </p>
          <Action href="/about">Our creative philosophy</Action>
        </div>
      </section>
      <section className="approach section">
        <Heading
          eyebrow="The way we see"
          title={
            <>
              Beautifully considered.
              <br />
              <em>Naturally you.</em>
            </>
          }
        />
        <div className="principles">
          {[
            [
              "01",
              "A calm presence",
              "Space to be yourself. Gentle direction when you need it.",
            ],
            [
              "02",
              "An editorial eye",
              "Thoughtful composition with emotion at its centre.",
            ],
            [
              "03",
              "A complete story",
              "The big moments, the small gestures, the feeling in between.",
            ],
          ].map(([n, t, d]) => (
            <div key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="experience-strip section">
        <div>
          <span className="eyebrow">The experience</span>
          <h2>
            Thoughtful from
            <br />
            <em>hello to heirloom.</em>
          </h2>
        </div>
        <div>
          <p>
            Creative planning. Unhurried connection. A careful edit. From the
            first conversation to the gallery and album, every step has a
            purpose.
          </p>
          <Action href="/experience">Walk through the experience</Action>
        </div>
      </section>
      <section className="portfolio-ribbon">
        <div className="ribbon-title">
          <span className="eyebrow">A few favourite frames</span>
          <Action href="/portfolio">Explore the gallery</Action>
        </div>
        <div className="ribbon-images">
          {[
            "floral-reception-newlyweds",
            "golden-wedding-portrait",
            "white-floral-table",
            "engagement-embrace",
          ].map((n) => (
            <Link prefetch={false} href="/portfolio" key={n}>
              <Picture name={n} />
            </Link>
          ))}
        </div>
      </section>
      <section className="testimonial section reveal">
        <span className="eyebrow">
          The feeling we hope to leave / illustrative testimonial
        </span>
        <blockquote>
          “The photographs felt like us.
          <br />
          Just a little more <em>beautifully seen.</em>”
        </blockquote>
        <span>Sample couple — fictional feedback, not a real review</span>
      </section>
      <section className="destination">
        <Picture name="beach-wedding-vows" sizes="100vw" />
        <div className="destination-content">
          <span className="eyebrow">Beyond the familiar</span>
          <h2>
            For wherever
            <br />
            love <em>takes you.</em>
          </h2>
          <p>
            Open horizons. Intimate celebrations. A story that travels with you.
          </p>
          <Action href="/portfolio/somewhere-by-the-sea" light>
            Explore the destination edit
          </Action>
          <small>
            Stock destination inspiration / no actual travel commission
          </small>
        </div>
      </section>
      <CTA />
      <section className="visual-diary">
        <div className="diary-label">
          <span className="eyebrow">The visual diary</span>
          <span>A little inspiration, frame by frame.</span>
          <Link prefetch={false} href="/portfolio">
            See the collection ↗
          </Link>
        </div>
        <div className="diary-grid">
          {[
            "rings-invitation",
            "garden-couple",
            "floating-candle-table",
            "wedding-rings-hands",
            "maternity-couple",
            "romantic-table-setting",
          ].map((n) => (
            <Link prefetch={false} href="/portfolio" key={n}>
              <Picture name={n} />
            </Link>
          ))}
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "AUREL FRAME — Fictional Photography Studio Demo",
            url: "https://photographer.mspixelpulse.com",
            description:
              "MSPixelPulse portfolio concept using licensed stock imagery.",
          }),
        }}
      />
    </>
  );
}
