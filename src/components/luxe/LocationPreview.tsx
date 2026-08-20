import Link from "next/link";
import Reveal from "./Reveal";

export default function LocationPreview() {
  return (
    <section className="bg-[#f5ead5] py-24 md:py-32">
      <div className="lx-container grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-stretch">
        <Reveal>
          <div className="flex h-full min-h-[520px] flex-col justify-between bg-[#24493f] p-8 text-white md:p-12">
            <div>
              <p className="text-[10px] uppercase tracking-[.32em] text-[#e7c18c]">Find us</p>
              <h2 className="lx-serif mt-5 max-w-xl text-5xl leading-[.95] md:text-7xl">
                River Quarter, Ujjain.
              </h2>
              <p className="mt-7 max-w-lg text-sm leading-7 text-white/62">
                18 Ember House · valet from 5:45 PM · step-free main entrance.
              </p>
            </div>
            <Link href="/location" className="lx-button mt-10 self-start">
              Arrival details ↗
            </Link>
          </div>
        </Reveal>

        <Reveal delay={110} className="lx-image-zoom">
          <div
            className="h-full min-h-[520px] bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=90")',
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}
