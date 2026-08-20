
import type { ReactNode } from "react";
import Link from "next/link";
import PolishProvider from "@/components/polish/PolishProvider";
import PolishLayer from "@/components/polish/PolishLayer";
import RouteFade from "@/components/polish/RouteFade";
import SkipToContent from "@/components/polish/SkipToContent";
import "@/styles/luxe-polish.css";
import "@/styles/luxe-dark-luxury.css";

const nav = [
  ["Menu", "/menu"],
  ["Reserve", "/reservations"],
  ["Experiences", "/experiences"],
  ["Wine", "/wine"],
  ["Story", "/chefs"],
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
        <header className="lx-safe-top fixed inset-x-0 top-0 z-[90] px-3 md:px-5">
          <div className="lx-luxury-shell mx-auto flex max-w-[1240px] items-center justify-between rounded-[20px] px-3 py-2.5">
            <Link
              href="/"
              className="lx-serif flex min-h-10 items-center px-2 text-2xl tracking-[.06em] text-[#ead7bb]"
            >
              LUXE
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {nav.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-full px-3 py-2 text-[7px] uppercase tracking-[.14em] text-white/42 transition hover:bg-white/[.04] hover:text-[#d9ae72]"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <Link
              href="/reservations"
              className="lx-gold-button flex min-h-10 items-center rounded-full px-4 text-[7px] uppercase tracking-[.13em]"
            >
              Reserve
            </Link>
          </div>
        </header>

        <main id="main-content">
          <RouteFade>{children}</RouteFade>
        </main>

        <footer className="px-3 pb-[96px] pt-12 md:px-5 md:pb-8">
          <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[28px] border border-[#e7c58f]/12 bg-[#0d0b08] p-6 md:p-8">
            <div className="grid gap-7 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="lx-serif text-4xl tracking-[.08em] text-[#e3c396]">
                  LUXE
                </p>
                <p className="mt-2 text-[7px] uppercase tracking-[.24em] text-[#a77d49]">
                  Modern fire dining · Ujjain
                </p>
                <p className="mt-4 max-w-xl text-[9px] leading-5 text-white/28">
                  Bold by fire. Refined by design. A premium restaurant experience
                  built around seasonal plates, wine and thoughtful hospitality.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  ["Menu", "/menu"],
                  ["Reserve", "/reservations"],
                  ["Contact", "/contact"],
                  ["Privacy", "/privacy"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="rounded-full border border-[#e7c58f]/12 px-4 py-3 text-[7px] uppercase tracking-[.1em] text-white/34"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-7 h-px bg-[linear-gradient(90deg,transparent,rgba(201,148,75,.24),transparent)]" />
            <p className="mt-4 text-center text-[6px] uppercase tracking-[.26em] text-[#725b40]">
              Bold by fire · refined by design
            </p>
          </div>
        </footer>
      </div>

      <PolishLayer />
    </PolishProvider>
  );
}
