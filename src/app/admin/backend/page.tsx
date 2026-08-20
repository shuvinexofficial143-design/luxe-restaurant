import AdminShell from "@/components/admin/AdminShell";
import BackendStatus from "@/components/admin/BackendStatus";
import ApiEndpointGrid from "@/components/admin/ApiEndpointGrid";
import DatabaseSchemaCard from "@/components/admin/DatabaseSchemaCard";

export const metadata = { title: "Backend Foundation" };

export default function AdminBackendPage() {
  return (
    <AdminShell title="Backend" eyebrow="Server Foundation">
      <div className="mx-auto max-w-[1180px]">
        <BackendStatus />

        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
              API v1
            </p>
            <h2 className="lx-serif mt-2 text-4xl">Stable server boundaries.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#75645d]">
              The front end can now migrate from browser-only storage toward
              versioned server APIs and repositories without pretending that a
              database is already connected.
            </p>

            <div className="mt-5">
              <ApiEndpointGrid />
            </div>

            <div className="mt-5 rounded-[22px] bg-[#fff4de] p-5">
              <p className="text-[9px] uppercase tracking-[.12em] text-[#8a5a21]">
                Next connection step
              </p>
              <p className="mt-2 text-sm leading-7 text-[#75645d]">
                Add a PostgreSQL/Supabase connector, configure DATABASE_URL,
                apply migrations, then move reservations, orders, CMS, users,
                sessions and audit logs from localStorage to server repositories.
              </p>
            </div>
          </div>

          <DatabaseSchemaCard />
        </div>
      </div>
    </AdminShell>
  );
}
