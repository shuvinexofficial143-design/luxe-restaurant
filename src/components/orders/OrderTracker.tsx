"use client";

import { useState } from "react";
import type { OrderRecord, OrderStatus } from "@/lib/orders/types";
import { orderStorage } from "@/lib/orders/order-storage";
import OrderStatusTimeline from "./OrderStatusTimeline";

const progression: OrderStatus[] = [
  "RECEIVED",
  "CONFIRMED",
  "PREPARING",
  "READY",
  "COMPLETED",
];

export default function OrderTracker({
  initialId = "",
}: {
  initialId?: string;
}) {
  const [id, setId] = useState(initialId);
  const [order, setOrder] = useState<OrderRecord | null>(() =>
    initialId && typeof window !== "undefined"
      ? orderStorage.get(initialId) || null
      : null
  );
  const [searched, setSearched] = useState(Boolean(initialId));

  function lookup() {
    setSearched(true);
    setOrder(orderStorage.get(id.trim().toUpperCase()) || null);
  }

  function advanceDemo() {
    if (!order || order.status === "CANCELLED") return;
    const current = progression.indexOf(order.status);
    const nextStatus = progression[Math.min(current + 1, progression.length - 1)];
    const updated = orderStorage.updateStatus(order.id, nextStatus);
    if (updated) setOrder(updated);
  }

  return (
    <div>
      <div className="rounded-[24px] bg-[#fffaf4] p-4">
        <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
          Order reference
        </p>
        <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
          <input
            value={id}
            onChange={(event) => setId(event.target.value)}
            placeholder="ORD-ABC1234"
            className="h-11 min-w-0 rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-sm uppercase"
          />
          <button
            type="button"
            onClick={lookup}
            className="rounded-[14px] bg-[#201713] px-4 text-[9px] uppercase tracking-[.12em] text-white"
          >
            Track
          </button>
        </div>
      </div>

      {order ? (
        <div className="mt-4 rounded-[26px] bg-[#fffaf4] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
                {order.id}
              </p>
              <h2 className="lx-serif mt-2 text-3xl">
                {order.fulfillment === "PICKUP"
                  ? `Pickup · ${order.pickupTime}`
                  : `Table · ${order.tableNumber}`}
              </h2>
            </div>
            <p className="lx-serif text-xl text-[#7c241e]">
              ₹{order.total.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="mt-5">
            <OrderStatusTimeline status={order.status} />
          </div>

          {order.status !== "COMPLETED" && order.status !== "CANCELLED" ? (
            <button
              type="button"
              onClick={advanceDemo}
              className="mt-4 h-11 w-full rounded-[15px] border border-[#335f50]/20 text-[9px] uppercase tracking-[.12em] text-[#335f50]"
            >
              Advance demo status →
            </button>
          ) : null}
        </div>
      ) : searched ? (
        <div className="mt-4 rounded-[22px] border border-dashed border-[#7c241e]/20 p-7 text-center">
          <p className="lx-serif text-2xl">Order not found.</p>
        </div>
      ) : null}
    </div>
  );
}
