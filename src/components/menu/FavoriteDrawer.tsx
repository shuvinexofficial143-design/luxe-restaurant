"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { favouriteStore } from "@/lib/menu/storage";

export default function FavoriteDrawer() {
  const favourites = useSyncExternalStore(
    favouriteStore.subscribe,
    favouriteStore.getSnapshot,
    favouriteStore.getServerSnapshot
  );

  if (!favourites.length) return null;

  return (
    <Link
      href="/menu/favorites"
      className="fixed bottom-[88px] right-3 z-[80] flex h-12 items-center gap-2 rounded-full bg-[#7c241e] px-4 text-[9px] uppercase tracking-[.14em] text-white shadow-[0_16px_40px_rgba(124,36,30,.28)] md:bottom-5"
    >
      ♥ {favourites.length} saved
    </Link>
  );
}
