import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro, Heading, Picture, Action, CTA } from "@/components/ui";
import { Gallery, FAQ, Pricing, Inquiry } from "@/components/interactions";
import { stories, services, addons, steps, articles } from "@/data/site";
import assets from "@/data/assets.json";
const pages: Record<
  string,
  { title: string; description: string; heading: string }
> = {
  portfolio: {
    title: "Portfolio — Wedding, Event & Portrait Photography",
    description:
      "Curated stock editorial photography collections, responsive galleries and cinematic wedding inspiration.",
    heading: "Stories worth returning to.",
  },
  services: {
    title: "Wedding, Event, Engagement & Portrait Photography Services",
    description:
      "Explore illustrative wedding photography, event photography, engagement sessions, portraits and cinematography services.",
    heading: "For every chapter of life.",
  },
  about: {
    title: "About the Studio — Our Creative Philosophy",
    description:
      "Meet the fictional AUREL FRAME concept: a contemporary editorial approach to romantic, human photography.",
    heading: "A thoughtful eye. An open heart.",
  },
  experience: {
    title: "The Photography Experience & FAQs",
    description:
      "From the first conversation to gallery delivery, explore the sample photography process and helpful booking questions.",
    heading: "Beautifully considered. Every step.",
  },
  investment: {
    title: "Illustrative Photography Collections — CAD & USD",
    description:
      "Compare clearly labelled sample wedding, engagement, portrait and event photography collections in CAD and USD.",
    heading: "Memories are the investment.",
  },
  journal: {
    title: "Journal — Photography & Planning Notes",
    description:
      "Original editorial guides to wedding timelines, engagement sessions, portraits, destination celebrations and corporate events.",
    heading: "Notes from behind the frame.",
  },
  contact: {
    title: "Contact — Private Demo Photography Inquiry",
    description:
      "Explore the AUREL FRAME demo inquiry form. No personal data is sent or stored and no booking is made.",
    heading: "Every story starts with hello.",
  },
  privacy: {
    title: "Privacy & Demo Notice",
    description:
      "How this fictional MSPixelPulse photography demo handles privacy, sample content and inquiry forms.",
    heading: "A clear, honest experience.",
  },
  credits: {
    title: "Photography Credits & Asset Licensing",
    description:
      "Pexels stock photography source credits and font licensing for the AUREL FRAME studio concept.",
    heading: "The artists behind the images.",
  },
};
export function generateStaticParams() {
  return Object.keys(pages).map((page) => ({ page }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const p = pages[page];
  return p
    ? {
        title: p.title,
        description: p.description,
        alternates: { canonical: "/" + page },
        openGraph: {
          title: p.title,
          description: p.description,
          url: "/" + page,
        },
      }
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const p = pages[page];
  if (!p) notFound();
  return (
    <>
      <PageIntro
        eyebrow={
          page === "privacy" || page === "credits"
            ? "The studio notice"
            : "Aurel Frame / " + page
        }
        title={p.heading}
        text={
          page === "portfolio"
            ? "A considered collection of emotion, atmosphere and light. Illustrative stock mood boards, never represented as our client work."
            : p.description
        }
      />
      {page === "portfolio" && (
        <>
          <section className="section story-grid portfolio-stories">
            {stories.map((s) => (
              <Link
                prefetch={false}
                href={"/portfolio/" + s.slug}
                className="story-card"
                key={s.slug}
              >
                <div className="image-wrap">
                  <Picture name={s.cover} />
                </div>
                <span className="eyebrow">{s.category} / Stock editorial</span>
                <h2>{s.title}</h2>
                <p>{s.subtitle}</p>
              </Link>
            ))}
          </section>
          <section className="section gallery-collection">
            <Heading
              eyebrow="The complete visual edit"
              title={
                <>
                  Explore every <em>frame.</em>
                </>
              }
            />
            <Gallery />
          </section>
        </>
      )}
      {page === "services" && (
        <section className="section services-full">
          {services.map((s) => (
            <article
              id={"service-" + s.number}
              className="service-detail reveal"
              key={s.title}
            >
              <Picture name={s.image} />
              <div>
                <span className="eyebrow">
                  {s.number} / The signature offering
                </span>
                <h2>{s.title}</h2>
                <p className="lead">{s.text}</p>
                <ul>
                  {s.options.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
                <p>{s.benefit}</p>
                <p className="fine-print">{s.deliverable}</p>
                <Action>Inquire about {s.title.toLowerCase()}</Action>
              </div>
            </article>
          ))}
          <div className="add-ons">
            <Heading
              eyebrow="Make it yours"
              title="A few thoughtful additions."
            />
            <ul>
              {addons.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <p className="fine-print">
              All offerings are illustrative. Actual permissions, availability
              and deliverables require a real agreement.
            </p>
          </div>
        </section>
      )}
      {page === "about" && (
        <>
          <section className="section studio-split">
            <div className="studio-images">
              <Picture
                name="ari-fictional-photographer"
                className="studio-primary"
              />
              <span className="portrait-caption">
                Original generated portrait / fictional Ari
              </span>
              <Picture name="engagement-embrace" className="studio-detail" />
            </div>
            <div className="studio-copy">
              <span className="eyebrow">Meet the fictional photographer</span>
              <h2>
                Hi, I’m <em>Ari.</em>
              </h2>
              <p className="lead">
                The imagined creative voice behind AUREL FRAME.
              </p>
              <p>
                This studio concept began with a love for the moments that never
                announce themselves: a held hand, a glance across a room, the
                pause before a celebration begins.
              </p>
              <p>
                Ari is a fictional photographer created for this demo. The
                original generated portrait depicts this fictional character.
                Other stock imagery illustrates a creative philosophy; the
                people pictured are not studio staff.
              </p>
              <p>
                In this imagined practice, editorial composition meets
                documentary instinct. The aim is to guide gently, notice
                carefully and create a gallery that feels personal.
              </p>
              <Action>Start a conversation</Action>
            </div>
          </section>
          <section className="section approach">
            <Heading
              eyebrow="What matters to us"
              title={
                <>
                  Connection comes
                  <br />
                  <em>before the camera.</em>
                </>
              }
            />
            <div className="principles">
              {[
                [
                  "01",
                  "Honest expression",
                  "The most compelling portrait leaves room for who you are.",
                ],
                [
                  "02",
                  "Careful observation",
                  "Small details and quiet gestures give the larger story its meaning.",
                ],
                [
                  "03",
                  "Creative curiosity",
                  "Different traditions, places and people deserve individual attention.",
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
          <section className="editorial-band">
            <Picture name="outdoor-wedding-conversation" />
            <div>
              <span className="eyebrow">A contemporary perspective</span>
              <h2>
                Rooted in feeling.
                <br />
                <em>Open to the world.</em>
              </h2>
              <p>
                Canada, the United States and destination celebrations — an
                illustrative travel offering.
              </p>
            </div>
          </section>
        </>
      )}
      {page === "experience" && (
        <>
          <section className="section timeline">
            {steps.map(([t, d], i) => (
              <article key={t} className="timeline-step reveal">
                <span>0{i + 1}</span>
                <h2>{t}</h2>
                <p>{d}</p>
              </article>
            ))}
          </section>
          <section className="section faq-section">
            <Heading
              eyebrow="A few things you might wonder"
              title={
                <>
                  Consider this
                  <br />
                  your <em>first conversation.</em>
                </>
              }
            />
            <FAQ />
          </section>
        </>
      )}
      {page === "investment" && (
        <section className="section">
          <Pricing />
          <div className="add-ons">
            <Heading
              eyebrow="A little more possibility"
              title="Tailor the collection."
            />
            <ul>
              {addons.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <p>
              Every real celebration deserves a tailored quote. These sample
              prices demonstrate the presentation only.
            </p>
          </div>
        </section>
      )}
      {page === "journal" && (
        <section className="section journal-grid">
          {articles.map((a, i) => (
            <Link
              prefetch={false}
              className="journal-card reveal"
              href={"/journal/" + a.slug}
              key={a.slug}
            >
              <div className="image-wrap">
                <Picture name={a.image} />
              </div>
              <span className="eyebrow">
                {a.category} / {i % 2 ? 4 : 3} min read
              </span>
              <h2>{a.title}</h2>
              <p>{a.intro}</p>
              <span className="text-link">Read the story ↗</span>
            </Link>
          ))}
        </section>
      )}
      {page === "contact" && (
        <section className="section contact-layout">
          <aside>
            <Picture name="intimate-wedding-portrait" />
            <h2>
              We’d love to hear
              <br />
              what you’re <em>imagining.</em>
            </h2>
            <p>
              Wedding, event, portrait or a little of everything. Explore a
              thoughtfully designed inquiry experience.
            </p>
            <span className="eyebrow">A fictional studio concept</span>
            <p>
              For a real website inquiry,{" "}
              <a href="https://mspixelpulse.com/contact">
                contact MSPixelPulse
              </a>
              .
            </p>
            <p className="fine-print">
              Placeholder agency email: hello@mspixelpulse.com
              <br />
              Placeholder phone: +1 (000) 000-0000
            </p>
          </aside>
          <Inquiry />
        </section>
      )}
      {page === "privacy" && (
        <section className="section prose">
          <h2>Fictional studio, real design.</h2>
          <p>
            AUREL FRAME is a portfolio demonstration created by MSPixelPulse. It
            is not an operating photography studio. Ari, studio stories, sample
            feedback, collections and pricing are illustrative. No awards,
            memberships, real clients or physical studio locations are claimed.
          </p>
          <h2>Your form stays in your browser.</h2>
          <p>
            The inquiry form validates sample fields locally. It makes no
            network submission, sends no emails, collects no payments and stores
            no details in a database, cookie or browser storage. A successful
            demo clears the fields. No appointment or booking is confirmed.
          </p>
          <h2>Hosting and external links.</h2>
          <p>
            Vercel serves this website and may process ordinary request
            information needed to deliver it. No analytics, advertising pixels
            or marketing cookies have been added. External agency and
            image-credit links follow their own privacy policies.
          </p>
          <h2>Stock photography.</h2>
          <p>
            All photographs are licensed stock images curated as themed mood
            boards. They are not AUREL FRAME client projects, staff portraits or
            endorsements. Studio motion sections animate still photographs; they
            are not real wedding films.
          </p>
          <Action href="https://mspixelpulse.com/contact">
            Contact the website agency
          </Action>
        </section>
      )}
      {page === "credits" && (
        <section className="section prose">
          <p>
            Photography is provided under the{" "}
            <a href="https://www.pexels.com/license/">Pexels License</a>,
            verified on October 13, 2026. Stock images illustrate this fictional
            studio concept. No endorsement by the people pictured is implied.
          </p>
          <p>
            Cormorant Garamond and Manrope are distributed through Google Fonts
            under the SIL Open Font License. The wordmark and AF monogram are
            original to this demo.
          </p>
          <h2>Individual photograph sources</h2>
          <ul className="credit-list">
            {assets.map((a) => (
              <li key={a.name}>
                <a href={a.source}>
                  {a.alt} — Pexels #{a.id}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
      {!["privacy", "credits", "contact"].includes(page) && <CTA />}
    </>
  );
}
