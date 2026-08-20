import AdminShell from "@/components/admin/AdminShell";
import UserManager from "@/components/admin/UserManager";

export const metadata = { title: "Admin Users" };

export default function AdminUsersPage() {
  return (
    <AdminShell title="Admin Users" eyebrow="Access Control">
      <div className="mx-auto max-w-[1320px]">
        <p className="mb-5 max-w-2xl text-sm leading-7 text-[#75645d]">
          Demo staff identities for the upcoming database-backed access-control system.
        </p>
        <UserManager />
      </div>
    </AdminShell>
  );
}
