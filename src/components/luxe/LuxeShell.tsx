import type { ReactNode } from "react";
import Link from "next/link";
import PolishProvider from "@/components/polish/PolishProvider";
import PolishLayer from "@/components/polish/PolishLayer";
import RouteFade from "@/components/polish/RouteFade";
import SkipToContent from "@/components/polish/SkipToContent";
import "@/styles/luxe-polish.css";
import "@/styles/luxe-dark-luxury.css";

const nav = [
  ["All Menu", "/menu"],
  ["Chef Choice", "/menu/chef-choice"],
  ["Vegetarian", "/menu/vegetarian"],
  ["Vegan", "/menu/vegan"],
  ["Tasting", "/menu/tasting"],
  ["Wine", "/wine"],
];

export default function LuxeShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PolishProvider>
      <SkipToContent />

      <div className="lx-dark-page">
        <header className="sticky top-0 z-[90] border-b border-[#e7c58f]/10 bg-[#090806]/95 backdrop-blur-2xl">
          <div className="border-b border-[#e7c58f]/8 bg-[#0d0b08] px-3 py-1.5 text-center text-[7px] uppercase tracking-[.14em] text-white/38">
            Dinner delivery after 6 PM · Secure booking · Ujjain
          </div>

          <div className="mx-auto max-w-[1240px] px-3 py-2 md:px-5">
            <div className="flex items-center gap-2 md:gap-4">
              <Link
                href="/"
                className="lx-serif shrink-0 text-2xl tracking-[.06em] text-[#ead7bb] md:text-3xl"
              >
                LUXE
              </Link>

              <Link
                href="/menu"
                className="hidden h-11 flex-1 items-center rounded-full border border-[#e7c58f]/12 bg-white/[.035] px-4 text-xs text-white/30 transition hover:border-[#c9944b]/30 md:flex"
              >
                <span className="mr-2 text-[#c9944b]">⌕</span>
                Search dishes, ingredients and categories
              </Link>

              <Link
                href="/account/secure"
                className="hidden rounded-full px-3 py-2 text-[8px] uppercase tracking-[.1em] text-white/42 lg:block"
              >
                Account
              </Link>

              <Link
                href="/reservations"
                className="lx-gold-button ml-auto flex min-h-10 shrink-0 items-center rounded-full px-4 text-[7px] uppercase tracking-[.13em]"
              >
                Reserve
              </Link>
            </div>

            <Link
              href="/menu"
              className="mt-2 flex h-10 items-center rounded-full border border-[#e7c58f]/12 bg-white/[.035] px-4 text-[10px] text-white/30 md:hidden"
            >
              <span className="mr-2 text-[#c9944b]">⌕</span>
              Search dishes, ingredients...
            </Link>
          </div>

          <nav className="mx-auto flex max-w-[1240px] gap-1 overflow-x-auto px-3 pb-2 md:px-5">
            {nav.map(([label, href], index) => (
              <Link
                key={href}
                href={href}
                className={`shrink-0 rounded-full px-3 py-2 text-[7px] uppercase tracking-[.1em] transition ${
                  index === 0
                    ? "bg-[#c9944b] text-[#120d08]"
                    : "border border-[#e7c58f]/10 bg-white/[.018] text-white/40 hover:border-[#c9944b]/25 hover:text-[#d8b278]"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </header>

        <main id="main-content">
          <RouteFade>{children}</RouteFade>
        </main>

        <footer className="px-3 pb-[96px] pt-10 md:px-5 md:pb-8">
          <div className="mx-auto max-w-[1240px] rounded-[24px] border border-[#e7c58f]/10 bg-[#0d0b08] p-5 md:p-7">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="lx-serif text-3xl tracking-[.08em] text-[#e3c396]">
                  LUXE
                </p>
                <p className="mt-2 text-[7px] uppercase tracking-[.2em] text-[#a77d49]">
                  Modern fire dining · Ujjain
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  ["Menu", "/menu"],
                  ["Order", "/order/live"],
                  ["Reserve", "/reservations"],
                  ["Contact", "/contact"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="rounded-full border border-[#e7c58f]/10 px-3 py-2 text-[7px] uppercase tracking-[.1em] text-white/34"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>

      <PolishLayer />
    </PolishProvider>
  );
}
