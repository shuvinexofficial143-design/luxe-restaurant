import AdminShell from "@/components/admin/AdminShell";
import CMSRevisionHistory from "@/components/cms/CMSRevisionHistory";

export const metadata = { title: "CMS Revision History" };

export default function CMSRevisionsPage() {
  return (
    <AdminShell title="Revision History" eyebrow="CMS Audit">
      <div className="mx-auto max-w-[1000px]">
        <p className="mb-5 max-w-2xl text-sm leading-7 text-[#75645d]">
          Every browser-local create, update, publish, archive and delete action
          records a snapshot here.
        </p>
        <CMSRevisionHistory />
      </div>
    </AdminShell>
  );
}
