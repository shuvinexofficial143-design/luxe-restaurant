"use client";

import { useEffect, useState } from "react";
import type { AdminSession } from "@/lib/auth/types";
import { emptyAdminSession } from "@/lib/auth/session";
import RoleBadge from "@/components/auth/RoleBadge";
import LogoutButton from "@/components/auth/LogoutButton";

export default function SessionManager() {
  const [session, setSession] = useState<AdminSession>(emptyAdminSession());

  useEffect(() => {
    fetch("/api/auth/session")
      .then((response) => response.json())
      .then((payload: AdminSession) => setSession(payload))
      .catch(() => setSession(emptyAdminSession()));
  }, []);

  return (
    <div className="rounded-[28px] bg-[#fffaf4] p-6">
      <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
        Current admin session
      </p>
      <h2 className="lx-serif mt-2 text-4xl">
        {session.active ? "Session active." : "No active session."}
      </h2>

      {session.active ? (
        <>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <div className="rounded-[16px] bg-[#f3e7dc] p-4">
              <p className="text-[8px] uppercase tracking-[.1em] text-[#75645d]">
                Email
              </p>
              <p className="mt-1 break-all text-sm">{session.email}</p>
            </div>
            <div className="rounded-[16px] bg-[#f3e7dc] p-4">
              <p className="text-[8px] uppercase tracking-[.1em] text-[#75645d]">
                Role
              </p>
              <div className="mt-2">
                <RoleBadge role={session.role} />
              </div>
            </div>
          </div>

          <div className="mt-5 max-w-[200px]">
            <LogoutButton />
          </div>
        </>
      ) : null}

      <p className="mt-5 text-[9px] leading-5 text-[#8a756b]">
        Production will support multiple revocable sessions, device history,
        expiration, refresh rotation and server-side invalidation.
      </p>
    </div>
  );
}
