"use client";

import Image from "next/image";
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
      setMessage("Enter your table number before placing the order.");
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
            "Table ordering is temporarily unavailable. Please try again."
        );
        return;
      }

      router.push("/order/track/" + encodeURIComponent(orderId));
    } catch {
      setMessage("Your order could not be placed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-[#080806] pb-[104px]">
      <div className="relative h-[41dvh] min-h-[300px] overflow-hidden bg-[#16120e] md:h-[48dvh]">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.08)_60%,rgba(8,8,6,.72))]" />

        <Link
          href="/order/live"
          className="absolute left-3 top-3 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/65 text-lg font-black text-white backdrop-blur-xl"
          aria-label="Back to table ordering menu"
        >
          ←
        </Link>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#d7b27b]">
              {dish.category}
            </p>
            <h1 className="lx-serif mt-1 max-w-[75vw] text-4xl leading-[.9] text-white md:text-5xl">
              {dish.name}
            </h1>
          </div>
          <div className="rounded-full bg-[#c9944b] px-4 py-2 font-bold text-[#100b07]">
            ₹{dish.price.toLocaleString("en-IN")}
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-1 rounded-t-[30px] bg-[#fff7ea] px-4 pb-8 pt-5 text-[#17120e] shadow-[0_-18px_60px_rgba(0,0,0,.32)] md:mx-auto md:mt-[-28px] md:max-w-[760px] md:rounded-[30px]">
        <div className="flex flex-wrap gap-2">
          {dish.dietary.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#7c5a35]/12 bg-[#efe3d3] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[.07em] text-[#6b4f35]"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-4 text-[14px] font-medium leading-6 text-[#55483f]">
          {dish.description}
        </p>

        <div className="mt-5 grid grid-cols-[1fr_auto] items-center gap-3 rounded-[20px] bg-white p-4 shadow-[0_12px_30px_rgba(58,38,22,.08)] ring-1 ring-[#24160d]/5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.11em] text-[#735534]">
              Quantity
            </p>
            <p className="mt-1 text-xs font-semibold text-[#7b6a5e]">
              ₹{dish.price.toLocaleString("en-IN")} each
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-full bg-[#17120e] p-1.5 text-white">
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xl font-black"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="min-w-5 text-center text-sm font-black">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.min(20, value + 1))}
              className="grid h-9 w-9 place-items-center rounded-full bg-[#c9944b] text-xl font-black text-[#100c08]"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        <label className="mt-3 block rounded-[20px] bg-white p-4 shadow-[0_12px_30px_rgba(58,38,22,.08)] ring-1 ring-[#24160d]/5">
          <span className="text-[10px] font-bold uppercase tracking-[.11em] text-[#735534]">
            Table number
          </span>
          <input
            value={tableNumber}
            onChange={(event) => setTableNumber(event.target.value)}
            placeholder="Example: M1"
            className="mt-2 h-12 w-full rounded-[14px] border-2 border-[#d9c2a7] bg-[#fffdf9] px-4 text-base font-bold text-[#17120e] outline-none transition placeholder:text-[#a99683] focus:border-[#b88b53]"
          />
        </label>

        <label className="mt-3 block rounded-[20px] bg-white p-4 shadow-[0_12px_30px_rgba(58,38,22,.08)] ring-1 ring-[#24160d]/5">
          <span className="text-[10px] font-bold uppercase tracking-[.11em] text-[#735534]">
            Notes · optional
          </span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={2}
            placeholder="Allergy note or preparation request..."
            className="mt-2 w-full resize-none rounded-[14px] border-2 border-[#d9c2a7] bg-[#fffdf9] p-4 text-sm font-semibold text-[#17120e] outline-none transition placeholder:text-[#a99683] focus:border-[#b88b53]"
          />
        </label>

        <div className="mt-4 flex items-center justify-between rounded-[20px] bg-[#17120e] p-4 text-white">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.12em] text-[#d8b77f]">
              Total
            </p>
            <p className="lx-serif mt-1 text-3xl text-[#fff6e8]">
              ₹{total.toLocaleString("en-IN")}
            </p>
          </div>
          <p className="text-right text-[10px] font-semibold leading-5 text-white/48">
            {quantity} item{quantity > 1 ? "s" : ""}
            <br />
            Table {tableNumber || "—"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => void placeOrder()}
          disabled={loading}
          className="mt-3 h-14 w-full rounded-[18px] bg-[#c9944b] text-[11px] font-black uppercase tracking-[.12em] text-[#100c08] shadow-[0_14px_34px_rgba(201,148,75,.22)] disabled:opacity-50"
        >
          {loading
            ? "Placing order…"
            : "Place order · ₹" + total.toLocaleString("en-IN")}
        </button>

        {message ? (
          <p className="mt-3 rounded-[16px] bg-[#fff0d4] p-3 text-[11px] font-semibold leading-5 text-[#7a4a16]">
            {message}
          </p>
        ) : null}
      </div>
    </section>
  );
}
