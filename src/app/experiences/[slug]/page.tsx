import { notFound } from "next/navigation";
import Link from "next/link";
import LuxeShell from "@/components/luxe/LuxeShell";
import PageHero from "@/components/luxe/PageHero";

const data = {
  "chefs-table": {
    title: "Chef's Table",
    eyebrow: "Eight seats beside the pass",
    text: "The closest view of LUXE: a chef-led tasting served course by course from the open kitchen.",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=2200&q=90",
    details: ["4–8 guests", "Thursday–Sunday", "Approx. 2.5 hours", "Tasting menu only"],
  },
  "seasonal-tasting": {
    title: "Seasonal Tasting",
    eyebrow: "Seven courses at dusk",
    text: "A changing progression of produce, smoke, acidity and texture built around what is best right now.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=2200&q=90",
    details: ["1–8 guests", "Nightly", "Approx. 2 hours", "Wine pairing available"],
  },
  "wine-pairing-evening": {
    title: "Wine Pairing Evening",
    eyebrow: "Cellar-led dinner",
    text: "One region, producer or vintage becomes the starting point for a menu designed around the bottle.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=2200&q=90",
    details: ["Limited dates", "Monthly", "Five paired courses", "Advance booking"],
  },
  "sunday-brunch": {
    title: "Sunday Brunch",
    eyebrow: "A slower LUXE",
    text: "Fresh pastry, ember-cooked plates and sparkling wine in a brighter, more relaxed daytime room.",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=2200&q=90",
    details: ["Sundays", "11:30 AM–3:00 PM", "À la carte", "Family friendly"],
  },
} as const;

export function generateStaticParams() {
  return Object.keys(data).map((slug) => ({ slug }));
}

export default async function ExperienceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = data[slug as keyof typeof data];
  if (!item) notFound();

  return (
    <LuxeShell>
      <PageHero eyebrow={item.eyebrow} title={item.title} text={item.text} image={item.image} />

      <section className="bg-[#f5ead5] py-20 md:py-28">
        <div className="lx-container grid gap-12 lg:grid-cols-[1fr_.7fr]">
          <div>
            <p className="lx-kicker">The experience</p>
            <h2 className="lx-serif mt-5 max-w-3xl text-5xl leading-[.95] md:text-7xl">
              Designed around attention, not spectacle.
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-8 text-[#5e4c44]">
              Every detail is paced to the room: when the course lands, when the wine is poured and when the kitchen steps forward to explain what is on the plate.
            </p>
          </div>

          <div className="border-y border-[#5b3429]/15">
            {item.details.map((detail, i) => (
              <div key={detail} className="flex items-center justify-between gap-6 border-b border-[#5b3429]/15 py-6 last:border-b-0">
                <span className="text-[9px] uppercase tracking-[.24em] text-[#8d3a25]">0{i + 1}</span>
                <span className="text-sm text-[#5e4c44]">{detail}</span>
              </div>
            ))}
            <Link href="/reservations" className="lx-button lx-button--dark mt-8 w-full">
              Reserve this experience ↗
            </Link>
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
