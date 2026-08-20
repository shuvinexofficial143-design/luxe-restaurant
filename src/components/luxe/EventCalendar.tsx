"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const events = [
  ["August", "28 AUG", "Grower Champagne Dinner", "Five courses · six wines", "7:30 PM"],
  ["September", "06 SEP", "Late Summer Chef's Table", "Eight seats · kitchen-side", "8:00 PM"],
  ["September", "19 SEP", "Burgundy After Dark", "Cellar-led tasting dinner", "7:00 PM"],
  ["October", "04 OCT", "Sunday Harvest Brunch", "Seasonal brunch · live acoustic set", "11:30 AM"],
  ["October", "23 OCT", "Guest Chef Collaboration", "One-night tasting menu", "7:30 PM"],
];

export default function EventCalendar() {
  const months = ["All", "August", "September", "October"];
  const [active, setActive] = useState("All");

  const visible = useMemo(
    () => events.filter(([month]) => active === "All" || month === active),
    [active]
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-3">
        {months.map((month) => (
          <button
            key={month}
            type="button"
            onClick={() => setActive(month)}
            className={`lx-button lx-button--dark min-h-10 px-4 ${
              active === month ? "border-[#6b231d] bg-[#6b231d] text-white" : ""
            }`}
          >
            {month}
          </button>
        ))}
      </div>

      <div className="divide-y divide-[#5b3429]/16 border-y border-[#5b3429]/16">
        {visible.map(([, date, title, detail, time], index) => (
          <article
            key={`${date}-${title}`}
            className="group grid gap-4 py-7 md:grid-cols-[80px_150px_1fr_150px_auto] md:items-center"
          >
            <span className="text-[9px] uppercase tracking-[.24em] text-[#8d3a25]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="lx-serif text-2xl text-[#6b231d]">{date}</span>
            <div>
              <p className="lx-serif text-3xl">{title}</p>
              <p className="mt-2 text-sm text-[#6b5a52]">{detail}</p>
            </div>
            <span className="text-xs uppercase tracking-[.18em] text-[#7d675e]">{time}</span>
            <Link href="/reservations" className="text-[10px] uppercase tracking-[.2em] text-[#7a2d21]">
              Reserve ↗
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
