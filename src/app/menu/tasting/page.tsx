import Link from "next/link";
import LuxeShell from "@/components/luxe/LuxeShell";
import { dishes } from "@/lib/menu/data";

export const metadata = { title: "Tasting Menu" };

const slugs = ["charred-scallop", "ember-cauliflower", "river-trout", "ember-duck", "line-caught-seabass", "green-garden", "burnt-honey"];

export default function TastingMenuPage() {
  const courses = slugs.map((slug) => dishes.find((dish) => dish.slug === slug)).filter(Boolean);

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[900px]">
          <div className="rounded-[32px] bg-[#201713] p-6 text-white md:p-10">
            <p className="text-[9px] uppercase tracking-[.18em] text-[#efc28b]">7-course tasting</p>
            <h1 className="lx-serif mt-3 text-5xl md:text-7xl">The full LUXE story.</h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">Seven courses moving from bright and raw to fire, depth and dessert.</p>
            <p className="lx-serif mt-6 text-3xl text-[#efc28b]">₹5,900 per guest</p>
          </div>

          <div className="mt-5 divide-y divide-[#4a3025]/10 rounded-[28px] bg-[#fffaf4] px-5">
            {courses.map((dish, index) => dish ? (
              <Link key={dish.slug} href={`/menu/${dish.slug}`} className="grid grid-cols-[48px_1fr_auto] gap-3 py-5">
                <span className="lx-serif text-xl text-[#7c241e]">0{index + 1}</span>
                <div>
                  <p className="lx-serif text-2xl">{dish.name}</p>
                  <p className="mt-1 text-xs text-[#75645d]">{dish.description}</p>
                </div>
                <span>↗</span>
              </Link>
            ) : null)}
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
