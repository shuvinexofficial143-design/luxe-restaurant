"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => undefined);
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      className="rounded-full border border-[#4a3025]/10 bg-white px-3 py-2 text-[8px] uppercase tracking-[.1em] text-[#7c241e]"
    >
      Logout
    </button>
  );
}
