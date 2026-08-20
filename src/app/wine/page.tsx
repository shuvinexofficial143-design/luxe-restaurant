import Link from "next/link";
import LuxeShell from "@/components/luxe/LuxeShell";
import PageHero from "@/components/luxe/PageHero";
import WineClient from "@/components/wine/WineClient";
import WineStats from "@/components/wine/WineStats";
import CellarMap from "@/components/wine/CellarMap";
import { wines } from "@/lib/wine/data";

export const metadata = { title: "Wine Cellar" };

export default function WinePage() {
  return (
    <LuxeShell>
      <PageHero
        eyebrow="LUXE cellar"
        title="Wine"
        text="Search by type, region, body and budget — then open every bottle for tasting notes and food pairings."
        image="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=2200&q=90"
      />

      <section className="px-3 py-6 md:px-5 md:py-10">
        <div className="mx-auto max-w-[1180px]">
          <WineStats wines={wines} />

          <div className="mt-4 flex gap-2 overflow-x-auto">
            <Link
              href="/wine/sommelier"
              className="shrink-0 rounded-full bg-[#7c241e] px-4 py-3 text-[9px] uppercase tracking-[.12em] text-white"
            >
              AI-style Sommelier
            </Link>
            <Link
              href="/wine/pairings"
              className="shrink-0 rounded-full border border-[#4a3025]/10 bg-white/70 px-4 py-3 text-[9px] uppercase tracking-[.12em]"
            >
              Food pairings
            </Link>
            <Link
              href="/wine/favorites"
              className="shrink-0 rounded-full border border-[#4a3025]/10 bg-white/70 px-4 py-3 text-[9px] uppercase tracking-[.12em]"
            >
              Saved wines
            </Link>
          </div>

          <div className="mt-5">
            <CellarMap />
          </div>

          <div className="mt-6">
            <WineClient wines={wines} />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
