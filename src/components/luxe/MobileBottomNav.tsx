"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  ["Home","/","⌂"],
  ["Menu","/menu","☰"],
  ["Book","/reservations","◉"],
  ["Explore","/experiences","✦"],
];

export default function MobileBottomNav(){
  const pathname=usePathname();

  return(
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-3 bottom-3 z-[120] rounded-[24px] border border-white/50 bg-[#201713]/92 p-2 text-white shadow-[0_18px_55px_rgba(31,18,13,.30)] backdrop-blur-xl md:hidden lx-bottom-safe"
    >
      <div className="grid grid-cols-4 gap-1">
        {items.map(([label,href,icon])=>{
          const active=pathname===href;
          return(
            <Link
              key={href}
              href={href}
              className={`flex min-h-14 flex-col items-center justify-center rounded-[18px] transition ${
                active ? "bg-[#a73b2b] text-white" : "text-white/56"
              }`}
            >
              <span className="text-lg leading-none">{icon}</span>
              <span className="mt-1 text-[8px] uppercase tracking-[.14em]">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
