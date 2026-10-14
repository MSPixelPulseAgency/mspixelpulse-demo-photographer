import { gallery, stories, services, packages, articles } from "./site";
import films from "./films.json";
import { photo } from "./media";
import type { ContentItem } from "./discovery-engine";
// Actual first source publication times from da5dfa8 and 1d2f48b. These are website
// publication dates, never dates/locations of the stock events or people pictured.
const originalPublished = "2026-10-13T22:07:36Z",
  filmPublished = "2026-10-13T23:07:04Z";
const item = (
  p: Partial<ContentItem> &
    Pick<ContentItem, "id" | "title" | "href" | "image">,
): ContentItem => ({
  description: "",
  kind: "Collection",
  category: "",
  categories: [],
  styles: [],
  media: "Photography",
  tags: [],
  featured: 100,
  publishedAt: originalPublished,
  ...p,
});
export const packageImages = [
  "maternity-couple",
  "engagement-embrace",
  "intimate-wedding-portrait",
  "editorial-wedding-couple",
  "black-tie-wedding-portrait",
  "beach-wedding-vows",
  "corporate-toast",
  "wedding-ceremony-hands",
];
export const serviceCategories = [
  "Weddings",
  "Engagements",
  "Corporate Events",
  "Portraits",
  "Wedding Films",
];
const storyStyles = [
  ["Romantic", "Documentary"],
  ["Editorial", "Classic"],
  ["Romantic", "Cinematic"],
  ["Documentary", "Contemporary"],
  ["Fine Art", "Editorial"],
  ["Lifestyle", "Romantic"],
];
export const collectionItems = stories.map((s, i) =>
  item({
    id: s.slug,
    title: s.title,
    description: s.subtitle + " " + s.description,
    href: "/portfolio/" + s.slug,
    image: photo(s.cover).src,
    kind: "Collection",
    category: s.category,
    categories: [
      s.category,
      ...(s.slug === "close-to-you"
        ? ["Engagements", "Portraits", "Family"]
        : []),
    ],
    styles: storyStyles[i],
    media: s.slug === "the-garden-edit" ? "Photo + Film" : "Photography",
    featured: i,
    tags: [
      s.slug === "somewhere-by-the-sea"
        ? "destination inspiration"
        : "stock editorial",
      "photography story",
      ...s.images,
    ],
    photoName: s.cover,
  }),
);
const filmTitles = [
  "The garden, in motion",
  "Before the first look",
  "An evening together",
  "An open horizon",
  "Behind the lens",
];
const filmCategories = [
  ["Wedding Films", "Weddings"],
  ["Wedding Films", "Weddings"],
  ["Corporate Events", "Private Events"],
  ["Destination Weddings"],
  ["Lifestyle", "Portraits"],
];
export const filmItems = films.map((f, i) =>
  item({
    id: f.id,
    title: filmTitles[i],
    description: f.title + ". Silent licensed stock film study.",
    href: "/portfolio?type=Film&q=" + encodeURIComponent(filmTitles[i]),
    image: f.poster,
    kind: "Film",
    media: "Videography",
    category: filmCategories[i][0],
    categories: filmCategories[i],
    styles: i === 1 ? ["Documentary", "Romantic"] : ["Cinematic"],
    tags: ["film", "video", "stock inspiration", f.title],
    featured: 6 + i,
    filmId: f.id,
    publishedAt: filmPublished,
  }),
);
const frameStyles = (name: string) =>
  /maternity/.test(name)
    ? ["Lifestyle", "Romantic"]
    : /conference|networking|corporate/.test(name)
      ? ["Documentary", "Contemporary"]
      : /beach|sunset/.test(name)
        ? ["Cinematic", "Romantic"]
        : /table|rings|candle|floral|orchid/.test(name)
          ? ["Fine Art", "Editorial"]
          : /portrait|couple|embrace/.test(name)
            ? ["Romantic", "Editorial"]
            : ["Classic", "Documentary"];
