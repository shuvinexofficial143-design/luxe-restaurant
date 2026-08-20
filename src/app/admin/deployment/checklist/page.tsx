import AdminShell from "@/components/admin/AdminShell";
import ProductionChecklist from "@/components/admin/ProductionChecklist";
import {
  requireAdminPagePermission,
} from "@/lib/server/security/admin-guard";

export const metadata = {
  title:
    "LUXE Launch Checklist",
};

export const dynamic =
  "force-dynamic";

export default async function DeploymentChecklistPage() {
  await requireAdminPagePermission(
    "security.view"
  );

  return (
    <AdminShell
      title="Launch Checklist"
      eyebrow="Before Production"
    >
      <div className="mx-auto max-w-[900px]">
        <div className="rounded-[28px] bg-[#201713] p-6 text-white">
          <p className="text-[9px] uppercase tracking-[.14em] text-[#efc28b]">
            Final verification
          </p>
          <h1 className="lx-serif mt-2 text-5xl">
            Deploy only what has actually passed.
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/55">
            Build success, database migrations and real provider configuration
            are separate checks. No single green UI badge substitutes for all
            of them.
          </p>
        </div>

        <div className="mt-5">
          <ProductionChecklist />
        </div>
      </div>
    </AdminShell>
  );
}
