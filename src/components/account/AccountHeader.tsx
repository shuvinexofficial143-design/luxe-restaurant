"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { accountStore } from "@/lib/account/storage";

export default function AccountHeader() {
  const account = useSyncExternalStore(
    accountStore.subscribe,
    accountStore.getSnapshot,
    accountStore.getServerSnapshot
  );

  return (
    <div className="rounded-[30px] bg-[#201713] p-5 text-white md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[9px] uppercase tracking-[.16em] text-[#efc28b]">
            LUXE guest account
          </p>
          <h1 className="lx-serif mt-2 text-4xl md:text-6xl">
            {account.loggedIn ? `Hello, ${account.name || "Guest"}.` : "Your dining life."}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/55">
            Favourites, reservations, preferences, loyalty and VIP benefits in one place.
          </p>
        </div>
        <div className="rounded-full bg-white/10 px-3 py-2 text-[8px] uppercase tracking-[.13em] text-[#efc28b]">
          {account.membership}
        </div>
      </div>

      {!account.loggedIn ? (
        <div className="mt-6 flex gap-2">
          <Link href="/account/login" className="rounded-full bg-white px-4 py-3 text-[9px] uppercase tracking-[.13em] text-[#201713]">
            Login
          </Link>
          <Link href="/account/register" className="rounded-full border border-white/20 px-4 py-3 text-[9px] uppercase tracking-[.13em]">
            Create account
          </Link>
        </div>
      ) : null}
    </div>
  );
}
