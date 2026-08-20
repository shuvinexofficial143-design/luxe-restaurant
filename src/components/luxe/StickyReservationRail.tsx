"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function StickyReservationRail() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.75);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      href="/reservations"
      className={`fixed right-0 top-1/2 z-[70] hidden -translate-y-1/2 border-y border-l border-[#efb36c]/40 bg-[#170c09]/92 px-3 py-5 text-[9px] uppercase tracking-[.28em] text-[#efc68f] backdrop-blur-xl transition duration-500 xl:block ${
        show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
      style={{ writingMode: "vertical-rl" }}
    >
      Reserve a table ↗
    </Link>
  );
}
