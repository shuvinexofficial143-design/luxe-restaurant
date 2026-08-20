"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { softHaptic } from "@/lib/polish/haptics";

const items = [
  ["Home", "/", "⌂"],
  ["Menu", "/menu", "≡"],
  ["Book", "/reservations", "◷"],
  ["Order", "/order/live", "▣"],
  ["Account", "/account/secure", "○"],
];

export default function MobileDock() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile quick navigation"
      className="lx-safe-bottom fixed inset-x-3 bottom-2 z-[100] md:hidden"
    >
      <div className="grid grid-cols-5 rounded-[22px] border border-[#e7c58f]/14 bg-[#0a0907]/90 p-1.5 shadow-[0_22px_65px_rgba(0,0,0,.52)] backdrop-blur-2xl">
        {items.map(([label, href, icon]) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              onClick={softHaptic}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-[50px] flex-col items-center justify-center rounded-[16px] text-[7px] transition ${
                active
                  ? "bg-[#c9944b] text-[#120d08] shadow-[0_0_28px_rgba(201,148,75,.16)]"
                  : "text-[#8f7a60]"
              }`}
            >
              <span className="text-[15px] leading-none">{icon}</span>
              <span className="mt-1">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
