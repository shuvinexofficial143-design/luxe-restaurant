import type { Dish } from "@/lib/menu/types";

export default function MenuStats({ dishes }: { dishes: Dish[] }) {
  const veg = dishes.filter((dish) => dish.dietary.includes("Vegetarian")).length;
  const vegan = dishes.filter((dish) => dish.dietary.includes("Vegan")).length;

  return (
    <div className="grid grid-cols-3 gap-2">
      {[
        [String(dishes.length), "dishes"],
        [String(veg), "vegetarian"],
        [String(vegan), "vegan"],
      ].map(([value, label]) => (
        <div key={label} className="rounded-[18px] border border-[#4a3025]/10 bg-[#fffaf4] p-3 text-center">
          <p className="lx-serif text-2xl text-[#7c241e]">{value}</p>
          <p className="mt-1 text-[8px] uppercase tracking-[.12em] text-[#7a685f]">{label}</p>
        </div>
      ))}
    </div>
  );
}
