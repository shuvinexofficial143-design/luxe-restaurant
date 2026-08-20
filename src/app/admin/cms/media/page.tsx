import AdminShell from "@/components/admin/AdminShell";
import CMSMediaLibrary from "@/components/cms/CMSMediaLibrary";

export const metadata = { title: "CMS Media Library" };

export default function CMSMediaPage() {
  return (
    <AdminShell title="Media Library" eyebrow="CMS Assets">
      <div className="mx-auto max-w-[1320px]">
        <CMSMediaLibrary />
      </div>
    </AdminShell>
  );
}
