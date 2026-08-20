"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ServerCartSummary from "./ServerCartSummary";
import FulfillmentPanel from "./FulfillmentPanel";

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
  const [mode, setMode] = useState<"TABLE" | "PICKUP">(
    initialTable ? "TABLE" : "PICKUP"
  );
  const [tableNumber, setTableNumber] = useState(initialTable);
  const [pickupTime, setPickupTime] = useState("ASAP · 25–35 min");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!lines.length) {
      setMessage("Add at least one dish.");
      return;
    }

    setLoading(true);
    setMessage("");

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/v1/order-engine/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: String(form.get("guestName") || ""),
          phone: String(form.get("phone") || ""),
          fulfillment: mode,
          tableNumber: mode === "TABLE" ? tableNumber : "",
          pickupTime: mode === "PICKUP" ? pickupTime : "",
          notes: String(form.get("notes") || ""),
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
          payload.error?.message || "Order could not be created."
        );
        return;
      }

      router.push(
        `/order/live/track/${encodeURIComponent(orderId)}`
      );
    } catch {
      setMessage("Order request failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <aside className="xl:sticky xl:top-[100px] xl:self-start">
      <form
        onSubmit={submit}
        className="rounded-[28px] bg-[#fffaf4] p-4"
      >
        <p className="lx-kicker">Database checkout</p>
        <h2 className="lx-serif mt-2 text-3xl">Your order.</h2>

        <div className="mt-4">
          <ServerCartSummary
            lines={lines}
            onQuantity={onQuantity}
          />
        </div>

        <div className="mt-3">
          <FulfillmentPanel
            mode={mode}
            onMode={setMode}
            tableNumber={tableNumber}
            onTableNumber={setTableNumber}
            pickupTime={pickupTime}
            onPickupTime={setPickupTime}
          />
        </div>

        <input
          required
          name="guestName"
          placeholder="Guest name"
          className="mt-3 h-11 w-full rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-sm"
        />
        <input
          required
          name="phone"
          placeholder="Phone"
          className="mt-2 h-11 w-full rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-sm"
        />
        <textarea
          name="notes"
          rows={2}
          placeholder="Allergies / order notes"
          className="mt-2 w-full rounded-[14px] border border-[#4a3025]/10 bg-white p-3 text-sm"
        />

        <button
          disabled={loading || !lines.length}
          className="mt-3 h-12 w-full rounded-[16px] bg-[#7c241e] text-[9px] uppercase tracking-[.12em] text-white disabled:opacity-40"
        >
          {loading ? "Creating order…" : "Create real order"}
        </button>

        {message ? (
          <p className="mt-3 text-[10px] leading-5 text-[#7c241e]">
            {message}
          </p>
        ) : null}
      </form>
    </aside>
  );
}
