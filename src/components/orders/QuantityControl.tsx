"use client";

export default function QuantityControl({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="inline-grid grid-cols-[36px_40px_36px] items-center rounded-full border border-[#4a3025]/10 bg-white">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        className="grid h-9 place-items-center text-lg"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="text-center text-sm">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="grid h-9 place-items-center text-lg"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
