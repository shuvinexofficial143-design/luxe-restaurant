"use client";

import { useState } from "react";
import type { GiftPurchase } from "@/lib/gifts/types";
import { giftStorage } from "@/lib/gifts/storage";
import GiftHistoryCard from "./GiftHistoryCard";

export default function GiftHistory() {
  const [gifts] = useState<GiftPurchase[]>(() =>
    typeof window !== "undefined" ? giftStorage.listPurchases() : []
  );

  if (!gifts.length) {
    return (
      <div className="rounded-[28px] bg-[#fffaf4] p-10 text-center">
        <p className="text-4xl">🎁</p>
        <p className="lx-serif mt-3 text-3xl">No gifts yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {gifts.map((gift) => (
        <GiftHistoryCard key={gift.id} gift={gift} />
      ))}
    </div>
  );
}
