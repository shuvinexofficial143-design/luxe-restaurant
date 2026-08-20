"use client";

import { tableOptions } from "@/lib/qr/data";

export default function TableQRSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
        Select table
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {tableOptions.map((table) => (
          <button
            key={table.id}
            type="button"
            onClick={() => onChange(table.id)}
            className={`rounded-[18px] border p-4 text-left ${
              value === table.id
                ? "border-[#7c241e] bg-[#7c241e] text-white"
                : "border-[#4a3025]/10 bg-white"
            }`}
          >
            <p className="lx-serif text-xl">{table.label}</p>
            <p className="mt-1 text-[9px] opacity-60">
              {table.area} · {table.seats} seats
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
