import assert from "node:assert/strict";
import {
  pricingCatalog,
  amountFor,
  formatPrice,
  packages,
} from "../src/data/pricing.ts";
import { testimonials, testimonialNotice } from "../src/data/testimonials.ts";
const base = process.env.CHECK_URL || "http://localhost:3115";
const html = {};
for (const route of ["/", "/services", "/investment", "/contact", "/privacy"]) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200, route);
  html[route] = await response.text();
  assert(
    html[route].includes("Display currency: CAD"),
    route + " server CAD selector",
  );
  assert(
    !/aggregateRating|"@type":"Review"/.test(html[route]),
    "No fabricated review schema",
  );
}
for (const [id, price] of Object.entries(pricingCatalog)) {
  assert(
    html["/services"].includes(
      `data-price-id="${id}" data-currency="CAD" data-amount="${price.cad}"`,
    ),
    id + " service rate",
  );
  assert(
    html["/services"].includes(formatPrice(price.cad, "CAD")),
    id + " formatted price",
  );
}
for (const p of packages)
  assert(
    html["/investment"].includes(
      `data-price-id="${p.priceId}" data-currency="CAD" data-amount="${amountFor(p.priceId, "CAD", p.multiplier)}"`,
    ),
    p.id + " package amount",
  );
for (const t of testimonials) {
  assert(html["/"].includes(`data-sample-testimonial="${t.id}"`));
  assert(html["/"].includes(t.label));
}
assert(html["/"].includes(testimonialNotice));
assert(html["/"].includes("An Investment"));
assert(html["/privacy"].includes("localStorage"));
assert(html["/contact"].includes("CA$1,000"));
console.log(
  JSON.stringify(
    {
      base,
      routes: 5,
      serviceRates: 15,
      packages: packages.length,
      testimonials: 5,
      serverDefault: "CAD",
      failures: [],
    },
    null,
    2,
  ),
);
