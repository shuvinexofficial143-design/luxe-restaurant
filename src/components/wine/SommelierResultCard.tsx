import Link from "next/link";
import type { Wine } from "@/lib/wine/types";
import WineBadges from "./WineBadges";

export default function SommelierResultCard({
  wine,
  rank,
}: {
  wine: Wine;
  rank: number;
}) {
  return (
    <Link
      href={`/wine/${wine.slug}`}
      className="grid grid-cols-[110px_1fr] overflow-hidden rounded-[24px] bg-[#fffaf4] sm:grid-cols-[150px_1fr]"
    >
      <div
        className="min-h-[170px] bg-cover bg-center"
        style={{ backgroundImage: `url("${wine.image}")` }}
      />
      <div className="p-4">
        <p className="text-[8px] uppercase tracking-[.13em] text-[#7c241e]">
          Match #{rank}
        </p>
        <h3 className="lx-serif mt-1 text-2xl">{wine.name}</h3>
        <p className="mt-1 text-[10px] text-[#75645d]">
          {wine.region} · {wine.grape.join(", ")}
        </p>
        <p className="mt-3 text-xs leading-6 text-[#75645d]">
          {wine.description}
        </p>
        <div className="mt-3">
          <WineBadges wine={wine} />
        </div>
      </div>
    </Link>
  );
}
