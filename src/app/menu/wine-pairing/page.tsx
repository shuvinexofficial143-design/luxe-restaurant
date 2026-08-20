import Link from "next/link";
import LuxeShell from "@/components/luxe/LuxeShell";
import { dishes } from "@/lib/menu/data";

export const metadata = { title: "Wine Pairing" };

export default function WinePairingPage() {
  const paired = dishes.filter((dish) => dish.winePairing).slice(0, 10);

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1000px]">
          <p className="lx-kicker">Sommelier guide</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">Food + wine.</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#75645d]">
            Tap a dish to see why the pairing works.
          </p>

          <div className="mt-7 grid gap-3 md:grid-cols-2">
            {paired.map((dish) => (
              <Link key={dish.slug} href={`/menu/${dish.slug}`} className="rounded-[24px] border border-[#4a3025]/10 bg-[#fffaf4] p-5">
                <p className="text-[9px] uppercase tracking-[.14em] text-[#7c241e]">{dish.name}</p>
                <p className="lx-serif mt-2 text-3xl">{dish.winePairing?.name}</p>
                <p className="mt-3 text-xs leading-6 text-[#75645d]">{dish.winePairing?.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
