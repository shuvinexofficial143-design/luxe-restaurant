import Link from "next/link";
import LuxeShell from "@/components/luxe/LuxeShell";
import PageHero from "@/components/luxe/PageHero";
import Reveal from "@/components/luxe/Reveal";

const stories = [
  ["behind-the-menu", "Behind the Menu", "Why this season begins with smoke, citrus and the first green almonds.", "6 min read", "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=90"],
  ["meet-aarav-mehra", "Meet the Chef", "Aarav Mehra on building a kitchen where restraint is treated as a technique.", "8 min read", "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1400&q=90"],
  ["five-bottles", "Wine Notes", "Five bottles from the cellar that completely change once food arrives.", "5 min read", "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1400&q=90"],
  ["summer-growers", "Ingredient Story", "The farms growing the herbs, roots and leaves that shape our summer menu.", "7 min read", "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=1400&q=90"],
];

export const metadata = { title: "Journal" };

export default function JournalPage() {
  return (
    <LuxeShell>
      <PageHero
        eyebrow="Stories from LUXE"
        title="Journal"
        text="Notes from the kitchen, the cellar and the people we work with."
        image="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2200&q=90"
      />

      <section className="bg-[#fff8ed] py-16 md:py-24 lg:py-32">
        <div className="lx-container">
          <div className="grid gap-8 border-b border-[#5b3429]/16 pb-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <p className="lx-kicker">Longer stories</p>
              <h2 className="lx-serif mt-5 text-4xl leading-[.95] sm:text-5xl md:text-6xl">
                Read what sits behind the plate.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#625048] lg:ml-auto">
              Kitchen notes, ingredient stories and cellar thinking, presented with enough space to actually read.
            </p>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-2">
            {stories.map(([slug, category, title, read, image], i) => (
              <Reveal key={slug} delay={(i % 2) * 100}>
                <article className="group">
                  <Link href={`/journal/${slug}`}>
                    <div className="lx-image-zoom">
                      <div
                        className="h-[420px] bg-cover bg-center sm:h-[500px] lg:h-[520px]"
                        style={{ backgroundImage: `url("${image}")` }}
                      />
                    </div>
                    <div className="border-b border-[#5b3429]/17 py-6 md:py-7">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <span className="text-[9px] uppercase tracking-[.25em] text-[#8d3a25]">{category}</span>
                        <span className="text-[9px] uppercase tracking-[.2em] text-[#8c776e]">{read}</span>
                      </div>
                      <h3 className="lx-serif mt-5 max-w-2xl text-3xl leading-tight md:text-4xl">{title}</h3>
                      <span className="mt-6 inline-flex text-[10px] uppercase tracking-[.22em] text-[#7a2d21]">
                        Read story →
                      </span>
                    </div>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
