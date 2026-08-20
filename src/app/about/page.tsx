import LuxeShell from "@/components/luxe/LuxeShell";
import PageHero from "@/components/luxe/PageHero";
import Reveal from "@/components/luxe/Reveal";
import EditorialBand from "@/components/luxe/EditorialBand";

export default function AboutPage() {
  const timeline = [
    ["2018", "LUXE opens with twelve tables, one tasting menu and an open ember hearth."],
    ["2020", "A growers programme begins across Malwa, linking the kitchen directly to small farms."],
    ["2023", "The wine room and chef counter open, creating two more intimate ways to dine."],
    ["2026", "LUXE enters a quieter chapter: warmer service, deeper sourcing and fewer distractions."],
  ];

  return (
    <LuxeShell>
      <PageHero
        eyebrow="Our story"
        title="About LUXE"
        text="A restaurant built around restraint: fewer ingredients, deeper sourcing and a room designed to let the evening unfold slowly."
        image="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2200&q=90"
      />

      <section className="bg-[#f5ead5] py-24 md:py-32">
        <div className="lx-container grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="lx-kicker">Philosophy</p>
            <h2 className="lx-serif mt-6 text-[clamp(3.8rem,7vw,7rem)] leading-[.9] tracking-[-.045em]">
              Fire, season and a sense of place.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="max-w-xl text-base leading-8 text-[#5e4c44] lg:ml-auto">
              <p>
                Luxury, to us, is not excess. It is confidence: a perfect ingredient, handled with care, served at the right moment.
              </p>
              <p className="mt-6">
                Our menus shift constantly with the farms, fisheries and specialist producers around us. Technique supports the ingredient rather than competing with it.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="lx-container mt-20 grid overflow-hidden bg-[#24493f] text-white lg:grid-cols-[1.1fr_.9fr]">
          <div
            className="min-h-[620px] bg-cover bg-center"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1500&q=90")' }}
          />
          <div className="flex items-center p-8 md:p-14">
            <blockquote className="lx-serif text-4xl leading-tight md:text-6xl">
              “Good dining is not theatre performed at you. It is a room, a team and a meal moving together.”
              <footer className="mt-8 font-sans text-[10px] uppercase tracking-[.28em] text-[#e7c18c]">— Aarav Mehra</footer>
            </blockquote>
          </div>
        </div>

        <div className="lx-container mt-24">
          <p className="lx-kicker">Milestones</p>
          <div className="mt-8 divide-y divide-[#5b3429]/15 border-y border-[#5b3429]/15">
            {timeline.map(([year, text]) => (
              <Reveal key={year}>
                <div className="grid gap-4 py-8 md:grid-cols-[180px_1fr]">
                  <p className="lx-serif text-4xl text-[#7a2d21]">{year}</p>
                  <p className="max-w-3xl text-sm leading-7 text-[#5e4c44]">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <EditorialBand
        eyebrow="Sourcing"
        title="Know the hands behind the ingredient."
        text="Our produce arrives through direct relationships wherever possible — people we know, farms we visit and seasons we learn to wait for."
        tone="wine"
      />
    </LuxeShell>
  );
}
