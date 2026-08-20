import Link from "next/link";
import LuxeShell from "@/components/luxe/LuxeShell";
import { dishes } from "@/lib/menu/data";
import { winesForDish, pairingReason } from "@/lib/wine/pairing";

export const metadata = { title: "Food and Wine Pairings" };

export default function WinePairingsPage() {
  const pairedDishes = dishes
    .map((dish) => ({
      dish,
      matches: winesForDish(dish.slug).slice(0, 2),
    }))
    .filter((item) => item.matches.length)
    .slice(0, 12);

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1100px]">
          <p className="lx-kicker">Food + cellar</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">
            Pairings.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#75645d]">
            Start with a dish and see the cellar bottles designed to sit beside it.
          </p>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {pairedDishes.map(({ dish, matches }) => (
              <article
                key={dish.slug}
                className="overflow-hidden rounded-[26px] bg-[#fffaf4]"
              >
                <Link href={`/menu/${dish.slug}`}>
                  <div
                    className="h-[220px] bg-cover bg-center"
                    style={{ backgroundImage: `url("${dish.image}")` }}
                  />
                </Link>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[8px] uppercase tracking-[.12em] text-[#7c241e]">
                        {dish.category}
                      </p>
                      <h2 className="lx-serif mt-1 text-3xl">{dish.name}</h2>
                    </div>
                    <Link href={`/menu/${dish.slug}`}>↗</Link>
                  </div>

                  <div className="mt-4 space-y-2">
                    {matches.map((wine) => (
                      <Link
                        key={wine.slug}
                        href={`/wine/${wine.slug}`}
                        className="block rounded-[16px] bg-[#f3e7dc] p-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="lx-serif text-lg">{wine.name}</p>
                            <p className="mt-1 text-[10px] leading-5 text-[#75645d]">
                              {pairingReason(wine.slug, dish.slug)}
                            </p>
                          </div>
                          <span className="text-[#7c241e]">↗</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
