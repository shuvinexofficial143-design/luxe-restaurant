import type { Dish } from "@/lib/menu/types";
import DishCard from "./DishCard";

export default function DishGrid({ dishes }: { dishes: Dish[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {dishes.map((dish) => (
        <DishCard key={dish.slug} dish={dish} />
      ))}
    </div>
  );
}
