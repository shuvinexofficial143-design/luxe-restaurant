"use client";

import Link from "next/link";
import type { NotificationItem } from "@/lib/notifications/types";
import { notificationStore } from "@/lib/notifications/storage";
import {
  notificationLabel,
  relativeNotificationDate,
} from "@/lib/notifications/utils";

export default function NotificationCard({
  item,
}: {
  item: NotificationItem;
}) {
  return (
    <Link
      href={item.href}
      onClick={() => notificationStore.markRead(item.id)}
      className={`block rounded-[22px] border p-5 ${
        item.read
          ? "border-[#4a3025]/8 bg-[#fffaf4]"
          : "border-[#7c241e]/20 bg-[#fff1e8]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[8px] uppercase tracking-[.12em] text-[#7c241e]">
            {notificationLabel(item.type)}
          </p>
          <h3 className="lx-serif mt-1 text-2xl">{item.title}</h3>
        </div>
        <div className="text-right">
          {!item.read ? (
            <span className="inline-block h-2 w-2 rounded-full bg-[#7c241e]" />
          ) : null}
          <p className="mt-1 text-[9px] text-[#8a756b]">
            {relativeNotificationDate(item.createdAt)}
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs leading-6 text-[#75645d]">{item.text}</p>
    </Link>
  );
}
