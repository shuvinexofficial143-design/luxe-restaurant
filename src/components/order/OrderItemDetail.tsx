"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

type OrderDish = {
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price: number;
  dietary: string[];
  spice: number;
};

export default function OrderItemDetail({
  dish,
  initialTable = "",
}: {
  dish: OrderDish;
  initialTable?: string;
}) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [tableNumber, setTableNumber] = useState(initialTable);
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const total = dish.price * quantity;

  async function placeOrder() {
    if (!tableNumber.trim()) {
      setMessage("Table number dalo, phir order place hoga.");
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
          notes,
          items: [
            {
              slug: dish.slug,
              quantity,
            },
          ],
        }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        data?: { order?: { orderId?: string } };
        error?: { message?: string };
      };

      const orderId = payload.data?.order?.orderId;

      if (!response.ok || !payload.ok || !orderId) {
        setMessage(
          payload.error?.message ||
            "Live order abhi available nahi hai. Database connect hone ke baad submit hoga."
        );
        return;
      }

      router.push(`/order/live/track/${encodeURIComponent(orderId)}`);
    } catch {
      setMessage("Order request failed. Dobara try karo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-[#080806] pb-[104px]">
      <div className="relative h-[41dvh] min-h-[300px] overflow-hidden bg-[#16120e] md:h-[48dvh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${dish.image}")` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.08)_60%,rgba(8,8,6,.66))]" />

        <Link
          href="/order/live"
          className="absolute left-3 top-3 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/65 text-lg font-black text-white backdrop-blur-xl"
          aria-label="Back to menu"
        >
          ←
        </Link>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[.16em] text-[#7ad0ff]">
              {dish.category}
            </p>
            <h1 className="lx-serif mt-1 max-w-[75vw] text-4xl leading-[.9] text-white">
              {dish.name}
            </h1>
          </div>
          <div className="rounded-full bg-[#dba04c] px-4 py-2 font-bold text-[#100b07]">
            ₹{dish.price.toLocaleString("en-IN")}
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-1 rounded-t-[30px] bg-[#fff7ea] px-4 pb-8 pt-5 text-[#17120e] shadow-[0_-18px_60px_rgba(0,0,0,.32)] md:mx-auto md:max-w-[760px] md:rounded-[30px] md:mt-[-28px]">
        <div className="flex flex-wrap gap-2">
          {dish.dietary.slice(0, 4).map((tag, index) => (
            <span
              key={tag}
              className={`rounded-full px-3 py-1.5 text-[8px] font-black uppercase tracking-[.07em] ${
                index % 3 === 0
                  ? "bg-[#dff5ff] text-[#156080]"
                  : index % 3 === 1
                    ? "bg-[#ece6ff] text-[#5b3ca2]"
                    : "bg-[#dbf8e9] text-[#1f6e50]"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-4 text-[13px] font-medium leading-6 text-[#55483f]">
          {dish.description}
        </p>

        <div className="mt-5 grid grid-cols-[1fr_auto] items-center gap-3 rounded-[20px] bg-white p-4 shadow-[0_12px_30px_rgba(58,38,22,.08)] ring-1 ring-[#24160d]/5">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[.11em] text-[#735534]">
              Quantity
            </p>
            <p className="mt-1 text-xs font-semibold text-[#7b6a5e]">
              ₹{dish.price.toLocaleString("en-IN")} each
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-full bg-[#11100d] p-1.5 text-white">
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xl font-black"
            >
              −
            </button>
            <span className="min-w-5 text-center text-sm font-black">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.min(20, value + 1))}
              className="grid h-9 w-9 place-items-center rounded-full bg-[#57b8ff] text-xl font-black text-[#071018]"
            >
              +
            </button>
          </div>
        </div>

        <label className="mt-3 block rounded-[20px] bg-white p-4 shadow-[0_12px_30px_rgba(58,38,22,.08)] ring-1 ring-[#24160d]/5">
          <span className="text-[9px] font-black uppercase tracking-[.11em] text-[#735534]">
            Table number
          </span>
          <input
            value={tableNumber}
            onChange={(event) => setTableNumber(event.target.value)}
            placeholder="Example: T12"
            className="mt-2 h-12 w-full rounded-[14px] border-2 border-[#d9c2a7] bg-[#fffdf9] px-4 text-base font-bold text-[#17120e] outline-none transition placeholder:text-[#a99683] focus:border-[#4e9ed0]"
          />
        </label>

        <label className="mt-3 block rounded-[20px] bg-white p-4 shadow-[0_12px_30px_rgba(58,38,22,.08)] ring-1 ring-[#24160d]/5">
          <span className="text-[9px] font-black uppercase tracking-[.11em] text-[#735534]">
            Notes · optional
          </span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={2}
            placeholder="Less spicy, allergy note..."
            className="mt-2 w-full resize-none rounded-[14px] border-2 border-[#d9c2a7] bg-[#fffdf9] p-4 text-sm font-semibold text-[#17120e] outline-none transition placeholder:text-[#a99683] focus:border-[#9d7cff]"
          />
        </label>

        <div className="mt-4 flex items-center justify-between rounded-[20px] bg-[#101c19] p-4 text-white">
          <div>
            <p className="text-[8px] font-black uppercase tracking-[.12em] text-[#69deb2]">
              Total
            </p>
            <p className="lx-serif mt-1 text-3xl text-[#fff6e8]">
              ₹{total.toLocaleString("en-IN")}
            </p>
          </div>
          <p className="text-right text-[9px] font-semibold leading-4 text-white/45">
            {quantity} item{quantity > 1 ? "s" : ""}<br />Table {tableNumber || "—"}
          </p>
        </div>

        <button
          type="button"
          onClick={placeOrder}
          disabled={loading}
          className="mt-3 h-14 w-full rounded-[18px] bg-[linear-gradient(135deg,#43d69e,#2bb7c8)] text-[11px] font-black uppercase tracking-[.12em] text-[#06120e] shadow-[0_14px_34px_rgba(43,183,200,.25)] disabled:opacity-50"
        >
          {loading ? "Placing order..." : `Place order · ₹${total.toLocaleString("en-IN")}`}
        </button>

        {message ? (
          <p className="mt-3 rounded-[16px] bg-[#fff0d4] p-3 text-[10px] font-bold leading-5 text-[#7a4a16]">
            {message}
          </p>
        ) : null}
      </div>
    </section>
  );
}
