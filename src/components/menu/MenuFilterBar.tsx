"use client";

import type { MenuFilters } from "@/lib/menu/types";

export default function MenuFilterBar({
  filters,
  onChange,
}: {
  filters: MenuFilters;
  onChange: (next: MenuFilters) => void;
}) {
  const chips = [
    ["vegetarian", "Vegetarian"],
    ["vegan", "Vegan"],
    ["glutenFree", "Gluten Free"],
    ["chefChoice", "Chef Choice"],
  ] as const;

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {chips.map(([key, label]) => {
        const active = filters[key];
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange({ ...filters, [key]: !active })}
            className={`min-h-10 shrink-0 rounded-full border px-4 text-[9px] uppercase tracking-[.14em] transition ${
              active
                ? "border-[#7c241e] bg-[#7c241e] text-white"
                : "border-[#4a3025]/10 bg-[#fffaf4] text-[#66534b]"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
