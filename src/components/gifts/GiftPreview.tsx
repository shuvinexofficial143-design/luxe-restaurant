import { getGiftDesign } from "@/lib/gifts/designs";
import { formatGiftMoney } from "@/lib/gifts/utils";
import type { GiftDraft } from "@/lib/gifts/types";

export default function GiftPreview({
  draft,
}: {
  draft: GiftDraft;
}) {
  const design = getGiftDesign(draft.designId);

  return (
    <div className="overflow-hidden rounded-[28px] bg-[#201713] text-white">
      <div
        className="relative min-h-[330px] bg-cover bg-center p-5"
        style={{ backgroundImage: `url("${design.image}")` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

        <div className="relative z-10 flex min-h-[290px] flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <p className="text-[9px] uppercase tracking-[.18em]" style={{ color: design.accent }}>
              LUXE GIFT
            </p>
            <p className="rounded-full bg-black/40 px-3 py-2 text-[8px] uppercase tracking-[.11em]">
              {draft.occasion}
            </p>
          </div>

          <div>
            <p className="lx-serif text-5xl" style={{ color: design.accent }}>
              {formatGiftMoney(draft.amount)}
            </p>
            <p className="mt-3 lx-serif text-2xl">
              For {draft.recipientName || "Someone special"}
            </p>
            <p className="mt-2 max-w-md text-xs leading-6 text-white/65">
              {draft.message || "A dining experience, gifted by you."}
            </p>
            <p className="mt-4 text-[9px] uppercase tracking-[.11em] text-white/45">
              From {draft.senderName || "Your name"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
