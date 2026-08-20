"use client";

import { useMemo, useState } from "react";
import type { EventCategory, EventRecord } from "@/lib/events/types";
import EventGrid from "./EventGrid";

const categories: ("All" | EventCategory)[] = [
  "All",
  "Chef Collaboration",
  "Wine Dinner",
  "Seasonal",
  "Brunch",
  "Workshop",
];

export default function EventFilters({ events }: { events: EventRecord[] }) {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    return events.filter((event) => {
      if (category !== "All" && event.category !== category) return false;
      if (!q) return true;

      return [
        event.title,
        event.subtitle,
        event.description,
        event.category,
        ...event.highlights,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [category, events, query]);

  return (
    <div>
      <div className="sticky top-[80px] z-30 rounded-[22px] border border-[#4a3025]/10 bg-[#f7f1e8]/95 p-3 backdrop-blur-xl md:top-[92px]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search dinners, wine, brunch..."
          className="h-11 w-full rounded-[15px] border border-[#4a3025]/10 bg-white px-4 text-sm outline-none"
        />

        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`min-h-9 shrink-0 rounded-full px-3 text-[8px] uppercase tracking-[.11em] ${
                category === item
                  ? "bg-[#201713] text-white"
                  : "border border-[#4a3025]/10 bg-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        {visible.length ? (
          <EventGrid events={visible} />
        ) : (
          <div className="rounded-[26px] border border-dashed border-[#7c241e]/20 bg-[#fffaf4] p-10 text-center">
            <p className="lx-serif text-3xl">No matching events.</p>
          </div>
        )}
      </div>
    </div>
  );
}
