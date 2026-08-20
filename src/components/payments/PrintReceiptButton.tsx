"use client";

export default function PrintReceiptButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="h-12 w-full rounded-[16px] bg-[#335f50] text-[9px] uppercase tracking-[.11em] text-white print:hidden"
    >
      Print / Save receipt
    </button>
  );
}
