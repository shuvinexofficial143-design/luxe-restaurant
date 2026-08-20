"use client";

import type { AvailabilityTable } from "@/lib/server/reservations/types";

export default function RealTablePicker({
  tables,
  value,
  onChange,
}: {
  tables: AvailabilityTable[];
  value: string;
  onChange: (tableId: string) => void;
}) {
  return (
    <div>
      <p className="text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
        Preferred table
      </p>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
        <button
          type="button"
          onClick={() => onChange("")}
          className={`rounded-[15px] border p-3 text-left ${
            value === ""
              ? "border-[#7c241e] bg-[#7c241e] text-white"
              : "border-[#4a3025]/10 bg-white"
          }`}
        >
          <p className="lx-serif text-xl">Best available</p>
          <p className="mt-1 text-[8px] opacity-60">Auto assign</p>
        </button>

        {tables.map((table) => (
          <button
            key={table.table_id}
            type="button"
            onClick={() => onChange(table.table_id)}
            className={`rounded-[15px] border p-3 text-left ${
              value === table.table_id
                ? "border-[#7c241e] bg-[#7c241e] text-white"
                : "border-[#4a3025]/10 bg-white"
            }`}
          >
            <p className="lx-serif text-xl">{table.table_label}</p>
            <p className="mt-1 text-[8px] opacity-60">
              {table.area} · up to {table.max_guests}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
