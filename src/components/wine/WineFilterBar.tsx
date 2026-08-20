"use client";

import { wineRegions } from "@/lib/wine/data";
import type { WineFilters } from "@/lib/wine/types";

export default function WineFilterBar({
  filters,
  onChange,
}: {
  filters: WineFilters;
  onChange: (next: WineFilters) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      <select
        value={filters.region}
        onChange={(event) => onChange({ ...filters, region: event.target.value })}
        className="h-11 rounded-[15px] border border-[#4a3025]/10 bg-[#fffaf4] px-3 text-xs"
        aria-label="Filter by region"
      >
        <option>All</option>
        {wineRegions.map((region) => (
          <option key={region}>{region}</option>
        ))}
      </select>

      <select
        value={filters.body}
        onChange={(event) =>
          onChange({
            ...filters,
            body: event.target.value as WineFilters["body"],
          })
        }
        className="h-11 rounded-[15px] border border-[#4a3025]/10 bg-[#fffaf4] px-3 text-xs"
        aria-label="Filter by body"
      >
        <option>All</option>
        <option>Light</option>
        <option>Medium</option>
        <option>Full</option>
      </select>

      <button
        type="button"
        onClick={() =>
          onChange({
            ...filters,
            sommelierChoice: !filters.sommelierChoice,
          })
        }
        className={`min-h-11 rounded-[15px] border px-3 text-[9px] uppercase tracking-[.12em] ${
          filters.sommelierChoice
            ? "border-[#7c241e] bg-[#7c241e] text-white"
            : "border-[#4a3025]/10 bg-[#fffaf4]"
        }`}
      >
        Sommelier Choice
      </button>
    </div>
  );
}
