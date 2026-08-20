export type DietaryTag = "Vegetarian" | "Vegan" | "Gluten Free" | "Contains Nuts";
export type MenuCategory = "Starters" | "From the Fire" | "Mains" | "Desserts";

export type Dish = {
  slug: string;
  name: string;
  category: MenuCategory;
  description: string;
  ingredients: string[];
  price: number;
  image: string;
  dietary: DietaryTag[];
  spice: 0 | 1 | 2 | 3;
  calories: number;
  protein: number;
  chefChoice?: boolean;
  newDish?: boolean;
  bestseller?: boolean;
  winePairing?: {
    name: string;
    note: string;
  };
};

export type MenuFilters = {
  query: string;
  category: "All" | MenuCategory;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  chefChoice: boolean;
  maxPrice: number;
};
