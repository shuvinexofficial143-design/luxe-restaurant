import Link from "next/link";
import Reveal from "./Reveal";

export default function SustainabilityFeature() {
  return (
    <section className="bg-[#f5ead5] py-24 md:py-32">
      <div className="lx-container grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
        <Reveal>
          <div>
            <p className="lx-kicker">Responsibility</p>
            <h2 className="lx-serif mt-5 max-w-4xl text-[clamp(3.8rem,7vw,7.2rem)] leading-[.9] tracking-[-.05em]">
              Better ingredients. Less waste.
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-8 text-[#5e4c44]">
              Direct sourcing, seasonal buying and a kitchen that treats trim and surplus as ingredients rather than rubbish.
            </p>
            <Link href="/sustainability" className="lx-button lx-button--dark mt-8">
              Our approach →
            </Link>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative">
            <div
              className="min-h-[560px] bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1400&q=90")',
              }}
            />
            <div className="absolute -bottom-7 -left-5 max-w-[260px] bg-[#24493f] p-6 text-white md:-left-9">
              <p className="text-[9px] uppercase tracking-[.24em] text-[#e7c18c]">Grow close</p>
              <p className="lx-serif mt-3 text-3xl">Know the hands behind the ingredient.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
