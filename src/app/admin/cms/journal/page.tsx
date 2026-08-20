import AdminShell from "@/components/admin/AdminShell";
import CMSCollectionManager from "@/components/cms/CMSCollectionManager";

export const metadata = { title: "Journal CMS" };

export default function Page() {
  return (
    <AdminShell title="Journal CMS" eyebrow="Editorial">
      <div className="mx-auto max-w-[1320px]">
        <CMSCollectionManager collection="journal" />
      </div>
    </AdminShell>
  );
}
