"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { packages } from "@/data/site";
import { Picture } from "./ui";
import { Action } from "./ui";
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
            <Picture
              name={
                [
                  "maternity-couple",
                  "engagement-embrace",
                  "intimate-wedding-portrait",
                  "editorial-wedding-couple",
                  "black-tie-wedding-portrait",
                  "beach-wedding-vows",
                  "corporate-toast",
                  "wedding-ceremony-hands",
                ][i]
              }
              className="collection-image"
            />
            <span className="eyebrow">
              0{i + 1} / {p.tag}
            </span>
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
