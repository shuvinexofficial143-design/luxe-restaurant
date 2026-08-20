import LuxeShell from "@/components/luxe/LuxeShell";
import AccountNav from "@/components/account/AccountNav";
import LoyaltyCard from "@/components/account/LoyaltyCard";
import PointsHistory from "@/components/account/PointsHistory";
import RewardsGrid from "@/components/account/RewardsGrid";

export const metadata = { title: "LUXE Loyalty" };

export default function LoyaltyPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1000px]">
          <p className="lx-kicker">Earn. Return. Unlock.</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">Loyalty.</h1>
          <div className="mt-5"><AccountNav /></div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
            <div className="space-y-4">
              <LoyaltyCard />
              <PointsHistory />
            </div>
            <div>
              <p className="lx-kicker">Rewards</p>
              <h2 className="lx-serif mt-2 text-4xl">Spend your points.</h2>
              <div className="mt-4"><RewardsGrid /></div>
            </div>
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
