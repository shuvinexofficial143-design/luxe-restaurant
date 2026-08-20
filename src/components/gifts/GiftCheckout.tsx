"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { GiftDraft, GiftPaymentMethod } from "@/lib/gifts/types";
import { defaultGiftDraft, giftStorage } from "@/lib/gifts/storage";
import { giftServiceFee, giftTotal } from "@/lib/gifts/pricing";
import { createGiftCode, createGiftId } from "@/lib/gifts/utils";
import GiftPreview from "./GiftPreview";
import GiftSummary from "./GiftSummary";
import PaymentDemo from "./PaymentDemo";

export default function GiftCheckout() {
  const router = useRouter();
  const [draft] = useState<GiftDraft>(() =>
    typeof window !== "undefined" ? giftStorage.getDraft() : defaultGiftDraft
  );
  const [payment, setPayment] = useState<GiftPaymentMethod>("DEMO_CARD");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const id = createGiftId();

    giftStorage.savePurchase({
      ...draft,
      id,
      code: createGiftCode(),
      paymentMethod: payment,
      serviceFee: giftServiceFee(draft.amount),
      total: giftTotal(draft.amount),
      balance: draft.amount,
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    });

    giftStorage.clearDraft();
    router.push(`/gift-cards/confirmation/${id}`);
  }

  return (
    <form onSubmit={submit} className="grid gap-4 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <GiftPreview draft={draft} />
        <PaymentDemo value={payment} onChange={setPayment} />

        <div className="rounded-[22px] bg-[#fffaf4] p-5">
          <p className="lx-kicker">Delivery check</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[
              [draft.recipientName || "—", "recipient"],
              [draft.deliveryMethod, "method"],
              [draft.deliveryDate || "Immediate / print", "delivery date"],
              [draft.occasion, "occasion"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-[15px] bg-[#f3e7dc] p-3">
                <p className="text-sm">{value}</p>
                <p className="mt-1 text-[8px] uppercase tracking-[.1em] text-[#75645d]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3 lg:sticky lg:top-[110px] lg:self-start">
        <GiftSummary draft={draft} />
        <button className="h-14 w-full rounded-[18px] bg-[#7c241e] text-[10px] uppercase tracking-[.14em] text-white">
          Complete demo purchase ↗
        </button>
      </div>
    </form>
  );
}
