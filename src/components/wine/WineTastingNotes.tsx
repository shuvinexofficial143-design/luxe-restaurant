import type { Wine } from "@/lib/wine/types";

function Meter({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <div className="flex justify-between text-[9px] uppercase tracking-[.1em] text-[#75645d]">
        <span>{label}</span>
        <span>{value}/5</span>
      </div>
      <div className="mt-2 grid grid-cols-5 gap-1">
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={`h-2 rounded-full ${
              index < value ? "bg-[#7c241e]" : "bg-[#e5d8cd]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function WineTastingNotes({ wine }: { wine: Wine }) {
  return (
    <div className="rounded-[26px] bg-[#fffaf4] p-5">
      <p className="lx-kicker">Tasting profile</p>
      <h2 className="lx-serif mt-2 text-3xl">In the glass.</h2>

      <div className="mt-5 flex flex-wrap gap-2">
        {wine.notes.map((note) => (
          <span
            key={note}
            className="rounded-full bg-[#f3e7dc] px-3 py-2 text-xs text-[#66534b]"
          >
            {note}
          </span>
        ))}
      </div>

      <div className="mt-6 space-y-5">
        <Meter label="Acidity" value={wine.acidity} />
        <Meter label="Tannin" value={wine.tannin} />
      </div>
    </div>
  );
}
