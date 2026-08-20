"use client";

export default function TicketQuantity({
  value,
  max,
  onChange,
}: {
  value: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="inline-grid grid-cols-[44px_52px_44px] items-center rounded-full border border-[#4a3025]/10 bg-white">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="grid h-11 place-items-center text-xl"
      >
        −
      </button>
      <span className="text-center lx-serif text-lg">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="grid h-11 place-items-center text-xl"
      >
        +
      </button>
    </div>
  );
}
