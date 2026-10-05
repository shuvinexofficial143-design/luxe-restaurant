"use client";

import { FormEvent, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { cartStore } from "@/lib/orders/cart-storage";
import type { FulfillmentType } from "@/lib/orders/types";
import FulfillmentSelector from "./FulfillmentSelector";
import PickupTimeSelector from "./PickupTimeSelector";
import TableNumberSelector from "./TableNumberSelector";

type ApiPayload = {
  ok?: boolean;
  data?: {
    order?: {
      orderId?: string;
    };
  };
  error?: {
    message?: string;
  };
};

export default function CheckoutForm() {
  const router = useRouter();
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );

  const [fulfillment, setFulfillment] = useState<FulfillmentType>("PICKUP");
  const [pickupTime, setPickupTime] = useState("7:00 PM");
  const [tableNumber, setTableNumber] = useState("M1");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!items.length || loading) return;

    const form = new FormData(event.currentTarget);
    const guestName = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const notes = String(form.get("notes") || "").trim();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/v1/order-engine/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fulfillment,
          guestName,
          phone,
          pickupTime: fulfillment === "PICKUP" ? pickupTime : "",
          tableNumber: fulfillment === "TABLE" ? tableNumber : "",
          notes,
          items: items.map((item) => ({
            slug: item.slug,
            quantity: item.quantity,
          })),
        }),
      });

      const payload = (await response.json()) as ApiPayload;
      const orderId = payload.data?.order?.orderId;

      if (!response.ok || !payload.ok || !orderId) {
        setMessage(
          payload.error?.message ||
            "Your order could not be placed. Please try again."
        );
        return;
      }

      cartStore.clear();
      router.push("/order/track/" + encodeURIComponent(orderId));
    } catch {
      setMessage("Your order could not be placed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <p className="lx-kicker">Fulfillment</p>
        <h2 className="lx-serif mt-2 text-3xl">How should we serve it?</h2>
        <div className="mt-4">
          <FulfillmentSelector value={fulfillment} onChange={setFulfillment} />
        </div>
      </div>

      <div className="rounded-[24px] bg-[#fffaf4] p-5">
        {fulfillment === "PICKUP" ? (
          <PickupTimeSelector value={pickupTime} onChange={setPickupTime} />
        ) : (
          <TableNumberSelector value={tableNumber} onChange={setTableNumber} />
        )}
      </div>

      <div className="rounded-[24px] bg-[#fffaf4] p-5">
        <p className="text-[10px] uppercase tracking-[.12em] text-[#7c241e]">
          Guest details
        </p>

        <div className="mt-4 grid gap-3">
          <label className="grid gap-2 text-[10px] uppercase tracking-[.11em] text-[#7c241e]">
            Name
            <input
              required
              name="name"
              type="text"
              className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case tracking-normal outline-none"
            />
          </label>

          <label className="grid gap-2 text-[10px] uppercase tracking-[.11em] text-[#7c241e]">
            Phone
            <input
              required
              name="phone"
              type="tel"
              className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case tracking-normal outline-none"
            />
          </label>

          <label className="grid gap-2 text-[10px] uppercase tracking-[.11em] text-[#7c241e]">
            Notes
            <textarea
              name="notes"
              rows={3}
              placeholder="Allergies or requests..."
              className="rounded-[16px] border border-[#4a3025]/10 bg-white p-4 text-sm normal-case tracking-normal outline-none"
            />
          </label>
        </div>
      </div>

      <div className="rounded-[20px] border border-[#4a3025]/10 bg-[#fff4de] p-4">
        <p className="text-[10px] uppercase tracking-[.12em] text-[#8a5a21]">
          Payment
        </p>
        <p className="mt-2 text-sm leading-6 text-[#75645d]">
          Place the order first. Available payment options are shown securely on the order tracking screen.
        </p>
      </div>

      <button
        disabled={!items.length || loading}
        className="h-14 w-full rounded-[18px] bg-[#7c241e] text-[10px] uppercase tracking-[.15em] text-white disabled:opacity-35"
      >
        {loading ? "Placing order…" : "Place order ↗"}
      </button>

      {message ? (
        <p className="rounded-[16px] bg-[#fff4de] p-4 text-sm leading-6 text-[#7a4a16]">
          {message}
        </p>
      ) : null}
    </form>
  );
}
