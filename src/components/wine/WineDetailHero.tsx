import type { Wine } from "@/lib/wine/types";
import FavoriteWineButton from "./FavoriteWineButton";
import WineBadges from "./WineBadges";
import VintageBadge from "./VintageBadge";

export default function WineDetailHero({ wine }: { wine: Wine }) {
  return (
    <section className="px-3 pt-[86px] md:px-5 md:pt-[98px]">
      <div className="mx-auto overflow-hidden rounded-[32px] bg-[#fffaf4] md:grid md:max-w-[1180px] md:grid-cols-[1.05fr_.95fr]">
        <div
          className="min-h-[54svh] bg-cover bg-center md:min-h-[720px]"
          style={{ backgroundImage: `url("${wine.image}")` }}
        />

        <div className="p-5 md:flex md:items-center md:p-9 lg:p-12">
          <div className="w-full">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] uppercase tracking-[.16em] text-[#7c241e]">
                  {wine.region} · {wine.country}
                </p>
                <h1 className="lx-serif mt-2 text-5xl leading-[.9] md:text-7xl">
                  {wine.name}
                </h1>
                <p className="mt-2 text-sm text-[#75645d]">{wine.producer}</p>
              </div>
              <FavoriteWineButton slug={wine.slug} />
            </div>

            <div className="mt-5 flex items-center gap-3">
              <VintageBadge vintage={wine.vintage} dark />
              <WineBadges wine={wine} />
            </div>

            <p className="mt-5 text-sm leading-7 text-[#75645d] md:text-base">
              {wine.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <div className="rounded-[18px] bg-[#f3e7dc] p-4">
                <p className="text-[8px] uppercase tracking-[.11em] text-[#75645d]">Bottle</p>
                <p className="lx-serif mt-1 text-2xl text-[#7c241e]">
                  ₹{wine.priceBottle.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="rounded-[18px] bg-[#f3e7dc] p-4">
                <p className="text-[8px] uppercase tracking-[.11em] text-[#75645d]">Glass</p>
                <p className="lx-serif mt-1 text-2xl text-[#7c241e]">
                  {wine.priceGlass
                    ? `₹${wine.priceGlass.toLocaleString("en-IN")}`
                    : "Bottle only"}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-[9px] uppercase tracking-[.13em] text-[#7c241e]">
                Grapes
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {wine.grape.map((grape) => (
                  <span
                    key={grape}
                    className="rounded-full border border-[#4a3025]/10 px-3 py-2 text-xs"
                  >
                    {grape}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
