import Link from "next/link";
import Reveal from "./Reveal";

const quotes = [
  ["The City Table", "Luxury without theatre."],
  ["Weekend Ledger", "A cellar worth arriving early for."],
  ["Design Plate", "A dining room built around warmth, not spectacle."],
];

export default function PressPreview() {
  return (
    <section className="bg-[#180d0a] py-24 text-white md:py-28">
      <div className="lx-container">
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-white/12 pb-9 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[.32em] text-[#efb36c]">Press</p>
              <h2 className="lx-serif mt-4 text-5xl md:text-6xl">Words from outside the room.</h2>
            </div>
            <Link href="/press" className="lx-button">
              Press room →
            </Link>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3">
          {quotes.map(([publication, quote], index) => (
            <Reveal key={publication} delay={index * 90}>
              <article className="min-h-[280px] border-b border-white/12 p-7 md:border-r md:border-b-0">
                <p className="text-[9px] uppercase tracking-[.24em] text-[#efb36c]">0{index + 1}</p>
                <blockquote className="lx-serif mt-9 text-3xl leading-tight">“{quote}”</blockquote>
                <p className="mt-8 text-[9px] uppercase tracking-[.22em] text-white/38">{publication}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
