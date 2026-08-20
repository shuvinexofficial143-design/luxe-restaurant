"use client";

import { useState, useSyncExternalStore } from "react";
import LuxeShell from "@/components/luxe/LuxeShell";
import GalleryGrid from "@/components/media/GalleryGrid";
import GalleryLightbox from "@/components/media/GalleryLightbox";
import { galleryItems } from "@/lib/media/data";
import { mediaFavouriteStore } from "@/lib/media/storage";

export default function GalleryFavoritesPage() {
  const favourites = useSyncExternalStore(
    mediaFavouriteStore.subscribe,
    mediaFavouriteStore.getSnapshot,
    mediaFavouriteStore.getServerSnapshot
  );
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const saved = galleryItems.filter((item) => favourites.includes(item.id));

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1180px]">
          <p className="lx-kicker">Saved moments</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">
            Gallery favourites.
          </h1>

          <div className="mt-6">
            {saved.length ? (
              <GalleryGrid items={saved} onOpen={setOpenIndex} />
            ) : (
              <div className="rounded-[28px] bg-[#fffaf4] p-10 text-center">
                <p className="text-4xl">♡</p>
                <p className="lx-serif mt-3 text-3xl">Nothing saved yet.</p>
              </div>
            )}
          </div>

          <GalleryLightbox
            items={saved}
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onChange={setOpenIndex}
          />
        </div>
      </section>
    </LuxeShell>
  );
}
