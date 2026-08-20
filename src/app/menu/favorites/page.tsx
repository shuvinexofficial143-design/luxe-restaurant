"use client";

import { useSyncExternalStore } from "react";
import LuxeShell from "@/components/luxe/LuxeShell";
import DishGrid from "@/components/menu/DishGrid";
import { dishes } from "@/lib/menu/data";
import { favouriteStore } from "@/lib/menu/storage";

export default function FavoritesPage() {
  const favourites = useSyncExternalStore(
    favouriteStore.subscribe,
    favouriteStore.getSnapshot,
    favouriteStore.getServerSnapshot
  );

  const saved = dishes.filter((dish) => favourites.includes(dish.slug));

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1180px]">
          <p className="lx-kicker">Saved dishes</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">Your favourites.</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#75645d]">
            Save dishes from anywhere in the menu and come back to them here.
          </p>

          <div className="mt-7">
            {saved.length ? (
              <DishGrid dishes={saved} />
            ) : (
              <div className="rounded-[28px] bg-[#fffaf4] p-10 text-center">
                <p className="text-3xl">♡</p>
                <p className="lx-serif mt-3 text-3xl">Nothing saved yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
