import Link from "next/link";
import LuxeShell from "@/components/luxe/LuxeShell";
import AccountDashboardClient from "@/components/account/AccountDashboardClient";

export const metadata = { title: "LUXE Account Preferences" };

export default function AccountPreferencesPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1100px]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="lx-kicker">Database account</p>
              <h1 className="lx-serif mt-2 text-5xl md:text-7xl">
                Preferences.
              </h1>
            </div>
            <Link
              href="/account/secure"
              className="rounded-full border border-[#4a3025]/10 bg-white px-4 py-3 text-[8px] uppercase tracking-[.1em]"
            >
              Account home
            </Link>
          </div>

          <div className="mt-6">
            <AccountDashboardClient />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
