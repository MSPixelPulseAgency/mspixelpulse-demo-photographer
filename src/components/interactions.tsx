"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { validateInquiry } from "@/data/inquiry";
import {
  ArrowLeft,
  ArrowRight,
  X,
  Plus,
  Minus,
  Pause,
  Play,
  Check,
} from "lucide-react";
import { gallery, categories, photo, packages, faqs } from "@/data/site";
import { Picture, Action } from "./ui";
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
export function Gallery({ names }: { names?: string[] }) {
  const [category, setCategory] = useState("All");
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const touch = useRef(0);
  const rows = names
    ? names.map((n) => ({ ...photo(n), category: "Weddings" }))
    : gallery.filter((p) => category === "All" || p.tags.includes(category));
  function close() {
    setIndex(null);
    dialog.current?.close();
    lastFocus.current?.focus();
  }
  useEffect(() => {
    if (index !== null) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [index]);
  function move(delta: number) {
    setIndex((i) =>
      i === null ? null : (i + delta + rows.length) % rows.length,
    );
  }
  return (
    <div className="gallery-section">
      {!names && (
        <div className="filters" aria-label="Photography category">
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              onClick={() => {
                setCategory(c);
                setIndex(null);
              }}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      {category === "Wedding Films" ? (
        <Reel />
      ) : (
        <>
          <p className="gallery-note">
            {rows.length} frames · Illustrative stock photography · Select an
            image to explore
          </p>
          <div className="masonry">
            {rows.map((p, i) => (
              <button
                key={p.name}
                className="gallery-image"
                onClick={(e) => {
                  lastFocus.current = e.currentTarget;
                  setIndex(i);
                }}
                aria-label={"View " + p.alt}
              >
                <Picture
                  name={p.name}
                  sizes="(max-width:600px) 43vw, (max-width:950px) 45vw, 28vw"
                />
                <span>
                  {p.alt}
                  <Plus size={19} />
                </span>
              </button>
            ))}
          </div>
          {rows.length === 0 && (
            <p>No frames in this edit yet. Explore another collection.</p>
          )}
        </>
      )}
      <dialog
        className="lightbox"
        aria-label="Photography fullscreen viewer"
        ref={dialog}
        onCancel={close}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") move(1);
          if (e.key === "ArrowLeft") move(-1);
        }}
        onTouchStart={(e) => {
          touch.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const d = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(d) > 45) move(d < 0 ? 1 : -1);
        }}
      >
        <button
          className="lightbox-close"
          onClick={close}
          aria-label="Close image"
        >
          <X />
        </button>
        {index !== null && rows[index] && (
          <>
            <img src={rows[index].src} alt={rows[index].alt} />
            <div className="lightbox-bottom">
              <button onClick={() => move(-1)} aria-label="Previous image">
                <ArrowLeft />
              </button>
              <p aria-live="polite">
                {rows[index].alt}
                <small>
                  {index + 1} / {rows.length} · Stock image / demo editorial
                </small>
              </p>
              <button onClick={() => move(1)} aria-label="Next image">
                <ArrowRight />
              </button>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
export function Reel() {
  const frames = [
    "romantic-outdoor-portrait",
    "garden-wedding-portrait",
    "wedding-hands-detail",
    "beach-wedding-vows",
  ];
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
        setPlaying(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(
      () => setActive((i) => (i + 1) % frames.length),
      5500,
    );
    return () => clearInterval(timer);
  }, [playing, frames.length]);
  return (
    <div className="reel">
      {frames.map((name, i) => (
        <Picture
          key={name}
          name={name}
          className={i === active ? "reel-frame active" : "reel-frame"}
        />
      ))}
      <div className="reel-overlay">
        <span className="eyebrow">
          A study in motion / animated photography
        </span>
        <h2>
          Some feelings
          <br />
          are <em>forever.</em>
        </h2>
        <button
          className="reel-control"
          onClick={() => setPlaying(!playing)}
          aria-label={
            playing
              ? "Pause the sequence — animated photography"
              : "Play the sequence — animated photography"
          }
        >
          {playing ? <Pause size={18} /> : <Play size={18} />}{" "}
          {playing ? "Pause" : "Play"} the sequence
        </button>
        <span className="reel-count">0{active + 1} — 04</span>
      </div>
    </div>
  );
}
export function FAQ() {
  const [active, setActive] = useState<number | null>(0);
  return (
    <div className="faqs">
      {faqs.map(([q, a], i) => (
        <div className="faq" key={q}>
          <h3>
            <button
              onClick={() => setActive(active === i ? null : i)}
              aria-expanded={active === i}
              aria-controls={"faq-" + i}
            >
              {q}
              {active === i ? <Minus size={18} /> : <Plus size={18} />}
            </button>
          </h3>
          <div
            id={"faq-" + i}
            className={active === i ? "faq-answer expanded" : "faq-answer"}
          >
            <p>{a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export function Pricing() {
  const [currency, setCurrency] = useState<"CAD" | "USD">("CAD");
  return (
    <>
      <div className="currency-row">
        <p>Illustrative collections. No real quotes or payments.</p>
        <div className="currency-switch" aria-label="Display currency">
          {(["CAD", "USD"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              aria-pressed={currency === c}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <p className="fine-print">
        CAD and USD are separately configured sample prices, not a live exchange
        rate. Taxes and destination travel are excluded.
      </p>
      <div className="pricing-grid">
        {packages.map((p, i) => (
          <article
            className={`pricing-card ${i === 3 ? "signature" : ""}`}
            key={p.title}
          >
            {i === 3 && (
              <span className="collection-tag">The signature collection</span>
            )}
            <span className="eyebrow">{p.tag}</span>
            <h2>{p.title}</h2>
            <p className="price">
              ${(currency === "CAD" ? p.cad : p.usd).toLocaleString()}{" "}
              <small>{currency}</small>
            </p>
            <span className="fine-print">Illustrative starting price</span>
            <ul>
              {p.items.map((item) => (
                <li key={item}>
                  <Check size={15} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <Action href={"/contact?service=" + encodeURIComponent(p.title)}>
              Explore this collection
            </Action>
          </article>
        ))}
      </div>
    </>
  );
}
export function Inquiry() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next = validateInquiry(
      Object.fromEntries(
        [...data.entries()].map(([key, value]) => [key, String(value)]),
      ),
    );
    if (data.get("website")) return;
    setErrors(next);
    if (Object.keys(next).length) {
      form.current
        ?.querySelector<HTMLElement>('[name="' + Object.keys(next)[0] + '"]')
        ?.focus();
      return;
    }
    e.currentTarget.reset();
    setSuccess(true);
    requestAnimationFrame(() => successRef.current?.focus());
  }
  function field(name: string, label: string, type = "text", optional = false) {
    return (
      <label className="field" key={name}>
        {label}
        {optional && <small>Optional</small>}
        <input
          name={name}
          type={type}
          maxLength={type === "email" ? 254 : 120}
          required={!optional}
          autoComplete={
            name === "name"
              ? "name"
              : name === "email"
                ? "email"
                : name === "phone"
                  ? "tel"
                  : "off"
          }
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? name + "-error" : undefined}
        />
        {errors[name] && (
          <span className="field-error" id={name + "-error"}>
            {errors[name]}
          </span>
        )}
      </label>
    );
  }
  function select(name: string, label: string, options: string[]) {
    return (
      <label className="field" key={name}>
        {label}
        <select
          name={name}
          defaultValue=""
          required
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? name + "-error" : undefined}
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        {errors[name] && (
          <span className="field-error" id={name + "-error"}>
            {errors[name]}
          </span>
        )}
      </label>
    );
  }
  return success ? (
    <div className="form-success" ref={successRef} tabIndex={-1} role="status">
      <Check size={32} />
      <h2>A beautiful beginning.</h2>
      <p>
        Your demo inquiry has been validated. Nothing was sent or stored, and no
        booking was made. Your entered details have been cleared.
      </p>
      <button className="action" onClick={() => setSuccess(false)}>
        Explore the form again <ArrowRight size={17} />
      </button>
      <Action href="https://mspixelpulse.com/contact">
        Contact MSPixelPulse
      </Action>
    </div>
  ) : (
    <form ref={form} onSubmit={submit} noValidate className="inquiry-form">
      <div className="form-note">
        <span className="eyebrow">Demo inquiry experience</span>
        <p>
          Please use sample details. This form runs entirely in your browser. It
          sends and stores nothing.
        </p>
      </div>
      {Object.keys(errors).length > 0 && (
        <p className="error-summary" role="alert">
          Please review the highlighted fields to continue.
        </p>
      )}
      <div className="form-grid">
        {field("name", "Full name")}
        {field("email", "Email address", "email")}
        {field("phone", "Phone number", "tel", true)}
        {select("event", "Event type", [
          "Wedding",
          "Engagement",
          "Proposal",
          "Elopement",
          "Corporate event",
          "Private event",
          "Portrait",
          "Family",
          "Other",
        ])}
        {field("date", "Preferred date", "date")}
        {field("location", "Event location")}
        {select("country", "Country", [
          "Canada",
          "United States",
          "Other destination",
        ])}
        {select("budget", "Estimated budget", [
          "Under $1,000",
          "$1,000–$3,000",
          "$3,000–$5,000",
          "$5,000–$8,000",
          "$8,000+",
          "Let’s explore options",
        ])}
        {select("services", "Preferred services", [
          "Photography",
          "Photography + film",
          "Portrait session",
          "Event coverage",
          "Not sure yet",
        ])}
        {select("style", "Photography style", [
          "Editorial & cinematic",
          "Natural & documentary",
          "Romantic & luminous",
          "A little of everything",
        ])}
        <label className="field full">
          Tell us a little about your story
          <textarea
            name="details"
            required
            maxLength={2000}
            rows={5}
            aria-invalid={!!errors.details}
            aria-describedby={errors.details ? "details-error" : undefined}
          />
          {errors.details && (
            <span className="field-error" id="details-error">
              {errors.details}
            </span>
          )}
        </label>
      </div>
      <label className="honeypot" aria-hidden>
        Leave this empty
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="consent">
        <input
          name="consent"
          type="checkbox"
          required
          aria-describedby="consent-error"
        />
        I understand this is a fictional portfolio demo. No data will be
        submitted or stored, and no booking will be confirmed.
      </label>
      <span id="consent-error" className="field-error">
        {errors.consent}
      </span>
      <button type="submit" className="action">
        Preview your inquiry <ArrowRight size={17} />
      </button>
      <p className="fine-print">
        No analytics or marketing cookies. No email delivery. See our{" "}
        <Link href="/privacy">privacy & demo notice</Link>.
      </p>
    </form>
  );
}
