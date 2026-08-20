import Link from "next/link";

export default function HomeHero(){
  return(
    <section className="px-3 pt-[86px] md:px-5 md:pt-[98px]">
      <div className="mx-auto max-w-[1180px]">
        <div className="relative min-h-[74svh] overflow-hidden rounded-[34px] bg-[#261711] text-white md:min-h-[76vh] md:rounded-[42px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{backgroundImage:'url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2200&q=92")'}}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,12,8,.18),rgba(22,12,8,.35)_45%,rgba(22,12,8,.92))]" />

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 md:p-10 lg:p-12">
            <div className="max-w-4xl">
              <p className="text-[9px] uppercase tracking-[.28em] text-[#ffd198]">
                Modern fire dining · Ujjain
              </p>
              <h1 className="lx-serif mt-4 text-[clamp(4rem,16vw,8.5rem)] leading-[.78] tracking-[-.065em]">
                Dine
                <span className="block italic text-[#f3c58d]">different.</span>
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/68 md:text-base">
                Bold seasonal plates, glowing interiors and a night designed to feel special without feeling stiff.
              </p>

              <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
                <Link href="/reservations" className="lx-pill shrink-0 border-white/20 bg-[#a73b2b] text-white">
                  Book table ↗
                </Link>
                <Link href="/menu" className="lx-pill shrink-0 border-white/20 bg-white/10 text-white backdrop-blur">
                  View menu
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute right-4 top-4 rounded-full bg-white/12 px-3 py-2 text-[8px] uppercase tracking-[.2em] backdrop-blur md:right-6 md:top-6">
            Tue–Sun · 6 PM
          </div>
        </div>
      </div>
    </section>
  )
}
