"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ServerCartSummary from "./ServerCartSummary";

type CartLine = {
  item: {
    slug: string;
    title: string;
    price: number;
  };
  quantity: number;
};

export default function RealCheckout({
  lines,
  initialTable,
  onQuantity,
}: {
  lines: CartLine[];
  initialTable: string;
  onQuantity: (slug: string, quantity: number) => void;
}) {
  const router = useRouter();
  const [tableNumber, setTableNumber] = useState(initialTable);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!lines.length) {
      setMessage("पहले कम से कम 1 dish add करें।");
      return;
    }

    if (!tableNumber.trim()) {
      setMessage("Table number डालें।");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/v1/order-engine/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fulfillment: "TABLE",
          tableNumber: tableNumber.trim(),
          items: lines.map((line) => ({
            slug: line.item.slug,
            quantity: line.quantity,
          })),
        }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        data?: {
          order?: {
            orderId?: string;
          };
        };
        error?: { message?: string };
      };

      const orderId = payload.data?.order?.orderId;

      if (!response.ok || !payload.ok || !orderId) {
        setMessage(
          payload.error?.message ||
            "Live ordering अभी database connection के बिना unavailable है।"
        );
        return;
      }

      router.push(`/order/live/track/${encodeURIComponent(orderId)}`);
    } catch {
      setMessage("Order request अभी live server तक नहीं पहुंची।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <aside className="xl:sticky xl:top-[138px] xl:self-start">
      <form
        onSubmit={submit}
        className="rounded-[24px] border border-white/10 bg-[linear-gradient(145deg,rgba(31,23,18,.96),rgba(12,10,8,.98))] p-3 text-[#f4eadc] shadow-[0_24px_70px_rgba(0,0,0,.32)]"
      >
        <div className="flex items-center justify-between gap-3 px-1 py-1">
          <div>
            <p className="text-[7px] uppercase tracking-[.15em] text-[#39c58f]">
              Table order
            </p>
            <h2 className="lx-serif mt-1 text-2xl">Your order</h2>
          </div>
          <span className="rounded-full bg-[#39c58f]/12 px-3 py-2 text-[7px] uppercase tracking-[.1em] text-[#55daa4]">
            Dine in
          </span>
        </div>

        <div className="mt-3">
          <ServerCartSummary lines={lines} onQuantity={onQuantity} />
        </div>

        <label className="mt-3 block rounded-[16px] border border-[#57b8ff]/20 bg-[#57b8ff]/[.055] p-3">
          <span className="text-[7px] uppercase tracking-[.13em] text-[#62c9ff]">
            Table number
          </span>
          <input
            required
            value={tableNumber}
            onChange={(event) => setTableNumber(event.target.value)}
            inputMode="numeric"
            placeholder="Example: 12"
            className="mt-2 h-11 w-full rounded-[12px] border border-white/10 bg-[#090806] px-3 text-base font-semibold text-white outline-none placeholder:text-white/24 focus:border-[#57b8ff]/45"
          />
        </label>

        <button
          disabled={loading || !lines.length}
          className="mt-3 h-12 w-full rounded-[15px] bg-[linear-gradient(135deg,#39c58f,#49a8da)] text-[8px] font-semibold uppercase tracking-[.12em] text-[#07120e] shadow-[0_12px_32px_rgba(57,197,143,.18)] disabled:cursor-not-allowed disabled:opacity-35"
        >
          {loading ? "Placing order…" : "Place table order"}
        </button>

        {message ? (
          <p className="mt-3 rounded-[12px] border border-[#e5b35f]/15 bg-[#e5b35f]/[.06] p-3 text-[9px] leading-5 text-[#e7c58f]">
            {message}
          </p>
        ) : null}
      </form>
    </aside>
  );
}
