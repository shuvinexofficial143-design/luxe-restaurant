"use client";

import Link from "next/link";

const links = [
  ["Home", "/"],
  ["Menu", "/menu"],
  ["Reservations", "/reservations"],
  ["About", "/about"],
  ["Chefs", "/chefs"],
  ["Private Dining", "/private-dining"],
  ["Gallery", "/gallery"],
  ["Experiences", "/experiences"],
  ["Journal", "/journal"],
  ["Wine", "/wine"],
  ["Events", "/events"],
  ["Contact", "/contact"],
];

export default function MobileNavPanel({
  open,
  pathname,
  onClose,
  onSearch,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
  onSearch: () => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-[79] bg-[#130a08] text-white transition duration-500 xl:hidden ${
        open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
      }`}
      aria-hidden={!open}
    >
      <div className="lx-container flex h-full flex-col pb-6 pt-[98px]">
        <div className="grid flex-1 content-start gap-0 overflow-y-auto sm:grid-cols-2">
          {links.map(([label, href], index) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`group flex min-h-[72px] items-center justify-between border-b border-white/10 py-4 ${
                index % 2 === 0 ? "sm:pr-6" : "sm:pl-6"
              }`}
            >
              <span
                className={`lx-serif text-[clamp(1.75rem,7vw,2.8rem)] transition ${
                  pathname === href ? "text-[#efb36c]" : "text-white/88 group-hover:text-[#efb36c]"
                }`}
              >
                {label}
              </span>
              <span className="text-sm text-white/26">↗</span>
            </Link>
          ))}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onSearch}
            className="min-h-13 border border-white/15 px-5 text-left text-[10px] uppercase tracking-[.22em] text-white/70"
          >
            Search LUXE ⌕
          </button>
          <Link
            href="/reservations"
            onClick={onClose}
            className="flex min-h-13 items-center justify-between bg-[#6b231d] px-5 text-[10px] uppercase tracking-[.22em]"
          >
            Reserve a table <span>↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
