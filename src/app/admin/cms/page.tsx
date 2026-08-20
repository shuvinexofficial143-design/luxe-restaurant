import AdminShell from "@/components/admin/AdminShell";
import CMSOverview from "@/components/cms/CMSOverview";
import CMSSummaryStats from "@/components/cms/CMSSummaryStats";
import CMSQuickLinks from "@/components/cms/CMSQuickLinks";

export const metadata = { title: "LUXE CMS" };

export default function CMSPage() {
  return (
    <AdminShell title="Content Management" eyebrow="CMS">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-5 rounded-[28px] bg-[#201713] p-6 text-white md:p-8">
          <p className="text-[9px] uppercase tracking-[.15em] text-[#efc28b]">
            Browser-local CMS
          </p>
          <h2 className="lx-serif mt-2 text-4xl md:text-6xl">
            Edit the restaurant without touching code.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/50">
            Create, edit, draft, publish, archive and preview content across the
            menu, wine list, events, journal, gallery and homepage.
          </p>
        </div>

        <CMSSummaryStats />
        <div className="mt-4"><CMSQuickLinks /></div>
        <div className="mt-5"><CMSOverview /></div>
      </div>
    </AdminShell>
  );
}
