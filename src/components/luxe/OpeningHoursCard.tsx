import Link from "next/link";
import Reveal from "./Reveal";

export default function OpeningHoursCard() {
  return (
    <section className="bg-[#f5ead5] py-20 md:py-24">
      <div className="lx-container">
        <Reveal>
          <div className="grid gap-10 border-y border-[#5b3429]/16 py-10 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
            <div>
              <p className="lx-kicker">Opening hours</p>
              <h2 className="lx-serif mt-4 text-4xl md:text-5xl">Dinner begins at dusk.</h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <p className="text-[9px] uppercase tracking-[.23em] text-[#8d3a25]">Tuesday–Thursday</p>
                <p className="lx-serif mt-3 text-2xl">6:00–11:00 PM</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[.23em] text-[#8d3a25]">Friday–Sunday</p>
                <p className="lx-serif mt-3 text-2xl">6:00–11:30 PM</p>
              </div>
              <div className="sm:text-right">
                <Link href="/reservations" className="lx-button lx-button--dark">
                  Reserve →
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
