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

          <div className="relative z-10 grid min-h-[56svh] gap-5 p-5 md:min-h-[560px] md:grid-cols-[1.2fr_.8fr] md:items-end md:p-9 lg:p-12">
            <div className="self-end">
              <HeroBrandMark />

              <h1 className="lx-hero-word lx-serif mt-4 text-[clamp(3.45rem,15vw,8rem)] leading-[.79] tracking-[-.065em] text-[#f4eadc]">
                Fire.
                <span className="block">Flavour.</span>
                <span className="block italic text-[#d5a05a]">Elevated.</span>
              </h1>

              <p className="mt-4 max-w-xl text-[13px] leading-6 text-white/46 md:text-base md:leading-7">
                Modern fire dining with bold seasonal plates, thoughtful wine and
                a cinematic evening without the stiffness.
              </p>

              <div className="mt-5 max-w-lg">
                <MobileActionStrip />
              </div>

              <Link
                href="/experiences"
                className="mt-4 inline-flex items-center gap-3 rounded-full border border-[#e7c58f]/12 bg-black/20 px-4 py-2.5 text-[7px] uppercase tracking-[.18em] text-[#d6b681] transition hover:border-[#c9944b]/40 hover:bg-[#c9944b]/10"
              >
                Explore experiences <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <div className="self-end space-y-2 md:justify-self-end md:w-full md:max-w-[340px]">
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
