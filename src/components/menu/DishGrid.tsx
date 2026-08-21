import type { Dish } from "@/lib/menu/types";
import DishCard from "./DishCard";

export default function DishGrid({ dishes }: { dishes: Dish[] }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
      {dishes.map((dish) => (
        <DishCard key={dish.slug} dish={dish} />
      ))}
    </div>
  );
}
