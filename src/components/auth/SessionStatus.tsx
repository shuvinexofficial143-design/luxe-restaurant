"use client";

import { useEffect, useState } from "react";
import type { AdminSession } from "@/lib/auth/types";
import { emptyAdminSession } from "@/lib/auth/session";
import RoleBadge from "./RoleBadge";

export default function SessionStatus() {
  const [session, setSession] = useState<AdminSession>(emptyAdminSession());

  useEffect(() => {
    fetch("/api/auth/session")
      .then((response) => response.json())
      .then((payload: AdminSession) => setSession(payload))
      .catch(() => setSession(emptyAdminSession()));
  }, []);

  if (!session.active) {
    return (
      <span className="rounded-full bg-[#7c241e]/10 px-3 py-2 text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
        No session
      </span>
    );
  }

  return (
    <div className="hidden items-center gap-2 sm:flex">
      <RoleBadge role={session.role} />
      <span className="max-w-[160px] truncate text-[9px] text-[#75645d]">
        {session.email}
      </span>
    </div>
  );
}
