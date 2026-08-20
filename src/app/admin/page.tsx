import AdminShell from "@/components/admin/AdminShell";
import AdminOverview from "@/components/admin/AdminOverview";

export const metadata = { title: "LUXE Admin Dashboard" };

export default function AdminPage() {
  return (
    <AdminShell title="Overview">
      <AdminOverview />
    </AdminShell>
  );
}
