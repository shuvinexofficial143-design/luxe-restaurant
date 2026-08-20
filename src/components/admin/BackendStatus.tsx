"use client";

import { useEffect, useState } from "react";

type HealthPayload = {
  ok: boolean;
  data?: {
    environment: {
      databaseConfigured: boolean;
      sessionSecretConfigured: boolean;
      appUrlConfigured: boolean;
    };
    database: {
      configured: boolean;
      connected: boolean;
      adapter: string;
      message: string;
    };
  };
  error?: {
    message?: string;
  };
};

export default function BackendStatus() {
  const [payload, setPayload] = useState<HealthPayload | null>(null);

  useEffect(() => {
    fetch("/api/v1/health", { cache: "no-store" })
      .then((response) => response.json())
      .then((value: HealthPayload) => setPayload(value))
      .catch(() =>
        setPayload({
          ok: false,
          error: { message: "Health endpoint could not be reached." },
        })
      );
  }, []);

  if (!payload) {
    return (
      <div className="rounded-[26px] bg-[#fffaf4] p-5">
        <p className="lx-serif text-3xl">Checking backend…</p>
      </div>
    );
  }

  const database = payload.data?.database;
  const environment = payload.data?.environment;

  return (
    <div className="rounded-[28px] bg-[#201713] p-5 text-white md:p-6">
      <p className="text-[9px] uppercase tracking-[.14em] text-[#efc28b]">
        Backend health
      </p>
      <h2 className="lx-serif mt-2 text-4xl">
        {database?.connected ? "Database connected." : "Foundation ready."}
      </h2>

      <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
        {[
          [
            environment?.databaseConfigured ? "Configured" : "Missing",
            "DATABASE_URL",
          ],
          [
            environment?.sessionSecretConfigured ? "Ready" : "Missing",
            "session secret",
          ],
          [database?.adapter || "Unknown", "DB adapter"],
          [database?.connected ? "Yes" : "No", "live connection"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-[16px] bg-white/[.06] p-3">
            <p className="lx-serif text-xl text-[#efc28b]">{value}</p>
            <p className="mt-1 text-[8px] uppercase tracking-[.09em] text-white/40">
              {label}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[10px] leading-5 text-white/45">
        {database?.message || payload.error?.message || "No status message."}
      </p>
    </div>
  );
}
