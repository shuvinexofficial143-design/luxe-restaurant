import { adminRoles, roleMeta } from "@/lib/auth/roles";
import { rolePermissions } from "@/lib/auth/permissions";

export default function RoleManager() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {adminRoles.map((role) => (
        <article key={role} className="rounded-[24px] bg-[#fffaf4] p-5">
          <p className="text-[8px] uppercase tracking-[.11em] text-[#7c241e]">
            {role}
          </p>
          <h2 className="lx-serif mt-2 text-3xl">{roleMeta[role].label}</h2>
          <p className="mt-3 text-xs leading-6 text-[#75645d]">
            {roleMeta[role].description}
          </p>
          <div className="mt-5 rounded-[16px] bg-[#f3e7dc] p-3">
            <p className="lx-serif text-2xl text-[#7c241e]">
              {rolePermissions[role].length}
            </p>
            <p className="mt-1 text-[8px] uppercase tracking-[.1em] text-[#75645d]">
              permissions
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
