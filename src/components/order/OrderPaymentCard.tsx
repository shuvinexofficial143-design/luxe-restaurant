"use client";

import RazorpayCheckoutButton from "@/components/payments/RazorpayCheckoutButton";

export default function OrderPaymentCard({
  orderId,
  total,
  paymentStatus,
}: {
  orderId: string;
  total: number;
  paymentStatus: string;
}) {
  return (
    <div className="rounded-[22px] bg-[#7c241e] p-5 text-white">
      <p className="text-[10px] uppercase tracking-[.1em] text-[#ffd0aa]">
        Payment
      </p>
      <p className="lx-serif mt-2 text-3xl">
        ₹
        {Number(total).toLocaleString(
          "en-IN"
        )}
      </p>
      <p className="mt-2 text-[10px] uppercase tracking-[.09em] text-white/64">
        {paymentStatus}
      </p>

      {paymentStatus !== "PAID" ? (
        <div className="mt-4">
          <RazorpayCheckoutButton
            entityType="ORDER"
            entityId={orderId}
            label="Pay order securely"
          />
        </div>
      ) : (
        <div className="mt-4 rounded-[14px] bg-white/[.08] p-3 text-[10px] text-white/70">
          Payment recorded as PAID.
        </div>
      )}
    </div>
  );
}
