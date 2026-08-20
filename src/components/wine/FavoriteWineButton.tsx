"use client";

import { useSyncExternalStore } from "react";
import { favouriteWineStore } from "@/lib/wine/storage";

export default function FavoriteWineButton({
  slug,
  compact = false,
}: {
  slug: string;
  compact?: boolean;
}) {
  const favourites = useSyncExternalStore(
    favouriteWineStore.subscribe,
    favouriteWineStore.getSnapshot,
    favouriteWineStore.getServerSnapshot
  );

  const active = favourites.includes(slug);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        favouriteWineStore.toggle(slug);
      }}
      className={`grid place-items-center rounded-full border backdrop-blur ${
        compact ? "h-10 w-10" : "h-12 w-12"
      } ${
        active
          ? "border-[#7c241e] bg-[#7c241e] text-white"
          : "border-white/60 bg-white/90 text-[#7c241e]"
      }`}
      aria-label={active ? "Remove wine from favourites" : "Save wine"}
    >
      {active ? "♥" : "♡"}
    </button>
  );
}
