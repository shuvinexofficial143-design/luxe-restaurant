import AdminShell from "@/components/admin/AdminShell";
import AsyncOpsOverview from "@/components/admin/AsyncOpsOverview";
import FailedJobsTable from "@/components/admin/FailedJobsTable";
import {
  requireAdminPagePermission,
} from "@/lib/server/security/admin-guard";

export const metadata = {
  title: "LUXE Async Operations",
};

export const dynamic = "force-dynamic";

export default async function OperationsPage() {
  await requireAdminPagePermission(
    "security.view"
  );

  return (
    <AdminShell
      title="Async Operations"
      eyebrow="Webhooks + Jobs + Notifications"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="rounded-[28px] bg-[#201713] p-6 text-white">
          <p className="text-[9px] uppercase tracking-[.14em] text-[#efc28b]">
            Durable processing foundation
          </p>
          <h2 className="lx-serif mt-2 text-5xl">
            Verify first. Queue second. Retry safely.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/55">
            Provider webhooks are verified before persistence. Duplicate
            event IDs do not create duplicate jobs. Work is claimed with
            PostgreSQL row locking and failed work receives exponential retry
            delays before becoming a dead job.
          </p>
        </div>

        <div className="mt-5">
          <AsyncOpsOverview />
        </div>

        <div className="mt-5">
          <FailedJobsTable />
        </div>

        <div className="mt-5 rounded-[20px] bg-[#fff4de] p-4">
          <p className="text-[9px] uppercase tracking-[.1em] text-[#8a5a21]">
            Deployment requirement
          </p>
          <p className="mt-2 text-xs leading-6 text-[#75645d]">
            Apply migration 011 and configure LUXE_JOB_RUNNER_SECRET.
            This batch creates /api/v1/jobs/process, but it does not claim
            that Vercel Cron or any other scheduler has already been configured.
            WhatsApp webhook POST verification also requires
            WHATSAPP_APP_SECRET.
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
