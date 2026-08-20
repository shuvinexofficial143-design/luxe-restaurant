"use client";

import type { MenuCategory } from "@/lib/menu/types";

export default function MenuCategoryTabs({
  value,
  categories,
  onChange,
}: {
  value: "All" | MenuCategory;
  categories: MenuCategory[];
  onChange: (value: "All" | MenuCategory) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {(["All", ...categories] as const).map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={`min-h-11 shrink-0 rounded-full px-4 text-[9px] uppercase tracking-[.15em] transition ${
            value === category
              ? "bg-[#201713] text-white"
              : "border border-[#4a3025]/10 bg-white/60 text-[#66534b]"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
