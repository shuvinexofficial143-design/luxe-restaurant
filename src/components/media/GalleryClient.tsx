"use client";

import { useMemo, useState } from "react";
import type { GalleryItem, MediaCategory } from "@/lib/media/types";
import { filterGallery } from "@/lib/media/filters";
import GallerySearch from "./GallerySearch";
import GalleryCategoryTabs from "./GalleryCategoryTabs";
import GalleryGrid from "./GalleryGrid";
import GalleryLightbox from "./GalleryLightbox";
import GalleryEmptyState from "./GalleryEmptyState";

export default function GalleryClient({
  items,
}: {
  items: GalleryItem[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | MediaCategory>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => filterGallery(items, query, category),
    [category, items, query]
  );

  return (
    <>
      <div className="sticky top-[80px] z-30 rounded-[22px] border border-[#4a3025]/10 bg-[#f7f1e8]/95 p-3 backdrop-blur-xl md:top-[92px]">
        <GallerySearch value={query} onChange={setQuery} />
        <div className="mt-2">
          <GalleryCategoryTabs value={category} onChange={setCategory} />
        </div>
      </div>

      <div className="mt-4">
        {visible.length ? (
          <GalleryGrid items={visible} onOpen={setOpenIndex} />
        ) : (
          <GalleryEmptyState />
        )}
      </div>

      <GalleryLightbox
        items={visible}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onChange={setOpenIndex}
      />
    </>
  );
}
