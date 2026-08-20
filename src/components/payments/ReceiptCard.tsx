import type {
  BillingReceiptRow,
} from "@/lib/server/billing/types";

export default function ReceiptCard({
  receipt,
}: {
  receipt: BillingReceiptRow;
}) {
  const rows = [
    ["Receipt", receipt.receipt_number],
    ["For", receipt.entity_type],
    ["Reference", receipt.entity_id],
    [
      "Amount",
      `₹${Number(
        receipt.amount
      ).toLocaleString("en-IN")}`,
    ],
    ["Payment ID", receipt.payment_id || "—"],
    [
      "Issued",
      new Date(
        receipt.issued_at
      ).toLocaleString("en-IN"),
    ],
  ];

  return (
    <article
      id="luxe-receipt"
      className="rounded-[30px] bg-[#fffaf4] p-6 text-[#201713] md:p-8"
    >
      <p className="text-[9px] uppercase tracking-[.14em] text-[#7c241e]">
        LUXE Restaurant
      </p>
      <h1 className="lx-serif mt-2 text-5xl">
        Payment receipt.
      </h1>

      <div className="mt-6 space-y-2">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-start justify-between gap-4 rounded-[14px] bg-white p-3"
          >
            <span className="text-[8px] uppercase tracking-[.09em] text-[#75645d]">
              {label}
            </span>
            <span className="max-w-[70%] text-right text-xs">
              {value}
            </span>
          </div>
        ))}
      </div>

      {receipt.customer_name ? (
        <div className="mt-4 rounded-[16px] bg-[#f3e7dc] p-4">
          <p className="lx-serif text-2xl">
            {receipt.customer_name}
          </p>
          <p className="mt-1 text-[9px] text-[#75645d]">
            {receipt.customer_email ||
              receipt.customer_phone ||
              "Guest"}
          </p>
        </div>
      ) : null}
    </article>
  );
}
