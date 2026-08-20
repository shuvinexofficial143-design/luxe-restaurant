import AdminShell from "@/components/admin/AdminShell";
import CMSCollectionManager from "@/components/cms/CMSCollectionManager";

export const metadata = { title: "Menu CMS" };

export default function Page() {
  return (
    <AdminShell title="Menu CMS" eyebrow="Dishes + Pricing">
      <div className="mx-auto max-w-[1320px]">
        <CMSCollectionManager collection="menu" />
      </div>
    </AdminShell>
  );
}
