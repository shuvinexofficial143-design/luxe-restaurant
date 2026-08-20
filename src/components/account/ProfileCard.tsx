"use client";

import { useSyncExternalStore } from "react";
import { accountStore } from "@/lib/account/storage";

export default function ProfileCard() {
  const account = useSyncExternalStore(
    accountStore.subscribe,
    accountStore.getSnapshot,
    accountStore.getServerSnapshot
  );

  return (
    <div className="rounded-[26px] bg-[#fffaf4] p-5">
      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-[#7c241e] lx-serif text-2xl text-white">
          {(account.name || "G").slice(0, 1).toUpperCase()}
        </div>
        <div>
          <p className="lx-serif text-3xl">{account.name || "Guest profile"}</p>
          <p className="mt-1 text-xs text-[#75645d]">{account.email || "No email saved"}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {[
          [account.phone || "—", "phone"],
          [account.city || "—", "city"],
          [account.birthday || "—", "birthday"],
          [account.membership, "membership"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-[16px] bg-[#f3e7dc] p-3">
            <p className="text-sm">{value}</p>
            <p className="mt-1 text-[8px] uppercase tracking-[.11em] text-[#75645d]">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
