import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Picture, Action, Heading, CTA } from "@/components/ui";
import { Film } from "@/components/film";
import { CameraMark } from "@/components/brand";
import { pageMetadata } from "@/data/seo";
import { stories, services } from "@/data/site";
export const metadata: Metadata = pageMetadata(
  "/",
  "Wedding & Event Photography — Studio Demo",
  "An editorial wedding, event and portrait photography studio concept by MSPixelPulse. Explore cinematic stock galleries and private demo inquiries.",
);
export default function Home() {
  return (
    <>
      <section className="hero campaign-hero">
        <Picture
          name="romantic-outdoor-portrait"
          priority
          className="hero-image"
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="hero-topline">
          <span>Photography & cinematography</span>
          <span>Canada · United States · Elsewhere</span>
        </div>
        <div className="hero-content">
          <span className="eyebrow">
            Aurel Frame / An editorial perspective
          </span>
          <h1>
            Moments Become
            <br />
            <em>Masterpieces.</em>
          </h1>
          <p>
            The feeling of a day.
            <br />
            The art of remembering it.
          </p>
          <div className="hero-actions">
            <Action href="/portfolio" light>
              Explore the stories
            </Action>
            <Link prefetch={false} href="/contact" className="text-link">
              Begin your story <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
        <Link
          prefetch={false}
          href="/portfolio/the-garden-edit"
          data-shutter="true"
          className="hero-gallery glass-control"
        >
          <CameraMark size={32} />
          <span>
            Through our lens<small>Explore the garden edit</small>
          </span>
          <ArrowUpRight size={18} />
        </Link>
        <div className="hero-bottom">
          <a href="#introduction">
            Discover the perspective <ArrowDown size={18} />
          </a>
          <span>01 / Still & moving stories</span>
          <span className="hero-demo">
            Fictional studio · Licensed stock imagery
          </span>
        </div>
      </section>
      <section id="introduction" className="section introduction-edit">
        <span className="eyebrow">The Aurel perspective</span>
        <div>
          <h2>
            Your story.
            <br />
            Our <em>art.</em>
          </h2>
          <div className="intro-copy">
            <p>
              Not just a beautiful photograph. A gesture, a glance, a feeling
              you can return to.
            </p>
            <p>
              A fictional creative studio exploring the space between editorial
              direction and the beautiful, unscripted moments of life.
            </p>
            <Action href="/about">Behind the frame</Action>
          </div>
        </div>
        <span className="intro-rule">
          HONEST EMOTION / CONSIDERED COMPOSITION / TIMELESS LIGHT
        </span>
      </section>
      <section className="section featured editorial-stories">
        <div className="section-line">
          <Heading
            eyebrow="Selected stories / 01—03"
            title={
              <>
                A moment.
                <br />A lasting <em>impression.</em>
              </>
            }
          />
          <Action href="/portfolio">The complete collection</Action>
        </div>
        <div className="story-grid">
          {stories.slice(0, 3).map((s, i) => (
            <Link
              prefetch={false}
              data-shutter="true"
              href={"/portfolio/" + s.slug}
              className="story-card focus-frame reveal"
              key={s.slug}
            >
              <div className="image-wrap">
                <Picture name={s.cover} />
                <span className="focus-brackets" aria-hidden />
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
      <section className="cinema cinema-edit">
        <div className="section cinema-heading">
          <Heading
            eyebrow="The moving image"
            title={
              <>
                Some stories
                <br />
                deserve to <em>move.</em>
              </>
            }
            text="A quiet look. A dress in motion. The atmosphere of a room. Discover our cinematic point of view."
          />
          <Action href="/portfolio?type=Film#discovery" light>
            Explore the film studies
          </Action>
        </div>
        <div className="section cinema-feature">
          <Film
            id="garden-film"
            title="The garden, in motion"
            description="An unhurried portrait, surrounded by green"
          />
          <div className="film-side-note">
            <span className="eyebrow">01 / Wedding film study</span>
            <p>
              Stay a little
              <br />
              <em>longer.</em>
            </p>
            <CameraMark size={64} />
            <span>
              Licensed stock film.
              <br />
              An illustration of the studio’s visual language.
            </span>
          </div>
        </div>
      </section>
      <section className="section service-preview">
        <div className="service-heading">
          <Heading
            eyebrow="Photography / Cinema"
            title={
              <>
                Life unfolds.
                <br />
                <em>We notice.</em>
              </>
            }
            text="For the celebration, the connection, and everything in between."
          />
          <Action href="/services">Signature services</Action>
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
              <ArrowUpRight size={24} />
            </Link>
          ))}
        </div>
      </section>
      <section className="editorial-band statement-edit">
        <Picture name="garden-wedding-portrait" sizes="100vw" />
        <div>
          <span className="eyebrow">The quiet between the moments</span>
          <h2>
            Beautifully seen.
            <br />
            <em>Naturally you.</em>
          </h2>
          <span className="fine-print">
            A stock editorial study in light and connection.
          </span>
        </div>
      </section>
      <section className="section studio-split">
        <div className="studio-images reveal">
          <Picture
            name="ari-fictional-photographer"
            className="studio-primary"
          />
          <Picture name="timeless-wedding-details" className="studio-detail" />
          <span className="portrait-caption">
            Ari / Original generated portrait
          </span>
        </div>
        <div className="studio-copy reveal">
          <span className="eyebrow">The person behind the perspective</span>
          <h2>
            A thoughtful eye.
            <br />
            An open <em>heart.</em>
          </h2>
          <p>
            Knowing when to guide. Knowing when to step back. And always leaving
            room for the unexpected.
          </p>
          <p>
            Meet Ari, the imagined creative voice of AUREL FRAME. A fictional
            character with a philosophy rooted in connection, curiosity and
            careful observation.
          </p>
          <Action href="/about">Meet the studio</Action>
        </div>
      </section>
      <section className="experience-strip section">
        <div>
          <span className="eyebrow">A considered experience</span>
          <h2>
            From the first hello
            <br />
            to the last <em>frame.</em>
          </h2>
        </div>
        <div>
          <p>
            A little planning. A lot of presence. An edit that brings it all
            together. Explore the thoughtful steps behind a complete visual
            story.
          </p>
          <Action href="/experience">Your photography journey</Action>
        </div>
      </section>
      <section className="portfolio-ribbon">
        <div className="ribbon-title">
          <span className="eyebrow">A few favourite frames</span>
          <Action href="/portfolio">Inside the gallery</Action>
        </div>
        <div className="ribbon-images">
          {[
            "floral-reception-newlyweds",
            "golden-wedding-portrait",
            "white-floral-table",
            "engagement-embrace",
          ].map((n) => (
            <Link
              prefetch={false}
              data-shutter="true"
              className="focus-frame"
              href="/portfolio"
              key={n}
            >
              <Picture name={n} />
              <span className="focus-brackets" aria-hidden />
            </Link>
          ))}
        </div>
      </section>
      <section className="testimonial section reveal">
        <span className="eyebrow">A note on the creative philosophy</span>
        <blockquote>
          “The most meaningful frame
          <br />
          is the one that makes you <em>feel.</em>”
        </blockquote>
        <span>The AUREL FRAME studio concept</span>
      </section>
      <section className="section destination-edit">
        <div>
          <span className="eyebrow">Beyond the familiar</span>
          <h2>
            For wherever
            <br />
            love <em>takes you.</em>
          </h2>
          <p>
            Open horizons. An unfamiliar place. The same beautiful connection.
          </p>
          <Action href="/portfolio/somewhere-by-the-sea">
            The destination edit
          </Action>
        </div>
        <Film
          id="beyond-the-shore"
          title="An open horizon"
          description="A coastal landscape study for destination inspiration"
        />
      </section>
      <CTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "AUREL FRAME — Fictional Photography & Cinema Studio Demo",
            url: "https://photographer.mspixelpulse.com",
            description:
              "MSPixelPulse portfolio concept using licensed stock imagery and footage.",
          }),
        }}
      />
    </>
  );
}
