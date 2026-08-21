"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { softHaptic } from "@/lib/polish/haptics";

const items = [
  ["Home", "/", "⌂", "#d8a04c"],
  ["Menu", "/menu", "≡", "#57b8ff"],
  ["Book", "/reservations", "◷", "#9d7cff"],
  ["Order", "/order/live", "▣", "#39c58f"],
  ["Account", "/account/secure", "○", "#ff6f91"],
] as const;

export default function MobileDock() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile quick navigation"
      className="lx-safe-bottom fixed inset-x-3 bottom-2 z-[100] md:hidden"
    >
      <div className="grid grid-cols-5 rounded-[22px] border border-white/10 bg-[#0a0907]/92 p-1.5 shadow-[0_22px_65px_rgba(0,0,0,.52)] backdrop-blur-2xl">
        {items.map(([label, href, icon, color]) => {
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
              className="flex min-h-[50px] flex-col items-center justify-center rounded-[16px] text-[7px] transition active:scale-[.96]"
              style={{
                background: active ? color : "transparent",
                color: active ? "#120d08" : color,
                boxShadow: active ? `0 0 26px ${color}33` : "none",
              }}
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
