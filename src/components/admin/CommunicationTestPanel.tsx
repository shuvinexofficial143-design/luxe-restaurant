"use client";

import type {
  FormEvent,
} from "react";
import { useState } from "react";
import {
  adminFetch,
} from "@/lib/client/admin-fetch";

export default function CommunicationTestPanel() {
  const [message, setMessage] =
    useState("");

  async function submit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    const form =
      new FormData(
        event.currentTarget
      );

    setMessage(
      "Sending explicit provider test…"
    );

    const response =
      await adminFetch(
        "/api/v1/admin/communications/test",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            channel:
              String(
                form.get(
                  "channel"
                ) || ""
              ),
            recipient:
              String(
                form.get(
                  "recipient"
                ) || ""
              ),
          }),
        }
      );

    const payload =
      (await response.json()) as {
        ok?: boolean;
        data?: {
          provider?: string;
          providerMessageId?: string | null;
        };
        error?: {
          message?: string;
        };
      };

    setMessage(
      response.ok &&
        payload.ok
        ? `Provider accepted test · ${
            payload.data
              ?.provider || ""
          } · ${
            payload.data
              ?.providerMessageId ||
            "accepted"
          }`
        : payload.error
            ?.message ||
          "Provider test failed."
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[24px] bg-[#7c241e] p-5 text-white"
    >
      <p className="text-[9px] uppercase tracking-[.13em] text-[#ffd0aa]">
        Explicit provider test
      </p>
      <h2 className="lx-serif mt-2 text-3xl">
        Send one test message.
      </h2>

      <select
        name="channel"
        className="mt-4 h-11 w-full rounded-[14px] bg-white px-3 text-sm text-[#201713]"
      >
        <option>
          EMAIL
        </option>
        <option>
          WHATSAPP
        </option>
      </select>

      <input
        required
        name="recipient"
        placeholder="Email or WhatsApp recipient"
        className="mt-2 h-11 w-full rounded-[14px] bg-white px-3 text-sm text-[#201713]"
      />

      <button className="mt-3 h-11 w-full rounded-[14px] bg-[#201713] text-[8px] uppercase tracking-[.11em]">
        Send explicit test
      </button>

      {message ? (
        <p className="mt-3 text-[9px] leading-5 text-white/65">
          {message}
        </p>
      ) : null}
    </form>
  );
}
