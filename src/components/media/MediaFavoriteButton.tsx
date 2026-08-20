"use client";

import { useSyncExternalStore } from "react";
import { mediaFavouriteStore } from "@/lib/media/storage";

export default function MediaFavoriteButton({
  id,
}: {
  id: string;
}) {
  const favourites = useSyncExternalStore(
    mediaFavouriteStore.subscribe,
    mediaFavouriteStore.getSnapshot,
    mediaFavouriteStore.getServerSnapshot
  );

  const active = favourites.includes(id);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        mediaFavouriteStore.toggle(id);
      }}
      className={`grid h-10 w-10 place-items-center rounded-full border backdrop-blur ${
        active
          ? "border-[#7c241e] bg-[#7c241e] text-white"
          : "border-white/60 bg-white/90 text-[#7c241e]"
      }`}
      aria-label={active ? "Remove from saved gallery" : "Save gallery image"}
    >
      {active ? "♥" : "♡"}
    </button>
  );
}
