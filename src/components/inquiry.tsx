"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { validateInquiry } from "@/data/inquiry";
import { CameraMark } from "./brand";
import { Action } from "./ui";
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
          placeholder={
            (
              {
                name: "Your name",
                email: "you@example.com",
                location: "City or venue",
                phone: "Optional phone number",
              } as Record<string, string>
            )[name]
          }
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
      <CameraMark size={54} />
      <Check size={24} />
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
        <span className="eyebrow">Begin your story / Demo inquiry</span>
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
        <span className="form-part">01 / A little about you</span>
        {field("name", "Full name")}
        {field("email", "Email address", "email")}
        {field("phone", "Phone number", "tel", true)}
        <span className="form-part">02 / The story you’re imagining</span>
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
        {select("services", "Interested services", [
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
          Your message
          <textarea
            name="details"
            placeholder="Tell us a little about your vision…"
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
        Let’s begin your story <ArrowRight size={17} />
      </button>
      <p className="fine-print">
        No analytics or marketing cookies. No email delivery. See our{" "}
        <Link prefetch={false} href="/privacy">
          privacy & demo notice
        </Link>
        .
      </p>
    </form>
  );
}
