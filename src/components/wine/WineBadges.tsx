import type { Wine } from "@/lib/wine/types";

export default function WineBadges({ wine }: { wine: Wine }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {[wine.type, wine.body, wine.sweetness].map((label) => (
        <span
          key={label}
          className="rounded-full bg-[#f0e1d3] px-2.5 py-1 text-[8px] uppercase tracking-[.09em] text-[#7c241e]"
        >
          {label}
        </span>
      ))}
      {wine.sommelierChoice ? (
        <span className="rounded-full bg-[#335f50] px-2.5 py-1 text-[8px] uppercase tracking-[.09em] text-white">
          Sommelier
        </span>
      ) : null}
      {wine.rare ? (
        <span className="rounded-full bg-[#201713] px-2.5 py-1 text-[8px] uppercase tracking-[.09em] text-white">
          Rare
        </span>
      ) : null}
    </div>
  );
}
