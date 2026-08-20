"use client";

import { useState } from "react";
import type {
  LoyaltyTransactionRow,
  LoyaltyWalletRow,
} from "@/lib/server/account/types";
import { loyaltyRewards } from "@/lib/server/account/loyalty";

export default function LoyaltyWallet({
  wallet,
  history,
  onRedeemed,
}: {
  wallet: LoyaltyWalletRow;
  history: LoyaltyTransactionRow[];
  onRedeemed: () => void;
}) {
  const [message, setMessage] = useState("");

  async function redeem(rewardId: string) {
    const response = await fetch("/api/v1/account/loyalty/redeem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rewardId }),
    });

    const payload = (await response.json()) as {
      ok?: boolean;
      error?: { message?: string };
    };

    setMessage(
      response.ok && payload.ok
        ? "Reward redeemed."
        : payload.error?.message || "Reward could not be redeemed."
    );

    if (response.ok && payload.ok) onRedeemed();
  }

  return (
    <aside className="rounded-[28px] bg-[#201713] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.14em] text-[#efc28b]">
        LUXE Loyalty
      </p>
      <h2 className="lx-serif mt-2 text-4xl">{wallet.tier}</h2>
      <p className="lx-serif mt-3 text-5xl text-[#efc28b]">
        {wallet.points_balance.toLocaleString("en-IN")}
      </p>
      <p className="text-[8px] uppercase tracking-[.1em] text-white/40">
        available points
      </p>

      <div className="mt-5 space-y-2">
        {loyaltyRewards.map((reward) => (
          <div key={reward.id} className="rounded-[16px] bg-white/[.06] p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="lx-serif text-xl">{reward.title}</p>
                <p className="mt-1 text-[9px] leading-5 text-white/45">
                  {reward.text}
                </p>
              </div>
              <button
                type="button"
                disabled={wallet.points_balance < reward.points}
                onClick={() => void redeem(reward.id)}
                className="shrink-0 rounded-full border border-white/15 px-3 py-2 text-[8px] disabled:opacity-30"
              >
                {reward.points} pts
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="text-[8px] uppercase tracking-[.1em] text-white/40">
          Recent activity
        </p>
        <div className="mt-2 space-y-2">
          {history.slice(0, 4).map((item) => (
            <div key={item.id} className="flex justify-between gap-3 text-[9px]">
              <span className="text-white/55">{item.description}</span>
              <span className={item.points >= 0 ? "text-[#efc28b]" : "text-white"}>
                {item.points > 0 ? "+" : ""}
                {item.points}
              </span>
            </div>
          ))}
          {!history.length ? (
            <p className="text-[9px] text-white/35">No loyalty activity yet.</p>
          ) : null}
        </div>
      </div>

      {message ? (
        <p className="mt-4 text-[9px] text-[#efc28b]">{message}</p>
      ) : null}
    </aside>
  );
}
