"use client";

import Link from "next/link";
import { useState } from "react";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <aside className="fixed bottom-3 left-3 right-3 z-[170] mx-auto max-w-3xl border border-white/12 bg-[#170c09]/96 p-5 text-white shadow-[0_24px_80px_rgba(0,0,0,.32)] backdrop-blur-xl md:bottom-5 md:p-6">
      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-[9px] uppercase tracking-[.26em] text-[#efb36c]">
            Demo privacy notice
          </p>
          <p className="mt-3 text-sm leading-6 text-white/58">
            No real booking, payment or analytics service is active in this portfolio demo.
            Review the{" "}
            <Link href="/privacy" className="text-[#efb36c] underline underline-offset-4">
              privacy page
            </Link>{" "}
            before connecting production services.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="lx-button min-h-11 shrink-0"
        >
          Got it
        </button>
      </div>
    </aside>
  );
}
