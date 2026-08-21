import CategoryMenuPage from "@/components/menu/CategoryMenuPage";
import { dishes } from "@/lib/menu/data";

export const metadata = { title: "Desserts" };

export default function DessertsMenuPage() {
  const items = dishes.filter((dish) => dish.category === "Desserts");

  return (
    <CategoryMenuPage
      eyebrow="Sweet finishes"
      title="Desserts"
      text="A compact collection of the final course — tap a plate to open its dedicated order page."
      dishes={items}
      accent="#ff6f91"
      activeHref="/menu/desserts"
    />
  );
}
