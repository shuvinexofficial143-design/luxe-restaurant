"use client";

import { useSyncExternalStore } from "react";
import { accountStore } from "@/lib/account/storage";
import { membershipBenefits } from "@/lib/account/data";

export default function MembershipCard() {
  const account = useSyncExternalStore(
    accountStore.subscribe,
    accountStore.getSnapshot,
    accountStore.getServerSnapshot
  );

  return (
    <div className="relative overflow-hidden rounded-[30px] bg-[#201713] p-6 text-white md:p-8">
      <div className="absolute -right-10 -top-12 lx-serif text-[160px] text-white/[.035]">L</div>
      <p className="text-[9px] uppercase tracking-[.18em] text-[#efc28b]">LUXE membership</p>
      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <p className="lx-serif text-6xl">{account.membership}</p>
          <p className="mt-2 text-xs text-white/50">Member ID · {account.id}</p>
        </div>
        <p className="lx-serif text-2xl text-[#efc28b]">{account.points} pts</p>
      </div>

      <div className="mt-6 grid gap-2">
        {membershipBenefits[account.membership].map((benefit) => (
          <div key={benefit} className="flex items-center gap-3 rounded-[16px] bg-white/[.055] p-3 text-xs text-white/70">
            <span className="text-[#efc28b]">✓</span>{benefit}
          </div>
        ))}
      </div>
    </div>
  );
}
