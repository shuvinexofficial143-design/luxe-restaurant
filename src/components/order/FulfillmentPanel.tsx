"use client";

import { pickupWindows } from "@/lib/server/orders/config";

export default function FulfillmentPanel({
  mode,
  onMode,
  tableNumber,
  onTableNumber,
  pickupTime,
  onPickupTime,
}: {
  mode: "TABLE" | "PICKUP";
  onMode: (mode: "TABLE" | "PICKUP") => void;
  tableNumber: string;
  onTableNumber: (value: string) => void;
  pickupTime: string;
  onPickupTime: (value: string) => void;
}) {
  return (
    <div className="rounded-[22px] bg-white p-4">
      <p className="text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
        Fulfillment
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {(["TABLE", "PICKUP"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onMode(item)}
            className={`h-11 rounded-[14px] text-[8px] uppercase tracking-[.1em] ${
              mode === item
                ? "bg-[#335f50] text-white"
                : "bg-[#f3e7dc]"
            }`}
          >
            {item === "TABLE" ? "At table" : "Pickup"}
          </button>
        ))}
      </div>

      {mode === "TABLE" ? (
        <input
          required
          value={tableNumber}
          onChange={(event) => onTableNumber(event.target.value)}
          placeholder="Table ID / number"
          className="mt-3 h-11 w-full rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-sm"
        />
      ) : (
        <select
          value={pickupTime}
          onChange={(event) => onPickupTime(event.target.value)}
          className="mt-3 h-11 w-full rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-sm"
        >
          {pickupWindows.map((time) => (
            <option key={time}>{time}</option>
          ))}
        </select>
      )}
    </div>
  );
}
