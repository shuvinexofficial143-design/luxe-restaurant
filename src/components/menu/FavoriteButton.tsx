"use client";

import { useSyncExternalStore } from "react";
import { favouriteStore } from "@/lib/menu/storage";

export default function FavoriteButton({
  slug,
  compact = false,
}: {
  slug: string;
  compact?: boolean;
}) {
  const favourites = useSyncExternalStore(
    favouriteStore.subscribe,
    favouriteStore.getSnapshot,
    favouriteStore.getServerSnapshot
  );
  const active = favourites.includes(slug);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        favouriteStore.toggle(slug);
      }}
      aria-label={active ? "Remove from favourites" : "Add to favourites"}
      className={`grid place-items-center rounded-full border backdrop-blur transition ${
        compact ? "h-10 w-10" : "h-12 w-12"
      } ${
        active
          ? "border-[#7c241e] bg-[#7c241e] text-white"
          : "border-white/60 bg-white/85 text-[#7c241e]"
      }`}
    >
      {active ? "♥" : "♡"}
    </button>
  );
}
