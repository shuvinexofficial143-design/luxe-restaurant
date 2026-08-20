import type { LoyaltyWalletRow } from "@/lib/server/account/types";

export default function LoyaltyTierProgress({
  wallet,
}: {
  wallet: LoyaltyWalletRow;
}) {
  const nextTarget =
    wallet.tier === "EMBER" ? 3500 : wallet.tier === "GOLD" ? 10000 : 10000;
  const percent =
    wallet.tier === "NOIR"
      ? 100
      : Math.min(100, Math.round((wallet.lifetime_points / nextTarget) * 100));

  return (
    <div className="rounded-[18px] bg-[#f3e7dc] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[8px] uppercase tracking-[.1em] text-[#75645d]">
          Tier progress
        </p>
        <p className="lx-serif text-xl text-[#7c241e]">{wallet.tier}</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#d9cabc]">
        <div
          className="h-full rounded-full bg-[#7c241e]"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-[9px] text-[#75645d]">
        {wallet.lifetime_points.toLocaleString("en-IN")} lifetime points
      </p>
    </div>
  );
}
