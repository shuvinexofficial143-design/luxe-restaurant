import AdminShell from "@/components/admin/AdminShell";
import RoleManager from "@/components/admin/RoleManager";
import PermissionMatrix from "@/components/auth/PermissionMatrix";

export const metadata = { title: "Admin Roles & Permissions" };

export default function AdminRolesPage() {
  return (
    <AdminShell title="Roles & Permissions" eyebrow="Access Control">
      <div className="mx-auto max-w-[1320px]">
        <RoleManager />
        <div className="mt-6">
          <p className="mb-3 text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
            Permission matrix
          </p>
          <PermissionMatrix />
        </div>
      </div>
    </AdminShell>
  );
}
