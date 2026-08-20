"use client";

export default function PriceRangeFilter({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block rounded-[18px] border border-[#4a3025]/10 bg-[#fffaf4] px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <span className="text-[9px] uppercase tracking-[.14em] text-[#7c241e]">Max price</span>
        <span className="lx-serif text-lg">₹{value.toLocaleString("en-IN")}</span>
      </div>
      <input
        type="range"
        min="800"
        max="3000"
        step="50"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 w-full accent-[#7c241e]"
      />
    </label>
  );
}
