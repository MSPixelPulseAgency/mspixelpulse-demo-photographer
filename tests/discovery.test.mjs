import test from "node:test";
import assert from "node:assert/strict";
import {
  matches,
  searchContent,
  discover,
  readState,
  writeState,
  defaultState,
  nextSuggestion,
} from "../src/data/discovery-engine.ts";
const row = (id, title, extra = {}) => ({
  id,
  title,
  description: "Stock visual inspiration",
  href: "/portfolio/" + id,
  image: "/test.webp",
  kind: "Collection",
  category: "Weddings",
  categories: ["Weddings"],
  styles: ["Editorial"],
  media: "Photography",
  tags: [],
  featured: 0,
  publishedAt: "2026-10-13T22:07:36Z",
  ...extra,
});
const items = [
  row("garden", "Garden wedding", { featured: 1 }),
  row("film", "Wedding film", {
    kind: "Film",
    categories: ["Wedding Films"],
    styles: ["Cinematic"],
    media: "Videography",
    publishedAt: "2026-10-13T23:07:04Z",
  }),
  row("engagement", "An engagement story", {
    categories: ["Engagements"],
    styles: ["Romantic"],
  }),
  row("portrait", "A portrait session", { categories: ["Portraits"] }),
  row("old-film", "Wedding preparation film", {
    kind: "Film",
    categories: ["Wedding Films"],
    styles: ["Documentary"],
    media: "Videography",
    publishedAt: "2026-10-12T22:00:00Z",
  }),
];
test("search synonyms match actual meanings and multiple terms must all match", () => {
  assert(matches(items[1], "wedding video"));
  assert(matches(items[2], "pre-wedding"));
  assert(matches(items[3], "headshot"));
  assert(!matches(items[2], "engagement corporate"));
});
test("suggestions rank a title match before a description match and retain stable ties", () => {
  const rows = [
    row("description", "An edit", { description: "Wedding film" }),
    items[1],
  ];
  assert.equal(searchContent(rows, "wedding film")[0].id, "film");
  assert.equal(searchContent(rows, "zzzx").length, 0);
});
test("wedding search, film category, cinematic style, video format and newest sort combine", () => {
  assert.deepEqual(
    discover(items, {
      ...defaultState,
      q: "wedding",
      category: "Wedding Films",
      style: "Cinematic",
      media: "Videography",
      sort: "newest",
    }).map((i) => i.id),
    ["film"],
  );
});
test("newest and oldest use publication metadata, never feature order", () => {
  const q = { ...defaultState, category: "Wedding Films", sort: "newest" };
  assert.deepEqual(
    discover(items, q).map((i) => i.id),
    ["film", "old-film"],
  );
  assert.deepEqual(
    discover(items, { ...q, sort: "oldest" }).map((i) => i.id),
    ["old-film", "film"],
  );
});
test("alphabetical sorts are stable and do not mutate the caller", () => {
  const source = [row("z", "Zebra"), row("a", "Amber"), row("a2", "Amber")];
  assert.deepEqual(
    discover(source, { ...defaultState, sort: "az" }).map((i) => i.id),
    ["a", "a2", "z"],
  );
  assert.deepEqual(
    source.map((i) => i.id),
    ["z", "a", "a2"],
  );
  assert.equal(discover(source, { ...defaultState, sort: "za" })[0].id, "z");
});
test("valid combined URL state round-trips, preserving punctuation and accents", () => {
  const state = {
    ...defaultState,
    q: "wedding & film",
    category: "Wedding Films",
    style: "Cinematic",
    media: "Videography",
    type: "Film",
    sort: "newest",
  };
  assert.deepEqual(
    readState("?" + writeState(state), items, ["newest"]),
    state,
  );
  assert.equal(writeState(defaultState), "");
});
test("unsupported URL filters and sorting fail safely without fabricating matches", () => {
  const state = readState(
    "?location=Canada&category=Fake&style=Neon&sort=popular&q=" +
      "x".repeat(200),
    items,
    ["az"],
  );
  assert.equal(state.location, "");
  assert.equal(state.category, "");
  assert.equal(state.sort, "");
  assert.equal(state.q.length, 160);
});
test("price and coverage sorts use configured values and place custom coverage last", () => {
  const list = [
    row("custom", "Custom", { price: 7800 }),
    row("short", "Short", { price: 450, coverage: 60 }),
    row("long", "Long", { price: 4200, coverage: 480 }),
  ];
  assert.deepEqual(
    discover(list, { ...defaultState, sort: "price-asc" }).map((i) => i.id),
    ["short", "long", "custom"],
  );
  assert.deepEqual(
    discover(list, { ...defaultState, sort: "price-desc" }).map((i) => i.id),
    ["custom", "long", "short"],
  );
  assert.deepEqual(
    discover(list, { ...defaultState, sort: "coverage" }).map((i) => i.id),
    ["short", "long", "custom"],
  );
});

test("suggestion keyboard navigation starts at the correct end, wraps and handles emptiness", () => {
  assert.equal(nextSuggestion(-1, 1, 8), 0);
  assert.equal(nextSuggestion(-1, -1, 8), 7);
  assert.equal(nextSuggestion(7, 1, 8), 0);
  assert.equal(nextSuggestion(0, -1, 8), 7);
  assert.equal(nextSuggestion(0, 1, 0), -1);
});

test("shareable filters accept case and hyphen variants and use canonical labels", () => {
  const result = readState(
    "?category=wedding-films&media=videography&type=film&style=cinematic&sort=newest",
    items,
    ["newest"],
  );
  assert.equal(result.category, "Wedding Films");
  assert.equal(result.media, "Videography");
  assert.equal(result.type, "Film");
  assert.equal(result.style, "Cinematic");
  assert.equal(discover(items, result).length, 1);
  assert(matches(items[1], "films"));
  assert(matches(items[3], "photos"));
});
