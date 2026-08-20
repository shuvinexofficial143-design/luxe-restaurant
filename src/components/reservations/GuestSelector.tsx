"use client";

export default function GuestSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <p className="lx-kicker">Party size</p>
      <h2 className="lx-serif mt-2 text-4xl">How many guests?</h2>
      <div className="mt-6 grid grid-cols-4 gap-2">
        {Array.from({ length: 8 }, (_, index) => index + 1).map((count) => (
          <button
            key={count}
            type="button"
            onClick={() => onChange(count)}
            className={`min-h-16 rounded-[20px] border lx-serif text-2xl transition ${
              value === count
                ? "border-[#7c241e] bg-[#7c241e] text-white"
                : "border-[#4a3025]/10 bg-[#fffaf4]"
            }`}
          >
            {count}
          </button>
        ))}
      </div>
    </div>
  );
}
