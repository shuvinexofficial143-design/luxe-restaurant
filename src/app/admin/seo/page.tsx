import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import SEOAuditCard from "@/components/admin/SEOAuditCard";
import PublicCMSStatus from "@/components/admin/PublicCMSStatus";
import { requireAdminPagePermission } from "@/lib/server/security/admin-guard";

export const metadata = { title: "LUXE SEO" };
export const dynamic = "force-dynamic";

export default async function SEOPage() {
  await requireAdminPagePermission("cms.read");

  return (
    <AdminShell title="SEO & Public CMS" eyebrow="Search + Publishing">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[28px] bg-[#335f50] p-6 text-white">
            <p className="text-[9px] uppercase tracking-[.14em] text-[#efc99a]">
              Published content layer
            </p>
            <h2 className="lx-serif mt-2 text-5xl">
              CMS content now has a public rendering path.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/55">
              Only PUBLISHED records appear through the public CMS APIs and
              live routes. Hindi uses stored translations when present.
            </p>
            <Link
              href="/admin/seo/content"
              className="mt-5 inline-flex rounded-full bg-white px-4 py-3 text-[8px] uppercase tracking-[.1em] text-[#201713]"
            >
              SEO content guide
            </Link>
          </div>
          <PublicCMSStatus />
        </div>

        <div className="mt-5">
          <SEOAuditCard />
        </div>

        <div className="mt-5 rounded-[20px] bg-[#fff4de] p-4">
          <p className="text-xs leading-6 text-[#75645d]">
            Apply migration 014 before saving new SEO fields. The database-backed
            routes are /en|hi/menu/live, /journal/live and /events/live.
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
