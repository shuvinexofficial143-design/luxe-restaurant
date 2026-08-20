import { img } from "./images";

export interface DiningSpace {
  id: string;
  name: string;
  capacity: string;
  tagline: string;
  description: string;
  features: string[];
  ideal: string[];
  image: string;
  alt: string;
}

export const spaces: DiningSpace[] = [
  {
    id: "wine-room",
    name: "The Wine Room",
    capacity: "Up to 12 guests",
    tagline: "Dine inside the cellar itself.",
    description:
      "Beneath Berkeley Square, behind glass walls lined with 1,400 bins, The Wine Room is our most intimate stage. A single oak table, candlelight, and a sommelier devoted entirely to your evening.",
    features: [
      "Private sommelier for the evening",
      "Bespoke tasting menu by Chef Moreau",
      "Cellar tastings on request",
      "Dedicated entrance on Bruton Place",
    ],
    ideal: ["Anniversaries", "Wine collectors", "Boardroom dinners"],
    image: img.wineCellar,
    alt: "The Wine Room private cellar dining at LUXE",
  },
  {
    id: "chefs-table",
    name: "The Chef's Table",
    capacity: "Up to 6 guests",
    tagline: "Front row at the fire.",
    description:
      "A marble counter facing the open hearth. Watch the brigade work the flames as each course is plated an arm's length away, introduced by the chef who made it. There is no menu — only the market and the moment.",
    features: [
      "Improvised menu of up to ten courses",
      "Hosted by the senior brigade",
      "Kitchen tour and hearth aperitif",
      "Signed menu to take home",
    ],
    ideal: ["Devoted gourmands", "Proposals", "Once-in-a-decade birthdays"],
    image: img.chefPlating,
    alt: "Chef plating at the LUXE Chef's Table",
  },
  {
    id: "garden-salon",
    name: "The Garden Salon",
    capacity: "Up to 20 guests",
    tagline: "A glasshouse of jasmine and candlelight.",
    description:
      "Our conservatory salon opens onto a walled courtyard garden. By day it is all green light and linen; by night, lanterns and climbing jasmine. Equally suited to long lunches and dancing-adjacent dinners.",
    features: [
      "Private terrace for receptions",
      "Seasonal sharing or tasting formats",
      "Live acoustic music licence",
      "Full floral styling in-house",
    ],
    ideal: ["Weddings", "Garden parties", "Press launches"],
    image: img.weddingTable,
    alt: "The Garden Salon set for a private celebration",
  },
  {
    id: "grand-dining-room",
    name: "The Grand Dining Room",
    capacity: "Up to 40 guests",
    tagline: "The whole house, yours alone.",
    description:
      "Take exclusive possession of LUXE. Twelve tables become one long banquet beneath the original 1820s cornicing, the hearth roaring, the full brigade and cellar at your service. The restaurant, reimagined as your private address.",
    features: [
      "Exclusive hire of the restaurant",
      "Full brigade, bar and sommelier team",
      "Custom menus and printed collateral",
      "Late licence until 1am",
    ],
    ideal: ["Milestone celebrations", "Brand occasions", "The party of the year"],
    image: img.eventTable,
    alt: "The Grand Dining Room prepared for exclusive hire",
  },
];
