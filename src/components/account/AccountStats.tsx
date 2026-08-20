"use client";

import { useSyncExternalStore } from "react";
import { accountStore } from "@/lib/account/storage";
import { favouriteStore } from "@/lib/menu/storage";

export default function AccountStats() {
  const account = useSyncExternalStore(
    accountStore.subscribe,
    accountStore.getSnapshot,
    accountStore.getServerSnapshot
  );
  const favourites = useSyncExternalStore(
    favouriteStore.subscribe,
    favouriteStore.getSnapshot,
    favouriteStore.getServerSnapshot
  );

  const stats = [
    [String(account.points), "points"],
    [String(favourites.length), "favourites"],
    [String(account.occasions.length), "occasions"],
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {stats.map(([value, label]) => (
        <div key={label} className="rounded-[20px] bg-[#fffaf4] p-4 text-center">
          <p className="lx-serif text-3xl text-[#7c241e]">{value}</p>
          <p className="mt-1 text-[8px] uppercase tracking-[.11em] text-[#75645d]">{label}</p>
        </div>
      ))}
    </div>
  );
}
