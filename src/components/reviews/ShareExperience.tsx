"use client";

import { useState } from "react";
import { reviewShareText, shareUrl } from "@/lib/reviews/share";

export default function ShareExperience() {
  const [message, setMessage] = useState("");

  async function share() {
    const text = reviewShareText("A night at LUXE", 5);
    const url = shareUrl("/reviews");

    try {
      if (navigator.share) {
        await navigator.share({ title: "LUXE", text, url });
        setMessage("Share sheet opened.");
        return;
      }

      await navigator.clipboard.writeText(`${text} ${url}`);
      setMessage("Share text copied.");
    } catch {
      setMessage("Share cancelled.");
    }
  }

  return (
    <div className="rounded-[24px] bg-[#201713] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.14em] text-[#efc28b]">Share LUXE</p>
      <h2 className="lx-serif mt-2 text-3xl">Tell someone about it.</h2>
      <p className="mt-3 text-xs leading-6 text-white/50">
        Use the device share sheet when supported, otherwise copy a simple review link.
      </p>

      <button
        type="button"
        onClick={share}
        className="mt-5 h-12 w-full rounded-[16px] bg-white text-[9px] uppercase tracking-[.12em] text-[#201713]"
      >
        Share experience ↗
      </button>

      {message ? <p className="mt-3 text-[10px] text-[#efc28b]">{message}</p> : null}
    </div>
  );
}
