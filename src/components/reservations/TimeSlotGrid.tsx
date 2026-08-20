"use client";

import { availabilityFor } from "@/lib/reservations/utils";

export default function TimeSlotGrid({
  date,
  guests,
  value,
  onChange,
}: {
  date: string;
  guests: number;
  value: string;
  onChange: (value: string) => void;
}) {
  const slots = availabilityFor(date, guests);

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="lx-kicker">Live-style availability</p>
          <h2 className="lx-serif mt-2 text-4xl">Pick a time.</h2>
        </div>
        <span className="rounded-full bg-[#335f50]/10 px-3 py-2 text-[8px] uppercase tracking-[.12em] text-[#335f50]">
          demo availability
        </span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2">
        {slots.map((slot) => (
          <button
            key={slot.time}
            type="button"
            disabled={!slot.available}
            onClick={() => onChange(slot.time)}
            className={`relative min-h-14 rounded-[18px] border text-sm transition ${
              !slot.available
                ? "cursor-not-allowed border-[#4a3025]/5 bg-black/[.03] text-[#9d918b] line-through"
                : value === slot.time
                  ? "border-[#7c241e] bg-[#7c241e] text-white"
                  : "border-[#4a3025]/10 bg-[#fffaf4]"
            }`}
          >
            {slot.time}
            {slot.limited && slot.available ? (
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#d89a4b]" />
            ) : null}
          </button>
        ))}
      </div>

      <p className="mt-3 text-xs text-[#75645d]">
        Gold dot means limited availability. Unavailable slots can use the waitlist.
      </p>
    </div>
  );
}
