const labels = ["Guests", "Date", "Time", "Area", "Table", "Details"];

export default function BookingStepper({ step }: { step: number }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {labels.map((label, index) => {
        const active = index === step;
        const done = index < step;
        return (
          <div
            key={label}
            className={`flex min-w-[92px] items-center gap-2 rounded-full border px-3 py-2 ${
              active
                ? "border-[#7c241e] bg-[#7c241e] text-white"
                : done
                  ? "border-[#335f50]/20 bg-[#335f50]/10 text-[#335f50]"
                  : "border-[#4a3025]/10 bg-[#fffaf4] text-[#8a756b]"
            }`}
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-black/5 text-[9px]">
              {done ? "✓" : index + 1}
            </span>
            <span className="text-[8px] uppercase tracking-[.12em]">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
