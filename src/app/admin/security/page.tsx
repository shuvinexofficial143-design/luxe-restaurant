import AdminShell from "@/components/admin/AdminShell";
import SecurityHardeningStatus from "@/components/admin/SecurityHardeningStatus";
import SecurityAuditTable from "@/components/admin/SecurityAuditTable";
import { requireAdminPagePermission } from "@/lib/server/security/admin-guard";

export const metadata = { title: "LUXE Security" };
export const dynamic = "force-dynamic";

export default async function AdminSecurityPage() {
  const admin = await requireAdminPagePermission(
    "security.view"
  );

  return (
    <AdminShell title="Security" eyebrow="Production Hardening">
      <div className="mx-auto max-w-[1180px]">
        <div className="rounded-[28px] bg-[#7c241e] p-6 text-white">
          <p className="text-[9px] uppercase tracking-[.14em] text-[#ffd0aa]">
            Authenticated as {admin.user.role}
          </p>
          <h2 className="lx-serif mt-2 text-5xl">
            Server-enforced security controls.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/60">
            Admin sessions are now designed around revocable database
            sessions and server permission guards instead of trusting a simple
            browser-set demo cookie.
          </p>
        </div>

        <div className="mt-5">
          <SecurityHardeningStatus />
        </div>

        <div className="mt-5">
          <SecurityAuditTable />
        </div>

        <div className="mt-5 rounded-[20px] bg-[#fff4de] p-4">
          <p className="text-[9px] uppercase tracking-[.1em] text-[#8a5a21]">
            Still required before production launch
          </p>
          <p className="mt-2 text-xs leading-6 text-[#75645d]">
            Apply migration 010, configure LUXE_ADMIN_BOOTSTRAP_SECRET,
            bootstrap the first OWNER once, rotate/remove the bootstrap secret,
            then complete a full route-by-route permission audit. A strict
            nonce-based CSP and external penetration testing are not claimed by
            this batch.
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
