import AdminShell from "@/components/admin/AdminShell";
import GiftManager from "@/components/admin/GiftManager";

export const metadata = { title: "Admin Gift Cards" };

export default function AdminGiftsPage() {
  return (
    <AdminShell title="Gift Cards" eyebrow="Guest Commerce">
      <div className="mx-auto max-w-[1320px]">
        <GiftManager />
      </div>
    </AdminShell>
  );
}
