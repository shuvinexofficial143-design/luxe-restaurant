"use client";

import { tables } from "@/lib/reservations/data";
import type { DiningArea } from "@/lib/reservations/types";
import TableCard from "./TableCard";

export default function TableMap({
  area,
  guests,
  value,
  onChange,
}: {
  area: DiningArea;
  guests: number;
  value: string;
  onChange: (value: string) => void;
}) {
  const available = tables.filter((table) => table.area === area && table.seats >= guests);

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="lx-kicker">Table map</p>
          <h2 className="lx-serif mt-2 text-4xl">Pick your table.</h2>
        </div>
        <span className="text-[9px] uppercase tracking-[.12em] text-[#75645d]">{area}</span>
      </div>

      <div className="mt-6 rounded-[26px] border border-[#4a3025]/10 bg-[#eee4da] p-4">
        <div className="mb-4 rounded-[16px] bg-[#201713] py-3 text-center text-[8px] uppercase tracking-[.2em] text-white/70">
          Kitchen / Service
        </div>

        {available.length ? (
          <div className="grid grid-cols-2 gap-2">
            {available.map((table) => (
              <TableCard
                key={table.id}
                table={table}
                active={value === table.id}
                onSelect={() => onChange(table.id)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[18px] bg-[#fffaf4] p-6 text-center">
            <p className="lx-serif text-2xl">No direct table fits {guests} guests.</p>
            <p className="mt-2 text-xs leading-6 text-[#75645d]">
              Choose another dining area or join the waitlist for a custom arrangement.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
