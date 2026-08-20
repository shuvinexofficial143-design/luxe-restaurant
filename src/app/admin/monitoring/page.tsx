import AdminShell from "@/components/admin/AdminShell";
import MonitoringOverview from "@/components/admin/MonitoringOverview";
import HealthCheckTable from "@/components/admin/HealthCheckTable";
import BackupExportPanel from "@/components/admin/BackupExportPanel";
import {
  requireAdminPagePermission,
} from "@/lib/server/security/admin-guard";

export const metadata = {
  title: "LUXE Monitoring",
};

export const dynamic =
  "force-dynamic";

export default async function MonitoringPage() {
  await requireAdminPagePermission(
    "security.view"
  );

  return (
    <AdminShell
      title="Monitoring & Recovery"
      eyebrow="Health + Backup"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="rounded-[28px] bg-[#201713] p-6 text-white">
          <p className="text-[9px] uppercase tracking-[.14em] text-[#efc28b]">
            Operational visibility
          </p>
          <h1 className="lx-serif mt-2 text-5xl">
            Know what is configured, healthy or missing.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/55">
            Deep health checks are authenticated. Public liveness exposes only
            application availability. Backup export is on-demand and sanitized.
          </p>
        </div>

        <div className="mt-5">
          <MonitoringOverview />
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_360px]">
          <HealthCheckTable />
          <BackupExportPanel />
        </div>
      </div>
    </AdminShell>
  );
}
