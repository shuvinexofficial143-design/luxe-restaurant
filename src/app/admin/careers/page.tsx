import AdminShell from "@/components/admin/AdminShell";
import CareerManager from "@/components/admin/CareerManager";

export const metadata = { title: "Admin Careers" };

export default function AdminCareersPage() {
  return (
    <AdminShell title="Career Applications" eyebrow="People">
      <div className="mx-auto max-w-[1320px]">
        <CareerManager />
      </div>
    </AdminShell>
  );
}
