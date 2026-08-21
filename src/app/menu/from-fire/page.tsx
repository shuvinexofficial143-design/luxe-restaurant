import CategoryMenuPage from "@/components/menu/CategoryMenuPage";
import { dishes } from "@/lib/menu/data";

export const metadata = { title: "From the Fire" };

export default function FromFireMenuPage() {
  const items = dishes.filter((dish) => dish.category === "From the Fire");

  return (
    <CategoryMenuPage
      eyebrow="Live fire collection"
      title="From the Fire"
      text="Flame, smoke and deep caramelisation — all in the same compact ordering interface."
      dishes={items}
      accent="#ff875f"
      activeHref="/menu/from-fire"
    />
  );
}
