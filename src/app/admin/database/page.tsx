import AdminShell from "@/components/admin/AdminShell";
import DatabaseConnectionStatus from "@/components/admin/DatabaseConnectionStatus";
import DatabaseSetupGuide from "@/components/admin/DatabaseSetupGuide";
import LocalDataMigration from "@/components/admin/LocalDataMigration";
import DatabaseTableStatus from "@/components/admin/DatabaseTableStatus";
import DatabaseSecurityNotice from "@/components/admin/DatabaseSecurityNotice";

export const metadata = { title: "LUXE Database" };

export default function AdminDatabasePage() {
  return (
    <AdminShell title="Database" eyebrow="Supabase / PostgreSQL">
      <div className="mx-auto max-w-[1180px]">
        <DatabaseConnectionStatus />

        <div className="mt-5">
          <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
            API table checks
          </p>
          <h2 className="lx-serif mt-2 text-4xl">Server data routes.</h2>
          <div className="mt-4">
            <DatabaseTableStatus />
          </div>
        </div>

        <div className="mt-7">
          <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
            Connection guide
          </p>
          <h2 className="lx-serif mt-2 text-4xl">Connect it cleanly.</h2>
          <div className="mt-4">
            <DatabaseSetupGuide />
          </div>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_340px]">
          <LocalDataMigration />
          <DatabaseSecurityNotice />
        </div>
      </div>
    </AdminShell>
  );
}
