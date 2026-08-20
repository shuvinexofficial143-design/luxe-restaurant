"use client";

import { occasions } from "@/lib/reservations/data";

export default function OccasionSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-[.14em] text-[#7c241e]">Occasion</p>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {occasions.map((occasion) => (
          <button
            key={occasion}
            type="button"
            onClick={() => onChange(occasion)}
            className={`min-h-10 shrink-0 rounded-full border px-4 text-[9px] uppercase tracking-[.12em] ${
              value === occasion
                ? "border-[#335f50] bg-[#335f50] text-white"
                : "border-[#4a3025]/10 bg-[#fffaf4]"
            }`}
          >
            {occasion}
          </button>
        ))}
      </div>
    </div>
  );
}
