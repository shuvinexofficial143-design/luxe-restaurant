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

export default function GiftManager() {
  useSyncExternalStore(
    adminStore.subscribe,
    adminStore.getVersion,
    adminStore.getServerVersion
  );

  const rows = adminStore.list("gifts");
  const options = adminStatusOptions.gifts || [];

  const columns: AdminColumn<AdminRecord>[] = [
    { key: "id", label: "Gift", render: (row) => text(row, "id") },
    {
      key: "code",
      label: "Code",
      render: (row) => <span className="font-medium tracking-[.06em]">{text(row, "code")}</span>,
    },
    {
      key: "recipient",
      label: "Recipient",
      render: (row) => `${text(row, "recipientName")} · ${text(row, "recipientEmail")}`,
    },
    {
      key: "balance",
      label: "Balance",
      render: (row) =>
        typeof row.balance === "number" ? formatAdminMoney(row.balance) : "—",
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
            adminStore.updateStatus("gifts", text(row, "id"), status)
          }
        />
      ),
    },
  ];

  return <AdminTable rows={rows} columns={columns} emptyText="No gift cards created yet." />;
}
