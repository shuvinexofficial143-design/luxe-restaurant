import CategoryMenuPage from "@/components/menu/CategoryMenuPage";
import { dishes } from "@/lib/menu/data";

export const metadata = { title: "Wine Pairing" };

export default function WinePairingPage() {
  const items = dishes.filter((dish) => Boolean(dish.winePairing));

  return (
    <CategoryMenuPage
      eyebrow="Sommelier selection"
      title="Wine Pairings"
      text="Dishes with curated wine pairings, shown in the same compact ordering interface as the rest of the menu."
      dishes={items}
      accent="#c99cff"
      activeHref="/menu/wine-pairing"
    />
  );
}
