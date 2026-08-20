import { demoAdminUsers } from "@/lib/auth/users";
import RoleBadge from "@/components/auth/RoleBadge";

export default function UserManager() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {demoAdminUsers.map((user) => (
        <article key={user.id} className="rounded-[24px] bg-[#fffaf4] p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[8px] uppercase tracking-[.11em] text-[#7c241e]">
                {user.id}
              </p>
              <h2 className="lx-serif mt-1 text-2xl">{user.name}</h2>
            </div>
            <span
              className={`h-2 w-2 rounded-full ${
                user.active ? "bg-[#335f50]" : "bg-[#7c241e]"
              }`}
            />
          </div>

          <p className="mt-2 break-all text-xs text-[#75645d]">{user.email}</p>
          <div className="mt-4">
            <RoleBadge role={user.role} />
          </div>
          <p className="mt-4 text-[9px] text-[#8a756b]">
            Last login · {user.lastLogin}
          </p>
        </article>
      ))}
    </div>
  );
}
