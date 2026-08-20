"use client";

import { useState } from "react";
import { evaluatePromo } from "@/lib/orders/promo";
import type { PromoResult } from "@/lib/orders/types";

export default function PromoCodeForm({
  subtotal,
  value,
  onChange,
}: {
  subtotal: number;
  value: PromoResult | null;
  onChange: (result: PromoResult | null) => void;
}) {
  const [code, setCode] = useState("");

  function apply() {
    if (!code.trim()) {
      onChange(null);
      return;
    }
    onChange(evaluatePromo(code, subtotal));
  }

  return (
    <div className="rounded-[20px] border border-[#4a3025]/10 bg-[#fffaf4] p-4">
      <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
        Promo code
      </p>

      <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
        <input
          value={code}
          onChange={(event) => setCode(event.target.value.toUpperCase())}
          placeholder="LUXE10"
          className="h-11 min-w-0 rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-sm uppercase outline-none"
        />
        <button
          type="button"
          onClick={apply}
          className="rounded-[14px] bg-[#201713] px-4 text-[9px] uppercase tracking-[.12em] text-white"
        >
          Apply
        </button>
      </div>

      {value ? (
        <p
          className={`mt-3 text-xs ${
            value.valid ? "text-[#335f50]" : "text-[#7c241e]"
          }`}
        >
          {value.valid ? "✓ " : ""}{value.label}
        </p>
      ) : null}

      <p className="mt-2 text-[9px] text-[#8a756b]">
        Demo codes: LUXE10 · EMBER250 · TASTING15
      </p>
    </div>
  );
}
