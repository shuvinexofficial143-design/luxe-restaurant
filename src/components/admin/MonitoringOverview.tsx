"use client";

import {
  useEffect,
  useState,
} from "react";
import type {
  HealthReport,
} from "@/lib/server/monitoring/types";

export default function MonitoringOverview() {
  const [report, setReport] =
    useState<HealthReport | null>(
      null
    );

  useEffect(() => {
    fetch(
      "/api/health/deep",
      { cache: "no-store" }
    )
      .then(
        (response) =>
          response.json()
      )
      .then(
        (payload: {
          data?: HealthReport;
        }) =>
          setReport(
            payload.data ||
              null
          )
      )
      .catch(
        () =>
          setReport(null)
      );
  }, []);

  if (!report) {
    return (
      <div className="rounded-[22px] bg-[#fff4de] p-5 text-xs text-[#75645d]">
        Deep health report unavailable.
      </div>
    );
  }

  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
      {report.checks.map(
        (check) => (
          <div
            key={check.key}
            className="rounded-[18px] bg-[#fffaf4] p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="lx-serif text-xl">
                {
                  check.label
                }
              </p>
              <span className="text-[8px] uppercase tracking-[.09em] text-[#7c241e]">
                {
                  check.state
                }
              </span>
            </div>
            <p className="mt-2 text-[9px] leading-5 text-[#75645d]">
              {
                check.detail
              }
            </p>
            {typeof check.latencyMs ===
            "number" ? (
              <p className="mt-2 text-[8px] text-[#335f50]">
                {
                  check.latencyMs
                }{" "}
                ms
              </p>
            ) : null}
          </div>
        )
      )}
    </div>
  );
}
