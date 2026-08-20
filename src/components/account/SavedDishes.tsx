"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { favouriteStore } from "@/lib/menu/storage";
import { dishes } from "@/lib/menu/data";

export default function SavedDishes() {
  const favourites = useSyncExternalStore(
    favouriteStore.subscribe,
    favouriteStore.getSnapshot,
    favouriteStore.getServerSnapshot
  );

  const saved = dishes.filter((dish) => favourites.includes(dish.slug)).slice(0, 4);

  return (
    <div className="rounded-[26px] bg-[#fffaf4] p-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="lx-kicker">Saved tastes</p>
          <h2 className="lx-serif mt-2 text-3xl">Favourite dishes.</h2>
        </div>
        <Link href="/menu/favorites" className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
          View all →
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {saved.length ? saved.map((dish) => (
          <Link key={dish.slug} href={`/menu/${dish.slug}`} className="overflow-hidden rounded-[18px] bg-[#f3e7dc]">
            <div className="h-28 bg-cover bg-center" style={{ backgroundImage: `url("${dish.image}")` }} />
            <div className="p-3">
              <p className="lx-serif text-lg">{dish.name}</p>
              <p className="mt-1 text-[9px] text-[#75645d]">₹{dish.price.toLocaleString("en-IN")}</p>
            </div>
          </Link>
        )) : (
          <div className="col-span-2 rounded-[18px] border border-dashed border-[#4a3025]/15 p-6 text-center text-xs text-[#75645d]">
            Tap ♡ on menu dishes to save them here.
          </div>
        )}
      </div>
    </div>
  );
}
