"use client";

import type { MediaCategory } from "@/lib/media/types";

const categories: ("All" | MediaCategory)[] = [
  "All",
  "Food",
  "Dining Room",
  "Kitchen",
  "People",
  "Wine",
  "Events",
];

export default function GalleryCategoryTabs({
  value,
  onChange,
}: {
  value: "All" | MediaCategory;
  onChange: (value: "All" | MediaCategory) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={`min-h-10 shrink-0 rounded-full px-4 text-[9px] uppercase tracking-[.12em] ${
            value === category
              ? "bg-[#201713] text-white"
              : "border border-[#4a3025]/10 bg-white/70"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
