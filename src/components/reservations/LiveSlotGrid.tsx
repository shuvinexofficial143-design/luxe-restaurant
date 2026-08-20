"use client";

import type { AvailabilitySlot } from "@/lib/server/reservations/types";

export default function LiveSlotGrid({
  slots,
  value,
  onChange,
}: {
  slots: AvailabilitySlot[];
  value: string;
  onChange: (time: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {slots.map((slot) => {
        const available = slot.availableTables > 0;

        return (
          <button
            key={slot.time}
            type="button"
            disabled={!available}
            onClick={() => onChange(slot.time)}
            className={`rounded-[16px] border p-3 text-left ${
              value === slot.time
                ? "border-[#335f50] bg-[#335f50] text-white"
                : available
                  ? "border-[#4a3025]/10 bg-white"
                  : "border-transparent bg-[#eadfd4] text-[#9a8b82]"
            }`}
          >
            <p className="lx-serif text-xl">{slot.time}</p>
            <p className="mt-1 text-[8px] uppercase tracking-[.08em] opacity-60">
              {available
                ? `${slot.availableTables} tables`
                : "Full"}
            </p>
          </button>
        );
      })}
    </div>
  );
}
