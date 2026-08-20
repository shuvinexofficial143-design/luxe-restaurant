import type { AdminRole } from "@/lib/auth/types";
import { roleMeta } from "@/lib/auth/roles";

export default function RoleBadge({
  role,
}: {
  role: AdminRole;
}) {
  return (
    <span className="inline-flex rounded-full bg-[#335f50]/10 px-3 py-2 text-[8px] uppercase tracking-[.1em] text-[#335f50]">
      {roleMeta[role].label}
    </span>
  );
}
