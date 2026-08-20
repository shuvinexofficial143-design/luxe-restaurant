"use client";

import {
  useEffect,
  useState,
} from "react";
import type {
  DeploymentCheck,
} from "@/lib/deployment/types";

export default function EnvironmentChecklist() {
  const [rows, setRows] =
    useState<DeploymentCheck[]>([]);

  useEffect(() => {
    fetch(
      "/api/v1/admin/deployment",
      { cache: "no-store" }
    )
      .then(
        (response) =>
          response.json()
      )
      .then(
        (payload: {
          data?: {
            readiness?: {
              checks?: DeploymentCheck[];
            };
          };
        }) =>
          setRows(
            payload.data
              ?.readiness
              ?.checks || []
          )
      )
      .catch(() =>
        setRows([])
      );
  }, []);

  return (
    <div className="rounded-[24px] bg-[#fffaf4] p-5">
      <p className="lx-kicker">
        Environment & runtime
      </p>
      <div className="mt-4 space-y-2">
        {rows.map((item) => (
          <div
            key={item.key}
            className="flex items-start justify-between gap-4 rounded-[14px] bg-white p-3"
          >
            <div>
              <p className="text-xs">
                {item.label}
              </p>
              <p className="mt-1 text-[8px] leading-4 text-[#75645d]">
                {item.detail}
              </p>
            </div>
            <span
              className={`text-[8px] uppercase ${
                item.ready
                  ? "text-[#335f50]"
                  : item.required
                    ? "text-[#7c241e]"
                    : "text-[#8a756b]"
              }`}
            >
              {item.ready
                ? "READY"
                : item.required
                  ? "BLOCKED"
                  : "OPTIONAL"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
