import Image from "next/image";
import LuxuryGrain from "./redesign/LuxuryGrain";
import AnimatedRibbon from "./redesign/AnimatedRibbon";

export default function PageHero({
  eyebrow,
  title,
  text,
  image,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
}) {
  return (
    <section className="px-3 pt-[86px] md:px-5 md:pt-[100px]">
      <div className="relative mx-auto min-h-[50svh] max-w-[1240px] overflow-hidden rounded-[30px] border border-[#e7c58f]/14 bg-[#0d0b08] md:min-h-[560px] md:rounded-[40px]">
        <div className="absolute right-0 top-0 h-full w-[58%] overflow-hidden">
          <Image
            src={image}
            alt={`${title} at LUXE`}
            fill
            sizes="(max-width: 767px) 70vw, 58vw"
            className="object-cover object-center opacity-30"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0b0907_0%,rgba(11,9,7,.96)_45%,rgba(11,9,7,.4)_100%)]" />
        <AnimatedRibbon />
        <LuxuryGrain />

        <div className="relative z-10 flex min-h-[50svh] items-end p-5 md:min-h-[560px] md:p-10 lg:p-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#c9944b]/55" />
              <p className="text-[10px] uppercase tracking-[.2em] text-[#c9944b]">
                {eyebrow}
              </p>
            </div>
            <h1 className="lx-serif mt-4 text-[clamp(3.5rem,12vw,8rem)] leading-[.82] tracking-[-.055em] text-[#f3e7d5]">
              {title}
            </h1>
            <p className="mt-5 max-w-xl text-[14px] leading-7 text-white/58 md:text-base">
              {text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
