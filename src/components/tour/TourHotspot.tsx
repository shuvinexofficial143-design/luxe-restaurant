"use client";

import { useState } from "react";
import type { TourHotspotData } from "@/lib/media/types";

export default function TourHotspot({
  hotspot,
}: {
  hotspot: TourHotspotData;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="absolute z-20"
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-[#7c241e] text-sm text-white shadow-lg"
        aria-label={hotspot.label}
      >
        +
      </button>

      {open ? (
        <div className="absolute left-5 top-5 w-[210px] rounded-[16px] bg-[#fffaf4] p-3 text-[#201713] shadow-2xl">
          <p className="lx-serif text-lg">{hotspot.label}</p>
          <p className="mt-1 text-[10px] leading-5 text-[#75645d]">
            {hotspot.text}
          </p>
        </div>
      ) : null}
    </div>
  );
}
