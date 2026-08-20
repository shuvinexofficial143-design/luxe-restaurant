"use client";

import type { ReviewCategory } from "@/lib/reviews/types";

const categories: ("All" | ReviewCategory)[] = [
  "All",
  "Dining",
  "Service",
  "Wine",
  "Events",
  "Private Dining",
];

export default function ReviewFilters({
  category,
  rating,
  onCategory,
  onRating,
}: {
  category: "All" | ReviewCategory;
  rating: number;
  onCategory: (value: "All" | ReviewCategory) => void;
  onRating: (value: number) => void;
}) {
  return (
    <div className="rounded-[22px] border border-[#4a3025]/10 bg-[#f7f1e8]/95 p-3 backdrop-blur">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onCategory(item)}
            className={`shrink-0 rounded-full px-4 py-3 text-[8px] uppercase tracking-[.11em] ${
              category === item ? "bg-[#201713] text-white" : "bg-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-2 flex gap-2 overflow-x-auto">
        {[0, 5, 4, 3].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onRating(item)}
            className={`shrink-0 rounded-full px-4 py-2 text-[8px] uppercase tracking-[.1em] ${
              rating === item ? "bg-[#7c241e] text-white" : "bg-white"
            }`}
          >
            {item === 0 ? "All ratings" : `${item}★`}
          </button>
        ))}
      </div>
    </div>
  );
}
