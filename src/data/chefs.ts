import { img } from "./images";

export interface Chef {
  name: string;
  role: string;
  portrait: string;
  alt: string;
  since: string;
  bio: string[];
  quote: string;
  signature: string;
}

export const chefs: Chef[] = [
  {
    name: "Julien Moreau",
    role: "Executive Chef & Founder",
    portrait: img.chefPortraitMain,
    alt: "Executive Chef Julien Moreau in the LUXE kitchen",
    since: "Founded LUXE, 2012",
    bio: [
      "Born in Lyon and forged in the kitchens of Paul Bocuse, Alain Ducasse and Sat Bains, Julien spent fifteen years chasing one idea: that luxury is not abundance, but attention.",
      "At LUXE he cooks over a single open hearth — no gas, no shortcuts — writing the menu each dawn after walking the markets. His food is modern European at its most honest: fire, season, patience.",
    ],
    quote: "A dish is finished not when there is nothing left to add, but when there is nothing left to take away.",
    signature: "28-Day Dry-Aged Duck, blackberry & charred allium",
  },
  {
    name: "Amara Osei",
    role: "Head Pastry Chef",
    portrait: img.chefWoman,
    alt: "Head Pastry Chef Amara Osei plating a dessert",
    since: "At LUXE since 2017",
    bio: [
      "Amara trained at Le Cordon Bleu before leading pastry sections at The Ledbury and Alain Passard's L'Arpège. Her desserts are architectural yet weightless — sweetness always in service of flavour.",
      "She keeps a library of over two hundred honeys, and smokes her own caramel over embers borrowed from the hearth each evening.",
    ],
    quote: "Dessert is the last sentence of the meal. It should make you want to read the book again.",
    signature: "Valrhona & Ember — smoked caramel, barley ice cream",
  },
  {
    name: "Sofia Ricci",
    role: "Head Sommelier",
    portrait: img.portraitWoman,
    alt: "Head Sommelier Sofia Ricci in the LUXE wine cellar",
    since: "At LUXE since 2019",
    bio: [
      "A Master Sommelier candidate from Alba, Sofia curates a cellar of 1,400 bins with a devotion to small growers and forgotten regions. Her pairings are narrative — each glass a chapter.",
      "Under her hand, LUXE's list was named Best Wine List in London, and her non-alcoholic pairings have become a quiet legend of their own.",
    ],
    quote: "Wine is geography in a glass. My job is simply to read the map aloud.",
    signature: "The 1,400-bin cellar beneath Berkeley Square",
  },
];

export const brigade = [
  { name: "Tomasz Nowak", role: "Chef de Cuisine" },
  { name: "Harriet Lane", role: "Sous Chef — Sauce" },
  { name: "Kenji Aoki", role: "Sous Chef — Fish" },
  { name: "Marisol Vega", role: "Junior Sous — Larder" },
  { name: "Ellis Hughes", role: "Hearth & Grill" },
  { name: "Priya Nair", role: "Pastry Sous Chef" },
  { name: "Gabriel Fontaine", role: "Boulanger" },
  { name: "Wren Okafor", role: "Sommelier" },
];
