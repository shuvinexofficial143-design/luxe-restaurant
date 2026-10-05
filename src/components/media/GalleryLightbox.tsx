"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { GalleryItem } from "@/lib/media/types";
import MediaFavoriteButton from "./MediaFavoriteButton";

export default function GalleryLightbox({
  items,
  index,
  onClose,
  onChange,
}: {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const item = index === null ? null : items[index];

  useEffect(() => {
    if (!item) return;

    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") {
        onChange((index! + 1) % items.length);
      }
      if (event.key === "ArrowLeft") {
        onChange((index! - 1 + items.length) % items.length);
      }
    }

    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [index, item, items.length, onChange, onClose]);

  if (!item || index === null) return null;

  const previous = (index - 1 + items.length) % items.length;
  const next = (index + 1) % items.length;

  return (
    <div
      className="fixed inset-0 z-[250] bg-[#120d0b]/96 p-3 text-white backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div className="mx-auto flex h-full max-w-[1200px] flex-col">
        <div className="flex items-center justify-between gap-3 py-2">
          <div>
            <p className="text-[10px] uppercase tracking-[.14em] text-white/52">
              {item.category} · {index + 1}/{items.length}
            </p>
            <p className="lx-serif mt-1 text-2xl">{item.title}</p>
          </div>

          <div className="flex items-center gap-2">
            <MediaFavoriteButton id={item.id} />
            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-xl"
              aria-label="Close lightbox"
            >
              ×
            </button>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden rounded-[24px]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="100vw"
            className="object-contain"
          />

          <button
            type="button"
            onClick={() => onChange(previous)}
            className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/55"
            aria-label="Previous image"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => onChange(next)}
            className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/55"
            aria-label="Next image"
          >
            →
          </button>
        </div>

        <p className="py-3 text-center text-sm text-white/60">{item.caption}</p>
      </div>
    </div>
  );
}
