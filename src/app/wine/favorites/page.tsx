"use client";

import { useSyncExternalStore } from "react";
import LuxeShell from "@/components/luxe/LuxeShell";
import WineGrid from "@/components/wine/WineGrid";
import { wines } from "@/lib/wine/data";
import { favouriteWineStore } from "@/lib/wine/storage";

export default function FavoriteWinesPage() {
  const favourites = useSyncExternalStore(
    favouriteWineStore.subscribe,
    favouriteWineStore.getSnapshot,
    favouriteWineStore.getServerSnapshot
  );

  const saved = wines.filter((wine) => favourites.includes(wine.slug));

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1180px]">
          <p className="lx-kicker">Saved cellar</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">
            Favourite wines.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#75645d]">
            Save bottles from the cellar and revisit them here.
          </p>

          <div className="mt-7">
            {saved.length ? (
              <WineGrid wines={saved} />
            ) : (
              <div className="rounded-[28px] border border-dashed border-[#7c241e]/20 bg-[#fffaf4] p-10 text-center">
                <p className="text-4xl">♡</p>
                <p className="lx-serif mt-3 text-3xl">No wines saved yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
