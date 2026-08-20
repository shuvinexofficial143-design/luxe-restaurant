"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  RefundRequestRow,
} from "@/lib/server/billing/types";
import { adminFetch } from "@/lib/client/admin-fetch";

export default function RefundQueue() {
  const [rows, setRows] =
    useState<RefundRequestRow[]>([]);
  const [message, setMessage] =
    useState("Loading refund queue…");
  const [busyId, setBusyId] =
    useState("");

  const load = useCallback(async () => {
    const response = await fetch(
      "/api/v1/admin/billing/refunds",
      { cache: "no-store" }
    );

    const payload = (await response.json()) as {
      ok?: boolean;
      data?: {
        refunds?: RefundRequestRow[];
      };
      error?: {
        message?: string;
      };
    };

    if (!response.ok || !payload.ok) {
      setMessage(
        payload.error?.message ||
          "Refund queue unavailable."
      );
      return;
    }

    const refunds =
      payload.data?.refunds || [];
    setRows(refunds);
    setMessage(
      refunds.length
        ? ""
        : "No pending refund requests."
    );
  }, []);

  useEffect(() => {
    const initialLoad = window.setTimeout(() => {
      void load();
    }, 0);

    return () => window.clearTimeout(initialLoad);
  }, [load]);

  async function process(id: string) {
    setBusyId(id);

    try {
      await adminFetch(
        `/api/v1/admin/billing/refunds/${encodeURIComponent(
          id
        )}/process`,
        { method: "POST" }
      );
      await load();
    } finally {
      setBusyId("");
    }
  }

  return (
    <div className="rounded-[24px] bg-[#fffaf4] p-5">
      <p className="lx-kicker">
        Refund queue
      </p>
      <h2 className="lx-serif mt-2 text-3xl">
        Provider-backed refunds.
      </h2>

      {message ? (
        <p className="mt-3 text-xs text-[#75645d]">
          {message}
        </p>
      ) : null}

      <div className="mt-4 space-y-2">
        {rows.map((row) => (
          <div
            key={row.id}
            className="rounded-[16px] bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="lx-serif text-xl">
                  ₹
                  {Number(
                    row.requested_amount
                  ).toLocaleString(
                    "en-IN"
                  )}
                </p>
                <p className="mt-1 text-[9px] text-[#75645d]">
                  {row.reason}
                </p>
                <p className="mt-1 text-[8px] text-[#8a756b]">
                  {row.id} · {row.status}
                </p>
              </div>

              {[
                "REQUESTED",
                "FAILED",
              ].includes(row.status) ? (
                <button
                  type="button"
                  disabled={
                    busyId === row.id
                  }
                  onClick={() =>
                    void process(row.id)
                  }
                  className="rounded-full bg-[#7c241e] px-4 py-3 text-[8px] uppercase tracking-[.09em] text-white disabled:opacity-40"
                >
                  {busyId === row.id
                    ? "Processing…"
                    : "Refund"}
                </button>
              ) : null}
            </div>

            {row.last_error ? (
              <p className="mt-3 rounded-[12px] bg-[#fff4de] p-3 text-[9px] text-[#7c241e]">
                {row.last_error}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
