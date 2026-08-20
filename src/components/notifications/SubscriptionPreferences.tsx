"use client";

import { useState } from "react";
import type {
  SubscriptionPreferences as Preferences,
  SubscriptionRecord,
} from "@/lib/notifications/types";
import { defaultSubscriptionPreferences } from "@/lib/notifications/preferences";
import { subscriptionStorage } from "@/lib/notifications/storage";
import PreferenceGrid from "./PreferenceGrid";
import SubscriptionStatusCard from "./SubscriptionStatusCard";

export default function SubscriptionPreferences() {
  const [subscription, setSubscription] = useState<SubscriptionRecord | null>(
    () =>
      typeof window !== "undefined" ? subscriptionStorage.get() : null
  );
  const [preferences, setPreferences] = useState<Preferences>(
    () => subscription?.preferences || defaultSubscriptionPreferences
  );
  const [saved, setSaved] = useState(false);

  function save() {
    const updated = subscriptionStorage.updatePreferences(preferences);
    if (updated) {
      setSubscription(updated);
      setSaved(true);
    }
  }

  if (!subscription) {
    return (
      <div className="rounded-[28px] bg-[#fffaf4] p-8 text-center">
        <p className="lx-serif text-4xl">No subscription found.</p>
        <p className="mt-3 text-sm text-[#75645d]">
          Subscribe first, then customize your email preferences here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div>
        <PreferenceGrid value={preferences} onChange={setPreferences} />

        <button
          type="button"
          onClick={save}
          className="mt-4 h-13 w-full rounded-[18px] bg-[#7c241e] text-[9px] uppercase tracking-[.13em] text-white"
        >
          {saved ? "Preferences saved ✓" : "Save preferences"}
        </button>
      </div>

      <SubscriptionStatusCard subscription={subscription} />
    </div>
  );
}
