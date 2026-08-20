"use client";

import { diningAreas } from "@/lib/reservations/data";
import type { DiningArea } from "@/lib/reservations/types";

export default function DiningAreaSelector({
  value,
  onChange,
}: {
  value: DiningArea;
  onChange: (value: DiningArea) => void;
}) {
  return (
    <div>
      <p className="lx-kicker">Dining area</p>
      <h2 className="lx-serif mt-2 text-4xl">Choose your vibe.</h2>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {diningAreas.map((area) => (
          <button
            key={area.name}
            type="button"
            onClick={() => onChange(area.name)}
            className={`rounded-[22px] border p-4 text-left transition ${
              value === area.name
                ? "border-[#7c241e] bg-[#7c241e] text-white"
                : "border-[#4a3025]/10 bg-[#fffaf4]"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="lx-serif text-2xl">{area.name}</p>
              <span className="rounded-full bg-black/5 px-2.5 py-1 text-[8px] uppercase tracking-[.1em]">
                {area.tag}
              </span>
            </div>
            <p className="mt-2 text-xs leading-6 opacity-65">{area.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
