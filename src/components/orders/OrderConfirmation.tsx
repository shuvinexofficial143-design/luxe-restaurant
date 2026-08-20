"use client";

import Link from "next/link";
import { useState } from "react";
import { orderStorage } from "@/lib/orders/order-storage";
import OrderStatusTimeline from "./OrderStatusTimeline";

export default function OrderConfirmation({ id }: { id: string }) {
  const [order] = useState(() =>
    typeof window !== "undefined" ? orderStorage.get(id) : undefined
  );

  if (!order) {
    return (
      <div className="rounded-[28px] bg-[#fffaf4] p-8 text-center">
        <h1 className="lx-serif text-4xl">Order not found.</h1>
        <p className="mt-3 text-sm text-[#75645d]">
          Demo orders are stored locally on this browser.
        </p>
        <Link
          href="/order"
          className="mt-5 inline-flex rounded-full bg-[#7c241e] px-5 py-3 text-[9px] uppercase tracking-[.12em] text-white"
        >
          Start order
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[30px] bg-[#fffaf4]">
      <div className="bg-[#335f50] p-6 text-white md:p-8">
        <p className="text-[9px] uppercase tracking-[.14em] text-[#efc99a]">
          Order received
        </p>
        <h1 className="lx-serif mt-2 text-5xl">Kitchen notified.</h1>
        <p className="mt-3 text-sm text-white/58">
          Demo reference · {order.id}
        </p>
      </div>

      <div className="p-5 md:p-8">
        <div className="grid grid-cols-2 gap-2">
          {[
            [order.fulfillment, "fulfillment"],
            [order.fulfillment === "PICKUP" ? order.pickupTime : order.tableNumber, "slot/table"],
            [`${order.items.reduce((sum, item) => sum + item.quantity, 0)}`, "items"],
            [`₹${order.total.toLocaleString("en-IN")}`, "total"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-[16px] bg-[#f3e7dc] p-3">
              <p className="text-sm">{value}</p>
              <p className="mt-1 text-[8px] uppercase tracking-[.1em] text-[#75645d]">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <OrderStatusTimeline status={order.status} />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <Link
            href={`/order/track?id=${encodeURIComponent(order.id)}`}
            className="flex min-h-12 items-center justify-center rounded-[16px] bg-[#7c241e] text-[9px] uppercase tracking-[.12em] text-white"
          >
            Track order
          </Link>
          <Link
            href="/order"
            className="flex min-h-12 items-center justify-center rounded-[16px] border border-[#4a3025]/10 text-[9px] uppercase tracking-[.12em]"
          >
            Order more
          </Link>
        </div>
      </div>
    </div>
  );
}
