"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  OrderItemRow,
  OrderRow,
} from "@/lib/server/orders/types";
import KitchenOrderCard from "./KitchenOrderCard";

type QueueItem = {
  order: OrderRow;
  items: OrderItemRow[];
};

export default function KitchenQueue() {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [message, setMessage] = useState("Loading kitchen queue…");

  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/v1/kitchen/queue", {
        cache: "no-store",
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        data?: { queue?: QueueItem[] };
        error?: { message?: string };
      };

      if (!response.ok || !payload.ok) {
        setMessage(
          payload.error?.message || "Kitchen queue unavailable."
        );
        return;
      }

      setQueue(payload.data?.queue || []);
      setMessage("");
    } catch {
      setMessage("Kitchen queue unavailable.");
    }
  }, []);

  useEffect(() => {
    const initialLoad = window.setTimeout(() => {
      void load();
    }, 0);

    const timer = window.setInterval(() => {
      void load();
    }, 10000);

    return () => {
      window.clearTimeout(initialLoad);
      window.clearInterval(timer);
    };
  }, [load]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {["RECEIVED", "CONFIRMED", "PREPARING", "READY"].map(
          (status) => (
            <div
              key={status}
              className="rounded-[18px] bg-[#201713] p-4 text-white"
            >
              <p className="lx-serif text-3xl text-[#efc28b]">
                {
                  queue.filter(
                    (item) => item.order.status === status
                  ).length
                }
              </p>
              <p className="mt-1 text-[8px] uppercase tracking-[.09em] text-white/40">
                {status}
              </p>
            </div>
          )
        )}
      </div>

      {message ? (
        <p className="mt-4 rounded-[18px] bg-[#fff4de] p-4 text-xs text-[#75645d]">
          {message}
        </p>
      ) : null}

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {queue.map((item) => (
          <KitchenOrderCard
            key={item.order.id}
            order={item.order}
            items={item.items}
            onChanged={() => void load()}
          />
        ))}
      </div>

      {!message && !queue.length ? (
        <div className="mt-4 rounded-[24px] bg-[#fffaf4] p-8 text-center">
          <p className="lx-serif text-3xl">Kitchen queue is clear.</p>
        </div>
      ) : null}
    </div>
  );
}
