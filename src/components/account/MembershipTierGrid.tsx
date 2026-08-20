import { membershipBenefits } from "@/lib/account/data";
import type { MembershipTier } from "@/lib/account/types";

const tiers: { name: MembershipTier; points: string; note: string }[] = [
  { name: "EMBER", points: "0–1,799 pts", note: "Start collecting and personalizing." },
  { name: "GOLD", points: "1,800–4,999 pts", note: "Priority access and richer benefits." },
  { name: "NOIR", points: "5,000+ pts", note: "Highest-tier guest recognition." },
];

export default function MembershipTierGrid() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {tiers.map((tier) => (
        <article key={tier.name} className="rounded-[26px] border border-[#4a3025]/10 bg-[#fffaf4] p-5">
          <p className="text-[9px] uppercase tracking-[.14em] text-[#7c241e]">{tier.points}</p>
          <h3 className="lx-serif mt-2 text-4xl">{tier.name}</h3>
          <p className="mt-2 text-xs leading-6 text-[#75645d]">{tier.note}</p>
          <div className="mt-5 space-y-2">
            {membershipBenefits[tier.name].map((benefit) => (
              <p key={benefit} className="text-[11px] leading-5 text-[#66534b]">✓ {benefit}</p>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
