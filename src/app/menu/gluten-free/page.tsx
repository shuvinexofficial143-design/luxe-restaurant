import CategoryMenuPage from "@/components/menu/CategoryMenuPage";
import { dishes } from "@/lib/menu/data";

export const metadata = { title: "Gluten Free Menu" };

export default function GlutenFreeMenuPage() {
  const items = dishes.filter((dish) => dish.dietary.includes("Gluten Free"));

  return (
    <CategoryMenuPage
      eyebrow="Dietary collection"
      title="Gluten Free"
      text="A clean collection of gluten-free choices using the same compact order-card experience."
      dishes={items}
      accent="#57b8ff"
    />
  );
}
