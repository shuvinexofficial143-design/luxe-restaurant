"use client";

import { FormEvent, useMemo, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { cartStore } from "@/lib/orders/cart-storage";
import { orderStorage } from "@/lib/orders/order-storage";
import { cartSubtotal, createOrderId, serviceCharge } from "@/lib/orders/utils";
import type { FulfillmentType, PromoResult } from "@/lib/orders/types";
import FulfillmentSelector from "./FulfillmentSelector";
import PickupTimeSelector from "./PickupTimeSelector";
import TableNumberSelector from "./TableNumberSelector";
import PaymentDemo from "./PaymentDemo";

export default function CheckoutForm({
  promo,
}: {
  promo: PromoResult | null;
}) {
  const router = useRouter();
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );

  const [fulfillment, setFulfillment] = useState<FulfillmentType>("PICKUP");
  const [pickupTime, setPickupTime] = useState("7:00 PM");
  const [tableNumber, setTableNumber] = useState("M1");
  const [paymentMethod, setPaymentMethod] = useState<
    "PAY_AT_RESTAURANT" | "DEMO_CARD"
  >("PAY_AT_RESTAURANT");

  const totals = useMemo(() => {
    const subtotal = cartSubtotal(items);
    const discount = promo?.valid ? promo.discount : 0;
    const afterDiscount = Math.max(0, subtotal - discount);
    const service = serviceCharge(afterDiscount);
    return {
      subtotal,
      discount,
      service,
      total: afterDiscount + service,
    };
  }, [items, promo]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!items.length) return;

    const form = new FormData(event.currentTarget);
    const id = createOrderId();

    orderStorage.save({
      id,
      items,
      subtotal: totals.subtotal,
      discount: totals.discount,
      serviceCharge: totals.service,
      total: totals.total,
      promoCode: promo?.valid ? promo.code : "",
      fulfillment,
      pickupTime: fulfillment === "PICKUP" ? pickupTime : "",
      tableNumber: fulfillment === "TABLE" ? tableNumber : "",
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      notes: String(form.get("notes") || ""),
      paymentMethod,
      status: "RECEIVED",
      createdAt: new Date().toISOString(),
    });

    cartStore.clear();
    router.push(`/order/confirmation/${id}`);
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
        <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
          Guest details
        </p>

        <div className="mt-4 grid gap-3">
          {[
            ["Name", "name", "text"],
            ["Email", "email", "email"],
            ["Phone", "phone", "tel"],
          ].map(([label, name, type]) => (
            <label
              key={name}
              className="grid gap-2 text-[9px] uppercase tracking-[.11em] text-[#7c241e]"
            >
              {label}
              <input
                required
                name={name}
                type={type}
                className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case tracking-normal outline-none"
              />
            </label>
          ))}

          <label className="grid gap-2 text-[9px] uppercase tracking-[.11em] text-[#7c241e]">
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

      <PaymentDemo value={paymentMethod} onChange={setPaymentMethod} />

      <button
        disabled={!items.length}
        className="h-14 w-full rounded-[18px] bg-[#7c241e] text-[10px] uppercase tracking-[.15em] text-white disabled:opacity-35"
      >
        Place demo order ↗
      </button>
    </form>
  );
}
