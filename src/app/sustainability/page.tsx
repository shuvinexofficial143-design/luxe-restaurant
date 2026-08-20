import LuxeShell from "@/components/luxe/LuxeShell";
import PageHero from "@/components/luxe/PageHero";
import Reveal from "@/components/luxe/Reveal";

const pillars = [
  ["Grow close", "We prioritise direct relationships with farms, growers and producers wherever possible."],
  ["Waste less", "Trim, peel, stems and surplus are redirected into stocks, ferments, staff meals and preservation."],
  ["Buy seasonally", "Menus change with availability rather than forcing ingredients outside their natural window."],
  ["Serve thoughtfully", "Energy, water, packaging and cleaning choices are treated as operational decisions, not marketing lines."],
];

export const metadata = { title: "Sustainability" };

export default function SustainabilityPage() {
  return (
    <LuxeShell>
      <PageHero
        eyebrow="Responsibility"
        title="Sustainability"
        text="A better restaurant should leave less behind — less waste, fewer unnecessary miles and more value returned to the people growing the food."
        image="https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=2200&q=90"
      />

      <section className="bg-[#fff8ed] py-24 md:py-32">
        <div className="lx-container">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <p className="lx-kicker">What we can control</p>
                <h2 className="lx-serif mt-5 text-5xl leading-[.95] md:text-7xl">Make the daily decisions better.</h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-[#5e4c44] lg:ml-auto">
                Sustainability is not one dramatic gesture. It is hundreds of small purchasing, prep, storage and service choices repeated every day.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {pillars.map(([title, text], index) => (
              <Reveal key={title} delay={(index % 2) * 80}>
                <article className="min-h-[300px] bg-[#24493f] p-8 text-white md:p-10">
                  <p className="text-[9px] uppercase tracking-[.25em] text-[#e7c18c]">0{index + 1}</p>
                  <h3 className="lx-serif mt-8 text-4xl">{title}</h3>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-white/62">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-20 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
            <div
              className="min-h-[560px] bg-cover bg-center"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1500&q=90")' }}
            />
            <div className="flex items-center bg-[#6b231d] p-8 text-white md:p-12">
              <div>
                <p className="text-[10px] uppercase tracking-[.3em] text-[#ffd19c]">Grower programme</p>
                <p className="lx-serif mt-6 text-5xl leading-[.95]">Closer to the source.</p>
                <p className="mt-6 max-w-xl text-sm leading-7 text-white/65">
                  Production launch content should replace this demo copy with verified farm names, sourcing distances and measurable commitments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
