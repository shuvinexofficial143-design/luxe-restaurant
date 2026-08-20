"use client";

import { useCallback, useEffect, useState } from "react";
import type { OrderDetails } from "@/lib/server/orders/types";
import OrderStatusTimelineReal from "./OrderStatusTimelineReal";
import OrderPaymentCard from "./OrderPaymentCard";

export default function RealOrderTracker({
  orderId,
}: {
  orderId: string;
}) {
  const [details, setDetails] = useState<OrderDetails | null>(null);
  const [message, setMessage] = useState("Loading live order…");

  const load = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/v1/order-engine/${encodeURIComponent(orderId)}`,
        { cache: "no-store" }
      );

      const payload = (await response.json()) as {
        ok?: boolean;
        data?: OrderDetails;
        error?: { message?: string };
      };

      if (!response.ok || !payload.ok || !payload.data) {
        setMessage(
          payload.error?.message || "Order could not be loaded."
        );
        return;
      }

      setDetails(payload.data);
      setMessage("");
    } catch {
      setMessage("Order could not be loaded.");
    }
  }, [orderId]);

  useEffect(() => {
    const initialLoad = window.setTimeout(() => {
      void load();
    }, 0);

    const timer = window.setInterval(() => {
      void load();
    }, 15000);

    return () => {
      window.clearTimeout(initialLoad);
      window.clearInterval(timer);
    };
  }, [load]);

  if (!details) {
    return (
      <div className="rounded-[28px] bg-[#fffaf4] p-8 text-center">
        <p className="lx-serif text-3xl">{message}</p>
      </div>
    );
  }

  const { order, items, history } = details;

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
      <div>
        <div className="rounded-[28px] bg-[#201713] p-6 text-white">
          <p className="text-[9px] uppercase tracking-[.14em] text-[#efc28b]">
            Live order
          </p>
          <h1 className="lx-serif mt-2 text-5xl">{order.id}</h1>
          <p className="mt-3 text-sm text-white/50">
            {order.fulfillment === "TABLE"
              ? `Table ${order.table_number || "—"}`
              : `Pickup · ${order.pickup_time || "ASAP"}`}
          </p>
        </div>

        <div className="mt-4 rounded-[24px] bg-[#fffaf4] p-5">
          <p className="lx-kicker">Items</p>
          <div className="mt-3 space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between gap-4 rounded-[14px] bg-white p-3"
              >
                <div>
                  <p className="lx-serif text-xl">
                    {item.quantity}× {item.title}
                  </p>
                  <p className="mt-1 text-[8px] uppercase tracking-[.08em] text-[#8a756b]">
                    {item.station} · {item.item_status}
                  </p>
                </div>
                <p className="text-xs">
                  ₹
                  {(
                    Number(item.unit_price) * item.quantity
                  ).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <OrderStatusTimelineReal
            status={order.status}
            history={history}
          />
        </div>
      </div>

      <div className="space-y-4">
        <OrderPaymentCard
          orderId={order.id}
          total={Number(order.total)}
          paymentStatus={order.payment_status}
        />

        <div className="rounded-[22px] bg-[#335f50] p-5 text-white">
          <p className="text-[8px] uppercase tracking-[.1em] text-[#efc99a]">
            Server total
          </p>
          <p className="lx-serif mt-2 text-4xl">
            ₹{Number(order.total).toLocaleString("en-IN")}
          </p>
          <div className="mt-4 text-[9px] leading-5 text-white/50">
            <p>
              Subtotal ₹
              {Number(order.subtotal).toLocaleString("en-IN")}
            </p>
            <p>
              Service ₹
              {Number(order.service_charge).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
