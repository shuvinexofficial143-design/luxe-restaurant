import Image from "next/image";
import Link from "next/link";
import AnimatedEmberBackdrop from "./redesign/AnimatedEmberBackdrop";
import LuxuryGrain from "./redesign/LuxuryGrain";

export default function HomeHero() {
  return (
    <section className="px-3 pt-3 md:px-5 md:pt-5">
      <div className="mx-auto max-w-[1240px]">
        <div className="relative min-h-[320px] overflow-hidden rounded-[26px] border border-[#e7c58f]/14 bg-[#0d0b08] md:min-h-[430px] md:rounded-[34px]">
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=84"
            alt="Warm fine-dining table setting at LUXE"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1240px"
            className="object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,6,4,.98)_0%,rgba(7,6,4,.84)_48%,rgba(7,6,4,.34)_100%)]" />
          <AnimatedEmberBackdrop />
          <LuxuryGrain />

          <div className="relative z-10 flex min-h-[320px] items-end p-5 md:min-h-[430px] md:p-9">
            <div className="max-w-[680px]">
              <div className="flex items-center gap-2">
                <span className="h-px w-7 bg-[#c9944b]/55" />
                <p className="text-[10px] uppercase tracking-[.18em] text-[#d4a765]">
                  Modern fire dining · Indore
                </p>
              </div>

              <h1 className="lx-serif mt-3 text-[clamp(3rem,11vw,6.7rem)] leading-[.82] tracking-[-.055em] text-[#f4eadc]">
                Dinner,
                <span className="block italic text-[#d5a05a]">made memorable.</span>
              </h1>

              <p className="mt-4 max-w-lg text-[13px] leading-6 text-white/62 md:text-[15px] md:leading-7">
                Explore signature plates, seasonal tasting menus and a table shaped around fire, season and warm hospitality.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href="/order"
                  className="lx-gold-button rounded-full px-5 py-3 text-[9px] font-semibold uppercase tracking-[.12em]"
                >
                  Order food
                </Link>
                <Link
                  href="/reservations"
                  className="rounded-full border border-[#e7c58f]/20 bg-black/30 px-5 py-3 text-[9px] font-semibold uppercase tracking-[.12em] text-[#ead9be] backdrop-blur-md transition hover:border-[#d6aa69]/45"
                >
                  Reserve table
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute right-4 top-4 z-20 rounded-full border border-[#e7c58f]/16 bg-black/40 px-3 py-2 text-[9px] uppercase tracking-[.12em] text-[#d8b77f] backdrop-blur-md">
            Open daily · Dinner from 6 PM
          </div>
        </div>
      </div>
    </section>
  );
}
