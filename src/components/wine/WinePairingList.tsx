import Link from "next/link";
import type { Wine } from "@/lib/wine/types";
import { dishes } from "@/lib/menu/data";
import { pairingReason } from "@/lib/wine/pairing";

export default function WinePairingList({ wine }: { wine: Wine }) {
  const matches = wine.pairWith
    .map((slug) => dishes.find((dish) => dish.slug === slug))
    .filter(Boolean);

  return (
    <div className="rounded-[26px] bg-[#335f50] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.14em] text-[#efc99a]">
        Pair at LUXE
      </p>
      <h2 className="lx-serif mt-2 text-3xl">Best with.</h2>

      <div className="mt-4 space-y-2">
        {matches.map((dish) =>
          dish ? (
            <Link
              key={dish.slug}
              href={`/menu/${dish.slug}`}
              className="block rounded-[18px] bg-white/[.07] p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="lx-serif text-xl">{dish.name}</p>
                  <p className="mt-2 text-[10px] leading-5 text-white/55">
                    {pairingReason(wine.slug, dish.slug)}
                  </p>
                </div>
                <span className="text-[#efc99a]">↗</span>
              </div>
            </Link>
          ) : null
        )}
      </div>
    </div>
  );
}
