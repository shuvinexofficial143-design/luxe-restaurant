"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { softHaptic } from "@/lib/polish/haptics";

const items = [
  ["Home", "/", "⌂", "#d8a04c"],
  ["Menu", "/menu", "≡", "#c9944b"],
  ["Book", "/reservations", "◷", "#e0b779"],
  ["Order", "/order", "▣", "#b07b4d"],
  ["Account", "/account/secure", "○", "#c7a27a"],
] as const;

export default function MobileDock() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile quick navigation"
      className="lx-safe-bottom fixed inset-x-2.5 bottom-1.5 z-[100] md:hidden"
    >
      <div className="grid grid-cols-5 rounded-[20px] border border-white/12 bg-[#070705]/96 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,.7)] backdrop-blur-2xl">
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
              className="flex min-h-[52px] flex-col items-center justify-center rounded-[15px] text-[10px] font-semibold transition active:scale-[.96]"
              style={{
                background: active ? color : "transparent",
                color: active ? "#090806" : color,
                boxShadow: active ? `0 0 28px ${color}35` : "none",
              }}
            >
              <span className="text-[17px] font-black leading-none">{icon}</span>
              <span className="mt-1 tracking-[.01em]">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
