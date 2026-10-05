import type { ReactNode } from "react";
import Link from "next/link";
import PolishProvider from "@/components/polish/PolishProvider";
import PolishLayer from "@/components/polish/PolishLayer";
import RouteFade from "@/components/polish/RouteFade";
import SkipToContent from "@/components/polish/SkipToContent";
import { site } from "@/data/site";
import "@/styles/luxe-polish.css";
import "@/styles/luxe-dark-luxury.css";

const primaryNav = [
  ["Menu", "/menu"],
  ["Experiences", "/experiences"],
  ["Private Dining", "/private-dining"],
  ["Gallery", "/gallery"],
  ["Visit", "/location"],
  ["About", "/about"],
] as const;

const footerNav = [
  ["Menu", "/menu"],
  ["Experiences", "/experiences"],
  ["Private Dining", "/private-dining"],
  ["Gallery", "/gallery"],
  ["Wine", "/wine"],
  ["Our Chefs", "/chefs"],
] as const;

export default function LuxeShell({
  children,
  hideHeader = false,
  hideFooter = false,
}: {
  children: ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
}) {
  return (
    <PolishProvider>
      <SkipToContent />

      <div className="lx-dark-page">
        <div aria-hidden="true" className="lx-color-field">
          <i className="lx-color-blob lx-color-blob-a" />
          <i className="lx-color-blob lx-color-blob-b" />
          <i className="lx-color-blob lx-color-blob-c" />
        </div>

        {!hideHeader ? (
          <header className="sticky top-0 z-[90] border-b border-[#e7c58f]/8 bg-[#090806]/92 backdrop-blur-2xl">
            <div className="mx-auto flex h-[60px] max-w-[1240px] items-center gap-3 px-3 md:h-[68px] md:px-5">
              <Link
                href="/"
                className="lx-serif shrink-0 text-[1.72rem] leading-none tracking-[.06em] text-[#ead7bb] md:text-3xl"
                aria-label="LUXE home"
              >
                LUXE
              </Link>

              <nav
                aria-label="Primary navigation"
                className="ml-5 hidden min-w-0 flex-1 items-center justify-center gap-5 lg:flex xl:gap-7"
              >
                {primaryNav.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="whitespace-nowrap text-[10px] uppercase tracking-[.12em] text-white/52 transition hover:text-[#e0b779]"
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <Link
                href="/menu"
                className="ml-auto flex h-9 min-w-0 flex-1 items-center rounded-full border border-[#e7c58f]/10 bg-white/[.03] px-3 text-[10px] text-white/52 transition hover:border-[#c9944b]/30 hover:text-[#ead9be] lg:hidden"
              >
                <span className="mr-2 text-[#c9944b]" aria-hidden>
                  ⌕
                </span>
                <span className="truncate">Menu & search</span>
              </Link>

              <Link
                href="/reservations"
                className="lx-gold-button flex min-h-9 shrink-0 items-center rounded-full px-4 text-[9px] font-semibold uppercase tracking-[.12em] md:px-5"
              >
                Reserve
              </Link>
            </div>
          </header>
        ) : null}

        <main id="main-content">
          <RouteFade>{children}</RouteFade>
        </main>

        {!hideFooter ? (
          <footer className="px-3 pb-[96px] pt-10 md:px-5 md:pb-8 md:pt-14">
            <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[28px] border border-[#e7c58f]/10 bg-[#0d0b08]">
              <div className="grid gap-8 p-5 md:grid-cols-2 md:p-8 lg:grid-cols-[1.2fr_.8fr_.9fr] lg:gap-12">
                <div>
                  <p className="lx-serif text-4xl tracking-[.08em] text-[#e3c396]">
                    LUXE
                  </p>
                  <p className="mt-3 text-[10px] uppercase tracking-[.18em] text-[#b88b53]">
                    {site.tagline}
                  </p>
                  <p className="mt-4 max-w-md text-sm leading-6 text-white/46">
                    Seasonal plates, open-fire cooking and thoughtful hospitality
                    in Vijay Nagar, Indore.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link
                      href="/reservations"
                      className="lx-gold-button rounded-full px-4 py-3 text-[9px] font-semibold uppercase tracking-[.11em]"
                    >
                      Reserve a table
                    </Link>
                    <Link
                      href="/location"
                      className="rounded-full border border-[#e7c58f]/14 px-4 py-3 text-[9px] uppercase tracking-[.11em] text-[#e5cfaf]"
                    >
                      Plan your visit
                    </Link>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#c9944b]">
                    Explore
                  </p>
                  <nav aria-label="Footer navigation" className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3">
                    {footerNav.map(([label, href]) => (
                      <Link
                        key={href}
                        href={href}
                        className="text-sm text-white/48 transition hover:text-[#e0b779]"
                      >
                        {label}
                      </Link>
                    ))}
                  </nav>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#c9944b]">
                    Visit
                  </p>
                  <p className="mt-4 text-sm leading-6 text-white/58">
                    {site.address.line1}
                    <br />
                    {site.address.line2}
                  </p>

                  <div className="mt-4 space-y-2">
                    {site.hours.map((item) => (
                      <div key={item.days} className="text-xs leading-5">
                        <span className="text-white/62">{item.days}</span>
                        <span className="block text-white/34">{item.time}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={site.address.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex text-[10px] uppercase tracking-[.13em] text-[#d3a762] hover:text-[#efc98f]"
                  >
                    Open directions ↗
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-2 border-t border-[#e7c58f]/8 px-5 py-4 text-[10px] text-white/28 sm:flex-row sm:items-center sm:justify-between md:px-8">
                <span>© 2026 {site.legalName}</span>
                <span>Indore, Madhya Pradesh · Reservations recommended</span>
              </div>
            </div>
          </footer>
        ) : null}
      </div>

      <PolishLayer />
    </PolishProvider>
  );
}
