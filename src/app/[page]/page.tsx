import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageIntro, Heading, Picture, Action, CTA } from "@/components/ui";
import { FAQ, Pricing, Inquiry } from "@/components/interactions";
import { addons, steps } from "@/data/site";
import covers from "@/data/covers.json";
import { pageMetadata } from "@/data/seo";
import assets from "@/data/assets.json";
import films from "@/data/films.json";
import { Film } from "@/components/film";
import PortfolioDiscovery from "@/components/portfolio-discovery";
import JournalDiscovery from "@/components/journal-discovery";
import ServiceDiscovery from "@/components/service-discovery";
import { CameraMark } from "@/components/brand";
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
    heading: "Let’s create something beautiful.",
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
  return p ? pageMetadata("/" + page, p.title, p.description) : {};
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
      {page !== "contact" && (
        <PageIntro
          eyebrow={
            page === "privacy" || page === "credits"
              ? "The studio notice"
              : "Aurel Frame / " + page
          }
          title={
            page === "portfolio" ? (
              <>
                Stories worth
                <br />
                <em>returning to.</em>
              </>
            ) : page === "services" ? (
              <>
                For life’s
                <br />
                <em>defining moments.</em>
              </>
            ) : page === "about" ? (
              <>
                An eye for light.
                <br />
                <em>A heart for stories.</em>
              </>
            ) : page === "experience" ? (
              <>
                A little planning.
                <br />
                <em>A lot of presence.</em>
              </>
            ) : page === "investment" ? (
              <>
                For the things
                <br />
                <em>that stay.</em>
              </>
            ) : page === "journal" ? (
              <>
                The art of
                <br />
                <em>looking closer.</em>
              </>
            ) : (
              p.heading
            )
          }
          image={covers.find((c) => c.path === "/" + page)?.image}
          text={
            (
              {
                portfolio:
                  "Emotion, atmosphere and light. Licensed stock collections, presented as visual inspiration.",
                services:
                  "For the celebration, the connection, and the moments between.",
                about:
                  "Meet Ari, the fictional creative voice behind a considered photographic perspective.",
                experience:
                  "From the first hello to the final frame. An illustrative photography journey.",
                investment:
                  "Considered collections for meaningful moments. Clearly marked sample prices.",
                journal:
                  "A little preparation. A fresh perspective. Notes for the moments ahead.",
              } as Record<string, string>
            )[page] || p.description
          }
        />
      )}
      {page === "portfolio" && <PortfolioDiscovery />}
      {page === "services" && <ServiceDiscovery />}
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
          <section className="section behind-lens-edit">
            <Film
              id="behind-the-lens"
              title="The craft behind the frame"
              description="A close view of a photographer’s lens"
            />
            <div>
              <span className="eyebrow">A study in observation</span>
              <h2>
                Look closer.
                <br />
                <em>Feel more.</em>
              </h2>
              <p>
                Composition begins with attention. The light on a face. The
                movement of a hand. The small details that carry a story.
              </p>
              <p className="fine-print">
                Licensed behind-the-scenes stock footage. The photographer shown
                is not Ari or AUREL FRAME staff.
              </p>
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
          <section className="section experience-opening">
            <Film id="the-preparation" title="A moment before everything" />
            <div>
              <span className="eyebrow">Room to be present</span>
              <h2>
                A calm beginning.
                <br />
                <em>A beautiful unfolding.</em>
              </h2>
              <p>
                Thoughtful preparation makes space for the day itself. Here is
                how the imagined studio experience comes together.
              </p>
            </div>
          </section>
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
      {page === "journal" && <JournalDiscovery />}
      {page === "contact" && (
        <section className="section contact-layout contact-edit">
          <aside>
            <div className="contact-introduction">
              <span className="eyebrow">
                The beginning of something beautiful
              </span>
              <h1>
                Let’s create
                <br />
                something <em>beautiful.</em>
              </h1>
              <p>
                Tell us about your story and the moments you want to remember.
              </p>
            </div>
            <div className="contact-photo">
              <Picture name="intimate-wedding-portrait" priority />
              <span className="contact-photo-label glass-overlay">
                <CameraMark size={30} /> Every story begins with connection.
              </span>
            </div>
            <div className="contact-studio-note">
              <span className="eyebrow">Aurel Frame / Fictional studio</span>
              <p>Wedding. Event. Portrait. Film.</p>
              <a className="text-link" href="https://mspixelpulse.com/contact">
                For a real website inquiry, contact MSPixelPulse ↗
              </a>
              <p className="fine-print">
                Agency placeholder: hello@mspixelpulse.com
                <br />
                +1 (000) 000-0000
              </p>
            </div>
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
            Stock photographs are licensed images curated as themed mood boards.
            They are not AUREL FRAME client projects, staff portraits or
            endorsements. Film studies use licensed stock footage, clearly
            labelled as inspiration rather than studio commissions.
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
            Bodoni Moda and DM Sans are distributed through Google Fonts under
            the SIL Open Font License. The wordmark and camera monogram are
            original to this demo.
          </p>
          <h2>Cinematic footage sources</h2>
          <p>
            These short, silent film studies are served locally under the{" "}
            <a href="https://mixkit.co/license/#videoFree">
              Mixkit Stock Video Free License
            </a>
            , with the commercial license confirmed on each source page. Clips
            were trimmed, resized and stripped of audio. No stock scene is
            represented as a studio commission.
          </p>
          <ul className="credit-list">
            {films.map((f) => (
              <li key={f.id}>
                <a href={f.source}>{f.title} — Mixkit</a>
              </li>
            ))}
          </ul>
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
