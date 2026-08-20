"use client";

import type { GiftPaymentMethod } from "@/lib/gifts/types";

export default function PaymentDemo({
  value,
  onChange,
}: {
  value: GiftPaymentMethod;
  onChange: (value: GiftPaymentMethod) => void;
}) {
  return (
    <div className="rounded-[24px] bg-[#fff4de] p-5">
      <p className="text-[9px] uppercase tracking-[.12em] text-[#8a5a21]">
        Payment
      </p>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {[
          ["DEMO_CARD", "Demo card", "No real charge"],
          ["PAY_AT_RESTAURANT", "Pay at restaurant", "Reservation-desk style"],
        ].map(([method, title, text]) => (
          <button
            key={method}
            type="button"
            onClick={() => onChange(method as GiftPaymentMethod)}
            className={`rounded-[16px] border p-4 text-left ${
              value === method
                ? "border-[#7c241e] bg-white"
                : "border-[#4a3025]/10"
            }`}
          >
            <p className="text-sm font-medium">{title}</p>
            <p className="mt-1 text-[10px] text-[#75645d]">{text}</p>
          </button>
        ))}
      </div>

      {value === "DEMO_CARD" ? (
        <div className="mt-3 grid grid-cols-[1fr_90px] gap-2">
          <input
            readOnly
            value="4242 4242 4242 4242"
            aria-label="Demo card number"
            className="h-11 rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-sm text-[#75645d]"
          />
          <input
            readOnly
            value="12/30"
            aria-label="Demo expiry"
            className="h-11 rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-sm text-[#75645d]"
          />
        </div>
      ) : null}

      <p className="mt-3 text-[9px] leading-5 text-[#75645d]">
        Portfolio demo only — no real payment or card processing occurs.
      </p>
    </div>
  );
}
