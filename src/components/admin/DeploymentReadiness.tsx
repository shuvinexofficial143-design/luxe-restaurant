"use client";

import {
  useEffect,
  useState,
} from "react";
import type {
  DeploymentReadiness as Readiness,
} from "@/lib/deployment/types";

export default function DeploymentReadiness() {
  const [data, setData] =
    useState<Readiness | null>(
      null
    );
  const [message, setMessage] =
    useState(
      "Checking production readiness…"
    );

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
          ok?: boolean;
          data?: {
            readiness?: Readiness;
          };
          error?: {
            message?: string;
          };
        }) => {
          if (
            !payload.data
              ?.readiness
          ) {
            setMessage(
              payload.error
                ?.message ||
                "Readiness unavailable."
            );
            return;
          }

          setData(
            payload.data
              .readiness
          );
          setMessage("");
        }
      )
      .catch(() =>
        setMessage(
          "Readiness unavailable."
        )
      );
  }, []);

  if (!data) {
    return (
      <div className="rounded-[22px] bg-[#fff4de] p-5 text-xs text-[#75645d]">
        {message}
      </div>
    );
  }

  const ready =
    data.checks.filter(
      (item) => item.ready
    ).length;

  return (
    <div className="rounded-[26px] bg-[#201713] p-5 text-white">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[9px] uppercase tracking-[.13em] text-[#efc28b]">
            Production readiness
          </p>
          <h2 className="lx-serif mt-2 text-5xl">
            {data.state}
          </h2>
        </div>
        <div className="rounded-full bg-white/[.07] px-4 py-3 text-[9px] text-white/60">
          {ready}/{data.checks.length}
        </div>
      </div>

      <p className="mt-4 text-[9px] text-white/40">
        Version {data.deploymentVersion}
      </p>
    </div>
  );
}
