"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  adminFetch,
} from "@/lib/client/admin-fetch";
import type {
  PrivacyRequestRow,
} from "@/lib/server/privacy/types";

export default function PrivacyRequestTable() {
  const [rows, setRows] =
    useState<
      PrivacyRequestRow[]
    >([]);
  const [message, setMessage] =
    useState(
      "Loading privacy requests…"
    );
  const [busyId, setBusyId] =
    useState("");

  const load =
    useCallback(
      async () => {
        const response =
          await fetch(
            "/api/v1/admin/privacy/requests",
            {
              cache:
                "no-store",
            }
          );

        const payload =
          (await response.json()) as {
            ok?: boolean;
            data?: {
              requests?: PrivacyRequestRow[];
            };
            error?: {
              message?: string;
            };
          };

        const requests =
          payload.data
            ?.requests ||
          [];

        setRows(
          requests
        );
        setMessage(
          requests.length
            ? ""
            : payload.error
                ?.message ||
                "No privacy requests."
        );
      },
      []
    );

  useEffect(() => {
    const initialLoad =
      window.setTimeout(
        () => {
          void load();
        },
        0
      );

    return () =>
      window.clearTimeout(
        initialLoad
      );
  }, [load]);

  async function update(
    id: string,
    status:
      | "IN_REVIEW"
      | "COMPLETED"
      | "REJECTED"
  ) {
    setBusyId(id);

    try {
      await adminFetch(
        `/api/v1/admin/privacy/process/${encodeURIComponent(
          id
        )}`,
        {
          method:
            "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body:
            JSON.stringify(
              {
                status,
                note:
                  "Updated from LUXE privacy admin panel.",
              }
            ),
        }
      );

      await load();
    } finally {
      setBusyId("");
    }
  }

  return (
    <div className="overflow-hidden rounded-[24px] bg-[#fffaf4]">
      <div className="p-5">
        <p className="lx-kicker">
          Privacy requests
        </p>
        <h2 className="lx-serif mt-2 text-3xl">
          Export, deletion and correction review.
        </h2>
        {message ? (
          <p className="mt-2 text-xs text-[#75645d]">
            {
              message
            }
          </p>
        ) : null}
      </div>

      {rows.length ? (
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full">
            <thead className="bg-[#201713] text-white">
              <tr>
                {[
                  "Requested",
                  "Type",
                  "Status",
                  "Customer",
                  "Note",
                  "Actions",
                ].map(
                  (
                    label
                  ) => (
                    <th
                      key={
                        label
                      }
                      className="px-4 py-4 text-left text-[8px] font-normal uppercase tracking-[.09em]"
                    >
                      {
                        label
                      }
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4a3025]/8">
              {rows.map(
                (
                  row
                ) => (
                  <tr
                    key={
                      row.id
                    }
                  >
                    <td className="px-4 py-3 text-[9px]">
                      {new Date(
                        row.requested_at
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </td>
                    <td className="px-4 py-3 text-[9px]">
                      {
                        row.request_type
                      }
                    </td>
                    <td className="px-4 py-3 text-[9px]">
                      {
                        row.status
                      }
                    </td>
                    <td className="px-4 py-3 text-[9px]">
                      {row.customer_id ||
                        "—"}
                    </td>
                    <td className="max-w-[260px] px-4 py-3 text-[9px] text-[#75645d]">
                      {row.request_note ||
                        "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {[
                          "IN_REVIEW",
                          "COMPLETED",
                          "REJECTED",
                        ].map(
                          (
                            status
                          ) => (
                            <button
                              key={
                                status
                              }
                              type="button"
                              disabled={
                                busyId ===
                                row.id
                              }
                              onClick={() =>
                                void update(
                                  row.id,
                                  status as
                                    | "IN_REVIEW"
                                    | "COMPLETED"
                                    | "REJECTED"
                                )
                              }
                              className="rounded-full bg-[#335f50] px-2 py-2 text-[7px] text-white disabled:opacity-30"
                            >
                              {
                                status
                              }
                            </button>
                          )
                        )}
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
