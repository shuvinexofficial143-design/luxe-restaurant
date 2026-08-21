import CategoryMenuPage from "@/components/menu/CategoryMenuPage";
import { dishes } from "@/lib/menu/data";

export const metadata = { title: "Chef Choice" };

export default function ChefChoicePage() {
  const items = dishes.filter((dish) => dish.chefChoice);

  return (
    <CategoryMenuPage
      eyebrow="Chef recommends"
      title="Chef Choice"
      text="A tighter collection of the plates the kitchen wants you to try first. Tap any dish to open its dedicated order page."
      dishes={items}
      accent="#ff8a5b"
    />
  );
}
