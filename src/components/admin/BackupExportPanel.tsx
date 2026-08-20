"use client";

import {
  useState,
} from "react";
import {
  adminFetch,
} from "@/lib/client/admin-fetch";

export default function BackupExportPanel() {
  const [message, setMessage] =
    useState("");

  async function run() {
    setMessage(
      "Building sanitized export…"
    );

    try {
      const response =
        await adminFetch(
          "/api/v1/admin/backup/export",
          {
            method:
              "POST",
          }
        );

      if (!response.ok) {
        const payload =
          (await response.json()) as {
            error?: {
              message?: string;
            };
          };

        setMessage(
          payload.error
            ?.message ||
            "Backup export failed."
        );
        return;
      }

      const blob =
        await response.blob();
      const url =
        URL.createObjectURL(
          blob
        );
      const anchor =
        document.createElement(
          "a"
        );

      anchor.href = url;
      anchor.download =
        `luxe-sanitized-backup-${new Date()
          .toISOString()
          .slice(
            0,
            10
          )}.json`;
      anchor.click();

      URL.revokeObjectURL(
        url
      );

      setMessage(
        "Sanitized JSON export created."
      );
    } catch {
      setMessage(
        "Backup export failed."
      );
    }
  }

  return (
    <div className="rounded-[24px] bg-[#7c241e] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.13em] text-[#ffd0aa]">
        On-demand backup export
      </p>
      <h2 className="lx-serif mt-2 text-3xl">
        Export core data without auth secrets.
      </h2>
      <p className="mt-3 text-[9px] leading-5 text-white/55">
        This creates a sanitized JSON snapshot. It is not an automatic offsite
        backup, point-in-time restore system, or provider-level database backup.
      </p>

      <button
        type="button"
        onClick={() =>
          void run()
        }
        className="mt-4 h-11 w-full rounded-[14px] bg-[#201713] text-[8px] uppercase tracking-[.11em]"
      >
        Create sanitized export
      </button>

      {message ? (
        <p className="mt-3 text-[9px] text-[#ffd0aa]">
          {
            message
          }
        </p>
      ) : null}
    </div>
  );
}
