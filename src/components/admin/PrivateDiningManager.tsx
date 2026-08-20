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

export default function PrivateDiningManager() {
  useSyncExternalStore(
    adminStore.subscribe,
    adminStore.getVersion,
    adminStore.getServerVersion
  );
  const rows = adminStore.list("privateDining");
  const options = adminStatusOptions.privateDining || [];

  const columns: AdminColumn<AdminRecord>[] = [
    { key: "id", label: "Enquiry", render: (row) => text(row, "id") },
    {
      key: "guest",
      label: "Contact",
      render: (row) => (
        <div>
          <p>{text(row, "name")}</p>
          <p className="mt-1 text-[9px] text-[#8a756b]">{text(row, "phone")}</p>
        </div>
      ),
    },
    {
      key: "event",
      label: "Plan",
      render: (row) =>
        `${text(row, "roomName")} · ${String(row.guests || 0)} guests · ${text(row, "date")}`,
    },
    { key: "package", label: "Package", render: (row) => text(row, "packageName") },
    {
      key: "estimate",
      label: "Estimate",
      render: (row) =>
        typeof row.estimatedTotal === "number"
          ? formatAdminMoney(row.estimatedTotal)
          : "—",
    },
    {
      key: "status",
      label: "Pipeline",
      render: (row) => (
        <div className="space-y-2">
          <StatusBadge value={text(row, "status")} />
          <StatusSelect
            value={
              options.includes(text(row, "status"))
                ? text(row, "status")
                : options[0] || "ENQUIRY_RECEIVED"
            }
            options={options}
            onChange={(status) =>
              adminStore.updateStatus("privateDining", text(row, "id"), status)
            }
          />
        </div>
      ),
    },
  ];

  return (
    <AdminTable
      rows={rows}
      columns={columns}
      emptyText="No private-dining enquiries yet."
    />
  );
}
