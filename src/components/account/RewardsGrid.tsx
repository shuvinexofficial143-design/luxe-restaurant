"use client";

import { useState, useSyncExternalStore } from "react";
import { rewards } from "@/lib/account/data";
import { accountStore } from "@/lib/account/storage";

export default function RewardsGrid() {
  const account = useSyncExternalStore(
    accountStore.subscribe,
    accountStore.getSnapshot,
    accountStore.getServerSnapshot
  );
  const [message, setMessage] = useState("");

  function redeem(title: string, points: number) {
    const ok = accountStore.redeemReward(title, points);
    setMessage(ok ? `${title} redeemed in demo mode.` : "Not enough points yet.");
  }

  return (
    <div>
      {message ? (
        <div className="mb-4 rounded-[18px] bg-[#335f50]/10 p-4 text-xs text-[#335f50]">
          {message}
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        {rewards.map((reward) => {
          const locked = account.points < reward.points;
          return (
            <article key={reward.id} className="rounded-[24px] bg-[#fffaf4] p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-full bg-[#f3e7dc] px-3 py-2 text-[8px] uppercase tracking-[.11em] text-[#7c241e]">
                  {reward.category}
                </span>
                <span className="lx-serif text-xl text-[#7c241e]">{reward.points}</span>
              </div>
              <h3 className="lx-serif mt-4 text-2xl">{reward.title}</h3>
              <p className="mt-2 text-xs leading-6 text-[#75645d]">{reward.description}</p>
              <button
                type="button"
                disabled={locked}
                onClick={() => redeem(reward.title, reward.points)}
                className="mt-4 min-h-11 w-full rounded-[15px] bg-[#201713] text-[9px] uppercase tracking-[.12em] text-white disabled:opacity-30"
              >
                {locked ? "Keep earning" : "Redeem reward"}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
