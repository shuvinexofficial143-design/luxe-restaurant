"use client";

import { giftAmounts } from "@/lib/gifts/data";

export default function AmountSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
        Gift amount
      </p>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {giftAmounts.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => onChange(amount)}
            className={`min-h-12 rounded-[15px] border lx-serif text-lg ${
              value === amount
                ? "border-[#7c241e] bg-[#7c241e] text-white"
                : "border-[#4a3025]/10 bg-white"
            }`}
          >
            ₹{amount.toLocaleString("en-IN")}
          </button>
        ))}
      </div>

      <label className="mt-3 grid gap-2 text-[9px] uppercase tracking-[.11em] text-[#7c241e]">
        Custom amount
        <input
          type="number"
          min="1000"
          max="100000"
          step="500"
          value={value}
          onChange={(event) => onChange(Math.max(1000, Number(event.target.value) || 1000))}
          className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case tracking-normal"
        />
      </label>
    </div>
  );
}
