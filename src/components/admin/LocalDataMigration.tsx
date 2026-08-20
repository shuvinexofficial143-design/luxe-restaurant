"use client";

import { useState } from "react";

type Section = "reservations" | "orders" | "cms";

const storageKeys: Record<Section, string> = {
  reservations: "luxe-reservations-v1",
  orders: "luxe-orders-v1",
  cms: "luxe-cms-items-v1",
};

type MigrationResponse = {
  ok: boolean;
  data?: {
    attempted: number;
    migrated: number;
    failed: number;
  };
  error?: {
    message?: string;
  };
};

export default function LocalDataMigration() {
  const [running, setRunning] = useState<Section | null>(null);
  const [messages, setMessages] = useState<Record<Section, string>>({
    reservations: "",
    orders: "",
    cms: "",
  });

  async function migrate(section: Section) {
    setRunning(section);

    try {
      const raw = window.localStorage.getItem(storageKeys[section]);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      const records = Array.isArray(parsed) ? parsed : [];

      const response = await fetch("/api/v1/database/migrate-local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, records }),
      });

      const payload = (await response.json()) as MigrationResponse;

      if (!response.ok || !payload.ok || !payload.data) {
        setMessages((current) => ({
          ...current,
          [section]:
            payload.error?.message || "Migration request was not successful.",
        }));
        return;
      }

      const result = payload.data;

      setMessages((current) => ({
        ...current,
        [section]: `${result.migrated}/${result.attempted} migrated · ${result.failed} failed`,
      }));
    } catch {
      setMessages((current) => ({
        ...current,
        [section]: "Could not read or migrate local browser records.",
      }));
    } finally {
      setRunning(null);
    }
  }

  return (
    <div className="rounded-[28px] bg-[#fffaf4] p-5">
      <p className="text-[9px] uppercase tracking-[.13em] text-[#7c241e]">
        Browser → Database
      </p>
      <h2 className="lx-serif mt-2 text-4xl">Migration assistant.</h2>
      <p className="mt-3 text-sm leading-7 text-[#75645d]">
        Copies existing demo records into Supabase. Existing IDs are updated
        instead of blindly duplicated.
      </p>

      <div className="mt-5 space-y-2">
        {(["reservations", "orders", "cms"] as Section[]).map((section) => (
          <div
            key={section}
            className="rounded-[18px] border border-[#4a3025]/10 bg-white p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="lx-serif text-2xl capitalize">{section}</p>
                <p className="mt-1 text-[9px] text-[#8a756b]">
                  {storageKeys[section]}
                </p>
              </div>
              <button
                type="button"
                disabled={running !== null}
                onClick={() => void migrate(section)}
                className="rounded-full bg-[#7c241e] px-4 py-3 text-[8px] uppercase tracking-[.11em] text-white disabled:opacity-50"
              >
                {running === section ? "Migrating…" : "Migrate"}
              </button>
            </div>

            {messages[section] ? (
              <p className="mt-3 text-[10px] leading-5 text-[#75645d]">
                {messages[section]}
              </p>
            ) : null}
          </div>
        ))}
      </div>

      <p className="mt-4 rounded-[15px] bg-[#fff4de] p-3 text-[9px] leading-5 text-[#75645d]">
        Do not clear localStorage until you have verified the migrated records
        in Supabase. This tool does not delete local data.
      </p>
    </div>
  );
}
