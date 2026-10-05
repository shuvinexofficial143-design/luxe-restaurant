import Link from "next/link";
import AnimatedEmberBackdrop from "./redesign/AnimatedEmberBackdrop";
import LuxuryGrain from "./redesign/LuxuryGrain";

export default function HomeHero() {
  return (
    <section className="px-3 pt-3 md:px-5 md:pt-5">
      <div className="mx-auto max-w-[1240px]">
        <div className="relative min-h-[300px] overflow-hidden rounded-[26px] border border-[#e7c58f]/14 bg-[#0d0b08] md:min-h-[410px] md:rounded-[34px]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=84")',
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,6,4,.98)_0%,rgba(7,6,4,.84)_48%,rgba(7,6,4,.34)_100%)]" />
          <AnimatedEmberBackdrop />
          <LuxuryGrain />

          <div className="relative z-10 flex min-h-[300px] items-end p-5 md:min-h-[410px] md:p-9">
            <div className="max-w-[680px]">
              <div className="flex items-center gap-2">
                <span className="h-px w-7 bg-[#c9944b]/55" />
                <p className="text-[7px] uppercase tracking-[.2em] text-[#d4a765]">
                  Modern fire dining · Indore
                </p>
              </div>

              <h1 className="lx-serif mt-3 text-[clamp(3rem,11vw,6.7rem)] leading-[.82] tracking-[-.055em] text-[#f4eadc]">
                Dinner,
                <span className="block italic text-[#d5a05a]">made memorable.</span>
              </h1>

              <p className="mt-3 max-w-lg text-[11px] leading-5 text-white/50 md:text-sm md:leading-6">
                Explore signature plates, seasonal tasting menus and a table shaped around fire, season and warm hospitality.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/menu"
                  className="lx-gold-button rounded-full px-5 py-3 text-[7px] uppercase tracking-[.12em]"
                >
                  Order food
                </Link>
                <Link
                  href="/reservations"
                  className="rounded-full border border-[#e7c58f]/18 bg-black/30 px-5 py-3 text-[7px] uppercase tracking-[.12em] text-[#ead9be] backdrop-blur-md"
                >
                  Reserve table
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute right-4 top-4 z-20 rounded-full border border-[#e7c58f]/14 bg-black/35 px-3 py-2 text-[7px] uppercase tracking-[.14em] text-[#d8b77f] backdrop-blur-md">
            Open Tue–Sun · 6 PM
          </div>
        </div>
      </div>
    </section>
  );
}
