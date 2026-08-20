import { img } from "./images";

export type GalleryCategory = "Cuisine" | "Interior" | "Kitchen" | "Events" | "People";

export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  /** Tailwind aspect class for the masonry tile */
  ratio: "aspect-[3/4]" | "aspect-[4/3]" | "aspect-square" | "aspect-[4/5]";
}

export const galleryCategories: Array<"All" | GalleryCategory> = [
  "All",
  "Cuisine",
  "Interior",
  "Kitchen",
  "Events",
  "People",
];

export const galleryItems: GalleryItem[] = [
  { src: img.scallop, alt: "Seared Orkney scallop with champagne beurre blanc", caption: "Orkney scallop, beurre blanc, oscietra", category: "Cuisine", ratio: "aspect-[3/4]" },
  { src: img.interiorMain, alt: "The main dining room at dusk", caption: "The dining room at dusk", category: "Interior", ratio: "aspect-[4/3]" },
  { src: img.chefFire, alt: "Chef working the open hearth flames", caption: "The hearth, mid-service", category: "Kitchen", ratio: "aspect-square" },
  { src: img.weddingTable, alt: "Garden Salon dressed for a wedding", caption: "A wedding in the Garden Salon", category: "Events", ratio: "aspect-[4/5]" },
  { src: img.chefPortraitMain, alt: "Executive Chef Julien Moreau", caption: "Julien Moreau, Executive Chef", category: "People", ratio: "aspect-[3/4]" },
  { src: img.dessertChocolate, alt: "Valrhona chocolate dessert with smoked caramel", caption: "Valrhona & Ember", category: "Cuisine", ratio: "aspect-square" },
  { src: img.barShelves, alt: "The LUXE bar backlit shelves", caption: "The bar, before service", category: "Interior", ratio: "aspect-[3/4]" },
  { src: img.chefPlating, alt: "Precision plating at the pass", caption: "Ninety seconds to perfect", category: "Kitchen", ratio: "aspect-[4/3]" },
  { src: img.friendsDining, alt: "Guests sharing dinner at LUXE", caption: "Tuesday night, table seven", category: "People", ratio: "aspect-[4/3]" },
  { src: img.duck, alt: "28-day dry-aged duck with blackberry", caption: "28-day dry-aged duck", category: "Cuisine", ratio: "aspect-[4/5]" },
  { src: img.interiorWarm, alt: "Warm lamplight in the dining room", caption: "Lamplight and linen", category: "Interior", ratio: "aspect-[3/4]" },
  { src: img.sommelierPour, alt: "Sommelier decanting red wine", caption: "Sofia decants the '15 Barolo", category: "People", ratio: "aspect-[4/5]" },
  { src: img.pasta, alt: "Native lobster raviolo", caption: "Native lobster raviolo", category: "Cuisine", ratio: "aspect-[4/3]" },
  { src: img.kitchenTeam, alt: "The brigade during service", caption: "The brigade, 19:42", category: "Kitchen", ratio: "aspect-[3/4]" },
  { src: img.eventTable, alt: "Grand Dining Room set for exclusive hire", caption: "Exclusive hire, forty covers", category: "Events", ratio: "aspect-[4/3]" },
  { src: img.cocktailAmber, alt: "The Berkeley cocktail at the bar", caption: "The Berkeley, stirred", category: "Cuisine", ratio: "aspect-[3/4]" },
  { src: img.interiorBooth, alt: "Leather booth seating detail", caption: "Booth no. 4", category: "Interior", ratio: "aspect-square" },
  { src: img.chefWoman, alt: "Pastry Chef Amara Osei at work", caption: "Amara Osei, pastry", category: "People", ratio: "aspect-[4/5]" },
  { src: img.champagne, alt: "Champagne being poured for a celebration", caption: "First pour of the evening", category: "Events", ratio: "aspect-[3/4]" },
  { src: img.grillFire, alt: "Skewers grilling over open fire", caption: "Over birch and ember", category: "Kitchen", ratio: "aspect-[4/3]" },
];
