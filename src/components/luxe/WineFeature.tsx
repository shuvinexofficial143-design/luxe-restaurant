import Link from "next/link";
import Reveal from "./Reveal";

export default function WineFeature() {
  return (
    <section className="overflow-hidden bg-[#180d0a] text-white">
      <div className="grid lg:grid-cols-2">
        <Reveal className="lx-image-zoom">
          <div
            className="min-h-[620px] bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=90")',
            }}
          />
        </Reveal>
        <Reveal delay={100}>
          <div className="flex min-h-[620px] items-center p-8 md:p-14 lg:p-16">
            <div>
              <p className="text-[10px] uppercase tracking-[.32em] text-[#efb36c]">From the cellar</p>
              <h2 className="lx-serif mt-6 max-w-3xl text-[clamp(3.8rem,6vw,6.5rem)] leading-[.9] tracking-[-.045em]">
                Wine that belongs at the table.
              </h2>
              <p className="mt-7 max-w-xl text-sm leading-7 text-white/62">
                Burgundy, grower Champagne, expressive new-world bottles and an expanding Indian selection — chosen for food, not display.
              </p>
              <Link href="/wine" className="lx-button mt-9">
                Explore the cellar ↗
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
