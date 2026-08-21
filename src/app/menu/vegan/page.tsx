import CategoryMenuPage from "@/components/menu/CategoryMenuPage";
import { dishes } from "@/lib/menu/data";

export const metadata = { title: "Vegan Menu" };

export default function VeganMenuPage() {
  const items = dishes.filter((dish) => dish.dietary.includes("Vegan"));

  return (
    <CategoryMenuPage
      eyebrow="Clean and bright"
      title="Vegan"
      text="Fresh, vivid plates built around vegetables, grains, herbs and fire-led flavour."
      dishes={items}
      accent="#9d7cff"
    />
  );
}
