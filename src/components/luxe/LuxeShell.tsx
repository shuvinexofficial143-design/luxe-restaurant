import type { ReactNode } from "react";
import Link from "next/link";
import PolishProvider from "@/components/polish/PolishProvider";
import PolishLayer from "@/components/polish/PolishLayer";
import RouteFade from "@/components/polish/RouteFade";
import SkipToContent from "@/components/polish/SkipToContent";
import "@/styles/luxe-polish.css";
import "@/styles/luxe-dark-luxury.css";

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
            <div className="mx-auto flex h-[58px] max-w-[1240px] items-center gap-2 px-3 md:h-[66px] md:px-5">
              <Link
                href="/"
                className="lx-serif shrink-0 text-[1.72rem] leading-none tracking-[.06em] text-[#ead7bb] md:text-3xl"
              >
                LUXE
              </Link>

              <Link
                href="/menu"
                className="ml-1 flex h-9 min-w-0 flex-1 items-center rounded-full border border-[#e7c58f]/10 bg-white/[.03] px-3 text-[9px] text-white/34 transition hover:border-[#c9944b]/30 md:ml-4 md:h-10 md:text-xs"
              >
                <span className="mr-2 text-[#c9944b]">⌕</span>
                <span className="truncate">Search dishes...</span>
              </Link>

              <Link
                href="/reservations"
                className="lx-gold-button ml-1 flex min-h-9 shrink-0 items-center rounded-full px-3.5 text-[7px] font-semibold uppercase tracking-[.12em] md:px-4"
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
        ) : null}
      </div>

      <PolishLayer />
    </PolishProvider>
  );
}
