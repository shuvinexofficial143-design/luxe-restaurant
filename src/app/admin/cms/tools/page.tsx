import AdminShell from "@/components/admin/AdminShell";
import CMSQuickLinks from "@/components/cms/CMSQuickLinks";
import CMSSummaryStats from "@/components/cms/CMSSummaryStats";

export const metadata = { title: "CMS Tools" };

export default function CMSToolsPage() {
  return (
    <AdminShell title="CMS Tools" eyebrow="Content Operations">
      <div className="mx-auto max-w-[1100px]">
        <CMSSummaryStats />
        <div className="mt-5">
          <CMSQuickLinks />
        </div>

        <div className="mt-5 rounded-[24px] bg-[#fff4de] p-5">
          <p className="text-[9px] uppercase tracking-[.12em] text-[#8a5a21]">
            Current CMS mode
          </p>
          <p className="mt-2 text-sm leading-7 text-[#75645d]">
            Content edits, revisions and approvals are stored locally in this
            browser. Production publishing will later move to the database,
            authenticated admin roles and real media storage.
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
