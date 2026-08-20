import { adminRoles, roleMeta } from "@/lib/auth/roles";
import { permissionLabels, roleCan } from "@/lib/auth/permissions";
import type { Permission } from "@/lib/auth/types";

export default function PermissionMatrix() {
  const permissions = Object.keys(permissionLabels) as Permission[];

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#4a3025]/10 bg-[#fffaf4]">
      <div className="overflow-x-auto">
        <table className="min-w-[1100px] w-full border-collapse">
          <thead className="bg-[#201713] text-white">
            <tr>
              <th className="px-4 py-4 text-left text-[8px] font-normal uppercase tracking-[.11em]">
                Permission
              </th>
              {adminRoles.map((role) => (
                <th
                  key={role}
                  className="px-3 py-4 text-center text-[8px] font-normal uppercase tracking-[.09em]"
                >
                  {roleMeta[role].label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#4a3025]/8">
            {permissions.map((permission) => (
              <tr key={permission}>
                <td className="px-4 py-4 text-xs">
                  <p>{permissionLabels[permission]}</p>
                  <p className="mt-1 text-[9px] text-[#8a756b]">{permission}</p>
                </td>
                {adminRoles.map((role) => (
                  <td key={role} className="px-3 py-4 text-center">
                    <span
                      className={`inline-grid h-7 w-7 place-items-center rounded-full text-[10px] ${
                        roleCan(role, permission)
                          ? "bg-[#335f50] text-white"
                          : "bg-[#eadfd4] text-[#9d8b81]"
                      }`}
                    >
                      {roleCan(role, permission) ? "✓" : "—"}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
