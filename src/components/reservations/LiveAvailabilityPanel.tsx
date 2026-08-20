"use client";

import { useState } from "react";
import type {
  AvailabilitySlot,
  AvailabilityTable,
} from "@/lib/server/reservations/types";
import LiveSlotGrid from "./LiveSlotGrid";
import RealTablePicker from "./RealTablePicker";

export default function LiveAvailabilityPanel({
  slots,
  selectedTime,
  selectedTable,
  onTime,
  onTable,
}: {
  slots: AvailabilitySlot[];
  selectedTime: string;
  selectedTable: string;
  onTime: (time: string) => void;
  onTable: (tableId: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const active = slots.find((slot) => slot.time === selectedTime);
  const availableTables: AvailabilityTable[] =
    active?.tables.filter((table) => table.available) || [];

  return (
    <div className="rounded-[26px] bg-[#fffaf4] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="lx-kicker">Live database availability</p>
          <h2 className="lx-serif mt-2 text-3xl">Choose your moment.</h2>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="rounded-full border border-[#4a3025]/10 bg-white px-3 py-2 text-[8px] uppercase tracking-[.09em]"
        >
          {expanded ? "Compact" : "Tables"}
        </button>
      </div>

      <div className="mt-4">
        <LiveSlotGrid
          slots={slots}
          value={selectedTime}
          onChange={(time) => {
            onTime(time);
            onTable("");
          }}
        />
      </div>

      {expanded && selectedTime ? (
        <div className="mt-5">
          <RealTablePicker
            tables={availableTables}
            value={selectedTable}
            onChange={onTable}
          />
        </div>
      ) : null}
    </div>
  );
}
