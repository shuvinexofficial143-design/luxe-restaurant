"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

const nav = [
  ["Menu", "/menu"],
  ["Reservations", "/reservations"],
  ["About", "/about"],
  ["Chefs", "/chefs"],
  ["Private Dining", "/private-dining"],
  ["Gallery", "/gallery"],
  ["Experiences", "/experiences"],
  ["Journal", "/journal"],
  ["Contact", "/contact"],
];

type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  heroImage: string;
  children: ReactNode;
};

export default function LuxeSubpageShell({
  eyebrow,
  title,
  lead,
  heroImage,
  children,
}: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4ead9] text-[#1f1815]">
      <style>{`
        @keyframes luxeFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes luxeDrift {
          0%,100% { transform: scale(1.04) translate3d(0,0,0); }
          50% { transform: scale(1.08) translate3d(-1.2%,1%,0); }
        }
        .luxe-fade-up { animation: luxeFadeUp .9s cubic-bezier(.22,1,.36,1) both; }
        .luxe-fade-up-2 { animation: luxeFadeUp .9s .14s cubic-bezier(.22,1,.36,1) both; }
        .luxe-drift { animation: luxeDrift 18s ease-in-out infinite; }
        .luxe-link { position: relative; }
        .luxe-link::after {
          content:""; position:absolute; left:0; bottom:-5px; height:1px; width:100%;
          background:currentColor; transform:scaleX(0); transform-origin:right;
          transition:transform .35s cubic-bezier(.22,1,.36,1);
        }
        .luxe-link:hover::after { transform:scaleX(1); transform-origin:left; }
        .luxe-card { transition:transform .45s cubic-bezier(.22,1,.36,1), box-shadow .45s ease; }
        .luxe-card:hover { transform:translateY(-7px); box-shadow:0 24px 60px rgba(45,22,17,.16); }
        @media (prefers-reduced-motion: reduce) {
          .luxe-fade-up,.luxe-fade-up-2,.luxe-drift { animation:none !important; }
          .luxe-card { transition:none !important; }
        }
      `}</style>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#17100d]/70 text-white backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 md:px-10">
          <Link href="/" className="font-serif text-2xl tracking-[0.24em]">
            LUXE
          </Link>

          <nav className="hidden items-center gap-5 xl:flex">
            {nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={`luxe-link text-[11px] uppercase tracking-[0.16em] ${
                  pathname === href ? "text-[#f4b96f]" : "text-white/78"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/reservations"
              className="hidden border border-[#f4b96f]/80 px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] text-[#ffd59f] transition hover:bg-[#f4b96f] hover:text-[#1b100c] md:inline-flex"
            >
              Reserve
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation"
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center border border-white/20 xl:hidden"
            >
              <span className="text-lg">{open ? "×" : "☰"}</span>
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-white/10 bg-[#17100d] px-5 py-6 xl:hidden">
            <div className="grid gap-4 sm:grid-cols-2">
              {nav.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/10 pb-3 font-serif text-2xl text-white/90"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <section className="relative isolate flex min-h-[72vh] items-end overflow-hidden bg-[#261712] text-white">
        <div
          aria-hidden="true"
          className="luxe-drift absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url("${heroImage}")` }}
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(22,10,7,.25),rgba(22,10,7,.88))]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_22%,rgba(168,64,38,.34),transparent_34%)]" />

        <div className="mx-auto w-full max-w-[1500px] px-5 pb-16 pt-36 md:px-10 md:pb-20">
          <p className="luxe-fade-up mb-5 text-xs uppercase tracking-[0.35em] text-[#ffc37a]">
            {eyebrow}
          </p>
          <h1 className="luxe-fade-up max-w-5xl font-serif text-[clamp(3.6rem,9vw,8.5rem)] leading-[0.86] tracking-[-0.055em]">
            {title}
          </h1>
          <p className="luxe-fade-up-2 mt-8 max-w-2xl text-base leading-7 text-white/72 md:text-lg">
            {lead}
          </p>
        </div>
      </section>

      <main>{children}</main>

      <footer className="bg-[#1b100c] text-white">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-16 md:grid-cols-[1.25fr_.8fr_.8fr] md:px-10">
          <div>
            <p className="font-serif text-4xl tracking-[0.16em]">LUXE</p>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/58">
              Seasonal fine dining shaped by fire, provenance and thoughtful hospitality.
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#f4b96f]">Visit</p>
            <p className="mt-5 text-sm leading-7 text-white/70">
              18 Ember House, River Quarter<br />
              Ujjain, Madhya Pradesh<br />
              Tue–Sun · 6:00 PM–11:30 PM
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#f4b96f]">Explore</p>
            <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">
              {nav.slice(0, 8).map(([label, href]) => (
                <Link key={href} href={href} className="text-sm text-white/65 hover:text-white">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 px-5 py-6 text-center text-[10px] uppercase tracking-[0.2em] text-white/35">
          LUXE — Demo luxury restaurant experience
        </div>
      </footer>
    </div>
  );
}
