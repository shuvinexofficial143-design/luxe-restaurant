
import Link from "next/link";
import AnimatedEmberBackdrop from "./redesign/AnimatedEmberBackdrop";
import LuxuryGrain from "./redesign/LuxuryGrain";
import HeroBrandMark from "./redesign/HeroBrandMark";
import HeroStats from "./redesign/HeroStats";
import HeroChefCard from "./redesign/HeroChefCard";
import MobileActionStrip from "./redesign/MobileActionStrip";

export default function HomeHero() {
  return (
    <section className="px-3 pt-[86px] md:px-5 md:pt-[100px]">
      <div className="mx-auto max-w-[1240px]">
        <div className="lx-fire-stage rounded-[30px] md:rounded-[42px]">
          <AnimatedEmberBackdrop />
          <LuxuryGrain />

          <div className="relative z-10 grid min-h-[78svh] gap-8 p-5 md:min-h-[760px] md:grid-cols-[1.2fr_.8fr] md:items-end md:p-9 lg:p-12">
            <div className="self-end">
              <HeroBrandMark />

              <h1 className="lx-hero-word lx-serif mt-5 text-[clamp(4rem,17vw,9rem)] leading-[.78] tracking-[-.065em] text-[#f4eadc]">
                Fire.
                <span className="block">Flavour.</span>
                <span className="block italic text-[#d5a05a]">Elevated.</span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/46 md:text-base">
                Modern fire dining with bold seasonal plates, thoughtful wine and
                a night designed to feel cinematic without feeling formal.
              </p>

              <div className="mt-6 max-w-lg">
                <MobileActionStrip />
              </div>

              <Link
                href="#explore"
                className="mt-7 inline-flex items-center gap-3 text-[7px] uppercase tracking-[.22em] text-white/28"
              >
                <span className="h-7 w-px bg-[linear-gradient(#c9944b,transparent)]" />
                Scroll to explore
              </Link>
            </div>

            <div className="self-end space-y-3 md:justify-self-end md:w-full md:max-w-[360px]">
              <HeroStats />
              <HeroChefCard />
            </div>
          </div>

          <div className="absolute right-4 top-4 z-20 rounded-full border border-[#e7c58f]/14 bg-black/25 px-3 py-2 text-[7px] uppercase tracking-[.18em] text-[#d8b77f] backdrop-blur-md md:right-6 md:top-6">
            Tue–Sun · 6 PM
          </div>
        </div>
      </div>
    </section>
  );
}
