import Link from "next/link";
import Reveal from "./Reveal";

export default function GiftCardCTA() {
  return (
    <section className="bg-[#f5ead5] py-20 md:py-28">
      <div className="lx-container">
        <Reveal>
          <div className="relative isolate overflow-hidden bg-[#6b231d] p-8 text-white md:p-14 lg:p-16">
            <div
              className="absolute inset-y-0 right-0 -z-20 hidden w-[48%] bg-cover bg-center opacity-65 lg:block"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=90")',
              }}
            />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#6b231d_0%,#6b231d_54%,rgba(107,35,29,.35)_100%)]" />

            <p className="text-[10px] uppercase tracking-[.32em] text-[#ffd19c]">Give an evening</p>
            <h2 className="lx-serif mt-6 max-w-3xl text-[clamp(3.6rem,6vw,6.5rem)] leading-[.9] tracking-[-.045em]">
              LUXE gift cards.
            </h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-white/68">
              A flexible dining credit for tasting menus, wine pairings and special experiences.
            </p>
            <Link href="/gift-cards" className="lx-button mt-9">
              Explore gift cards ↗
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
