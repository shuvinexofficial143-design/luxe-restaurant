"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { notificationStore } from "@/lib/notifications/storage";
import { unreadCount } from "@/lib/notifications/utils";

export default function NotificationBell() {
  const items = useSyncExternalStore(
    notificationStore.subscribe,
    notificationStore.getSnapshot,
    notificationStore.getServerSnapshot
  );

  const unread = unreadCount(items);

  return (
    <Link
      href="/notifications"
      className="relative grid h-11 w-11 place-items-center rounded-full border border-[#4a3025]/10 bg-white"
      aria-label={`${unread} unread notifications`}
    >
      ♢
      {unread ? (
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#7c241e] px-1 text-[8px] text-white">
          {unread}
        </span>
      ) : null}
    </Link>
  );
}
