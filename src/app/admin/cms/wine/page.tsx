import AdminShell from "@/components/admin/AdminShell";
import CMSCollectionManager from "@/components/cms/CMSCollectionManager";

export const metadata = { title: "Wine CMS" };

export default function Page() {
  return (
    <AdminShell title="Wine CMS" eyebrow="Cellar Content">
      <div className="mx-auto max-w-[1320px]">
        <CMSCollectionManager collection="wine" />
      </div>
    </AdminShell>
  );
}
