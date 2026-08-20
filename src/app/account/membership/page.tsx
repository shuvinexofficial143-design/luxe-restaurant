import LuxeShell from "@/components/luxe/LuxeShell";
import AccountNav from "@/components/account/AccountNav";
import MembershipCard from "@/components/account/MembershipCard";
import MembershipTierGrid from "@/components/account/MembershipTierGrid";

export const metadata = { title: "LUXE Membership" };

export default function MembershipPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1100px]">
          <p className="lx-kicker">Guest recognition</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">Membership.</h1>
          <div className="mt-5"><AccountNav /></div>

          <div className="mt-5"><MembershipCard /></div>

          <div className="mt-8">
            <p className="lx-kicker">Three levels</p>
            <h2 className="lx-serif mt-2 text-4xl">From EMBER to NOIR.</h2>
            <div className="mt-4"><MembershipTierGrid /></div>
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
