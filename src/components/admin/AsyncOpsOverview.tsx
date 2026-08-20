"use client";

import { useEffect, useState } from "react";
import type {
  NotificationQueueRow,
} from "@/lib/server/notifications/types";

type Health = {
  jobs: {
    queued: number;
    running: number;
    failed: number;
    dead: number;
    succeeded: number;
  };
  webhooks: {
    total: number;
    processed: number;
    failed: number;
  };
  notifications: {
    total: number;
    queued: number;
    sent: number;
    failed: number;
    dead: number;
  };
  schedulerConfigured: boolean;
};

export default function AsyncOpsOverview() {
  const [health, setHealth] =
    useState<Health | null>(null);
  const [notifications, setNotifications] =
    useState<NotificationQueueRow[]>([]);
  const [message, setMessage] =
    useState("Loading async operations…");

  useEffect(() => {
    Promise.all([
      fetch("/api/v1/jobs/health", {
        cache: "no-store",
      }),
      fetch(
        "/api/v1/admin/operations/notifications",
        { cache: "no-store" }
      ),
    ])
      .then(async ([healthResponse, notificationResponse]) => {
        const healthPayload =
          (await healthResponse.json()) as {
            ok?: boolean;
            data?: Health;
            error?: { message?: string };
          };

        const notificationPayload =
          (await notificationResponse.json()) as {
            data?: {
              notifications?: NotificationQueueRow[];
            };
          };

        if (!healthResponse.ok || !healthPayload.data) {
          setMessage(
            healthPayload.error?.message ||
              "Async operations are unavailable."
          );
          return;
        }

        setHealth(healthPayload.data);
        setNotifications(
          notificationPayload.data?.notifications || []
        );
        setMessage("");
      })
      .catch(() =>
        setMessage(
          "Async operations could not be loaded."
        )
      );
  }, []);

  if (!health) {
    return (
      <div className="rounded-[24px] bg-[#fff4de] p-5">
        <p className="lx-serif text-3xl">{message}</p>
      </div>
    );
  }

  const cards = [
    [health.jobs.queued, "queued jobs"],
    [health.jobs.running, "running"],
    [health.jobs.failed, "retrying"],
    [health.jobs.dead, "dead jobs"],
    [health.webhooks.processed, "processed webhooks"],
    [health.notifications.sent, "sent notifications"],
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-6">
        {cards.map(([value, label]) => (
          <div
            key={label}
            className="rounded-[18px] bg-[#fffaf4] p-4"
          >
            <p className="lx-serif text-3xl text-[#7c241e]">
              {value}
            </p>
            <p className="mt-1 text-[8px] uppercase tracking-[.09em] text-[#75645d]">
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-[22px] bg-[#335f50] p-5 text-white">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[9px] uppercase tracking-[.12em] text-[#efc99a]">
              Worker runner
            </p>
            <p className="lx-serif mt-2 text-3xl">
              {health.schedulerConfigured
                ? "Runner secret configured"
                : "Runner secret missing"}
            </p>
          </div>
          <span
            className={`h-3 w-3 rounded-full ${
              health.schedulerConfigured
                ? "bg-[#efc99a]"
                : "bg-white/30"
            }`}
          />
        </div>
        <p className="mt-3 text-[10px] leading-5 text-white/50">
          This batch provides the worker endpoint but does not claim a
          scheduler exists. Vercel Cron or another scheduler must call it.
        </p>
      </div>

      <div className="rounded-[22px] bg-[#fffaf4] p-5">
        <p className="text-[9px] uppercase tracking-[.1em] text-[#7c241e]">
          Recent notifications
        </p>
        <div className="mt-3 space-y-2">
          {notifications.slice(0, 8).map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[1fr_auto] gap-3 rounded-[14px] bg-white p-3"
            >
              <div>
                <p className="text-xs">
                  {item.template_key}
                </p>
                <p className="mt-1 text-[8px] text-[#75645d]">
                  {item.channel} · {item.recipient}
                </p>
              </div>
              <span className="text-[8px] uppercase tracking-[.08em] text-[#335f50]">
                {item.status}
              </span>
            </div>
          ))}

          {!notifications.length ? (
            <p className="text-xs text-[#75645d]">
              No queued notifications yet.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
