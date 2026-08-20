import { giftTerms } from "@/lib/gifts/data";

export default function GiftFAQ() {
  return (
    <div className="rounded-[26px] bg-[#201713] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.14em] text-[#efc28b]">
        Demo gift terms
      </p>
      <h2 className="lx-serif mt-2 text-3xl">Before you gift.</h2>

      <div className="mt-5 space-y-2">
        {giftTerms.map((term) => (
          <p key={term} className="rounded-[14px] bg-white/[.06] p-3 text-xs leading-6 text-white/60">
            {term}
          </p>
        ))}
      </div>
    </div>
  );
}
