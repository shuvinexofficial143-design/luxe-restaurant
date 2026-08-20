"use client";

import Link from "next/link";
import { useState } from "react";
import { giftStorage } from "@/lib/gifts/storage";
import { formatGiftMoney } from "@/lib/gifts/utils";

export default function GiftConfirmation({
  id,
}: {
  id: string;
}) {
  const [gift] = useState(() =>
    typeof window !== "undefined" ? giftStorage.getPurchase(id) : undefined
  );

  if (!gift) {
    return (
      <div className="rounded-[28px] bg-[#fffaf4] p-8 text-center">
        <h1 className="lx-serif text-4xl">Gift not found.</h1>
        <Link
          href="/gift-cards"
          className="mt-5 inline-flex rounded-full bg-[#7c241e] px-5 py-3 text-[9px] uppercase tracking-[.12em] text-white"
        >
          Gift cards
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[30px] bg-[#fffaf4]">
      <div className="bg-[#335f50] p-7 text-white">
        <p className="text-[9px] uppercase tracking-[.14em] text-[#efc99a]">
          Gift created
        </p>
        <h1 className="lx-serif mt-2 text-5xl">Ready to gift.</h1>
        <p className="mt-3 text-sm text-white/55">{gift.id}</p>
      </div>

      <div className="p-6">
        <div className="rounded-[22px] bg-[#201713] p-5 text-center text-white">
          <p className="text-[8px] uppercase tracking-[.14em] text-[#efc28b]">
            Demo gift code
          </p>
          <p className="lx-serif mt-2 text-3xl tracking-[.08em]">{gift.code}</p>
          <p className="lx-serif mt-3 text-4xl text-[#efc28b]">
            {formatGiftMoney(gift.balance)}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            href="/gift-cards/history"
            className="flex min-h-12 items-center justify-center rounded-[16px] bg-[#7c241e] text-[9px] uppercase tracking-[.12em] text-white"
          >
            Gift history
          </Link>
          <Link
            href="/gift-cards/redeem"
            className="flex min-h-12 items-center justify-center rounded-[16px] border border-[#4a3025]/10 text-[9px] uppercase tracking-[.12em]"
          >
            Check balance
          </Link>
        </div>
      </div>
    </div>
  );
}
