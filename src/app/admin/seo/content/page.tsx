import AdminShell from "@/components/admin/AdminShell";
import SEOFieldGuide from "@/components/admin/SEOFieldGuide";
import { requireAdminPagePermission } from "@/lib/server/security/admin-guard";

export const metadata = { title: "CMS SEO Fields · LUXE" };
export const dynamic = "force-dynamic";

export default async function SEOContentPage() {
  await requireAdminPagePermission("cms.read");

  return (
    <AdminShell title="CMS SEO Fields" eyebrow="Publishing Guide">
      <div className="mx-auto max-w-[900px]">
        <div className="rounded-[28px] bg-[#7c241e] p-6 text-white">
          <p className="text-[9px] uppercase tracking-[.14em] text-[#ffd0aa]">
            Content metadata
          </p>
          <h1 className="lx-serif mt-2 text-5xl">
            Search metadata belongs with the published record.
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/55">
            These fields are a storage/rendering foundation. Search ranking is
            never guaranteed by metadata alone.
          </p>
        </div>

        <div className="mt-5">
          <SEOFieldGuide />
        </div>
      </div>
    </AdminShell>
  );
}
