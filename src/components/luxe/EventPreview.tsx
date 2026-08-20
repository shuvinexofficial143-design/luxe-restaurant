import Link from "next/link";
import Reveal from "./Reveal";

const events = [
  ["28 AUG", "Grower Champagne Dinner", "Five courses · six wines", "7:30 PM"],
  ["06 SEP", "Late Summer Chef's Table", "Eight seats · kitchen-side", "8:00 PM"],
  ["19 SEP", "Burgundy After Dark", "Cellar-led tasting dinner", "7:00 PM"],
];

export default function EventPreview() {
  return (
    <section className="bg-[#fff8ed] py-24 md:py-32">
      <div className="lx-container">
        <Reveal>
          <div className="grid gap-8 border-b border-[#5b3429]/16 pb-9 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
            <div>
              <p className="lx-kicker">Special dates</p>
              <h2 className="lx-serif mt-5 text-5xl md:text-6xl">Upcoming at LUXE.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#655149] lg:ml-auto">
              Cellar dinners, chef collaborations and seasonal one-night menus.
            </p>
          </div>
        </Reveal>

        <div className="divide-y divide-[#5b3429]/16 border-b border-[#5b3429]/16">
          {events.map(([date, title, detail, time], index) => (
            <Reveal key={title} delay={index * 80}>
              <article className="group grid gap-4 py-8 md:grid-cols-[90px_160px_1fr_130px_auto] md:items-center">
                <span className="text-[9px] uppercase tracking-[.24em] text-[#8d3a25]">0{index + 1}</span>
                <span className="lx-serif text-2xl text-[#6b231d]">{date}</span>
                <div>
                  <h3 className="lx-serif text-3xl">{title}</h3>
                  <p className="mt-2 text-sm text-[#6b5a52]">{detail}</p>
                </div>
                <span className="text-xs uppercase tracking-[.18em] text-[#7d675e]">{time}</span>
                <Link href="/events" className="text-[10px] uppercase tracking-[.2em] text-[#7a2d21]">
                  Details ↗
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-9 text-right">
            <Link href="/events" className="lx-button lx-button--dark">
              Full event calendar →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
