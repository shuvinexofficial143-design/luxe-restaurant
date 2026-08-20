"use client";

import type { Dish } from "@/lib/menu/types";
import { cartStore } from "@/lib/orders/cart-storage";
import DietaryBadges from "@/components/menu/DietaryBadges";

export default function OrderDishCard({ dish }: { dish: Dish }) {
  return (
    <article className="overflow-hidden rounded-[24px] border border-[#4a3025]/10 bg-[#fffaf4]">
      <div
        className="h-[230px] bg-cover bg-center"
        style={{ backgroundImage: `url("${dish.image}")` }}
      />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[8px] uppercase tracking-[.12em] text-[#8a756b]">
              {dish.category}
            </p>
            <h3 className="lx-serif mt-1 text-2xl">{dish.name}</h3>
          </div>
          <p className="lx-serif text-lg text-[#7c241e]">
            ₹{dish.price.toLocaleString("en-IN")}
          </p>
        </div>

        <p className="mt-2 line-clamp-2 text-xs leading-6 text-[#75645d]">
          {dish.description}
        </p>

        <div className="mt-3">
          <DietaryBadges tags={dish.dietary} />
        </div>

        <button
          type="button"
          onClick={() =>
            cartStore.add({
              slug: dish.slug,
              name: dish.name,
              price: dish.price,
              image: dish.image,
            })
          }
          className="mt-4 h-11 w-full rounded-[15px] bg-[#7c241e] text-[9px] uppercase tracking-[.13em] text-white"
        >
          Add to cart +
        </button>
      </div>
    </article>
  );
}
