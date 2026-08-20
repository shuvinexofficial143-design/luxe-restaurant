
import Link from "next/link";

const pairings = [
  ["Sauvignon Blanc", "crisp · mineral", "₹980"],
  ["Barolo", "structured · timeless", "₹1,450"],
  ["Chardonnay", "rich · balanced", "₹1,180"],
];

export default function WineSpotlight() {
  return (
    <div className="rounded-[30px] border border-[#e7c58f]/12 bg-[radial-gradient(circle_at_90%_10%,rgba(161,91,35,.16),transparent_20rem),#0e0c09] p-5 md:p-8">
      <div className="grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-end">
        <div>
          <p className="text-[8px] uppercase tracking-[.22em] text-[#c9944b]">
            Wine & experiences
          </p>
          <h3 className="lx-serif mt-4 text-4xl leading-[.94] text-[#f2e5d3]">
            Perfect pairings.
            <span className="block italic text-[#d2a15d]">Memorable evenings.</span>
          </h3>
          <Link
            href="/wine"
            className="lx-gold-button mt-6 inline-flex rounded-full px-5 py-3 text-[8px] uppercase tracking-[.12em]"
          >
            Explore cellar
          </Link>
        </div>

        <div className="space-y-2">
          {pairings.map(([wine, note, price]) => (
            <div
              key={wine}
              className="flex items-center justify-between gap-4 rounded-[17px] border border-[#e7c58f]/10 bg-black/22 p-4"
            >
              <div>
                <p className="lx-serif text-lg">{wine}</p>
                <p className="mt-1 text-[8px] text-white/30">{note}</p>
              </div>
              <span className="lx-serif text-lg text-[#c9944b]">{price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
