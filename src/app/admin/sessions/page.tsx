import AdminShell from "@/components/admin/AdminShell";
import SessionManager from "@/components/admin/SessionManager";

export const metadata = { title: "Admin Sessions" };

export default function AdminSessionsPage() {
  return (
    <AdminShell title="Sessions" eyebrow="Access Control">
      <div className="mx-auto max-w-[820px]">
        <SessionManager />
      </div>
    </AdminShell>
  );
}
