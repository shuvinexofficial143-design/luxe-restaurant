"use client";

import { tableNumbers } from "@/lib/orders/data";

export default function TableNumberSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
        Restaurant table
      </p>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {tableNumbers.map((table) => (
          <button
            key={table}
            type="button"
            onClick={() => onChange(table)}
            className={`min-h-12 rounded-[15px] border lx-serif text-lg ${
              value === table
                ? "border-[#335f50] bg-[#335f50] text-white"
                : "border-[#4a3025]/10 bg-white"
            }`}
          >
            {table}
          </button>
        ))}
      </div>
    </div>
  );
}
