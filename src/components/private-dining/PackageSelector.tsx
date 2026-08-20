"use client";

import { privateDiningPackages } from "@/lib/private-dining/data";

export default function PackageSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {privateDiningPackages.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item.id)}
          className={`rounded-[22px] border p-4 text-left ${
            value === item.id
              ? "border-[#7c241e] bg-[#7c241e] text-white"
              : "border-[#4a3025]/10 bg-[#fffaf4]"
          }`}
        >
          <p className="lx-serif text-2xl">{item.name}</p>
          <p className="mt-2 text-xs leading-6 opacity-65">
            {item.description}
          </p>
          <p className="lx-serif mt-4 text-xl">
            ₹{item.pricePerGuest.toLocaleString("en-IN")} / guest
          </p>

          <div className="mt-4 space-y-1.5">
            {item.inclusions.map((inclusion) => (
              <p key={inclusion} className="text-[9px] leading-5 opacity-70">
                ✓ {inclusion}
              </p>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}
