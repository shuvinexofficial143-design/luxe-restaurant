"use client";

import { useSyncExternalStore } from "react";
import { adminStore } from "@/lib/admin/storage";
import type { AdminRecord } from "@/lib/admin/types";
import AdminTable, { type AdminColumn } from "./AdminTable";

function text(row: AdminRecord, key: string) {
  return typeof row[key] === "string" ? String(row[key]) : "—";
}

export default function ReviewManager() {
  useSyncExternalStore(
    adminStore.subscribe,
    adminStore.getVersion,
    adminStore.getServerVersion
  );
  const rows = adminStore.list("reviews");

  const columns: AdminColumn<AdminRecord>[] = [
    { key: "id", label: "Review", render: (row) => text(row, "id") },
    {
      key: "guest",
      label: "Guest",
      render: (row) => `${text(row, "name")} · ${text(row, "city")}`,
    },
    {
      key: "rating",
      label: "Rating",
      render: (row) => `${String(row.rating || 0)} / 5 ★`,
    },
    {
      key: "content",
      label: "Review",
      render: (row) => (
        <div className="max-w-[330px]">
          <p className="font-medium">{text(row, "title")}</p>
          <p className="mt-1 line-clamp-2 text-[10px] leading-5 text-[#75645d]">
            {text(row, "text")}
          </p>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (row) => text(row, "category"),
    },
    {
      key: "action",
      label: "Moderation",
      render: (row) => (
        <button
          type="button"
          onClick={() => adminStore.remove("reviews", text(row, "id"))}
          className="rounded-[13px] border border-[#7c241e]/15 bg-[#7c241e]/5 px-3 py-2 text-[8px] uppercase tracking-[.1em] text-[#7c241e]"
        >
          Remove local
        </button>
      ),
    },
  ];

  return (
    <AdminTable rows={rows} columns={columns} emptyText="No local guest reviews yet." />
  );
}
