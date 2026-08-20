import Link from "next/link";
import { notFound } from "next/navigation";
import LuxeShell from "@/components/luxe/LuxeShell";
import WineDetailHero from "@/components/wine/WineDetailHero";
import WineTastingNotes from "@/components/wine/WineTastingNotes";
import WinePairingList from "@/components/wine/WinePairingList";
import WineGrid from "@/components/wine/WineGrid";
import { getWine, wines } from "@/lib/wine/data";

export function generateStaticParams() {
  return wines.map((wine) => ({ slug: wine.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const wine = getWine(slug);
  return { title: wine ? wine.name : "Wine" };
}

export default async function WineDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const wine = getWine(slug);
  if (!wine) notFound();

  const related = wines
    .filter(
      (item) =>
        item.slug !== wine.slug &&
        (item.type === wine.type || item.region === wine.region)
    )
    .slice(0, 3);

  return (
    <LuxeShell>
      <WineDetailHero wine={wine} />

      <section className="px-3 py-6 md:px-5 md:py-10">
        <div className="mx-auto grid max-w-[1000px] gap-4 lg:grid-cols-2">
          <WineTastingNotes wine={wine} />
          <WinePairingList wine={wine} />
        </div>
      </section>

      <section className="px-3 py-8 md:px-5 md:py-12">
        <div className="mx-auto max-w-[1180px]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="lx-kicker">Keep exploring</p>
              <h2 className="lx-serif mt-2 text-4xl">Similar bottles.</h2>
            </div>
            <Link
              href="/wine"
              className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]"
            >
              Full cellar →
            </Link>
          </div>
          <div className="mt-5">
            <WineGrid wines={related} />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
