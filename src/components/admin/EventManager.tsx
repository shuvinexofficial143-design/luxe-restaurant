"use client";

import { useSyncExternalStore } from "react";
import { adminStatusOptions } from "@/lib/admin/data";
import { adminStore } from "@/lib/admin/storage";
import { formatAdminMoney } from "@/lib/admin/analytics";
import type { AdminRecord } from "@/lib/admin/types";
import AdminTable, { type AdminColumn } from "./AdminTable";
import StatusBadge from "./StatusBadge";
import StatusSelect from "./StatusSelect";

function text(row: AdminRecord, key: string) {
  return typeof row[key] === "string" ? String(row[key]) : "—";
}

export default function EventManager() {
  useSyncExternalStore(
    adminStore.subscribe,
    adminStore.getVersion,
    adminStore.getServerVersion
  );
  const rows = adminStore.list("events");
  const options = adminStatusOptions.events || [];

  const columns: AdminColumn<AdminRecord>[] = [
    { key: "id", label: "Booking", render: (row) => text(row, "id") },
    { key: "event", label: "Event", render: (row) => text(row, "eventTitle") },
    {
      key: "guest",
      label: "Guest",
      render: (row) => `${text(row, "guestName")} · ${text(row, "phone")}`,
    },
    {
      key: "tickets",
      label: "Tickets",
      render: (row) => String(row.quantity || 0),
    },
    {
      key: "total",
      label: "Total",
      render: (row) =>
        typeof row.total === "number" ? formatAdminMoney(row.total) : "—",
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <div className="space-y-2">
          <StatusBadge value={text(row, "status")} />
          <StatusSelect
            value={text(row, "status")}
            options={options}
            onChange={(status) =>
              adminStore.updateStatus("events", text(row, "id"), status)
            }
          />
        </div>
      ),
    },
  ];

  return (
    <AdminTable rows={rows} columns={columns} emptyText="No event bookings yet." />
  );
}
