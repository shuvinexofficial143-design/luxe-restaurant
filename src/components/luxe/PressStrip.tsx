import Reveal from "./Reveal";

const mentions = [
  ["The City Table", "“Luxury without theatre.”"],
  ["Weekend Ledger", "“A cellar worth arriving early for.”"],
  ["Table & Flame", "“One of the region’s most confident tasting menus.”"],
  ["Design Plate", "“A dining room built around warmth, not spectacle.”"],
];

export default function PressStrip() {
  return (
    <section className="bg-[#180d0a] py-20 text-white md:py-24">
      <div className="lx-container">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[.32em] text-[#efb36c]">Press notes</p>
          <div className="mt-8 grid border-t border-white/12 md:grid-cols-2 xl:grid-cols-4">
            {mentions.map(([name, quote], index) => (
              <article
                key={name}
                className="min-h-[220px] border-b border-white/12 p-6 md:border-r xl:border-b-0"
              >
                <p className="text-[9px] uppercase tracking-[.24em] text-[#efb36c]">0{index + 1}</p>
                <p className="lx-serif mt-7 text-3xl leading-tight">{quote}</p>
                <p className="mt-5 text-[9px] uppercase tracking-[.22em] text-white/38">{name}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
