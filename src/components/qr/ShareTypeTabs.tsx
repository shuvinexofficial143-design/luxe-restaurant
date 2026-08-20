"use client";

import type { QRShareType } from "@/lib/qr/types";
import { qrTypeLabel } from "@/lib/qr/utils";

const types: QRShareType[] = [
  "MENU",
  "RESERVATION",
  "EVENT",
  "GIFT",
  "CUSTOM",
];

export default function ShareTypeTabs({
  value,
  onChange,
}: {
  value: QRShareType;
  onChange: (value: QRShareType) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {types.map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => onChange(type)}
          className={`shrink-0 rounded-full px-4 py-3 text-[8px] uppercase tracking-[.11em] ${
            value === type
              ? "bg-[#201713] text-white"
              : "border border-[#4a3025]/10 bg-white"
          }`}
        >
          {qrTypeLabel(type)}
        </button>
      ))}
    </div>
  );
}
