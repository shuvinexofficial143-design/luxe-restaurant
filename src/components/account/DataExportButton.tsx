"use client";

import {
  useState,
} from "react";

export default function DataExportButton() {
  const [message, setMessage] =
    useState("");

  async function run() {
    setMessage(
      "Preparing your data export…"
    );

    try {
      const response =
        await fetch(
          "/api/v1/account/privacy/export",
          {
            cache:
              "no-store",
          }
        );

      if (!response.ok) {
        setMessage(
          "Data export failed."
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
        "luxe-my-data.json";
      anchor.click();

      URL.revokeObjectURL(
        url
      );

      setMessage(
        "Your JSON export is ready."
      );
    } catch {
      setMessage(
        "Data export failed."
      );
    }
  }

  return (
    <div className="rounded-[22px] bg-[#335f50] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.12em] text-[#efc99a]">
        Your data
      </p>
      <h2 className="lx-serif mt-2 text-3xl">
        Download a self-service export.
      </h2>
      <p className="mt-3 text-[9px] leading-5 text-white/55">
        Export includes account, reservations, orders, loyalty, preferences
        and receipts where available. Password/session secrets are excluded.
      </p>
      <button
        type="button"
        onClick={() =>
          void run()
        }
        className="mt-4 h-11 w-full rounded-[14px] bg-white text-[8px] uppercase tracking-[.11em] text-[#201713]"
      >
        Download my JSON data
      </button>
      {message ? (
        <p className="mt-3 text-[9px] text-[#efc99a]">
          {
            message
          }
        </p>
      ) : null}
    </div>
  );
}
