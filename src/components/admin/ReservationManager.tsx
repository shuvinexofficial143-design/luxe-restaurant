"use client";

import { useSyncExternalStore } from "react";
import { adminStatusOptions } from "@/lib/admin/data";
import { adminStore } from "@/lib/admin/storage";
import type { AdminRecord } from "@/lib/admin/types";
import AdminTable, { type AdminColumn } from "./AdminTable";
import StatusBadge from "./StatusBadge";
import StatusSelect from "./StatusSelect";

function text(row: AdminRecord, key: string) {
  return typeof row[key] === "string" ? String(row[key]) : "—";
}

export default function ReservationManager() {
  useSyncExternalStore(
    adminStore.subscribe,
    adminStore.getVersion,
    adminStore.getServerVersion
  );
  const rows = adminStore.list("reservations");
  const options = adminStatusOptions.reservations || [];

  const columns: AdminColumn<AdminRecord>[] = [
    {
      key: "reference",
      label: "Reference",
      render: (row) => (
        <div>
          <p className="font-medium">{text(row, "id")}</p>
          <p className="mt-1 text-[9px] text-[#8a756b]">{text(row, "createdAt").slice(0, 10)}</p>
        </div>
      ),
    },
    {
      key: "guest",
      label: "Guest",
      render: (row) => (
        <div>
          <p>{text(row, "name")}</p>
          <p className="mt-1 text-[9px] text-[#8a756b]">{text(row, "phone")}</p>
        </div>
      ),
    },
    {
      key: "booking",
      label: "Booking",
      render: (row) => `${String(row.guests || "—")} guests · ${text(row, "date")} · ${text(row, "time")}`,
    },
    {
      key: "area",
      label: "Area / Table",
      render: (row) => `${text(row, "area")} · ${text(row, "tableId")}`,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge value={text(row, "status")} />,
    },
    {
      key: "action",
      label: "Update",
      render: (row) => (
        <StatusSelect
          value={text(row, "status")}
          options={options}
          onChange={(status) =>
            adminStore.updateStatus("reservations", text(row, "id"), status)
          }
        />
      ),
    },
  ];

  return (
    <AdminTable
      rows={rows}
      columns={columns}
      emptyText="No reservation records yet."
    />
  );
}
