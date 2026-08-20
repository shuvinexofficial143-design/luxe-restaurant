"use client";

export default function PreferenceChips({
  values,
  onToggle,
}: {
  values: { key: string; label: string; active: boolean }[];
  onToggle: (key: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {values.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => onToggle(item.key)}
          className={`rounded-full border px-4 py-3 text-[9px] uppercase tracking-[.11em] ${
            item.active
              ? "border-[#7c241e] bg-[#7c241e] text-white"
              : "border-[#4a3025]/10 bg-white"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
