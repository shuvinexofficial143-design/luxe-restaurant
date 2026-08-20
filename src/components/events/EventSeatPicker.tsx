"use client";

import type { EventRecord } from "@/lib/events/types";
import { maxTicketQuantity } from "@/lib/events/tickets";

export default function EventSeatPicker({
  event,
  value,
  onChange,
}: {
  event: EventRecord;
  value: number;
  onChange: (value: number) => void;
}) {
  const max = maxTicketQuantity(event);

  if (max === 0) {
    return (
      <div className="rounded-[20px] bg-[#7c241e]/10 p-4 text-[#7c241e]">
        <p className="text-[9px] uppercase tracking-[.12em]">Sold out</p>
        <p className="mt-2 text-xs leading-6">
          Direct tickets are unavailable. A production build could offer a waitlist here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
        Tickets
      </p>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {Array.from({ length: max }, (_, index) => index + 1).map((count) => (
          <button
            key={count}
            type="button"
            onClick={() => onChange(count)}
            className={`min-h-12 rounded-[15px] border lx-serif text-xl ${
              value === count
                ? "border-[#7c241e] bg-[#7c241e] text-white"
                : "border-[#4a3025]/10 bg-white"
            }`}
          >
            {count}
          </button>
        ))}
      </div>
    </div>
  );
}
