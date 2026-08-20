"use client";

import { FormEvent, useState } from "react";
import type { GiftPurchase } from "@/lib/gifts/types";
import { giftStorage } from "@/lib/gifts/storage";
import { formatGiftMoney } from "@/lib/gifts/utils";

export default function RedeemForm() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<GiftPurchase | null>(null);
  const [searched, setSearched] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearched(true);
    setResult(giftStorage.findByCode(code) || null);
  }

  return (
    <div>
      <form onSubmit={submit} className="rounded-[26px] bg-[#fffaf4] p-5">
        <p className="lx-kicker">Gift balance</p>
        <h2 className="lx-serif mt-2 text-4xl">Check a gift code.</h2>

        <input
          required
          value={code}
          onChange={(event) => setCode(event.target.value.toUpperCase())}
          placeholder="LUXE-XXXX-XXXX"
          className="mt-5 h-12 w-full rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm uppercase tracking-[.08em]"
        />

        <button className="mt-3 h-12 w-full rounded-[16px] bg-[#7c241e] text-[9px] uppercase tracking-[.13em] text-white">
          Check balance
        </button>
      </form>

      {result ? (
        <div className="mt-4 rounded-[26px] bg-[#335f50] p-5 text-white">
          <p className="text-[9px] uppercase tracking-[.14em] text-[#efc99a]">
            Active demo gift
          </p>
          <p className="lx-serif mt-2 text-5xl text-[#efc99a]">
            {formatGiftMoney(result.balance)}
          </p>
          <p className="mt-2 text-xs text-white/55">
            For {result.recipientName} · {result.status}
          </p>
        </div>
      ) : searched ? (
        <div className="mt-4 rounded-[24px] border border-dashed border-[#7c241e]/20 p-7 text-center">
          <p className="lx-serif text-3xl">Gift code not found.</p>
          <p className="mt-2 text-xs text-[#75645d]">
            Demo codes only work in the browser where they were created.
          </p>
        </div>
      ) : null}
    </div>
  );
}
