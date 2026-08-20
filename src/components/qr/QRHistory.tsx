"use client";

import { useState } from "react";
import type { QRHistoryItem } from "@/lib/qr/types";
import { qrHistoryStorage } from "@/lib/qr/storage";

export default function QRHistory() {
  const [items, setItems] = useState<QRHistoryItem[]>(() =>
    typeof window !== "undefined" ? qrHistoryStorage.list() : []
  );

  function clear() {
    qrHistoryStorage.clear();
    setItems([]);
  }

  if (!items.length) {
    return (
      <div className="rounded-[28px] bg-[#fffaf4] p-10 text-center">
        <p className="text-4xl">▦</p>
        <p className="lx-serif mt-3 text-3xl">No saved QR links.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={clear}
          className="rounded-full border border-[#4a3025]/10 bg-white px-4 py-3 text-[8px] uppercase tracking-[.11em] text-[#7c241e]"
        >
          Clear history
        </button>
      </div>

      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <article key={item.id} className="rounded-[20px] bg-[#fffaf4] p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[8px] uppercase tracking-[.11em] text-[#7c241e]">
                  {item.type}
                </p>
                <p className="lx-serif mt-1 text-2xl">{item.title}</p>
              </div>
              <a
                href={item.url}
                className="text-[9px] uppercase tracking-[.1em] text-[#335f50]"
              >
                Open ↗
              </a>
            </div>
            <p className="mt-3 break-all text-[9px] leading-5 text-[#8a756b]">
              {item.url}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
