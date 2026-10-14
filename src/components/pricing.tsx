"use client";
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
import { useCurrency, CurrencySwitch, Price, PricingNotice } from "./currency";
import { amountFor } from "@/data/pricing";
import { Addons } from "./addons";
export function Pricing() {
  const { currency } = useCurrency();
  const { state, update, reset } = useDiscovery(packageItems, sorts);
  const rows = discover(
    packageItems.map((r, i) => ({
      ...r,
      price: amountFor(packages[i].priceId, currency, packages[i].multiplier),
    })),
    state,
  );
  return (
    <>
      <div className="currency-row">
        <p>Illustrative collections. No real quotes or payments.</p>
        <CurrencySwitch />
      </div>
      <PricingNotice />
      <DiscoveryControls
        items={packageItems}
        state={state}
        update={update}
        reset={reset}
        sorts={sorts}
        label="Search collections"
      />
      <ResultCounter count={rows.length} />
      <div className="pricing-grid" id="investment-collections">
        {rows.map((r) => {
          const i = packageItems.findIndex((p) => p.id === r.id),
            p = packages[i];
          return (
            <article
              className={`pricing-card ${p.id === "signature" ? "signature" : ""}`}
              key={p.title}
              data-package-id={p.id}
            >
              {p.id === "signature" && (
                <span className="collection-tag">The signature collection</span>
              )}
              <Picture name={packageImages[i]} className="collection-image" />
              <span className="eyebrow">
                0{i + 1} / {p.tag}
              </span>
              <h2>{p.title}</h2>
              <span className="price-caption">Starting at</span>
              <p className="price">
                <Price id={p.priceId} multiplier={p.multiplier} />
              </p>
              <span className="fine-print">Illustrative starting price</span>
              <p className="coverage-duration">{p.duration}</p>
              <ul>
                {p.items.map((item) => (
                  <li key={item}>
                    <Check size={15} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <details className="package-addons">
                <summary>Optional additions</summary>
                <Addons ids={p.addons} />
              </details>
              <Action href={"/contact?service=" + encodeURIComponent(p.title)}>
                Inquire about this collection
              </Action>
            </article>
          );
        })}
      </div>
      {!rows.length && <EmptyState reset={reset} />}
    </>
  );
}
