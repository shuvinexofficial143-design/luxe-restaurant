import CategoryMenuPage from "@/components/menu/CategoryMenuPage";
import { dishes } from "@/lib/menu/data";

export const metadata = { title: "Vegetarian Menu" };

export default function VegetarianMenuPage() {
  const items = dishes.filter((dish) => dish.dietary.includes("Vegetarian"));

  return (
    <CategoryMenuPage
      eyebrow="Plant-led plates"
      title="Vegetarian"
      text="Vegetable-forward dishes with the same fire, texture and polish as the rest of the menu."
      dishes={items}
      accent="#39c58f"
    />
  );
}