export const frameItems = gallery.map((p, i) =>
  item({
    id: p.name,
    title: p.alt,
    description: "Licensed stock photograph / illustrative visual inspiration.",
    href: "/portfolio?type=Frame&q=" + encodeURIComponent(p.alt),
    image: p.src,
    kind: "Frame",
    category: p.category,
    categories: p.tags.length ? p.tags : [p.category],
    styles: frameStyles(p.name),
    tags: p.tags,
    featured: 20 + i,
    photoName: p.name,
  }),
);
export const portfolioItems = [...collectionItems, ...filmItems, ...frameItems];
export const serviceItems = services.map((s, i) =>
  item({
    id: "service-" + s.number,
    title: s.title,
    description: [s.text, s.benefit, ...s.options].join(" "),
    href: "/services#service-" + s.number,
    image: photo(s.image).src,
    kind: "Service",
    category: serviceCategories[i],
    categories: [serviceCategories[i]],
    tags: s.options,
    featured: i,
    media: i === 4 ? "Videography" : "Photography",
  }),
);
serviceItems.push(
  item({
    id: "service-06",
    title: "Commercial & event cinematography",
    description:
      "Brand stories, corporate highlight edits and social films. Illustrative stock film study.",
    href: "/services#service-06",
    image: films[2].poster,
    kind: "Service",
    category: "Corporate Events",
    categories: ["Corporate Events"],
    media: "Videography",
    featured: 5,
  }),
);
const packageTypes = [
  "Portraits",
  "Engagements",
  "Weddings",
  "Weddings",
  "Weddings",
  "Destination Weddings",
  "Corporate Events",
  "Wedding Films",
];
const coverage = [60, 90, 240, 480, 600, undefined, 180, 480];
export const packageItems = packages.map((p, i) =>
  item({
    id: "package-" + i,
    title: p.title,
    description: [p.tag, ...p.items].join(" "),
    href: "/investment?q=" + encodeURIComponent(p.title),
    image: photo(packageImages[i]).src,
    kind: "Package",
    category: packageTypes[i],
    categories: [packageTypes[i]],
    tags: p.items,
    media: i === 7 ? "Photo + Film" : "Photography",
    featured: i,
    price: p.cad,
    coverage: coverage[i],
  }),
);
export const articleItems = articles.map((a, i) =>
  item({
    id: a.slug,
    title: a.title,
    description: a.intro,
    href: "/journal/" + a.slug,
    image: photo(a.image).src,
    kind: "Journal",
    category: a.category,
    categories: [a.category],
    tags: a.sections.flat(),
    featured: i,
  }),
);
const pageDescriptions = [
  "Wedding, event and portrait photography. Canada and United States studio concept.",
  "Licensed stock photographs, editorial collections and films.",
  "Wedding, engagement, event and portrait photography services and cinematography.",
  "Meet Ari, the fictional photographer, and explore the studio philosophy.",
  "The photography journey, preparation, gallery delivery and frequently asked questions.",
  "Illustrative CAD and USD photography packages, coverage and sample prices.",
  "Wedding timelines, engagement, portrait, destination and event planning notes.",
  "Private demo inquiry. Nothing is sent, stored or booked.",
];
const mainPages = [
  ["Home", "/", "romantic-outdoor-portrait"],
  ["Portfolio", "/portfolio", "editorial-wedding-couple"],
  ["Services", "/services", "garden-wedding-portrait"],
  ["About the studio", "/about", "ari-fictional-photographer"],
  ["The experience", "/experience", "outdoor-wedding-conversation"],
  ["Investment", "/investment", "black-tie-wedding-portrait"],
  ["Journal", "/journal", "timeless-wedding-details"],
  ["Contact", "/contact", "intimate-wedding-portrait"],
];
export const searchIndex = [
  ...collectionItems,
  ...filmItems,
  ...serviceItems,
  ...packageItems,
  ...articleItems,
  ...mainPages.map(([title, href, image], i) =>
    item({
      id: "page-" + i,
      title,
      href,
      image: photo(image).src,
      kind: "Page",
      description: pageDescriptions[i],
      featured: 50 + i,
    }),
  ),
  ...frameItems,
];
