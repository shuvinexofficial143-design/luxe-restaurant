import type { Dish, MenuFilters } from "./types";

export function filterDishes(dishes: Dish[], filters: MenuFilters) {
  const query = filters.query.trim().toLowerCase();

  return dishes.filter((dish) => {
    if (query) {
      const haystack = [
        dish.name,
        dish.description,
        dish.category,
        ...dish.ingredients,
        ...dish.dietary,
      ]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(query)) return false;
    }

    if (filters.category !== "All" && dish.category !== filters.category) return false;
    if (filters.vegetarian && !dish.dietary.includes("Vegetarian")) return false;
    if (filters.vegan && !dish.dietary.includes("Vegan")) return false;
    if (filters.glutenFree && !dish.dietary.includes("Gluten Free")) return false;
    if (filters.chefChoice && !dish.chefChoice) return false;
    if (dish.price > filters.maxPrice) return false;

    return true;
  });
}
