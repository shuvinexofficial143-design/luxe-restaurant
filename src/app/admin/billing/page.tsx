import AdminShell from "@/components/admin/AdminShell";
import BillingOverview from "@/components/admin/BillingOverview";
import PaymentIntentTable from "@/components/admin/PaymentIntentTable";
import RefundQueue from "@/components/admin/RefundQueue";
import { requireAdminPagePermission } from "@/lib/server/security/admin-guard";

export const metadata = {
  title: "LUXE Billing",
};

export const dynamic = "force-dynamic";

export default async function BillingPage() {
  await requireAdminPagePermission(
    "security.view"
  );

  return (
    <AdminShell
      title="Payments & Billing"
      eyebrow="Razorpay Operations"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="rounded-[28px] bg-[#7c241e] p-6 text-white">
          <p className="text-[9px] uppercase tracking-[.14em] text-[#ffd0aa]">
            Payment operations
          </p>
          <h2 className="lx-serif mt-2 text-5xl">
            Checkout, verify, receipt, refund.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/55">
            Payment success is not trusted from the browser alone. The server
            verifies Razorpay signatures and the persisted webhook system can
            reconcile provider events afterward.
          </p>
        </div>

        <div className="mt-5">
          <BillingOverview />
        </div>

        <div className="mt-5">
          <PaymentIntentTable />
        </div>

        <div className="mt-5">
          <RefundQueue />
        </div>
      </div>
    </AdminShell>
  );
}
