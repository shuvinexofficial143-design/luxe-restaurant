"use client";

import { useEffect, useState } from "react";

type HealthResponse = {
  ok: boolean;
  data?: {
    configured: boolean;
    connected: boolean;
    schemaReady: boolean;
    message: string;
  };
  error?: {
    message?: string;
  };
};

export default function DatabaseConnectionStatus() {
  const [health, setHealth] = useState<HealthResponse | null>(null);

  async function check() {
    setHealth(null);

    try {
      const response = await fetch("/api/v1/database/health", {
        cache: "no-store",
      });
      const payload = (await response.json()) as HealthResponse;
      setHealth(payload);
    } catch {
      setHealth({
        ok: false,
        error: { message: "Database health endpoint could not be reached." },
      });
    }
  }

  useEffect(() => {
    const initialCheck = window.setTimeout(() => {
      void check();
    }, 0);

    return () => window.clearTimeout(initialCheck);
  }, []);

  const data = health?.data;

  return (
    <div className="rounded-[28px] bg-[#201713] p-5 text-white md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[9px] uppercase tracking-[.14em] text-[#efc28b]">
            Supabase / PostgreSQL
          </p>
          <h2 className="lx-serif mt-2 text-4xl">
            {!health
              ? "Checking connection…"
              : data?.connected
                ? "Database connected."
                : "Database not connected."}
          </h2>
        </div>

        <span
          className={`h-3 w-3 rounded-full ${
            data?.connected ? "bg-emerald-400" : "bg-amber-300"
          }`}
        />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {[
          [data?.configured ? "Yes" : "No", "credentials"],
          [data?.connected ? "Yes" : "No", "connection"],
          [data?.schemaReady ? "Yes" : "No", "schema"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-[16px] bg-white/[.06] p-3">
            <p className="lx-serif text-2xl text-[#efc28b]">{value}</p>
            <p className="mt-1 text-[8px] uppercase tracking-[.09em] text-white/40">
              {label}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[10px] leading-5 text-white/45">
        {data?.message ||
          health?.error?.message ||
          "Waiting for health response."}
      </p>

      <button
        type="button"
        onClick={() => void check()}
        className="mt-4 rounded-full border border-white/15 px-4 py-3 text-[8px] uppercase tracking-[.11em]"
      >
        Recheck connection
      </button>
    </div>
  );
}
