"use client";

import { useSyncExternalStore } from "react";
import LuxeShell from "@/components/luxe/LuxeShell";
import AccountHeader from "@/components/account/AccountHeader";
import AccountNav from "@/components/account/AccountNav";
import AccountStats from "@/components/account/AccountStats";
import AccountEmptyState from "@/components/account/AccountEmptyState";
import BookingHistory from "@/components/account/BookingHistory";
import SavedDishes from "@/components/account/SavedDishes";
import LoyaltyCard from "@/components/account/LoyaltyCard";
import { accountStore } from "@/lib/account/storage";

export default function AccountPage() {
  const account = useSyncExternalStore(
    accountStore.subscribe,
    accountStore.getSnapshot,
    accountStore.getServerSnapshot
  );

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1100px]">
          <AccountHeader />
          <div className="mt-4"><AccountNav /></div>

          <div className="mt-4">
            {account.loggedIn ? (
              <div className="space-y-4">
                <AccountStats />
                <div className="grid gap-4 lg:grid-cols-2">
                  <LoyaltyCard />
                  <SavedDishes />
                  <BookingHistory />
                  <div className="rounded-[26px] bg-[#335f50] p-5 text-white">
                    <p className="text-[9px] uppercase tracking-[.14em] text-[#efc99a]">Smart profile</p>
                    <h2 className="lx-serif mt-2 text-3xl">Next visit, more personal.</h2>
                    <p className="mt-3 text-xs leading-6 text-white/58">
                      Future AI concierge and booking automation can use your saved dining preferences and occasions.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <AccountEmptyState />
            )}
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
