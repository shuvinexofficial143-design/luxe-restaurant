import Link from "next/link";
import type { Dish } from "@/lib/menu/types";
import DietaryBadges from "./DietaryBadges";
import FavoriteButton from "./FavoriteButton";
import SpiceLevel from "./SpiceLevel";

export default function DishCard({ dish }: { dish: Dish }) {
  return (
    <Link href={`/menu/${dish.slug}`} className="group block overflow-hidden rounded-[26px] border border-[#4a3025]/10 bg-[#fffaf4] shadow-[0_18px_50px_rgba(70,40,26,.07)]">
      <div className="relative h-[280px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-[1.04]"
          style={{ backgroundImage: `url("${dish.image}")` }}
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <div className="flex flex-wrap gap-1.5">
            {dish.chefChoice ? <span className="rounded-full bg-[#201713]/88 px-3 py-2 text-[8px] uppercase tracking-[.12em] text-white">Chef Choice</span> : null}
            {dish.newDish ? <span className="rounded-full bg-[#335f50]/92 px-3 py-2 text-[8px] uppercase tracking-[.12em] text-white">New</span> : null}
            {dish.bestseller ? <span className="rounded-full bg-[#a73b2b]/92 px-3 py-2 text-[8px] uppercase tracking-[.12em] text-white">Popular</span> : null}
          </div>
          <FavoriteButton slug={dish.slug} compact />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[9px] uppercase tracking-[.14em] text-[#8d6f61]">{dish.category}</p>
            <h3 className="lx-serif mt-1 text-2xl">{dish.name}</h3>
          </div>
          <p className="lx-serif text-xl text-[#7c241e]">₹{dish.price.toLocaleString("en-IN")}</p>
        </div>

        <p className="mt-3 line-clamp-2 text-xs leading-6 text-[#75645d]">{dish.description}</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <DietaryBadges tags={dish.dietary} />
          <SpiceLevel level={dish.spice} />
        </div>
      </div>
    </Link>
  );
}
