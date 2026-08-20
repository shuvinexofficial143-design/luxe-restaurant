import type { GiftPurchase } from "@/lib/gifts/types";
import { formatGiftMoney } from "@/lib/gifts/utils";

export default function GiftHistoryCard({
  gift,
}: {
  gift: GiftPurchase;
}) {
  return (
    <article className="rounded-[22px] bg-[#fffaf4] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[8px] uppercase tracking-[.12em] text-[#7c241e]">
            {gift.status}
          </p>
          <p className="lx-serif mt-1 text-2xl">{gift.recipientName || "Gift recipient"}</p>
          <p className="mt-1 text-[10px] text-[#75645d]">{gift.code}</p>
        </div>
        <p className="lx-serif text-2xl text-[#7c241e]">
          {formatGiftMoney(gift.balance)}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-[14px] bg-[#f3e7dc] p-3">
          <p className="text-[8px] uppercase tracking-[.1em] text-[#75645d]">Delivery</p>
          <p className="mt-1 text-sm">{gift.deliveryMethod}</p>
        </div>
        <div className="rounded-[14px] bg-[#f3e7dc] p-3">
          <p className="text-[8px] uppercase tracking-[.1em] text-[#75645d]">Created</p>
          <p className="mt-1 text-sm">{new Date(gift.createdAt).toLocaleDateString("en-IN")}</p>
        </div>
      </div>
    </article>
  );
}
