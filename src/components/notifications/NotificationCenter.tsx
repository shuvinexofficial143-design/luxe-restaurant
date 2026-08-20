"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import type { NotificationType } from "@/lib/notifications/types";
import { notificationStore } from "@/lib/notifications/storage";
import NotificationCard from "./NotificationCard";
import NotificationFilters from "./NotificationFilters";
import NotificationEmptyState from "./NotificationEmptyState";

export default function NotificationCenter() {
  const items = useSyncExternalStore(
    notificationStore.subscribe,
    notificationStore.getSnapshot,
    notificationStore.getServerSnapshot
  );
  const [filter, setFilter] = useState<"All" | NotificationType>("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? items
        : items.filter((item) => item.type === filter),
    [filter, items]
  );

  return (
    <div>
      <div className="rounded-[22px] bg-[#fffaf4] p-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
            Notification center
          </p>
          <button
            type="button"
            onClick={() => notificationStore.markAllRead()}
            className="text-[8px] uppercase tracking-[.1em] text-[#335f50]"
          >
            Mark all read
          </button>
        </div>

        <div className="mt-3">
          <NotificationFilters value={filter} onChange={setFilter} />
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {visible.length ? (
          visible.map((item) => (
            <NotificationCard key={item.id} item={item} />
          ))
        ) : (
          <NotificationEmptyState />
        )}
      </div>
    </div>
  );
}
