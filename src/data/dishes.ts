import { img } from "./images";

export interface SignatureDish {
  index: string;
  name: string;
  description: string;
  price: string;
  image: string;
  alt: string;
}

export const signatureDishes: SignatureDish[] = [
  {
    index: "01",
    name: "Hand-Dived Orkney Scallop",
    description:
      "Seared over birch embers, champagne beurre blanc, oscietra caviar, sea herbs gathered at dawn.",
    price: "£38",
    image: img.scallop,
    alt: "Seared scallop plated with champagne beurre blanc and caviar",
  },
  {
    index: "02",
    name: "Native Lobster Raviolo",
    description:
      "Hand-rolled egg pasta, bisque emulsion, dragoncello, Amalfi lemon — folded to order, never before.",
    price: "£42",
    image: img.pasta,
    alt: "Lobster raviolo with bisque emulsion and fresh tarragon",
  },
  {
    index: "03",
    name: "28-Day Dry-Aged Duck",
    description:
      "Lacquered with honey and smoked juniper, blackberry, charred allium, jus of its own roasting.",
    price: "£46",
    image: img.duck,
    alt: "Slices of dry-aged duck with blackberry and charred allium",
  },
  {
    index: "04",
    name: "Ember-Baked Celeriac",
    description:
      "Whole-baked in ash for six hours, brown butter, aged comté, truffle scraped tableside.",
    price: "£24",
    image: img.platedArt,
    alt: "Ember-baked celeriac with brown butter and aged comté",
  },
  {
    index: "05",
    name: "Valrhona & Ember",
    description:
      "70% grand cru chocolate, smoked caramel, barley ice cream, a whisper of sea salt.",
    price: "£18",
    image: img.dessertChocolate,
    alt: "Dark chocolate dessert with smoked caramel and barley ice cream",
  },
];
