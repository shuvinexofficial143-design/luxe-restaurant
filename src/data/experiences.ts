import { img } from "./images";

export interface Experience {
  slug: string;
  title: string;
  tagline: string;
  intro: string;
  description: string[];
  image: string;
  alt: string;
  price: string;
  duration: string;
  partySize: string;
  availability: string;
  includes: string[];
}

export const experiences: Experience[] = [
  {
    slug: "chefs-table",
    title: "The Chef's Table",
    tagline: "Six seats at the marble counter, inches from the fire.",
    intro:
      "Our most sought-after reservation. There is no menu — only the market, the season, and the hands of the brigade working the open hearth before you.",
    description: [
      "From the moment you take your seat at the marble pass, the kitchen becomes your theatre. Courses arrive unannounced, introduced by the chef who plated them, each one decided that morning at the market.",
      "Between courses, wander into the dry-ageing room, taste from the hearth, and finish with coffee roasted over the same embers that cooked your dinner.",
    ],
    image: img.chefPlating,
    alt: "A chef plating a course at the LUXE Chef's Table",
    price: "£225 per person",
    duration: "Approx. 3.5 hours",
    partySize: "2 — 6 guests",
    availability: "Tuesday — Saturday, one seating at 19:00",
    includes: [
      "Improvised tasting menu of up to ten courses",
      "Hearth aperitif and kitchen tour on arrival",
      "Wine pairings introduced by Sofia Ricci",
      "A signed menu posted to you the following day",
    ],
  },
  {
    slug: "seasonal-tasting",
    title: "The Seasonal Tasting",
    tagline: "Seven courses that did not exist yesterday.",
    intro:
      "The beating heart of LUXE. Each dawn the menu is rewritten around what the season offers — no two evenings are ever quite the same.",
    description: [
      "Begin with warmth from the hearth and end with smoke and honey. In between, the kitchen's finest instincts: scallops from Orkney, duck aged twenty-eight days, celeriac baked whole in ash.",
      "Choose the wine pairing and Sofia's cellar narrates the evening, one extraordinary glass at a time.",
    ],
    image: img.platedFine,
    alt: "A course from the LUXE seasonal tasting menu",
    price: "£145 per person · pairing £95",
    duration: "Approx. 2.5 — 3 hours",
    partySize: "1 — 8 guests",
    availability: "Tuesday — Sunday, lunch & dinner",
    includes: [
      "Seven courses from the day's market",
      "Warm hearth sourdough and cultured butter",
      "Optional sommelier's wine pairing",
      "Petits fours and hearth-roasted coffee",
    ],
  },
  {
    slug: "wine-pairing-evening",
    title: "The Wine Pairing Evening",
    tagline: "A cellar masterclass disguised as dinner.",
    intro:
      "Once a month, Sofia Ricci opens the deepest corners of the cellar for a single themed evening — one region, one grape, one obsession.",
    description: [
      "Past evenings have traced volcanic soils from Etna to Santorini, and pitted old-vine Burgundy against its New World grandchildren. Chef Moreau writes a menu in reverse: the wines are chosen first.",
      "Twenty guests, one long table in The Wine Room, and glasses you will think about for years.",
    ],
    image: img.wineCellar,
    alt: "The LUXE cellar prepared for a wine pairing evening",
    price: "£295 per person",
    duration: "Approx. 4 hours",
    partySize: "Single table of 20",
    availability: "First Thursday of each month, 19:00",
    includes: [
      "Five-course menu written around the wines",
      "Seven pours, including rare cellar releases",
      "Hosted entirely by our head sommelier",
      "Cellar book and tasting notes to keep",
    ],
  },
  {
    slug: "sunday-brunch",
    title: "Sunday at LUXE",
    tagline: "The hearth at rest — almost.",
    intro:
      "Sundays are gentler here. A slow, generous brunch of fire-baked breads, cured fish, eggs from our own hens and champagne by the glass.",
    description: [
      "The dining room fills with morning light and the smell of the first bake. Order à la carte or surrender to the Hearth Feast — a parade of plates for the whole table to share.",
      "The bar shakes its Bloody Mary with tomato water clarified overnight. The papers are ironed. Time is not.",
    ],
    image: img.brunchPlate,
    alt: "Sunday brunch plates at LUXE",
    price: "From £38 per person",
    duration: "At your own pace",
    partySize: "1 — 10 guests",
    availability: "Sundays, 11:00 — 15:00",
    includes: [
      "Fire-baked breads, cultured butter, preserves",
      "Hearth Feast sharing option for the table",
      "Clarified Bloody Marys and champagne cart",
      "Children welcomed — half portions, full wonder",
    ],
  },
  {
    slug: "private-celebrations",
    title: "Private Celebrations",
    tagline: "Weddings, milestones, and evenings that become legend.",
    intro:
      "From a Wine Room proposal to exclusive hire of the whole house, our events team composes celebrations with the same care the kitchen gives a sauce.",
    description: [
      "Begin with a conversation. We'll walk you through the four private spaces, taste you through possible menus, and choreograph the evening around your guests — flowers, music, printed menus, the lot.",
      "Every celebration is assigned a dedicated maître d' who knows your party by name before the first cork is pulled.",
    ],
    image: img.dinnerParty,
    alt: "A private celebration dinner at LUXE",
    price: "Bespoke — from £110 per person",
    duration: "Yours to design",
    partySize: "6 — 40 guests",
    availability: "Seven days a week, by arrangement",
    includes: [
      "Dedicated events producer and maître d'",
      "Menu tasting for the hosts in advance",
      "Four distinct private spaces to choose from",
      "Full floral, music and print styling",
    ],
  },
];
