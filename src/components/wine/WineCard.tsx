import Image from "next/image";
import Link from "next/link";
import type { Wine } from "@/lib/wine/types";
import FavoriteWineButton from "./FavoriteWineButton";
import WineBadges from "./WineBadges";
import VintageBadge from "./VintageBadge";

export default function WineCard({ wine }: { wine: Wine }) {
  return (
    <Link
      href={"/wine/" + wine.slug}
      className="group block overflow-hidden rounded-[26px] border border-[#4a3025]/10 bg-[#fffaf4] shadow-[0_18px_50px_rgba(70,40,26,.07)]"
    >
      <div className="relative h-[300px] overflow-hidden bg-[#e8ddd2]">
        <Image
          src={wine.image}
          alt={wine.name}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <VintageBadge vintage={wine.vintage} />
          <FavoriteWineButton slug={wine.slug} compact />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[.13em] text-[#8a756b]">
              {wine.region} · {wine.country}
            </p>
            <h3 className="lx-serif mt-1 text-2xl">{wine.name}</h3>
            <p className="mt-1 text-[11px] text-[#75645d]">{wine.producer}</p>
          </div>
          <p className="lx-serif text-lg text-[#7c241e]">
            ₹{wine.priceBottle.toLocaleString("en-IN")}
          </p>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#75645d]">
          {wine.description}
        </p>

        <div className="mt-4">
          <WineBadges wine={wine} />
        </div>
      </div>
    </Link>
  );
}
