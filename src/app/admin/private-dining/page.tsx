import AdminShell from "@/components/admin/AdminShell";
import PrivateDiningManager from "@/components/admin/PrivateDiningManager";

export const metadata = { title: "Admin Private Dining" };

export default function AdminPrivateDiningPage() {
  return (
    <AdminShell title="Private Dining" eyebrow="Events Pipeline">
      <div className="mx-auto max-w-[1320px]">
        <PrivateDiningManager />
      </div>
    </AdminShell>
  );
}
