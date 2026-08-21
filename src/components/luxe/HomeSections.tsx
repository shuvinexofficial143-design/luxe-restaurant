import Link from "next/link";
import FloatingMenuDeck from "./redesign/FloatingMenuDeck";
import LuxurySectionHeading from "./redesign/LuxurySectionHeading";
import LuxuryMarquee from "./redesign/LuxuryMarquee";

const banners = [
  {
    eyebrow: "Signature menu",
    title: "See what is firing tonight.",
    text: "Open the full menu, dietary filters, favourites and dish details.",
    href: "/menu",
    tone: "from-[#2a160d] via-[#130d09] to-[#0b0907]",
  },
  {
    eyebrow: "Chef's table",
    title: "Choose the way you want to dine.",
    text: "Chef's table, wine evenings and private dining open as their own pages.",
    href: "/experiences",
    tone: "from-[#17120d] via-[#0f0c09] to-[#171008]",
  },
  {
    eyebrow: "Reserve",
    title: "Find your table without endless scrolling.",
    text: "Open the booking flow directly and choose guests, date, time and table.",
    href: "/reservations",
    tone: "from-[#21120d] via-[#100c09] to-[#0a0907]",
  },
  {
    eyebrow: "Member access",
    title: "Loyalty, history and preferences.",
    text: "Open your LUXE account dashboard as a dedicated page.",
    href: "/account/secure",
    tone: "from-[#15120f] via-[#0f0d0b] to-[#090806]",
  },
];

export default function HomeSections() {
  return (
    <>
      <section className="px-3 pt-5 md:px-5 md:pt-8">
        <div className="mx-auto max-w-[1240px]">
          <LuxuryMarquee />
        </div>
      </section>

      <section className="px-3 py-9 md:px-5 md:py-14">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex items-end justify-between gap-5">
            <LuxurySectionHeading
              eyebrow="Tonight's menu"
              title="A menu that"
              italic="moves."
              text="Swipe the animated menu boards, then open the real menu page instead of scrolling through a giant homepage."
            />
            <Link
              href="/menu"
              className="hidden rounded-full border border-[#e7c58f]/14 px-4 py-3 text-[8px] uppercase tracking-[.16em] text-[#c9944b] transition hover:bg-[#c9944b]/10 md:block"
            >
              Open full menu ↗
            </Link>
          </div>

          <FloatingMenuDeck />
        </div>
      </section>

      <section className="px-3 pb-10 md:px-5 md:pb-16">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-5 flex items-end justify-between gap-5">
            <LuxurySectionHeading
              eyebrow="Explore LUXE"
              title="Tap a destination."
              italic="Open a real page."
              text="The homepage is now a compact gateway. Major sections no longer depend on fast scroll jumps."
            />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {banners.map((banner, index) => (
              <Link
                key={banner.href}
                href={banner.href}
                className={`group relative min-h-[185px] overflow-hidden rounded-[26px] border border-[#e7c58f]/12 bg-gradient-to-br ${banner.tone} p-5 transition duration-300 hover:-translate-y-1 hover:border-[#c9944b]/35 hover:shadow-[0_24px_70px_rgba(0,0,0,.38)] md:min-h-[220px] md:p-7`}
              >
                <div className="absolute -right-10 -top-16 h-44 w-44 rounded-full border border-[#c9944b]/15 shadow-[0_0_70px_rgba(201,148,75,.08)] transition duration-500 group-hover:scale-110" />
                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-[7px] text-[#8b6a42]">0{index + 1}</span>
                      <span className="h-px w-7 bg-[#c9944b]/45" />
                      <p className="text-[7px] uppercase tracking-[.2em] text-[#c9944b]">
                        {banner.eyebrow}
                      </p>
                    </div>
                    <h3 className="lx-serif mt-4 max-w-md text-3xl leading-[.95] text-[#f1e3d0] md:text-4xl">
                      {banner.title}
                    </h3>
                    <p className="mt-3 max-w-md text-[10px] leading-5 text-white/35">
                      {banner.text}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-[7px] uppercase tracking-[.15em] text-[#b9935f]">
                      Open page
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-[#c9944b]/20 text-[#d2a15d] transition duration-300 group-hover:bg-[#c9944b] group-hover:text-[#100b07]">
                      ↗
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
