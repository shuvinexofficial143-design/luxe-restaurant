"use client";

import { useSyncExternalStore } from "react";
import { accountStore } from "@/lib/account/storage";
import { nextTier, tierProgress } from "@/lib/account/loyalty";

export default function LoyaltyCard() {
  const account = useSyncExternalStore(
    accountStore.subscribe,
    accountStore.getSnapshot,
    accountStore.getServerSnapshot
  );
  const next = nextTier(account.points);
  const progress = tierProgress(account.points);

  return (
    <div className="overflow-hidden rounded-[28px] bg-[#7c241e] p-5 text-white md:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[9px] uppercase tracking-[.15em] text-[#ffd19a]">LUXE loyalty</p>
          <p className="lx-serif mt-2 text-5xl">{account.points.toLocaleString("en-IN")}</p>
          <p className="mt-1 text-xs text-white/55">available points</p>
        </div>
        <span className="rounded-full bg-white/12 px-3 py-2 text-[8px] uppercase tracking-[.12em]">
          {account.membership}
        </span>
      </div>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/12">
        <div className="h-full rounded-full bg-[#ffd19a]" style={{ width: `${progress}%` }} />
      </div>

      <p className="mt-3 text-[10px] leading-5 text-white/55">
        {next.remaining > 0
          ? `${next.remaining.toLocaleString("en-IN")} points until ${next.name}`
          : "Top membership tier reached."}
      </p>
    </div>
  );
}
