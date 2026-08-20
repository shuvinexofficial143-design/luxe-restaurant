"use client";

import { useEffect, useState } from "react";
import type {
  NotificationQueueRow,
} from "@/lib/server/notifications/types";

export default function NotificationHistory() {
  const [rows, setRows] =
    useState<NotificationQueueRow[]>([]);
  const [message, setMessage] =
    useState(
      "Loading notification history…"
    );

  useEffect(() => {
    fetch(
      "/api/v1/account/communications",
      { cache: "no-store" }
    )
      .then((response) =>
        response.json()
      )
      .then(
        (payload: {
          data?: {
            notifications?: NotificationQueueRow[];
          };
        }) => {
          const notifications =
            payload.data
              ?.notifications || [];
          setRows(notifications);
          setMessage(
            notifications.length
              ? ""
              : "No notifications yet."
          );
        }
      )
      .catch(() =>
        setMessage(
          "Notification history unavailable."
        )
      );
  }, []);

  return (
    <div className="rounded-[26px] bg-[#201713] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.13em] text-[#efc28b]">
        Delivery history
      </p>

      {message ? (
        <p className="mt-3 text-xs text-white/45">
          {message}
        </p>
      ) : null}

      <div className="mt-4 space-y-2">
        {rows
          .slice(0, 20)
          .map((item) => (
            <div
              key={item.id}
              className="rounded-[15px] bg-white/[.06] p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs">
                    {item.template_key}
                  </p>
                  <p className="mt-1 text-[8px] text-white/35">
                    {item.channel}
                  </p>
                </div>
                <span className="text-[8px] uppercase tracking-[.08em] text-[#efc28b]">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
