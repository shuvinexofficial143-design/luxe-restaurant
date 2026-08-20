"use client";

import { useEffect, useState } from "react";
import type {
  NotificationQueueRow,
} from "@/lib/server/notifications/types";

export default function NotificationDeliveryTable() {
  const [rows, setRows] =
    useState<NotificationQueueRow[]>([]);

  useEffect(() => {
    fetch(
      "/api/v1/admin/communications",
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
        }) =>
          setRows(
            payload.data
              ?.notifications || []
          )
      )
      .catch(() => setRows([]));
  }, []);

  return (
    <div className="overflow-hidden rounded-[24px] bg-[#fffaf4]">
      <div className="p-5">
        <p className="lx-kicker">
          Delivery queue
        </p>
        <h2 className="lx-serif mt-2 text-3xl">
          Real provider status.
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full">
          <thead className="bg-[#201713] text-white">
            <tr>
              {[
                "Created",
                "Channel",
                "Template",
                "Recipient",
                "Status",
                "Provider ID",
              ].map((label) => (
                <th
                  key={label}
                  className="px-4 py-4 text-left text-[8px] font-normal uppercase tracking-[.09em]"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#4a3025]/8">
            {rows
              .slice(0, 100)
              .map((row) => (
                <tr
                  key={row.id}
                >
                  <td className="px-4 py-3 text-[9px]">
                    {new Date(
                      row.created_at
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </td>
                  <td className="px-4 py-3 text-[9px]">
                    {row.channel}
                  </td>
                  <td className="px-4 py-3 text-[9px]">
                    {row.template_key}
                  </td>
                  <td className="px-4 py-3 text-[9px]">
                    {row.recipient}
                  </td>
                  <td className="px-4 py-3 text-[9px]">
                    {row.status}
                  </td>
                  <td className="px-4 py-3 text-[9px]">
                    {row.provider_message_id ||
                      "—"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
