export type WineType = "Red" | "White" | "Rosé" | "Sparkling" | "Dessert";
export type BodyLevel = "Light" | "Medium" | "Full";
export type SweetnessLevel = "Dry" | "Off-Dry" | "Sweet";

export type Wine = {
  slug: string;
  name: string;
  producer: string;
  type: WineType;
  region: string;
  country: string;
  grape: string[];
  vintage: number | "NV";
  priceGlass?: number;
  priceBottle: number;
  image: string;
  body: BodyLevel;
  sweetness: SweetnessLevel;
  acidity: 1 | 2 | 3 | 4 | 5;
  tannin: 1 | 2 | 3 | 4 | 5;
  notes: string[];
  description: string;
  featured?: boolean;
  sommelierChoice?: boolean;
  rare?: boolean;
  pairWith: string[];
};

export type WineFilters = {
  query: string;
  type: "All" | WineType;
  region: string;
  body: "All" | BodyLevel;
  maxPrice: number;
  sommelierChoice: boolean;
};

export type SommelierAnswers = {
  colour: "Red" | "White" | "Any";
  body: "Light" | "Medium" | "Full" | "Any";
  budget: number;
  mood: "Fresh" | "Elegant" | "Bold" | "Celebration";
  dish: "Seafood" | "Vegetarian" | "Duck" | "Lamb" | "Dessert" | "Any";
};
