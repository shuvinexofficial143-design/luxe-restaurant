"use client";

import { giftOccasions } from "@/lib/gifts/data";

export default function OccasionChips({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
        Occasion
      </p>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {giftOccasions.map((occasion) => (
          <button
            key={occasion}
            type="button"
            onClick={() => onChange(occasion)}
            className={`shrink-0 rounded-full border px-4 py-3 text-[8px] uppercase tracking-[.11em] ${
              value === occasion
                ? "border-[#335f50] bg-[#335f50] text-white"
                : "border-[#4a3025]/10 bg-white"
            }`}
          >
            {occasion}
          </button>
        ))}
      </div>
    </div>
  );
}
