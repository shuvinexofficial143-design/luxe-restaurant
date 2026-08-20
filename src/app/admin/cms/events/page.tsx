import AdminShell from "@/components/admin/AdminShell";
import CMSCollectionManager from "@/components/cms/CMSCollectionManager";

export const metadata = { title: "Events CMS" };

export default function Page() {
  return (
    <AdminShell title="Events CMS" eyebrow="Experiences">
      <div className="mx-auto max-w-[1320px]">
        <CMSCollectionManager collection="events" />
      </div>
    </AdminShell>
  );
}
