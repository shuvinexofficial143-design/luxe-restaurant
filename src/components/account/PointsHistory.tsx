"use client";

import { useSyncExternalStore } from "react";
import { accountStore } from "@/lib/account/storage";

export default function PointsHistory() {
  const account = useSyncExternalStore(
    accountStore.subscribe,
    accountStore.getSnapshot,
    accountStore.getServerSnapshot
  );

  return (
    <div className="rounded-[26px] bg-[#fffaf4] p-5">
      <p className="lx-kicker">Activity</p>
      <h2 className="lx-serif mt-2 text-3xl">Points history.</h2>

      <div className="mt-4 divide-y divide-[#4a3025]/8">
        {account.pointsHistory.length ? account.pointsHistory.map((entry) => (
          <div key={entry.id} className="flex items-center justify-between gap-4 py-4">
            <div>
              <p className="text-sm">{entry.label}</p>
              <p className="mt-1 text-[9px] text-[#75645d]">
                {new Date(entry.date).toLocaleDateString("en-IN")}
              </p>
            </div>
            <p className={`lx-serif text-xl ${entry.points >= 0 ? "text-[#335f50]" : "text-[#7c241e]"}`}>
              {entry.points >= 0 ? "+" : ""}{entry.points}
            </p>
          </div>
        )) : (
          <p className="py-6 text-xs text-[#75645d]">No points activity yet.</p>
        )}
      </div>
    </div>
  );
}
