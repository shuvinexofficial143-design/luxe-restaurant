"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { GiftDraft } from "@/lib/gifts/types";
import { defaultGiftDraft, giftStorage } from "@/lib/gifts/storage";
import AmountSelector from "./AmountSelector";
import DesignSelector from "./DesignSelector";
import OccasionChips from "./OccasionChips";
import RecipientDetails from "./RecipientDetails";
import DeliveryScheduler from "./DeliveryScheduler";
import GiftMessageEditor from "./GiftMessageEditor";
import GiftPreview from "./GiftPreview";
import GiftSummary from "./GiftSummary";

export default function GiftBuilder() {
  const router = useRouter();
  const [draft, setDraft] = useState<GiftDraft>(defaultGiftDraft);

  function update(patch: Partial<GiftDraft>) {
    setDraft((current) => ({ ...current, ...patch }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    giftStorage.saveDraft(draft);
    router.push("/gift-cards/checkout");
  }

  return (
    <form onSubmit={submit} className="grid gap-5 lg:grid-cols-[1fr_390px]">
      <div className="space-y-5">
        <div className="rounded-[26px] bg-[#fffaf4] p-5">
          <p className="lx-kicker">01 · Value</p>
          <div className="mt-4">
            <AmountSelector value={draft.amount} onChange={(amount) => update({ amount })} />
          </div>
        </div>

        <div className="rounded-[26px] bg-[#fffaf4] p-5">
          <p className="lx-kicker">02 · Occasion + design</p>
          <div className="mt-4">
            <OccasionChips
              value={draft.occasion}
              onChange={(occasion) => update({ occasion })}
            />
          </div>
          <div className="mt-5">
            <DesignSelector
              value={draft.designId}
              occasion={draft.occasion}
              onChange={(designId) => update({ designId })}
            />
          </div>
        </div>

        <div className="rounded-[26px] bg-[#fffaf4] p-5">
          <p className="lx-kicker">03 · Who is it for?</p>
          <div className="mt-4">
            <RecipientDetails
              recipientName={draft.recipientName}
              recipientEmail={draft.recipientEmail}
              senderName={draft.senderName}
              senderEmail={draft.senderEmail}
              onChange={update}
            />
          </div>
          <div className="mt-4">
            <GiftMessageEditor
              value={draft.message}
              onChange={(message) => update({ message })}
            />
          </div>
        </div>

        <div className="rounded-[26px] bg-[#fffaf4] p-5">
          <p className="lx-kicker">04 · Delivery</p>
          <div className="mt-4">
            <DeliveryScheduler
              method={draft.deliveryMethod}
              date={draft.deliveryDate}
              onMethod={(deliveryMethod) => update({ deliveryMethod })}
              onDate={(deliveryDate) => update({ deliveryDate })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3 lg:sticky lg:top-[110px] lg:self-start">
        <GiftPreview draft={draft} />
        <GiftSummary draft={draft} />

        <button className="h-14 w-full rounded-[18px] bg-[#7c241e] text-[10px] uppercase tracking-[.14em] text-white">
          Continue to checkout ↗
        </button>
      </div>
    </form>
  );
}
