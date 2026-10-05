import type { ReactNode } from "react";
import AdminShellClient from "./AdminShellClient";
import { requireAdminPagePermission } from "@/lib/server/security/admin-guard";

export default async function AdminShell({
  title,
  eyebrow = "LUXE Control Room",
  children,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  await requireAdminPagePermission("admin.view");

  return (
    <AdminShellClient title={title} eyebrow={eyebrow}>
      {children}
    </AdminShellClient>
  );
}
