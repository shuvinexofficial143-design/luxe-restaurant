"use client";

import { giftDesigns } from "@/lib/gifts/designs";

export default function DesignSelector({
  value,
  occasion,
  onChange,
}: {
  value: string;
  occasion: string;
  onChange: (value: string) => void;
}) {
  const visible = giftDesigns.filter(
    (design) => occasion === "Any Occasion" || design.occasion === occasion || design.occasion === "Any Occasion"
  );

  return (
    <div>
      <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
        Card design
      </p>

      <div className="mt-3 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {visible.map((design) => (
          <button
            key={design.id}
            type="button"
            onClick={() => onChange(design.id)}
            className={`w-[150px] shrink-0 overflow-hidden rounded-[18px] border text-left ${
              value === design.id ? "border-[#7c241e] ring-2 ring-[#7c241e]/15" : "border-[#4a3025]/10"
            }`}
          >
            <div
              className="h-[100px] bg-cover bg-center"
              style={{ backgroundImage: `url("${design.image}")` }}
            />
            <div className="bg-[#fffaf4] p-3">
              <p className="lx-serif text-lg">{design.name}</p>
              <p className="mt-1 text-[8px] uppercase tracking-[.1em] text-[#75645d]">
                {design.occasion}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
