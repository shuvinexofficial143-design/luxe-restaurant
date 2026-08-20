"use client";

import { useEffect, useState } from "react";
import type {
  CommunicationPreferencesRow,
} from "@/lib/server/communications/types";

export default function CommunicationPreferences() {
  const [preferences, setPreferences] =
    useState<CommunicationPreferencesRow | null>(
      null
    );
  const [message, setMessage] =
    useState(
      "Loading communication preferences…"
    );

  useEffect(() => {
    fetch(
      "/api/v1/account/communications",
      { cache: "no-store" }
    )
      .then((response) =>
        response.json()
      )
      .then(
        (payload: {
          ok?: boolean;
          data?: {
            preferences?: CommunicationPreferencesRow;
          };
          error?: {
            message?: string;
          };
        }) => {
          if (
            !payload.data
              ?.preferences
          ) {
            setMessage(
              payload.error?.message ||
                "Preferences unavailable."
            );
            return;
          }

          setPreferences(
            payload.data.preferences
          );
          setMessage("");
        }
      )
      .catch(() =>
        setMessage(
          "Preferences unavailable."
        )
      );
  }, []);

  async function update(
    key:
      | "transactional_email"
      | "transactional_whatsapp"
      | "marketing_email"
      | "marketing_whatsapp",
    value: boolean
  ) {
    if (!preferences) return;

    const previous =
      preferences;
    const optimistic = {
      ...preferences,
      [key]: value,
    };

    setPreferences(optimistic);

    const response = await fetch(
      "/api/v1/account/communications",
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          [key]: value,
        }),
      }
    );

    if (!response.ok) {
      setPreferences(previous);
      setMessage(
        "Preference update failed."
      );
      return;
    }

    setMessage("Preference saved.");
  }

  if (!preferences) {
    return (
      <div className="rounded-[24px] bg-[#fff4de] p-5">
        <p className="text-xs text-[#75645d]">
          {message}
        </p>
      </div>
    );
  }

  const items = [
    [
      "Reservation / account email",
      "Operational emails such as confirmations.",
      "transactional_email",
    ],
    [
      "WhatsApp service alerts",
      "Reservation and order-status alerts.",
      "transactional_whatsapp",
    ],
    [
      "Marketing email",
      "Offers and editorial campaigns.",
      "marketing_email",
    ],
    [
      "Marketing WhatsApp",
      "Promotional WhatsApp campaigns.",
      "marketing_whatsapp",
    ],
  ] as const;

  return (
    <div className="rounded-[26px] bg-[#fffaf4] p-5">
      <p className="lx-kicker">
        Communication controls
      </p>
      <h2 className="lx-serif mt-2 text-3xl">
        Choose how LUXE contacts you.
      </h2>

      <div className="mt-5 space-y-2">
        {items.map(
          ([title, text, key]) => (
            <label
              key={key}
              className="flex items-center justify-between gap-4 rounded-[16px] bg-white p-4"
            >
              <div>
                <p className="text-sm">
                  {title}
                </p>
                <p className="mt-1 text-[9px] leading-5 text-[#75645d]">
                  {text}
                </p>
              </div>

              <input
                type="checkbox"
                checked={
                  preferences[key]
                }
                onChange={(event) =>
                  void update(
                    key,
                    event.target
                      .checked
                  )
                }
                className="h-5 w-5"
              />
            </label>
          )
        )}
      </div>

      {message ? (
        <p className="mt-3 text-[9px] text-[#75645d]">
          {message}
        </p>
      ) : null}
    </div>
  );
}
