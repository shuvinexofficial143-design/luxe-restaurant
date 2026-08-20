"use client";

export default function FeedbackMeter({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-[9px] uppercase tracking-[.11em] text-[#7c241e]">{label}</span>
        <span className="lx-serif text-xl">{value}/5</span>
      </div>

      <div className="mt-2 grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            type="button"
            onClick={() => onChange(score)}
            className={`h-10 rounded-[12px] border ${
              score <= value
                ? "border-[#335f50] bg-[#335f50] text-white"
                : "border-[#4a3025]/10 bg-white"
            }`}
          >
            {score}
          </button>
        ))}
      </div>
    </div>
  );
}
