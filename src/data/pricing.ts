import type { Currency } from "./currency-store";
export const pricingNotice =
  "Illustrative starting prices. Final pricing depends on coverage, location and requirements.";
export const pricingCatalog = {
  portrait: { title: "Portrait Session", cad: 250, usd: 185, unit: "session" },
  family: { title: "Family Photography", cad: 350, usd: 260, unit: "session" },
  couples: {
    title: "Couples Photography",
    cad: 350,
    usd: 260,
    unit: "session",
  },
  engagement: {
    title: "Engagement Photography",
    cad: 500,
    usd: 375,
    unit: "session",
  },
  proposal: {
    title: "Proposal Photography",
    cad: 450,
    usd: 335,
    unit: "session",
  },
  headshots: {
    title: "Professional Headshots",
    cad: 200,
    usd: 150,
    unit: "session",
  },
  intimate: {
    title: "Intimate Wedding",
    cad: 1200,
    usd: 900,
    unit: "collection",
  },
  signature: {
    title: "Signature Wedding",
    cad: 2800,
    usd: 2100,
    unit: "collection",
  },
  luxury: { title: "Luxury Wedding", cad: 5000, usd: 3750, unit: "collection" },
  destination: {
    title: "Destination Wedding",
    cad: 4500,
    usd: 3350,
    unit: "collection",
  },
  event: { title: "Event Photography", cad: 300, usd: 225, unit: "hour" },
  corporate: {
    title: "Corporate Event Photography",
    cad: 350,
    usd: 260,
    unit: "hour",
  },
  highlight: {
    title: "Wedding Highlight Film",
    cad: 1500,
    usd: 1125,
    unit: "collection",
  },
  cinematography: {
    title: "Full Wedding Cinematography",
    cad: 3000,
    usd: 2250,
    unit: "collection",
  },
  photoFilm: {
    title: "Photography + Film",
    cad: 4500,
    usd: 3350,
    unit: "collection",
  },
} as const;
export type PriceId = keyof typeof pricingCatalog;
export const amountFor = (id: PriceId, currency: Currency, multiplier = 1) =>
  pricingCatalog[id][currency === "CAD" ? "cad" : "usd"] * multiplier;
export function formatPrice(amount: number, currency: Currency) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  })
    .formatToParts(amount)
    .map((part) =>
      part.type === "currency"
        ? currency === "CAD"
          ? "CA$"
          : "US$"
        : part.value,
    )
    .join("");
}
export const servicePricing: Record<
  string,
  { primary?: PriceId; rates: PriceId[] }
