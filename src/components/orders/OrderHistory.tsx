"use client";

import Link from "next/link";
import { useState } from "react";
import type { OrderRecord } from "@/lib/orders/types";
import { orderStorage } from "@/lib/orders/order-storage";

export default function OrderHistory() {
  const [orders] = useState<OrderRecord[]>(() =>
    typeof window !== "undefined" ? orderStorage.list() : []
  );

  if (!orders.length) {
    return (
      <div className="rounded-[26px] border border-dashed border-[#4a3025]/15 p-8 text-center">
        <p className="lx-serif text-3xl">No orders yet.</p>
        <Link
          href="/order"
          className="mt-5 inline-flex rounded-full bg-[#7c241e] px-5 py-3 text-[9px] uppercase tracking-[.12em] text-white"
        >
          Start ordering
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <Link
          key={order.id}
          href={`/order/track?id=${encodeURIComponent(order.id)}`}
          className="block rounded-[22px] bg-[#fffaf4] p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
                {order.id}
              </p>
              <p className="lx-serif mt-2 text-2xl">
                {order.fulfillment === "PICKUP"
                  ? `Pickup · ${order.pickupTime}`
                  : `Table ${order.tableNumber}`}
              </p>
              <p className="mt-2 text-[10px] text-[#75645d]">
                {new Date(order.createdAt).toLocaleString("en-IN")} · {order.status}
              </p>
            </div>
            <p className="lx-serif text-xl text-[#7c241e]">
              ₹{order.total.toLocaleString("en-IN")}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
