export type ContentItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  kind: string;
  category: string;
  categories: string[];
  styles: string[];
  media: string;
  tags: string[];
  featured: number;
  publishedAt?: string;
  location?: string;
  photoName?: string;
  filmId?: string;
  price?: number;
  coverage?: number;
};
export const filterKeys = [
  "q",
  "category",
  "style",
  "media",
  "type",
  "location",
  "sort",
] as const;
export type FilterKey = (typeof filterKeys)[number];
export type DiscoveryState = Record<FilterKey, string>;
export const defaultState: DiscoveryState = {
  q: "",
  category: "",
  style: "",
  media: "",
  type: "",
  location: "",
  sort: "",
};
export const normalize = (s: string) =>
  s
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
const synonymRules: [RegExp, string][] = [
  [/\bfilms\b/g, "film"],
  [/\bstories\b/g, "story"],
  [/\bphotos?\b/g, "photography"],
  [/\bphotographs?\b/g, "photography"],
  [/\bevents\b/g, "event"],
  [/\bservices\b/g, "service"],
  [/\bpackages\b/g, "package"],
  [/\bpre wedding\b/g, "engagement"],
  [/\bvideography\b/g, "film"],
  [/\bvideo(s)?\b/g, "film"],
  [/\bmovies?\b/g, "film"],
  [/\bheadshots?\b/g, "portrait"],
  [/\bportraits\b/g, "portrait"],
  [/\bweddings\b/g, "wedding"],
  [/\bengagements\b/g, "engagement"],
  [/\bcorporate\b/g, "corporate"],
];
export function searchTerms(query: string) {
  let s = normalize(query);
  for (const [rule, value] of synonymRules) s = s.replace(rule, value);
  return s.split(" ").filter(Boolean);
}
export function searchable(item: ContentItem) {
  return searchTerms(
    [
      item.title,
      item.description,
      item.category,
      ...item.categories,
      ...item.styles,
      item.media,
      item.kind,
      item.location || "",
      ...item.tags,
    ].join(" "),
  ).join(" ");
}
export function matches(item: ContentItem, query: string) {
  const haystack = searchable(item);
  return searchTerms(query).every((term) => haystack.includes(term));
}
export function searchContent(items: ContentItem[], query: string) {
  const terms = searchTerms(query);
  return items
    .filter((i) => matches(i, query))
    .map((item, index) => ({
      item,
      index,
      score: terms.reduce(
        (n, t) =>
          n +
          (searchTerms(item.title).join(" ").includes(t) ? 4 : 0) +
          (searchTerms(item.category).join(" ").includes(t) ? 2 : 0),
        0,
      ),
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.item.featured - b.item.featured ||
        a.index - b.index,
    )
    .map((r) => r.item);
}
export function discover(items: ContentItem[], state: DiscoveryState) {
  const rows = items.filter(
    (i) =>
      matches(i, state.q) &&
      (!state.category || i.categories.includes(state.category)) &&
      (!state.style || i.styles.includes(state.style)) &&
      (!state.media || i.media === state.media) &&
      (!state.type || i.kind === state.type) &&
      (!state.location || i.location === state.location),
  );
  return rows
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const x = a.item,
        y = b.item;
      let delta: number;
      switch (state.sort) {
        case "az":
          delta = x.title.localeCompare(y.title, "en");
          break;
        case "za":
          delta = y.title.localeCompare(x.title, "en");
          break;
        case "newest":
          delta = (y.publishedAt || "").localeCompare(x.publishedAt || "");
          break;
        case "oldest":
          delta = (x.publishedAt || "").localeCompare(y.publishedAt || "");
          break;
        case "category":
          delta = x.category.localeCompare(y.category, "en");
          break;
        case "price-asc":
          delta = (x.price ?? Infinity) - (y.price ?? Infinity);
          break;
        case "price-desc":
          delta = (y.price ?? -Infinity) - (x.price ?? -Infinity);
          break;
        case "coverage":
          delta = (x.coverage ?? Infinity) - (y.coverage ?? Infinity);
          break;
        case "type":
          delta = x.category.localeCompare(y.category, "en");
          break;
        default:
          delta = x.featured - y.featured;
      }
      return (Number.isNaN(delta) ? 0 : delta) || a.index - b.index;
    })
    .map((r) => r.item);
}
export function readState(
  search: string,
  items: ContentItem[],
  sorts: string[],
) {
  const params = new URLSearchParams(search),
    state = { ...defaultState };
  state.q = (params.get("q") || "").slice(0, 160);
  for (const key of filterKeys.filter((k) => k !== "q")) {
    const value = params.get(key) || "";
    const choices =
      key === "sort"
        ? sorts
        : [
            ...new Set(
              items.flatMap((i) =>
                key === "category"
                  ? i.categories
                  : key === "style"
                    ? i.styles
                    : key === "type"
                      ? [i.kind]
                      : [i[key] || ""],
              ),
            ),
          ];
    state[key] =
      choices.find(
        (option) => value && normalize(option) === normalize(value),
      ) || "";
  }
  return state;
}
export function writeState(state: DiscoveryState) {
  const p = new URLSearchParams();
  for (const key of filterKeys) if (state[key]) p.set(key, state[key]);
  return p.toString();
}
export function nextSuggestion(
  current: number,
  direction: 1 | -1,
  count: number,
) {
  if (!count) return -1;
  if (current < 0) return direction === 1 ? 0 : count - 1;
  return (current + direction + count) % count;
}
