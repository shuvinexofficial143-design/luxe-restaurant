import { notFound } from "next/navigation";
import Link from "next/link";
import LuxeShell from "@/components/luxe/LuxeShell";
import PageHero from "@/components/luxe/PageHero";

const stories = {
  "behind-the-menu": {
    category: "Behind the Menu",
    title: "Smoke, citrus and the first green almonds.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=2200&q=90",
    intro: "A seasonal menu rarely begins with a finished dish. It begins with a delivery, a smell, a texture or something that appears for only a few weeks.",
  },
  "meet-aarav-mehra": {
    category: "Meet the Chef",
    title: "Aarav Mehra on cooking with restraint.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=2200&q=90",
    intro: "For Aarav, refinement is not about adding more. It is about removing everything that does not make the ingredient clearer.",
  },
  "five-bottles": {
    category: "Wine Notes",
    title: "Five bottles that change once food arrives.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=2200&q=90",
    intro: "Some wines are impressive alone. Others become complete only when the plate arrives. Those are the bottles our cellar team returns to.",
  },
  "summer-growers": {
    category: "Ingredient Story",
    title: "The growers behind our summer menu.",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=2200&q=90",
    intro: "The most important decisions in the kitchen often happen long before service — in fields, orchards and conversations with growers.",
  },
} as const;

export function generateStaticParams() {
  return Object.keys(stories).map((slug) => ({ slug }));
}

export default async function JournalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = stories[slug as keyof typeof stories];
  if (!story) notFound();

  return (
    <LuxeShell>
      <PageHero eyebrow={story.category} title={story.title} text={story.intro} image={story.image} />

      <article className="bg-[#fff8ed] py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5">
          <p className="lx-kicker">From the LUXE journal</p>
          <p className="lx-serif mt-7 text-3xl leading-[1.35] text-[#3c241d]">
            {story.intro}
          </p>

          <div className="mt-10 space-y-7 text-[17px] leading-8 text-[#5e4c44]">
            <p>
              The kitchen works in short cycles. A dish may begin with a single ingredient and be tested through fire, curing, fermentation or a completely raw preparation before the final direction becomes clear.
            </p>
            <p>
              What matters is not novelty for its own sake. The goal is to create contrast while keeping the plate calm: something smoky against something bright, something crisp against something deeply savoury.
            </p>
            <blockquote className="my-12 border-l-2 border-[#8d3a25] pl-7 lx-serif text-3xl italic leading-tight text-[#6b231d]">
              “The ingredient should still be recognisable after all the technique.”
            </blockquote>
            <p>
              That principle follows the dish from the prep kitchen to the dining room. Service is part of the recipe too: temperature, timing, plate choice and even the pause before the next course.
            </p>
          </div>

          <div className="mt-14 border-t border-[#5b3429]/15 pt-8">
            <Link href="/journal" className="lx-button lx-button--dark">← Back to journal</Link>
          </div>
        </div>
      </article>
    </LuxeShell>
  );
}
