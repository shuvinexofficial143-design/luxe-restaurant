"use client";

import Image from "next/image";
import Link from "next/link";
import type { Dish } from "@/lib/menu/types";
import { cartStore } from "@/lib/orders/cart-storage";
import DietaryBadges from "@/components/menu/DietaryBadges";

export default function OrderDishCard({ dish }: { dish: Dish }) {
  function add() {
    cartStore.add({
      slug: dish.slug,
      name: dish.name,
      price: dish.price,
      image: dish.image,
    });
  }

  return (
    <article className="overflow-hidden rounded-[22px] border border-[#4a3025]/10 bg-[#fffaf4]">
      <Link href={"/menu/" + dish.slug} className="group block">
        <div className="relative aspect-[1.25/1] overflow-hidden bg-[#e9ddd1]">
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.035]"
          />
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[.12em] text-[#8a756b]">
              {dish.category}
            </p>
            <Link href={"/menu/" + dish.slug}>
              <h3 className="lx-serif mt-1 text-2xl">{dish.name}</h3>
            </Link>
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

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            href={"/menu/" + dish.slug}
            className="flex min-h-11 items-center justify-center rounded-[15px] border border-[#4a3025]/10 text-[10px] uppercase tracking-[.11em] text-[#6d554a]"
          >
            Details
          </Link>
          <button
            type="button"
            onClick={add}
            className="min-h-11 rounded-[15px] bg-[#7c241e] text-[10px] uppercase tracking-[.11em] text-white"
          >
            Add +
          </button>
        </div>
      </div>
    </article>
  );
}
