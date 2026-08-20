"use client";

import { addDaysISO, formatDate } from "@/lib/reservations/utils";

export default function DateSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const dates = Array.from({ length: 14 }, (_, index) => addDaysISO(index));

  return (
    <div>
      <p className="lx-kicker">Choose date</p>
      <h2 className="lx-serif mt-2 text-4xl">When are you coming?</h2>

      <div className="-mx-1 mt-6 flex gap-2 overflow-x-auto px-1 pb-2">
        {dates.map((date) => {
          const d = new Date(`${date}T12:00:00`);
          const active = value === date;
          return (
            <button
              key={date}
              type="button"
              onClick={() => onChange(date)}
              className={`min-w-[84px] rounded-[20px] border px-3 py-4 text-center transition ${
                active
                  ? "border-[#7c241e] bg-[#7c241e] text-white"
                  : "border-[#4a3025]/10 bg-[#fffaf4]"
              }`}
            >
              <span className="block text-[8px] uppercase tracking-[.12em] opacity-65">
                {d.toLocaleDateString("en-IN", { weekday: "short" })}
              </span>
              <span className="lx-serif mt-1 block text-3xl">{d.getDate()}</span>
              <span className="mt-1 block text-[8px] uppercase tracking-[.1em] opacity-65">
                {d.toLocaleDateString("en-IN", { month: "short" })}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-[#75645d]">{formatDate(value)}</p>
    </div>
  );
}
