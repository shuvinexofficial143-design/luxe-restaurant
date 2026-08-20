import LuxeShell from "@/components/luxe/LuxeShell";
import AccountDashboardClient from "@/components/account/AccountDashboardClient";

export const metadata = { title: "Secure LUXE Loyalty" };

export default function SecureLoyaltyPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1100px]">
          <p className="lx-kicker">Authenticated loyalty</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">
            Points that follow your account.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#75645d]">
            The loyalty wallet and transaction history now come from the
            database-backed customer identity.
          </p>

          <div className="mt-6">
            <AccountDashboardClient />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
