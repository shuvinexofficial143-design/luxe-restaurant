import AdminShell from "@/components/admin/AdminShell";
import CMSCollectionManager from "@/components/cms/CMSCollectionManager";

export const metadata = { title: "Homepage CMS" };

export default function Page() {
  return (
    <AdminShell title="Homepage CMS" eyebrow="Promoted Content">
      <div className="mx-auto max-w-[1320px]">
        <CMSCollectionManager collection="homepage" />
      </div>
    </AdminShell>
  );
}
