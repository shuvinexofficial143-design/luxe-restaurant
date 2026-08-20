import AdminShell from "@/components/admin/AdminShell";
import CMSCollectionManager from "@/components/cms/CMSCollectionManager";

export const metadata = { title: "Gallery CMS" };

export default function Page() {
  return (
    <AdminShell title="Gallery CMS" eyebrow="Media Content">
      <div className="mx-auto max-w-[1320px]">
        <CMSCollectionManager collection="gallery" />
      </div>
    </AdminShell>
  );
}
