import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LuxeShell from "@/components/luxe/LuxeShell";
import AccountDashboardClient from "@/components/account/AccountDashboardClient";
import AccountDatabaseNotice from "@/components/account/AccountDatabaseNotice";
import { CUSTOMER_SESSION_COOKIE } from "@/lib/server/auth/customer-cookies";
import { resolveCustomerSession } from "@/lib/server/auth/customer-service";

export const metadata = { title: "Secure LUXE Account" };
export const dynamic = "force-dynamic";

export default async function SecureAccountPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CUSTOMER_SESSION_COOKIE)?.value || "";

  if (!token) {
    redirect("/auth/login?next=/account/secure");
  }

  const resolved = await resolveCustomerSession(token).catch(() => null);

  if (!resolved) {
    redirect("/auth/login?next=/account/secure");
  }

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-5">
            <AccountDatabaseNotice />
          </div>
          <AccountDashboardClient />
        </div>
      </section>
    </LuxeShell>
  );
}