> = {
  "service-01": {
    primary: "signature",
    rates: ["intimate", "signature", "luxury", "destination"],
  },
  "service-02": {
    primary: "engagement",
    rates: ["engagement", "proposal", "couples"],
  },
  "service-03": { primary: "event", rates: ["event", "corporate"] },
  "service-04": {
    primary: "portrait",
    rates: ["portrait", "family", "headshots"],
  },
  "service-05": {
    primary: "highlight",
    rates: ["highlight", "cinematography", "photoFilm"],
  },
  "service-06": { rates: [] },
};
export const optionalAddons: {
  id: string;
  title: string;
  priceId?: PriceId;
}[] = [
  { id: "second", title: "Second photographer" },
  { id: "extended", title: "Extended coverage" },
  { id: "album", title: "Albums & fine-art prints" },
  { id: "engagement", title: "Engagement session", priceId: "engagement" },
  { id: "highlight", title: "Wedding highlight film", priceId: "highlight" },
  {
    id: "drone",
    title: "Drone coverage, subject to permission and conditions",
  },
  { id: "rush", title: "Rush editing, subject to agreement" },
  { id: "travel", title: "Destination travel, quoted separately" },
];
export const packages: {
  id: string;
  title: string;
  aliases?: string[];
  priceId: PriceId;
  multiplier?: number;
  tag: string;
  image: string;
  category: string;
  coverage?: number;
  duration: string;
  items: string[];
  addons: string[];
}[] = [
  {
    id: "portrait",
    title: "Portrait Session",
    priceId: "portrait",
    tag: "A moment for you",
    image: "maternity-couple",
    category: "Portraits",
    coverage: 60,
    duration: "60-minute session",
    items: [
      "One considered location",
      "20 edited digital images",
      "Styling guidance & online gallery",
    ],
    addons: ["album", "rush"],
  },
  {
    id: "engagement",
    title: "Engagement Story",
    priceId: "engagement",
    tag: "The beginning of everything",
    image: "engagement-embrace",
    category: "Engagements",
    coverage: 90,
    duration: "90-minute session",
    items: [
      "Location & styling guidance",
      "40 edited digital images",
      "Private online gallery",
    ],
    addons: ["album", "rush"],
  },
  {
    id: "intimate",
    title: "Intimate Wedding",
    priceId: "intimate",
    tag: "Small gathering, full hearts",
    image: "intimate-wedding-portrait",
    category: "Weddings",
    coverage: 240,
    duration: "Up to 4 hours of coverage",
    items: [
      "One photographer",
      "Planning conversation",
      "Edited digital & online gallery",
    ],
    addons: ["extended", "engagement", "album"],
  },
  {
    id: "signature",
    title: "Signature Wedding",
    priceId: "signature",
    tag: "Our signature perspective",
    image: "editorial-wedding-couple",
    category: "Weddings",
    coverage: 480,
    duration: "Up to 8 hours of coverage",
    items: [
      "Planning consultation",
      "Edited digital gallery",
      "Private online gallery delivery",
    ],
    addons: ["second", "engagement", "highlight", "album"],
  },
  {
    id: "luxury",
    title: "Luxury Wedding",
    aliases: ["Editorial Wedding"],
    priceId: "luxury",
    tag: "A complete visual story",
    image: "black-tie-wedding-portrait",
    category: "Weddings",
    coverage: 600,
    duration: "Up to 10 hours of coverage",
    items: [
      "Two photographers",
      "Engagement session included",
      "Edited gallery & album design",
    ],
    addons: ["highlight", "album", "extended"],
  },
  {
    id: "destination",
    title: "Destination Wedding",
    aliases: ["Destination Collection"],
    priceId: "destination",
    tag: "Where your story takes you",
    image: "beach-wedding-vows",
    category: "Destination Weddings",
    duration: "Coverage tailored to the destination",
    items: [
      "Wedding day photography",
      "Creative planning",
      "Travel & additional events quoted separately",
    ],
    addons: ["travel", "extended", "highlight"],
  },
  {
    id: "event",
    title: "Event Coverage",
    priceId: "event",
    multiplier: 3,
    tag: "A private gathering remembered",
    image: "corporate-toast",
    category: "Corporate Events",
    coverage: 180,
    duration: "3 hours of private event coverage",
    items: [
      "Brief-led shot plan",
      "Edited event highlights",
      "Online gallery delivery",
    ],
    addons: ["extended", "rush"],
  },
  {
    id: "photo-film",
    title: "Photography + Film",
    priceId: "photoFilm",
    tag: "Every frame, every feeling",
    image: "wedding-ceremony-hands",
    category: "Wedding Films",
    coverage: 480,
    duration: "Up to 8 hours of photo & film",
    items: [
      "Two-person creative team",
      "Edited digital gallery",
      "Sample highlight film deliverable",
    ],
    addons: ["extended", "engagement", "drone"],
  },
];
export const homepagePackageIds = ["engagement", "signature", "photo-film"];
export function budgetOptions(currency: Currency) {
  const f = (n: number) => formatPrice(n, currency);
  return [
    { value: "under-1000", label: "Under " + f(1000) },
    ...[
      [1000, 3000],
      [3000, 5000],
      [5000, 8000],
    ].map(([min, max]) => ({
      value: `${min}-${max}`,
      label: `${f(min)}–${f(max)}`,
    })),
    { value: "over-8000", label: f(8000) + "+" },
    { value: "explore", label: "Let’s explore options" },
  ];
}
