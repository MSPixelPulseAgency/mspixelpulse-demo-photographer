import assets from "./assets.json";
export const brand = {
  name: "AUREL FRAME",
  tagline: "Every Moment, Beautifully Remembered.",
  url: "https://photographer.mspixelpulse.com",
  email: "hello@mspixelpulse.com",
  phone: "+1 (000) 000-0000",
};
export { nav } from "./navigation";
export { photo } from "./media";
export const categories = [
  "All",
  "Weddings",
  "Engagements",
  "Proposals",
  "Elopements",
  "Destination Weddings",
  "Corporate Events",
  "Private Events",
  "Couples",
  "Portraits",
  "Family",
  "Lifestyle",
  "Wedding Films",
];
export const stories = [
  {
    slug: "the-garden-edit",
    title: "The garden edit",
    category: "Weddings",
    subtitle: "Soft light. Quiet glances. A little wild romance.",
    cover: "garden-wedding-portrait",
    images: [
      "garden-wedding-portrait",
      "garden-ceremony-aisle",
      "woodland-wedding-ceremony",
      "outdoor-wedding-conversation",
      "garden-reception-lights",
      "garden-couple",
    ],
    description:
      "A garden-inspired visual study of natural light, unhurried portraits and celebrations beneath the trees. The palette moves from fresh greens to warm evening light. These stock photographs form a thematic mood board, rather than a single client wedding.",
  },
  {
    slug: "a-black-tie-affair",
    title: "A black-tie affair",
    category: "Weddings",
    subtitle: "Modern romance, dressed for the occasion.",
    cover: "editorial-wedding-couple",
    images: [
      "editorial-wedding-couple",
      "black-tie-wedding-portrait",
      "floral-reception-newlyweds",
      "elegant-reception-couple",
      "formal-event-couple",
      "floral-wedding-interior",
      "white-floral-table",
      "timeless-wedding-details",
    ],
    description:
      "An editorial study of formal silhouettes, luminous interiors and beautifully considered details. A black-tie mood connects each frame. This collection brings together stock scenes as inspiration, not a claim of one photographed celebration.",
  },
  {
    slug: "somewhere-by-the-sea",
    title: "Somewhere by the sea",
    category: "Destination Weddings",
    subtitle: "Salt in the air. Everything still ahead.",
    cover: "beach-wedding-vows",
    images: [
      "beach-wedding-vows",
      "sunset-beach-wedding",
      "muslim-beach-wedding",
      "muslim-wedding-embrace",
      "outdoor-muslim-wedding",
      "warm-wedding-candle",
    ],
    description:
      "A coastal mood board built around open horizons, gentle colour and the intimacy of a ceremony outdoors. Different stock celebrations illustrate the atmosphere of destination photography; no travel commission or real client story is implied.",
  },
  {
    slug: "the-art-of-gathering",
    title: "The art of gathering",
    category: "Corporate Events",
    subtitle: "People, purpose and a room full of possibility.",
    cover: "corporate-gala-hall",
    images: [
      "corporate-gala-hall",
      "corporate-toast",
      "gala-banquet",
      "conference-audience",
      "networking-room",
      "conference-details",
      "conference-conversation",
      "event-hall-modern",
      "lavender-gala-dinner",
    ],
    description:
      "An event photography mood board, from the atmosphere of a gala to genuine conversations between colleagues. The sequence illustrates establishing views, human moments and useful detail coverage using stock images.",
  },
  {
    slug: "little-things-big-feelings",
    title: "Little things, big feelings",
    category: "Private Events",
    subtitle: "The details that make a memory yours.",
    cover: "romantic-table-setting",
    images: [
      "romantic-table-setting",
      "floating-candle-table",
      "colourful-candle-tablescape",
      "chicago-loft-tablescape",
      "gold-accent-place-setting",
      "white-rose-reception-table",
      "vintage-floral-tablescape",
      "sparkler-celebration",
    ],
    description:
      "A cohesive study in celebration details: candles, flowers, shared tables and that first spark of a party. A curated stock collection showing how atmosphere and small gestures can anchor an event gallery.",
  },
  {
    slug: "close-to-you",
    title: "Close to you",
    category: "Couples",
    subtitle: "Honest connection. No occasion required.",
    cover: "engagement-embrace",
    images: [
      "engagement-embrace",
      "romantic-outdoor-portrait",
      "golden-wedding-portrait",
      "garden-couple",
      "family-maternity",
      "maternity-couple",
    ],
    description:
      "A portrait mood board about closeness through different chapters of life. Engagement, wedding and family stock portraits share a relaxed visual language. Each photograph represents its own scene, not one couple or family.",
  },
];
export const services = [
  {
    title: "Wedding photography",
    image: "romantic-outdoor-portrait",
    number: "01",
    text: "The grand moments, the almost-missed ones, and everything that makes the day yours.",
    options: [
      "Full-day & luxury weddings",
      "Intimate weddings & elopements",
      "Multiday & destination celebrations",
    ],
    benefit:
      "A considered balance of candid emotion and gently directed editorial portraits.",
    deliverable:
      "Example: an edited high-resolution gallery, web-ready files and album design options.",
  },
  {
    title: "Engagements & proposals",
    image: "engagement-embrace",
    number: "02",
    text: "A chapter just for the two of you. Somewhere meaningful, in light that feels like you.",
    options: [
      "Engagement & pre-wedding sessions",
      "Discreet proposal photography",
      "Anniversary sessions",
    ],
    benefit:
      "A relaxed introduction to being photographed, with time to settle into the moment.",
    deliverable:
      "Example: location planning, a one-hour session and a curated digital gallery.",
  },
  {
    title: "Event photography",
    image: "corporate-toast",
    number: "03",
    text: "Beautiful gatherings deserve more than a record. They deserve a feeling.",
    options: [
      "Corporate events, conferences & launches",
      "Galas & private parties",
      "Birthdays & graduations",
    ],
    benefit:
      "People-first coverage, atmosphere and purposeful images for sharing.",
    deliverable:
      "Example: a brief-led coverage plan, speaker portraits and event highlights.",
  },
  {
    title: "Portraits & everyday stories",
    image: "maternity-couple",
    number: "04",
    text: "An honest portrait of this season of life. Simple, expressive and entirely personal.",
    options: [
      "Couples, family & maternity",
      "Lifestyle portraits",
      "Professional headshots",
    ],
    benefit:
      "Gentle direction and natural light, with room for individual expression.",
    deliverable:
      "Example: a styling guide, selected retouched portraits and web-sized images.",
  },
  {
    title: "Cinematography",
    image: "wedding-ceremony-hands",
    number: "05",
    text: "For the way the day moves. A cinematic companion to your still photographs.",
    options: [
      "Wedding highlight films & ceremonies",
      "Event highlight videos",
      "Social reels & cinematic storytelling",
    ],
    benefit:
      "A story-led approach to motion, carefully coordinated with photography.",
    deliverable:
      "Example: a highlight edit and short social cuts. This demo showcases animated stills.",
  },
];
export const addons = [
  "Second photographer",
  "Extended coverage",
  "Albums & fine-art prints",
  "Engagement add-on",
  "Drone coverage, subject to permission and conditions",
  "Rush editing, subject to agreement",
  "Destination travel, quoted separately",
];
export const packages = [
  {
    title: "Portrait Session",
    cad: 450,
    usd: 340,
    tag: "A moment for you",
    items: [
      "60-minute session",
      "One considered location",
      "20 edited digital images",
    ],
  },
  {
    title: "Engagement Story",
    cad: 700,
    usd: 525,
    tag: "The beginning of everything",
    items: [
      "90-minute session",
      "Location & styling guidance",
      "40 edited digital images",
    ],
  },
  {
    title: "Intimate Wedding",
    cad: 2400,
    usd: 1800,
    tag: "Small gathering, full hearts",
    items: [
      "4 hours of coverage",
      "One photographer",
      "Edited digital gallery",
    ],
  },
  {
    title: "Signature Wedding",
    cad: 4200,
    usd: 3150,
    tag: "Our signature perspective",
    items: [
      "8 hours of coverage",
      "Planning consultation",
      "Engagement session",
      "Edited gallery & album design",
    ],
  },
  {
    title: "Editorial Wedding",
    cad: 6200,
    usd: 4650,
    tag: "A complete visual story",
    items: [
      "10 hours of coverage",
      "Two photographers",
      "Engagement session",
      "Sample 30-page album",
    ],
  },
  {
    title: "Destination Collection",
    cad: 7800,
    usd: 5850,
    tag: "Where your story takes you",
    items: [
      "Wedding day coverage",
      "Welcome-event coverage",
      "Creative planning",
      "Travel quoted separately",
    ],
  },
  {
    title: "Event Coverage",
    cad: 900,
    usd: 675,
    tag: "A gathering remembered",
    items: [
      "3 hours of coverage",
      "Brief-led shot plan",
      "Edited event highlights",
    ],
  },
  {
    title: "Photography + Film",
    cad: 8200,
    usd: 6150,
    tag: "Every frame, every feeling",
    items: [
      "8 hours of photo & film",
      "Two-person creative team",
      "Edited gallery",
      "Sample highlight film deliverable",
    ],
  },
];
export const steps = [
  [
    "The first hello",
    "Tell us a little about your celebration, your people and what matters to you.",
  ],
  [
    "A conversation, not a checklist",
    "A discovery consultation explores the feeling, scope and practical details of your day.",
  ],
  [
    "Thoughtfully planned",
    "We shape a timeline, discuss light and locations, and leave space for the unexpected.",
  ],
  [
    "Be in the moment",
    "A calm presence and gentle direction help you feel at ease while your story unfolds.",
  ],
  [
    "The careful edit",
    "Colour, tone and image selection bring a consistent visual language to the gallery.",
  ],
  [
    "Your story, delivered",
    "An edited gallery brings the whole experience together, ready to revisit and share.",
  ],
  [
    "Something to hold",
    "Albums and fine-art prints turn your favourite frames into everyday heirlooms.",
  ],
];
export const faqs = [
  [
    "How do we check availability?",
    "A real studio would confirm your date during consultation. This is a portfolio demo; the inquiry form does not check availability or reserve a date.",
  ],
  [
    "Do you travel?",
    "The concept supports celebrations across Canada, the United States and destinations. A real agreement would specify travel, accommodation, permits and any additional expenses.",
  ],
  [
    "How many hours do we need?",
    "An intimate ceremony may fit a shorter collection. A full wedding often needs coverage from preparation through the reception. Build your timeline first and discuss the moments you want included.",
  ],
  [
    "Can we add a second photographer?",
    "A second perspective can help with simultaneous preparations, larger guest lists and alternative ceremony views. It is an optional illustrative add-on here.",
  ],
  [
    "When would we receive our photographs?",
    "A sample expectation is 6–8 weeks for a wedding and 2–3 weeks for a portrait session. Actual delivery dates must be confirmed in a real contract.",
  ],
  [
    "What does editing include?",
    "A consistent colour treatment, exposure adjustments and thoughtful selection. Detailed retouching or extensive object removal should be agreed separately.",
  ],
  [
    "What usage rights are included?",
    "Personal sharing and printing would be described in a real licensing agreement. Corporate, advertising and third-party usage should be discussed separately. Stock demo assets are not available as client downloads.",
  ],
  [
    "Is a deposit required?",
    "A real booking may require a retainer and signed agreement. This demo takes no payments, creates no contract and never confirms a booking.",
  ],
  [
    "What happens if we reschedule?",
    "Availability, transfer fees and cancellation terms should be set out before booking. There are no binding rescheduling policies or commitments in this demo.",
  ],
  [
    "What if the weather changes?",
    "Discuss a sheltered alternative and a flexible timeline in advance. Overcast skies can be beautiful; unsafe conditions should always take priority.",
  ],
  [
    "How are destination events planned?",
    "Allow time to discuss local permits, legal working requirements, travel days, access and weather alternatives. Travel costs are separate in the illustrative collection.",
  ],
  [
    "Can photography and film be combined?",
    "Yes, the sample collections include a coordinated photography-and-film option. The website uses animated photography sequences rather than representing stock footage as studio films.",
  ],
];
export const articles = [
  {
    slug: "timeless-wedding-timeline",
    title: "A wedding timeline with room to feel.",
    category: "Wedding planning",
    image: "garden-wedding-portrait",
    intro:
      "The best photographs often happen between the scheduled moments. A thoughtful timeline gives those moments room to breathe.",
    sections: [
      [
        "Start with the light",
        "Look at the ceremony time, sunset and the way light moves through your venue. Make space for portraits when the light is softer, without allowing the photographs to take over the celebration. Discuss indoor alternatives before the day.",
      ],
      [
        "Build in breathing room",
        "Allow time for dressing, travel, family groupings and the little delays that are part of any gathering. A modest buffer means a late arrival does not remove the quiet portrait time you were looking forward to. Share the plan with the people helping you.",
      ],
      [
        "Keep people close",
        "Prepare a short list of family combinations and ask someone who knows everyone to help gather the group. Organise portraits near the ceremony or reception whenever possible. Fewer journeys mean more time with the people you came to celebrate.",
      ],
      [
        "Leave one moment unplanned",
        "A short walk at dusk, a private pause after the ceremony or a final photograph outside can become an anchor for your gallery. Plan the possibility, then let the feeling be real.",
      ],
    ],
  },
  {
    slug: "engagement-session-locations",
    title: "Somewhere that feels like you.",
    category: "Engagements",
    image: "engagement-embrace",
    intro:
      "A beautiful location matters. A place with a little meaning matters more.",
    sections: [
      [
        "Begin with your own story",
        "Think about the paths you walk, the neighbourhood where you met or the places that make a weekend feel complete. A familiar setting can be more expressive than a popular landmark. Choose an accessible location that feels comfortable for both of you.",
      ],
      [
        "Think beyond the backdrop",
        "Check opening times, crowds, walking distances and whether professional photography requires permission. A quiet corner with gentle light often works better than a dramatic viewpoint where you cannot slow down.",
      ],
      [
        "Choose clothes you can live in",
        "Complementary tones work without needing identical outfits. Avoid anything that makes movement uncomfortable. Bring a practical extra layer and shoes suited to the terrain, especially beside water or on uneven trails.",
      ],
      [
        "Have a weather plan",
        "Choose a sheltered alternative or discuss a flexible date. Rain can be atmospheric, but comfort and safety come first. Your session should feel like time together, not an endurance test.",
      ],
    ],
  },
  {
    slug: "wedding-coverage-guide",
    title: "What full-day coverage really means.",
    category: "Photography notes",
    image: "wedding-ceremony-hands",
    intro:
      "Coverage is a way of shaping the story, from the anticipation of morning to the energy of evening.",
    sections: [
      [
        "Decide what you want to remember",
        "List the moments that matter: preparations, the ceremony, family portraits, speeches and the dance floor. Compare those priorities with your schedule rather than choosing hours in isolation. A smaller celebration can have a complete story in less time.",
      ],
      [
        "Make room for two perspectives",
        "A second photographer can cover simultaneous preparations or offer another angle during the ceremony. It is useful when the schedule and guest list call for it. Ask how the team coordinates and how their work is edited together.",
      ],
      [
        "Understand the deliverables",
        "Discuss what the final gallery includes, the editing style, file sizes and expected delivery. Ask how images can be printed and shared. Avoid relying on assumptions about raw files or extensive retouching.",
      ],
      [
        "Put expectations in writing",
        "A real agreement should cover the schedule, cancellation, rescheduling, usage rights and payment terms. This demo does not provide a contract or actual availability; its collections illustrate how a studio can communicate clearly.",
      ],
    ],
  },
  {
    slug: "editorial-portrait-preparation",
    title: "An editorial portrait, without the pressure.",
    category: "Portraits",
    image: "maternity-couple",
    intro:
      "You do not need to know how to pose. A little preparation makes space for a portrait that feels natural.",
    sections: [
      [
        "Bring a simple wardrobe",
        "Choose a few considered pieces that fit comfortably and feel like you. Texture and subtle colour can be beautiful in photographs. Keep distracting logos to a minimum and check how the clothes move before your session.",
      ],
      [
        "Share your intention",
        "Tell your photographer how the images will be used and what you hope they express. A professional headshot, a personal portrait and a family memory each have different needs. References help explain a mood without asking to copy another image.",
      ],
      [
        "Let movement help",
        "Walking, turning towards the light or settling into a chair can feel easier than holding a fixed pose. Gentle direction should give you something simple to do. Take breaks when you need them and leave room for candid expressions.",
      ],
      [
        "Choose your favourites thoughtfully",
        "Look for expressions that feel familiar and compositions that suit your purpose. Discuss natural retouching and avoid assuming that every physical feature needs correction. A portrait can be polished while still being honest.",
      ],
    ],
  },
  {
    slug: "destination-photography-planning",
    title: "A celebration beyond the familiar.",
    category: "Destinations",
    image: "beach-wedding-vows",
    intro:
      "Destination planning becomes simpler when the practical details support the feeling you want to create.",
    sections: [
      [
        "Ask the local questions early",
        "Discuss venue access, permits, weather, local working requirements and restrictions on equipment. A beautiful location still needs a practical plan. Your planner or venue may help clarify what is allowed and which spaces are available.",
      ],
      [
        "Give travel its own space",
        "Avoid arriving at the last possible moment. Build in time for transport delays and a location visit. Confirm who arranges accommodation, transfers and any additional travel days in the actual agreement.",
      ],
      [
        "Work with the climate",
        "Heat, humidity, wind and changing light can affect both comfort and timing. Prepare water, shade and an indoor or sheltered backup. Consider the clothing and mobility needs of everyone involved.",
      ],
      [
        "Keep the story connected",
        "Welcome gatherings and a relaxed session after the wedding can add context. Choose extra coverage because it matters to your people, not because a destination requires a longer gallery. Travel is quoted separately in our sample collection.",
      ],
    ],
  },
  {
    slug: "corporate-event-photography",
    title: "Photographs that keep the conversation going.",
    category: "Events",
    image: "conference-audience",
    intro:
      "Useful corporate event photography begins with a clear brief and a human perspective.",
    sections: [
      [
        "Define the next use",
        "Identify where the photographs will appear: internal updates, a public recap, press material or future promotion. Agree on orientations, key people and brand restrictions. A few specific needs are easier to fulfil than a vague request to capture everything.",
      ],
      [
        "Plan for people and permissions",
        "Explain how photography will be communicated to attendees and how opt-outs will be handled. Discuss consent requirements with the organiser. Do not assume every guest wants to appear in promotional material.",
      ],
      [
        "Capture context as well as the stage",
        "Wide views explain the setting. Conversations show connection. Details establish the atmosphere. Balance these with speakers and key moments so the final gallery supports a coherent recap.",
      ],
      [
        "Make delivery practical",
        "Agree on deadlines, selection size and any rapid highlight delivery before the event. Keep licensing and third-party usage clear. A shared shot brief helps the organiser and photographer work towards the same result.",
      ],
    ],
  },
];
export const gallery = assets.map((a) => {
  const n = a.name;
  const tags: string[] = [];
  if (/wedding|ceremony|rings|ring-|newlyweds|garden|floral|orchid/.test(n))
    tags.push("Weddings");
  if (/engagement-embrace/.test(n))
    tags.push("Engagements", "Proposals", "Couples");
  if (
    /couple|portrait|embrace|conversation|maternity/.test(n) &&
    !/conference/.test(n)
  )
    tags.push("Portraits", "Couples");
  if (/beach|sunset/.test(n)) tags.push("Destination Weddings", "Elopements");
  if (/intimate-wedding|outdoor-wedding/.test(n)) tags.push("Elopements");
  if (/corporate|conference|networking|gala/.test(n))
    tags.push("Corporate Events");
  if (/table|reception|event-hall|candle|sparkler/.test(n))
    tags.push("Private Events");
  if (/maternity/.test(n)) tags.push("Family", "Lifestyle", "Portraits");
  return { ...a, category: tags[0] || "Weddings", tags };
});
