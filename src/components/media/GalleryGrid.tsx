"use client";

import type { GalleryItem } from "@/lib/media/types";
import GalleryCard from "./GalleryCard";

export default function GalleryGrid({
  items,
  onOpen,
}: {
  items: GalleryItem[];
  onOpen: (index: number) => void;
}) {
  return (
    <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
      {items.map((item, index) => (
        <div key={item.id} className="mb-3 break-inside-avoid">
          <GalleryCard item={item} onOpen={() => onOpen(index)} />
        </div>
      ))}
    </div>
  );
}
