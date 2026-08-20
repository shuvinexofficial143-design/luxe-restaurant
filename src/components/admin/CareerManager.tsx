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

export default function CareerManager() {
  useSyncExternalStore(
    adminStore.subscribe,
    adminStore.getVersion,
    adminStore.getServerVersion
  );

  const rows = adminStore.list("careers");
  const options = adminStatusOptions.careers || [];

  const columns: AdminColumn<AdminRecord>[] = [
    { key: "id", label: "Application", render: (row) => text(row, "id") },
    {
      key: "candidate",
      label: "Candidate",
      render: (row) => (
        <div>
          <p>{text(row, "name")}</p>
          <p className="mt-1 text-[9px] text-[#8a756b]">{text(row, "email")}</p>
        </div>
      ),
    },
    { key: "role", label: "Role", render: (row) => text(row, "jobTitle") },
    {
      key: "experience",
      label: "Experience",
      render: (row) => text(row, "experience"),
    },
    {
      key: "cv",
      label: "CV file",
      render: (row) => text(row, "resumeName"),
    },
    {
      key: "status",
      label: "Hiring stage",
      render: (row) => (
        <div className="space-y-2">
          <StatusBadge value={text(row, "status")} />
          <StatusSelect
            value={text(row, "status")}
            options={options}
            onChange={(status) =>
              adminStore.updateStatus("careers", text(row, "id"), status)
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
      emptyText="No career applications yet."
    />
  );
}
