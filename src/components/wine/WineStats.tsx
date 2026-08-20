import type { Wine } from "@/lib/wine/types";

export default function WineStats({ wines }: { wines: Wine[] }) {
  const countries = new Set(wines.map((wine) => wine.country)).size;
  const regions = new Set(wines.map((wine) => wine.region)).size;

  return (
    <div className="grid grid-cols-3 gap-2">
      {[
        [String(wines.length), "labels"],
        [String(regions), "regions"],
        [String(countries), "countries"],
      ].map(([value, label]) => (
        <div
          key={label}
          className="rounded-[18px] border border-[#4a3025]/10 bg-[#fffaf4] p-3 text-center"
        >
          <p className="lx-serif text-2xl text-[#7c241e]">{value}</p>
          <p className="mt-1 text-[8px] uppercase tracking-[.11em] text-[#75645d]">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
