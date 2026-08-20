"use client";

import type { WineFilters, WineType } from "@/lib/wine/types";

const types: ("All" | WineType)[] = [
  "All",
  "Red",
  "White",
  "Rosé",
  "Sparkling",
  "Dessert",
];

export default function WineTypeTabs({
  value,
  onChange,
}: {
  value: WineFilters["type"];
  onChange: (value: WineFilters["type"]) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {types.map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => onChange(type)}
          className={`min-h-10 shrink-0 rounded-full px-4 text-[9px] uppercase tracking-[.12em] ${
            value === type
              ? "bg-[#201713] text-white"
              : "border border-[#4a3025]/10 bg-white/60"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
