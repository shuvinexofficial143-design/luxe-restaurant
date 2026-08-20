import type { GiftDraft } from "@/lib/gifts/types";
import { giftServiceFee, giftTotal } from "@/lib/gifts/pricing";
import { formatGiftMoney } from "@/lib/gifts/utils";

export default function GiftSummary({
  draft,
}: {
  draft: GiftDraft;
}) {
  return (
    <aside className="rounded-[26px] bg-[#201713] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.14em] text-[#efc28b]">
        Gift summary
      </p>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-white/45">Gift value</span>
          <span>{formatGiftMoney(draft.amount)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-white/45">Demo service fee</span>
          <span>{formatGiftMoney(giftServiceFee(draft.amount))}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-white/45">Delivery</span>
          <span>{draft.deliveryMethod === "EMAIL" ? "Email" : "Print"}</span>
        </div>
      </div>

      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="text-[8px] uppercase tracking-[.12em] text-white/40">Total</p>
        <p className="lx-serif mt-1 text-3xl text-[#efc28b]">
          {formatGiftMoney(giftTotal(draft.amount))}
        </p>
      </div>
    </aside>
  );
}
