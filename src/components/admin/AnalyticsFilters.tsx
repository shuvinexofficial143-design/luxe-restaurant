"use client";

export default function AnalyticsFilters({
  days,
  onDays,
}: {
  days: number;
  onDays: (days: number) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {[7, 14, 30, 60, 90].map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => onDays(value)}
          className={`shrink-0 rounded-full px-4 py-3 text-[8px] uppercase tracking-[.1em] ${
            days === value
              ? "bg-[#201713] text-white"
              : "border border-[#4a3025]/10 bg-white"
          }`}
        >
          {value} days
        </button>
      ))}
    </div>
  );
}
