"use client";

export default function PaymentDemo({
  value,
  onChange,
}: {
  value: "PAY_AT_RESTAURANT" | "DEMO_CARD";
  onChange: (value: "PAY_AT_RESTAURANT" | "DEMO_CARD") => void;
}) {
  return (
    <div className="rounded-[22px] bg-[#fff4de] p-4">
      <p className="text-[9px] uppercase tracking-[.12em] text-[#8a5a21]">
        Payment method
      </p>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onChange("PAY_AT_RESTAURANT")}
          className={`rounded-[16px] border p-3 text-left ${
            value === "PAY_AT_RESTAURANT"
              ? "border-[#7c241e] bg-white"
              : "border-[#4a3025]/10"
          }`}
        >
          <p className="text-sm font-medium">Pay at restaurant</p>
          <p className="mt-1 text-[10px] text-[#75645d]">No online payment.</p>
        </button>

        <button
          type="button"
          onClick={() => onChange("DEMO_CARD")}
          className={`rounded-[16px] border p-3 text-left ${
            value === "DEMO_CARD"
              ? "border-[#7c241e] bg-white"
              : "border-[#4a3025]/10"
          }`}
        >
          <p className="text-sm font-medium">Card payment</p>
          <p className="mt-1 text-[10px] text-[#75645d]">Online payment preview.</p>
        </button>
      </div>

      {value === "DEMO_CARD" ? (
        <div className="mt-3 grid gap-2">
          <input
            disabled
            value="4242 4242 4242 4242"
            className="h-11 rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-sm text-[#75645d]"
            aria-label="Card number preview"
          />
          <p className="text-[9px] leading-5 text-[#75645d]">
            Card entry is shown as a preview only; no card details are collected on this screen.
          </p>
        </div>
      ) : null}
    </div>
  );
}
