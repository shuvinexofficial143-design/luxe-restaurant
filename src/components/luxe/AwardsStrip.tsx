import Reveal from "./Reveal";

const awards = [
  ["01", "Michelin Star", "2026"],
  ["02", "Best New Cellar", "2025"],
  ["03", "India Dining List", "Top 20"],
  ["04", "Design Honour", "Interior"],
];

export default function AwardsStrip() {
  return (
    <section className="bg-[#24493f] py-20 text-white md:py-24">
      <div className="lx-container">
        <Reveal>
          <div className="flex flex-col gap-5 border-b border-white/12 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[.32em] text-[#e7c18c]">Recognition</p>
              <h2 className="lx-serif mt-4 text-5xl md:text-6xl">Quietly noticed.</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/55">
              Recognition is appreciated; the standard in the room remains the same every night.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 xl:grid-cols-4">
          {awards.map(([num, name, meta], i) => (
            <Reveal key={name} delay={i * 70}>
              <div className="min-h-[210px] border-b border-white/12 p-6 md:border-r xl:border-b-0">
                <p className="text-[9px] uppercase tracking-[.24em] text-[#e7c18c]">{num}</p>
                <p className="lx-serif mt-8 text-3xl">{name}</p>
                <p className="mt-3 text-xs uppercase tracking-[.2em] text-white/42">{meta}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
