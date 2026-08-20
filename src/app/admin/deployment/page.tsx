import AdminShell from "@/components/admin/AdminShell";
import DeploymentReadiness from "@/components/admin/DeploymentReadiness";
import EnvironmentChecklist from "@/components/admin/EnvironmentChecklist";
import MigrationChecklist from "@/components/admin/MigrationChecklist";
import RouteCoverage from "@/components/admin/RouteCoverage";
import CronStatus from "@/components/admin/CronStatus";
import {
  requireAdminPagePermission,
} from "@/lib/server/security/admin-guard";

export const metadata = {
  title:
    "LUXE Deployment Readiness",
};

export const dynamic =
  "force-dynamic";

export default async function DeploymentPage() {
  await requireAdminPagePermission(
    "security.view"
  );

  return (
    <AdminShell
      title="Deployment Readiness"
      eyebrow="Final Production Handoff"
    >
      <div className="mx-auto max-w-[1280px]">
        <DeploymentReadiness />

        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_360px]">
          <EnvironmentChecklist />
          <CronStatus />
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_420px]">
          <MigrationChecklist />
          <RouteCoverage />
        </div>

        <div className="mt-5 rounded-[20px] bg-[#fff4de] p-4 text-xs leading-6 text-[#75645d]">
          This dashboard reports configuration/readiness only. It does not
          claim production launch success until lint, TypeScript, build,
          migrations, provider webhooks and live smoke tests all pass.
        </div>
      </div>
    </AdminShell>
  );
}
