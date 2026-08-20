import LuxeShell from "@/components/luxe/LuxeShell";
import PageHero from "@/components/luxe/PageHero";
import Reveal from "@/components/luxe/Reveal";

const coverage = [
  ["The City Table", "Luxury without theatre.", "Restaurant Review", "2026"],
  ["Weekend Ledger", "A cellar worth arriving early for.", "Dining Editor", "2026"],
  ["Table & Flame", "One of the region's most confident tasting menus.", "Feature", "2025"],
  ["Design Plate", "A dining room built around warmth, not spectacle.", "Interior Review", "2025"],
  ["The Sunday Edit", "Seven courses with a clear point of view.", "Food Column", "2025"],
  ["Cellar Journal", "A wine list built for the plate rather than the trophy shelf.", "Wine Feature", "2026"],
];

export const metadata = { title: "Press" };

export default function PressPage() {
  return (
    <LuxeShell>
      <PageHero
        eyebrow="Press room"
        title="Press"
        text="Selected editorial notes, restaurant coverage and a simple place for media enquiries."
        image="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2200&q=90"
      />

      <section className="bg-[#fff8ed] py-24 md:py-32">
        <div className="lx-container">
          <Reveal>
            <div className="grid gap-9 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
              <div>
                <p className="lx-kicker">Selected coverage</p>
                <h2 className="lx-serif mt-5 text-5xl leading-[.95] md:text-7xl">What others noticed.</h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-[#625048] lg:ml-auto">
                These are portfolio-demo publication names and quotes. Replace them with verified coverage before a commercial launch.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {coverage.map(([publication, quote, type, year], index) => (
              <Reveal key={publication} delay={(index % 3) * 70}>
                <article className="min-h-[330px] border border-[#5b3429]/14 bg-[#f5ead5] p-8">
                  <div className="flex items-center justify-between gap-5">
                    <span className="text-[9px] uppercase tracking-[.24em] text-[#8d3a25]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] uppercase tracking-[.2em] text-[#8b776e]">{year}</span>
                  </div>
                  <p className="lx-serif mt-10 text-3xl leading-tight">“{quote}”</p>
                  <div className="mt-10 border-t border-[#5b3429]/14 pt-5">
                    <p className="text-[10px] uppercase tracking-[.22em] text-[#6b231d]">{publication}</p>
                    <p className="mt-2 text-xs text-[#7a675e]">{type}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-20 bg-[#180d0a] p-8 text-white md:p-12">
            <p className="text-[10px] uppercase tracking-[.3em] text-[#efb36c]">Media enquiries</p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <p className="lx-serif max-w-4xl text-5xl leading-[.95] md:text-6xl">
                Interviews, imagery and restaurant information.
              </p>
              <a href="mailto:press@luxe-demo.com" className="lx-button">
                press@luxe-demo.com ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
