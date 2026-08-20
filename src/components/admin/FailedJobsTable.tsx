"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  AsyncJobRow,
} from "@/lib/server/jobs/types";
import { adminFetch } from "@/lib/client/admin-fetch";

export default function FailedJobsTable() {
  const [jobs, setJobs] =
    useState<AsyncJobRow[]>([]);
  const [message, setMessage] =
    useState("Loading failed jobs…");
  const [busyId, setBusyId] = useState("");

  const load = useCallback(async () => {
    try {
      const response = await fetch(
        "/api/v1/admin/operations/failed-jobs",
        { cache: "no-store" }
      );

      const payload = (await response.json()) as {
        ok?: boolean;
        data?: { jobs?: AsyncJobRow[] };
        error?: { message?: string };
      };

      if (!response.ok || !payload.ok) {
        setMessage(
          payload.error?.message ||
            "Failed jobs could not be loaded."
        );
        return;
      }

      setJobs(payload.data?.jobs || []);
      setMessage(
        payload.data?.jobs?.length
          ? ""
          : "No failed or dead jobs."
      );
    } catch {
      setMessage(
        "Failed jobs could not be loaded."
      );
    }
  }, []);

  useEffect(() => {
    const initialLoad = window.setTimeout(() => {
      void load();
    }, 0);

    return () => window.clearTimeout(initialLoad);
  }, [load]);

  async function retry(jobId: string) {
    setBusyId(jobId);

    try {
      const response = await adminFetch(
        `/api/v1/admin/operations/retry/${encodeURIComponent(
          jobId
        )}`,
        { method: "PATCH" }
      );

      if (response.ok) {
        await load();
      }
    } finally {
      setBusyId("");
    }
  }

  return (
    <div className="overflow-hidden rounded-[24px] bg-[#fffaf4]">
      <div className="p-5">
        <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
          Retry queue
        </p>
        <h2 className="lx-serif mt-2 text-3xl">
          Failed & dead jobs.
        </h2>
        {message ? (
          <p className="mt-2 text-xs text-[#75645d]">
            {message}
          </p>
        ) : null}
      </div>

      {jobs.length ? (
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full">
            <thead className="bg-[#201713] text-white">
              <tr>
                {[
                  "Job",
                  "Type",
                  "Status",
                  "Attempts",
                  "Run after",
                  "Error",
                  "Action",
                ].map((label) => (
                  <th
                    key={label}
                    className="px-4 py-4 text-left text-[8px] font-normal uppercase tracking-[.09em]"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4a3025]/8">
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td className="px-4 py-3 text-[9px]">
                    {job.id}
                  </td>
                  <td className="px-4 py-3 text-[9px]">
                    {job.job_type}
                  </td>
                  <td className="px-4 py-3 text-[9px]">
                    {job.status}
                  </td>
                  <td className="px-4 py-3 text-[9px]">
                    {job.attempts}/{job.max_attempts}
                  </td>
                  <td className="px-4 py-3 text-[9px]">
                    {new Date(
                      job.run_after
                    ).toLocaleString("en-IN")}
                  </td>
                  <td className="max-w-[260px] px-4 py-3 text-[9px] text-[#7c241e]">
                    <span className="line-clamp-2">
                      {job.last_error || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {job.status === "DEAD" ? (
                      <button
                        type="button"
                        disabled={busyId === job.id}
                        onClick={() =>
                          void retry(job.id)
                        }
                        className="rounded-full bg-[#335f50] px-3 py-2 text-[8px] text-white disabled:opacity-40"
                      >
                        {busyId === job.id
                          ? "Retrying…"
                          : "Requeue"}
                      </button>
                    ) : (
                      <span className="text-[8px] text-[#75645d]">
                        auto retry scheduled
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
