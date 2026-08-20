"use client";

import { FormEvent, useSyncExternalStore } from "react";
import { accountStore } from "@/lib/account/storage";

export default function OccasionEditor() {
  const account = useSyncExternalStore(
    accountStore.subscribe,
    accountStore.getSnapshot,
    accountStore.getServerSnapshot
  );

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    accountStore.addOccasion({
      label: String(form.get("label") || ""),
      date: String(form.get("date") || ""),
    });
    event.currentTarget.reset();
  }

  return (
    <div className="rounded-[26px] bg-[#fffaf4] p-5">
      <p className="lx-kicker">Special occasions</p>
      <h2 className="lx-serif mt-2 text-3xl">Never forget the date.</h2>

      <form onSubmit={submit} className="mt-4 grid grid-cols-[1fr_130px_auto] gap-2">
        <input
          required
          name="label"
          placeholder="Anniversary"
          className="h-11 min-w-0 rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-sm"
        />
        <input
          required
          name="date"
          type="date"
          className="h-11 min-w-0 rounded-[14px] border border-[#4a3025]/10 bg-white px-2 text-xs"
        />
        <button className="rounded-[14px] bg-[#7c241e] px-4 text-white">+</button>
      </form>

      <div className="mt-4 space-y-2">
        {account.occasions.map((occasion) => (
          <div key={occasion.id} className="flex items-center justify-between rounded-[16px] bg-[#f3e7dc] p-3">
            <div>
              <p className="text-sm">{occasion.label}</p>
              <p className="mt-1 text-[9px] text-[#75645d]">{occasion.date}</p>
            </div>
            <button
              type="button"
              onClick={() => accountStore.removeOccasion(occasion.id)}
              className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#7c241e]"
              aria-label={`Remove ${occasion.label}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
