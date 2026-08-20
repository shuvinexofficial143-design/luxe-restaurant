"use client";

import { useState } from "react";
import type {
  OrderItemRow,
  OrderRow,
} from "@/lib/server/orders/types";
import { nextOrderStatus } from "@/lib/server/orders/status";
import { adminFetch } from "@/lib/client/admin-fetch";

export default function KitchenOrderCard({
  order,
  items,
  onChanged,
}: {
  order: OrderRow;
  items: OrderItemRow[];
  onChanged: () => void;
}) {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const next = nextOrderStatus(order.status);

  async function advance() {
    if (!next || busy) return;

    setBusy(true);
    setMessage("");

    try {
      const response = await adminFetch(
        `/api/v1/order-engine/${encodeURIComponent(
          order.id
        )}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: next,
            note: `Kitchen moved order to ${next}`,
          }),
        }
      );

      const payload = (await response.json()) as {
        ok?: boolean;
        error?: { message?: string };
      };

      setMessage(
        response.ok && payload.ok
          ? `Moved to ${next}.`
          : payload.error?.message || "Status update failed."
      );

      if (response.ok && payload.ok) onChanged();
    } catch {
      setMessage("Secure status update failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="rounded-[24px] bg-[#fffaf4] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
            {order.fulfillment}
          </p>
          <h3 className="lx-serif mt-1 text-2xl">{order.id}</h3>
          <p className="mt-1 text-[9px] text-[#75645d]">
            {order.fulfillment === "TABLE"
              ? `Table ${order.table_number || "—"}`
              : order.pickup_time || "ASAP"}
          </p>
        </div>

        <span className="rounded-full bg-[#335f50]/10 px-3 py-2 text-[8px] uppercase tracking-[.09em] text-[#335f50]">
          {order.status}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <div key={item.id} className="rounded-[14px] bg-white p-3">
            <div className="flex justify-between gap-3">
              <p className="text-sm">
                {item.quantity}× {item.title}
              </p>
              <span className="text-[8px] uppercase tracking-[.08em] text-[#7c241e]">
                {item.station}
              </span>
            </div>
          </div>
        ))}
      </div>

      {next ? (
        <button
          type="button"
          disabled={busy}
          onClick={() => void advance()}
          className="mt-4 h-11 w-full rounded-[14px] bg-[#201713] text-[8px] uppercase tracking-[.11em] text-white disabled:opacity-40"
        >
          {busy ? "Updating…" : `Move to ${next}`}
        </button>
      ) : null}

      {message ? (
        <p className="mt-3 text-[9px] text-[#75645d]">
          {message}
        </p>
      ) : null}
    </article>
  );
}
