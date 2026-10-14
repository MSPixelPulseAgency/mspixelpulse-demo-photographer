import test from "node:test";
import assert from "node:assert/strict";
import {
  pricingCatalog,
  amountFor,
  formatPrice,
  packages,
  servicePricing,
  optionalAddons,
  homepagePackageIds,
  budgetOptions,
} from "../src/data/pricing.ts";
import {
  createCurrencyStore,
  currencyStorageKey,
  parseCurrency,
} from "../src/data/currency-store.ts";
import {
  discover,
  defaultState,
  matches,
} from "../src/data/discovery-engine.ts";
import { testimonials, testimonialNotice } from "../src/data/testimonials.ts";
const memoryStorage = () => {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
};
test("all 15 approved baseline rates use separately configured CAD and USD", () => {
  assert.deepEqual(
    Object.values(pricingCatalog).map((p) => [p.cad, p.usd]),
    [
      [250, 185],
      [350, 260],
      [350, 260],
      [500, 375],
      [450, 335],
      [200, 150],
      [1200, 900],
      [2800, 2100],
      [5000, 3750],
      [4500, 3350],
      [300, 225],
      [350, 260],
      [1500, 1125],
      [3000, 2250],
      [4500, 3350],
    ],
  );
});
test("Intl formatting has unambiguous prefixes and no fractional cents", () => {
  assert.equal(formatPrice(2800, "CAD"), "CA$2,800");
  assert.equal(formatPrice(2100, "USD"), "US$2,100");
  assert.equal(formatPrice(0, "CAD"), "CA$0");
  assert.equal(formatPrice(1125, "USD"), "US$1,125");
});
test("every priced service variant maps to the single catalog, custom film remains a quote", () => {
  assert.deepEqual(
    Object.values(servicePricing)
      .flatMap((s) => s.rates)
      .sort(),
    Object.keys(pricingCatalog).sort(),
  );
  assert.deepEqual(servicePricing["service-06"].rates, []);
  assert.equal(servicePricing["service-06"].primary, undefined);
});
test("homepage and Investment resolve the same service prices in both currencies", () => {
  for (const currency of ["CAD", "USD"]) {
    for (const id of homepagePackageIds) {
      const p = packages.find((p) => p.id === id);
      assert(p);
      assert.equal(
        amountFor(p.priceId, currency, p.multiplier),
        pricingCatalog[p.priceId][currency.toLowerCase()],
      );
    }
    for (const p of packages) {
      assert.equal(
        amountFor(p.priceId, currency, p.multiplier),
        pricingCatalog[p.priceId][currency.toLowerCase()] * (p.multiplier ?? 1),
      );
      assert(p.duration && p.items.length >= 3 && p.image);
      assert(p.addons.every((id) => optionalAddons.some((a) => a.id === id)));
    }
  }
});
test("hourly event coverage is a three-hour collection, never confused with the hourly rate", () => {
  const p = packages.find((p) => p.id === "event");
  assert.equal(amountFor(p.priceId, "CAD", p.multiplier), 900);
  assert.equal(amountFor(p.priceId, "USD", p.multiplier), 675);
  assert.equal(p.coverage, 180);
});
test("add-ons reuse catalog rates; unpriced options stay custom quotes", () => {
  assert.equal(
    optionalAddons.find((a) => a.id === "engagement").priceId,
    "engagement",
  );
  assert.equal(
    optionalAddons.find((a) => a.id === "highlight").priceId,
    "highlight",
  );
  assert.equal(
    optionalAddons.find((a) => a.id === "travel").priceId,
    undefined,
  );
});
test("Investment sorts actual numeric amounts in both selected currencies", () => {
  for (const currency of ["CAD", "USD"]) {
    const rows = packages.map((p, i) => ({
      id: p.id,
      title: p.title,
      description: "",
      kind: "Package",
      category: p.category,
      categories: [p.category],
      styles: [],
      media: "Photography",
      tags: [],
      featured: i,
      href: "/investment",
      image: p.image,
      price: amountFor(p.priceId, currency, p.multiplier),
    }));
    const ascending = discover(rows, { ...defaultState, sort: "price-asc" });
    const descending = discover(rows, { ...defaultState, sort: "price-desc" });
    assert.deepEqual(
      ascending.map((r) => r.price),
      rows.map((r) => r.price).sort((a, b) => a - b),
    );
    assert.deepEqual(
      descending.map((r) => r.price),
      rows.map((r) => r.price).sort((a, b) => b - a),
    );
    assert.equal(rows[0].id, "portrait");
  }
});
test("first visit and server hydration default to CAD, invalid preference is rejected", () => {
  const store = createCurrencyStore(memoryStorage);
  assert.equal(store.getSnapshot(), "CAD");
  assert.equal(store.getServerSnapshot(), "CAD");
  assert.equal(parseCurrency("EUR"), "CAD");
  assert.equal(parseCurrency({ currency: "USD" }), "CAD");
});
test("switching notifies all consumers immediately and survives a fresh store after refresh", () => {
  const storage = memoryStorage(),
    store = createCurrencyStore(() => storage);
  let notifications = 0;
  const stop = store.subscribe(() => {
    notifications++;
  });
  store.setCurrency("USD");
  assert.equal(store.getSnapshot(), "USD");
  assert.equal(storage.getItem(currencyStorageKey), "USD");
  assert.equal(createCurrencyStore(() => storage).getSnapshot(), "USD");
  assert.equal(store.getServerSnapshot(), "CAD");
  store.setCurrency("CAD");
  assert.equal(store.getSnapshot(), "CAD");
  assert.equal(notifications, 2);
  stop();
});
test("blocked reads and failed writes still allow switching during the visit", () => {
  const stores = [
    createCurrencyStore(() => {
      throw new Error("blocked");
    }),
    createCurrencyStore(() => ({
      getItem: () => null,
      setItem: () => {
        throw new Error("quota");
      },
    })),
  ];
  for (const store of stores) {
    assert.equal(store.getSnapshot(), "CAD");
    store.setCurrency("USD");
    assert.equal(store.getSnapshot(), "USD");
    store.setCurrency("CAD");
    assert.equal(store.getSnapshot(), "CAD");
  }
});
test("cross-tab storage updates are shared and the observer is cleaned up", () => {
  const storage = memoryStorage();
  let notify,
    watches = 0,
    unwatches = 0,
    changes = 0;
  const store = createCurrencyStore(
    () => storage,
    (cb) => {
      notify = cb;
      watches++;
      return () => unwatches++;
    },
  );
  const stop1 = store.subscribe(() => changes++),
    stop2 = store.subscribe(() => changes++);
  assert.equal(watches, 1);
  storage.setItem(currencyStorageKey, "USD");
  notify();
  assert.equal(store.getSnapshot(), "USD");
  assert.equal(changes, 2);
  stop1();
  assert.equal(unwatches, 0);
  stop2();
  assert.equal(unwatches, 1);
});
test("inquiry budget values stay stable while visible currency labels update", () => {
  const cad = budgetOptions("CAD"),
    usd = budgetOptions("USD");
  assert.deepEqual(
    cad.map((o) => o.value),
    usd.map((o) => o.value),
  );
  assert(cad[1].label.includes("CA$"));
  assert(usd[1].label.includes("US$"));
});
test("published collection names still resolve after the package refinement", () => {
  for (const [id, alias] of [
    ["luxury", "Editorial Wedding"],
    ["destination", "Destination Collection"],
  ]) {
    const p = packages.find((p) => p.id === id);
    assert(
      matches(
        {
          title: p.title,
          description: p.tag,
          tags: p.aliases,
          categories: [p.category],
          styles: [],
          media: "Photography",
          kind: "Package",
        },
        alias,
      ),
    );
  }
});
test("five unique testimonial stories carry sample identities and a visible disclosure", () => {
  assert.equal(testimonials.length, 5);
  assert.equal(new Set(testimonials.map((t) => t.id)).size, 5);
  assert(
    testimonials.every(
      (t) => t.label.startsWith("Sample ") && t.quote.length > 60,
    ),
  );
  assert.equal(
    testimonialNotice,
    "Illustrative testimonials for demonstration purposes.",
  );
});
