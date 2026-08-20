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

function money(row: AdminRecord, key: string) {
  return typeof row[key] === "number" ? formatAdminMoney(Number(row[key])) : "—";
}

export default function OrderManager() {
  useSyncExternalStore(
    adminStore.subscribe,
    adminStore.getVersion,
    adminStore.getServerVersion
  );

  const rows = adminStore.list("orders");
  const options = adminStatusOptions.orders || [];

  const columns: AdminColumn<AdminRecord>[] = [
    { key: "id", label: "Order", render: (row) => text(row, "id") },
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
      key: "mode",
      label: "Fulfillment",
      render: (row) =>
        text(row, "fulfillment") === "TABLE"
          ? `Table · ${text(row, "tableNumber")}`
          : `Pickup · ${text(row, "pickupTime")}`,
    },
    { key: "total", label: "Total", render: (row) => money(row, "total") },
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
            adminStore.updateStatus("orders", text(row, "id"), status)
          }
        />
      ),
    },
  ];

  return <AdminTable rows={rows} columns={columns} emptyText="No orders yet." />;
}
