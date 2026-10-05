"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import AdminTable, { type AdminColumn } from "./AdminTable";
import StatusBadge from "./StatusBadge";

type ReservationRow = {
  id: string;
  guest_name: string;
  email: string;
  phone: string;
  reservation_date: string;
  reservation_time: string;
  guest_count: number;
  area: string | null;
  table_id: string | null;
  occasion: string | null;
  status: string;
  deposit_required?: boolean;
  deposit_amount?: number;
  payment_status?: string;
};

export default function ReservationManager() {
  const [rows, setRows] = useState<ReservationRow[]>([]);
  const [message, setMessage] = useState("Loading reservations…");
  const [status, setStatus] = useState("ALL");

  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/v1/reservations", {
        cache: "no-store",
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        data?: { reservations?: ReservationRow[] };
        error?: { message?: string };
      };

      if (!response.ok || !payload.ok) {
        setMessage(payload.error?.message || "Reservations could not be loaded.");
        return;
      }

      setRows(payload.data?.reservations || []);
      setMessage("");
    } catch {
      setMessage("Reservations could not be loaded.");
    }
  }, []);

  useEffect(() => {
    const initial = window.setTimeout(() => void load(), 0);
    const timer = window.setInterval(() => void load(), 30000);

    return () => {
      window.clearTimeout(initial);
      window.clearInterval(timer);
    };
  }, [load]);

  const visible = useMemo(
    () =>
      status === "ALL"
        ? rows
        : rows.filter((row) => row.status === status),
    [rows, status]
  );

  const statuses = useMemo(
    () => ["ALL", ...Array.from(new Set(rows.map((row) => row.status)))],
    [rows]
  );

  const columns: AdminColumn<ReservationRow>[] = [
    {
      key: "reference",
      label: "Reference",
      render: (row) => (
        <div>
          <p className="font-medium">{row.id}</p>
          <p className="mt-1 text-[10px] text-[#8a756b]">
            {row.reservation_date} · {row.reservation_time}
          </p>
        </div>
      ),
    },
    {
      key: "guest",
      label: "Guest",
      render: (row) => (
        <div>
          <p>{row.guest_name}</p>
          <p className="mt-1 text-[10px] text-[#8a756b]">{row.phone}</p>
        </div>
      ),
    },
    {
      key: "booking",
      label: "Booking",
      render: (row) =>
        row.guest_count + " guests · " + (row.area || "Dining room"),
    },
    {
      key: "table",
      label: "Table",
      render: (row) => row.table_id || "Assigned",
    },
    {
      key: "deposit",
      label: "Deposit",
      render: (row) =>
        row.deposit_required
          ? "₹" + Number(row.deposit_amount || 0).toLocaleString("en-IN") +
            " · " + (row.payment_status || "UNPAID")
          : "Not required",
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge value={row.status} />,
    },
  ];

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2 overflow-x-auto">
          {statuses.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setStatus(item)}
              className={
                "shrink-0 rounded-full border px-3 py-2 text-[10px] uppercase tracking-[.1em] " +
                (status === item
                  ? "border-[#7c241e] bg-[#7c241e] text-white"
                  : "border-[#4a3025]/10 bg-white text-[#75645d]")
              }
            >
              {item}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => void load()}
          className="rounded-full border border-[#4a3025]/10 bg-white px-4 py-2 text-[10px] uppercase tracking-[.1em] text-[#7c241e]"
        >
          Refresh
        </button>
      </div>

      {message ? (
        <p className="mb-4 rounded-[18px] bg-[#fff4de] p-4 text-sm text-[#75645d]">
          {message}
        </p>
      ) : null}

      <AdminTable
        rows={visible}
        columns={columns}
        emptyText="No upcoming reservations."
      />
    </div>
  );
}
