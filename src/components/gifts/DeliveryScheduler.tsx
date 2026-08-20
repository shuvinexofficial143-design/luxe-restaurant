"use client";

import type { GiftDeliveryMethod } from "@/lib/gifts/types";
import { todayIso } from "@/lib/gifts/utils";

export default function DeliveryScheduler({
  method,
  date,
  onMethod,
  onDate,
}: {
  method: GiftDeliveryMethod;
  date: string;
  onMethod: (value: GiftDeliveryMethod) => void;
  onDate: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
        Delivery
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {[
          ["EMAIL", "Email delivery"],
          ["PRINT", "Print at home"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => onMethod(value as GiftDeliveryMethod)}
            className={`rounded-[16px] border p-4 text-left ${
              method === value
                ? "border-[#7c241e] bg-[#7c241e] text-white"
                : "border-[#4a3025]/10 bg-white"
            }`}
          >
            <p className="text-sm">{label}</p>
            <p className="mt-1 text-[9px] opacity-60">
              {value === "EMAIL" ? "Schedule a demo send date" : "Create a printable-style card"}
            </p>
          </button>
        ))}
      </div>

      {method === "EMAIL" ? (
        <label className="mt-3 grid gap-2 text-[9px] uppercase tracking-[.11em] text-[#7c241e]">
          Delivery date
          <input
            required
            type="date"
            min={todayIso()}
            value={date}
            onChange={(event) => onDate(event.target.value)}
            className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case"
          />
        </label>
      ) : null}
    </div>
  );
}
