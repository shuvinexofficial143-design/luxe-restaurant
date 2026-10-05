import Image from "next/image";
import Link from "next/link";
import LuxeShell from "@/components/luxe/LuxeShell";
import PageHero from "@/components/luxe/PageHero";

const experiences = [
  ["Chef's Table","8 seats · kitchen-side","https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=88","/experiences/chefs-table"],
  ["Seasonal Tasting","7 courses · nightly","https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=88","/experiences/seasonal-tasting"],
  ["Wine Pairing Night","monthly cellar dinner","https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1400&q=88","/experiences/wine-pairing-evening"],
  ["Sunday Brunch","11:30 AM onwards","https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=88","/experiences/sunday-brunch"],
] as const;

export const metadata = {
  title: "Experiences · LUXE",
  description:
    "Explore chef-led dinners, seasonal tasting menus, wine evenings and Sunday brunch at LUXE.",
};

export default function ExperiencesPage() {
  return (
    <LuxeShell>
      <PageHero
        eyebrow="Choose your evening"
        title="Experiences"
        text="Four distinct ways to spend time at LUXE, from the kitchen-side chef table to a long Sunday brunch."
        image="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=2200&q=88"
      />

      <section className="px-3 py-8 md:px-5 md:py-14">
        <div className="mx-auto grid max-w-[1180px] gap-4 md:grid-cols-2">
          {experiences.map(([title, meta, image, href], index) => (
            <Link
              key={href}
              href={href}
              className="group overflow-hidden rounded-[26px] border border-[#e7c58f]/10 bg-[#11100d]"
            >
              <div className="relative h-[360px] overflow-hidden md:h-[460px]">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
                <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-[#201713]/84 px-3 py-2 text-[10px] uppercase tracking-[.14em] text-[#efc28b] backdrop-blur-md">
                  0{index + 1}
                </span>
              </div>

              <div className="flex items-end justify-between gap-4 p-5 md:p-7">
                <div>
                  <p className="lx-serif text-3xl text-[#f0e2cf] md:text-4xl">
                    {title}
                  </p>
                  <p className="mt-2 text-sm text-white/48">{meta}</p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#c9944b] text-[#100c08]">
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </LuxeShell>
  );
}
