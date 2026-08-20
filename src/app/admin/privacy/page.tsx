import AdminShell from "@/components/admin/AdminShell";
import PrivacyRequestTable from "@/components/admin/PrivacyRequestTable";
import {
  retentionSummary,
} from "@/lib/server/monitoring/retention";
import {
  requireAdminPagePermission,
} from "@/lib/server/security/admin-guard";

export const metadata = {
  title: "LUXE Privacy Operations",
};

export const dynamic =
  "force-dynamic";

export default async function PrivacyAdminPage() {
  await requireAdminPagePermission(
    "security.view"
  );

  return (
    <AdminShell
      title="Privacy Operations"
      eyebrow="Customer Data Requests"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="rounded-[28px] bg-[#335f50] p-6 text-white">
          <p className="text-[9px] uppercase tracking-[.14em] text-[#efc99a]">
            Privacy workflow
          </p>
          <h1 className="lx-serif mt-2 text-5xl">
            Export and deletion requests with an audit trail.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/55">
            A deletion request is a review workflow. This batch does not claim
            to automatically erase records that may need legal or financial
            retention.
          </p>
        </div>

        <div className="mt-5">
          <PrivacyRequestTable />
        </div>

        <div className="mt-5 rounded-[24px] bg-[#fffaf4] p-5">
          <p className="lx-kicker">
            Retention policy foundation
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {retentionSummary().map(
              (
                item
              ) => (
                <div
                  key={
                    item.dataset
                  }
                  className="rounded-[15px] bg-white p-3"
                >
                  <p className="lx-serif text-2xl text-[#7c241e]">
                    {
                      item.days
                    }{" "}
                    days
                  </p>
                  <p className="mt-1 text-[8px] uppercase tracking-[.08em] text-[#75645d]">
                    {
                      item.dataset
                    }
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
