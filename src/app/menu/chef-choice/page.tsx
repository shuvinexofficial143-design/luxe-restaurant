import LuxeShell from "@/components/luxe/LuxeShell";
import DishGrid from "@/components/menu/DishGrid";
import { dishes } from "@/lib/menu/data";

export const metadata = { title: "Chef Choice" };

export default function ChefChoicePage() {
  const items = dishes.filter((dish) => dish.chefChoice);
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1180px]">
          <p className="lx-kicker">Aarav recommends</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">Chef Choice.</h1>
          <div className="mt-7"><DishGrid dishes={items} /></div>
        </div>
      </section>
    </LuxeShell>
  );
}
