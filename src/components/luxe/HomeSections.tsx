import Link from "next/link";
import LuxurySectionHeading from "./redesign/LuxurySectionHeading";

const banners = [
  {
    number: "01",
    eyebrow: "Signature menu",
    title: "See tonight's menu",
    text: "Open dishes, dietary filters, favourites and full dish details on a dedicated page.",
    href: "/menu",
    accent: "from-[#3a1b0d] via-[#17100b] to-[#0a0806]",
    glow: "bg-[#c56f2a]/20",
  },
  {
    number: "02",
    eyebrow: "Dining experiences",
    title: "Choose your evening",
    text: "Chef's table, wine evenings and private dining now open as proper pages.",
    href: "/experiences",
    accent: "from-[#1d1710] via-[#0e0c09] to-[#181007]",
    glow: "bg-[#d7a65e]/14",
  },
  {
    number: "03",
    eyebrow: "Reservations",
    title: "Book your table",
    text: "Go straight into the reservation flow instead of scrolling through the homepage.",
    href: "/reservations",
    accent: "from-[#2c130e] via-[#120c09] to-[#090806]",
    glow: "bg-[#9f4a2c]/18",
  },
  {
    number: "04",
    eyebrow: "Member access",
    title: "Your LUXE account",
    text: "Loyalty, saved dishes, booking history and preferences live on their own dashboard.",
    href: "/account/secure",
    accent: "from-[#17130f] via-[#0e0c0a] to-[#080705]",
    glow: "bg-[#c9944b]/12",
  },
];

export default function HomeSections() {
  return (
    <section className="px-3 py-7 md:px-5 md:py-12">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-5 flex items-end justify-between gap-4 md:mb-7">
          <LuxurySectionHeading
            eyebrow="Explore LUXE"
            title="Choose a destination."
            italic="Open a real page."
            text="The homepage is intentionally short now. Tap once and move into the actual feature instead of flying down a long scrolling page."
          />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {banners.map((banner) => (
            <Link
              key={banner.href}
              href={banner.href}
              className={`group relative min-h-[170px] overflow-hidden rounded-[26px] border border-[#e7c58f]/12 bg-gradient-to-br ${banner.accent} p-5 shadow-[0_20px_55px_rgba(0,0,0,.22)] transition duration-300 active:scale-[.985] md:min-h-[210px] md:p-7 md:hover:-translate-y-1 md:hover:border-[#c9944b]/38 md:hover:shadow-[0_28px_80px_rgba(0,0,0,.4)]`}
            >
              <div
                className={`absolute -right-14 -top-16 h-52 w-52 rounded-full ${banner.glow} blur-3xl transition duration-500 group-hover:scale-125`}
              />
              <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(201,148,75,.38),transparent)]" />

              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-[8px] text-[#8e6c44]">{banner.number}</span>
                    <span className="h-px w-8 bg-[#c9944b]/45" />
                    <p className="text-[7px] uppercase tracking-[.22em] text-[#c9944b]">
                      {banner.eyebrow}
                    </p>
                  </div>

                  <h2 className="lx-serif mt-4 max-w-md text-[2rem] leading-[.92] tracking-[-.03em] text-[#f2e4d2] md:text-[2.65rem]">
                    {banner.title}
                  </h2>

                  <p className="mt-3 max-w-md text-[10px] leading-5 text-white/38 md:text-[11px]">
                    {banner.text}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-[7px] uppercase tracking-[.16em] text-[#c49a65]">
                    Open page
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-[#c9944b]/24 bg-black/20 text-lg text-[#d4a25d] transition duration-300 group-hover:bg-[#c9944b] group-hover:text-[#120c07]">
                    ↗
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-center">
          <Link
            href="/wine"
            className="rounded-full border border-[#e7c58f]/12 bg-white/[.02] px-4 py-3 text-[7px] uppercase tracking-[.14em] text-[#a98b68] transition hover:border-[#c9944b]/35 hover:text-[#dfbd88]"
          >
            Wine cellar ↗
          </Link>
          <Link
            href="/chefs"
            className="rounded-full border border-[#e7c58f]/12 bg-white/[.02] px-4 py-3 text-[7px] uppercase tracking-[.14em] text-[#a98b68] transition hover:border-[#c9944b]/35 hover:text-[#dfbd88]"
          >
            Meet the chefs ↗
          </Link>
          <Link
            href="/location"
            className="rounded-full border border-[#e7c58f]/12 bg-white/[.02] px-4 py-3 text-[7px] uppercase tracking-[.14em] text-[#a98b68] transition hover:border-[#c9944b]/35 hover:text-[#dfbd88]"
          >
            Visit LUXE ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
