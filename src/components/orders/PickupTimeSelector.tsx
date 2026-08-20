"use client";

import { pickupSlots } from "@/lib/orders/data";

export default function PickupTimeSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
        Pickup time
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {pickupSlots.map((time) => (
          <button
            key={time}
            type="button"
            onClick={() => onChange(time)}
            className={`min-h-11 rounded-[15px] border text-xs ${
              value === time
                ? "border-[#335f50] bg-[#335f50] text-white"
                : "border-[#4a3025]/10 bg-white"
            }`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}
