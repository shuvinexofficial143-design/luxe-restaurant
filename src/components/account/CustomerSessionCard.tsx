"use client";

import { useRouter } from "next/navigation";

export default function CustomerSessionCard({
  name,
  email,
  phone,
  emailVerified,
}: {
  name: string;
  email: string;
  phone: string | null;
  emailVerified: boolean;
}) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/v1/customer-auth/logout", {
      method: "POST",
    }).catch(() => undefined);

    router.replace("/auth/login");
    router.refresh();
  }

  return (
    <div className="rounded-[28px] bg-[#201713] p-6 text-white">
      <p className="text-[9px] uppercase tracking-[.14em] text-[#efc28b]">
        Secure account
      </p>
      <h2 className="lx-serif mt-2 text-4xl">{name}</h2>
      <p className="mt-2 text-sm text-white/50">{email}</p>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="rounded-[16px] bg-white/[.06] p-3">
          <p className="text-sm">{phone || "Not added"}</p>
          <p className="mt-1 text-[8px] uppercase tracking-[.1em] text-white/40">
            phone
          </p>
        </div>
        <div className="rounded-[16px] bg-white/[.06] p-3">
          <p className="text-sm">
            {emailVerified ? "Verified" : "Pending"}
          </p>
          <p className="mt-1 text-[8px] uppercase tracking-[.1em] text-white/40">
            email
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={logout}
        className="mt-5 h-11 w-full rounded-[15px] border border-white/15 text-[8px] uppercase tracking-[.11em]"
      >
        Sign out
      </button>
    </div>
  );
}
