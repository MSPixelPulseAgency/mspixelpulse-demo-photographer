"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { packages } from "@/data/site";
import { packageItems, packageImages } from "@/data/discovery";
import { discover } from "@/data/discovery-engine";
import {
  useDiscovery,
  DiscoveryControls,
  ResultCounter,
  EmptyState,
} from "./discovery-controls";
const sorts = [
  ["featured", "Featured first"],
  ["price-asc", "Price low to high"],
  ["price-desc", "Price high to low"],
  ["coverage", "Coverage duration"],
  ["type", "Package type"],
];
import { Picture } from "./ui";
import { Action } from "./ui";
export function Pricing() {
  const [currency, setCurrency] = useState<"CAD" | "USD">("CAD");
  const { state, update, reset } = useDiscovery(packageItems, sorts);
  const rows = discover(
    packageItems.map((r, i) => ({
      ...r,
      price: currency === "CAD" ? packages[i].cad : packages[i].usd,
    })),
    state,
  );
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
      <DiscoveryControls
        items={packageItems}
        state={state}
        update={update}
        reset={reset}
        sorts={sorts}
        label="Search collections"
      />
      <ResultCounter count={rows.length} />
      <div className="pricing-grid">
        {rows.map((r) => {
          const i = packageItems.findIndex((p) => p.id === r.id),
            p = packages[i];
          return (
            <article
              className={`pricing-card ${i === 3 ? "signature" : ""}`}
              key={p.title}
            >
              {i === 3 && (
                <span className="collection-tag">The signature collection</span>
              )}
              <Picture name={packageImages[i]} className="collection-image" />
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
          );
        })}
      </div>
      {!rows.length && <EmptyState reset={reset} />}
    </>
  );
}
