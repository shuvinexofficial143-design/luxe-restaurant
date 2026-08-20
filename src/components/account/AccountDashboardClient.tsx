"use client";

import { useEffect, useState } from "react";
import type {
  AccountDashboardPayload,
} from "@/lib/server/account/types";
import AccountProfilePanel from "./AccountProfilePanel";
import LoyaltyWallet from "./LoyaltyWallet";
import SavedDishPanel from "./SavedDishPanel";
import OccasionManager from "./OccasionManager";
import ReservationHistoryPanel from "./ReservationHistoryPanel";

type DashboardResponse = {
  ok: boolean;
  data?: AccountDashboardPayload & {
    customer: {
      id: string;
      name: string;
      email: string;
      phone: string | null;
      emailVerified: boolean;
    };
  };
  error?: { message?: string };
};

export default function AccountDashboardClient() {
  const [data, setData] = useState<DashboardResponse["data"]>();
  const [message, setMessage] = useState("Loading account…");

  async function load() {
    try {
      const response = await fetch("/api/v1/account/dashboard", {
        cache: "no-store",
      });
      const payload = (await response.json()) as DashboardResponse;

      if (!response.ok || !payload.ok || !payload.data) {
        setMessage(payload.error?.message || "Account could not be loaded.");
        return;
      }

      setData(payload.data);
      setMessage("");
    } catch {
      setMessage("Account could not be loaded.");
    }
  }

  useEffect(() => {
    const initialLoad = window.setTimeout(() => {
      void load();
    }, 0);

    return () => window.clearTimeout(initialLoad);
  }, []);

  if (!data) {
    return (
      <div className="rounded-[28px] bg-[#fffaf4] p-8 text-center">
        <p className="lx-serif text-3xl">{message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <AccountProfilePanel
          customer={data.customer}
          profile={data.profile}
          onSaved={() => void load()}
        />
        <LoyaltyWallet
          wallet={data.loyalty}
          history={data.loyaltyHistory}
          onRedeemed={() => void load()}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SavedDishPanel dishes={data.savedDishes} onChanged={() => void load()} />
        <OccasionManager
          occasions={data.occasions}
          onChanged={() => void load()}
        />
      </div>

      <ReservationHistoryPanel />
    </div>
  );
}
