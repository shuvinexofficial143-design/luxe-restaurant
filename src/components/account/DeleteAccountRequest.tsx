"use client";

import type {
  FormEvent,
} from "react";
import {
  useState,
} from "react";

export default function DeleteAccountRequest() {
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

    const response =
      await fetch(
        "/api/v1/account/privacy/delete",
        {
          method:
            "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body:
            JSON.stringify(
              {
                note:
                  String(
                    form.get(
                      "note"
                    ) || ""
                  ),
              }
            ),
        }
      );

    const payload =
      (await response.json()) as {
        ok?: boolean;
        data?: {
          message?: string;
        };
        error?: {
          message?: string;
        };
      };

    setMessage(
      response.ok &&
        payload.ok
        ? payload.data
            ?.message ||
            "Deletion request recorded."
        : payload.error
            ?.message ||
            "Deletion request failed."
    );
  }

  return (
    <form
      onSubmit={
        submit
      }
      className="rounded-[22px] bg-[#7c241e] p-5 text-white"
    >
      <p className="text-[9px] uppercase tracking-[.12em] text-[#ffd0aa]">
        Account deletion request
      </p>
      <h2 className="lx-serif mt-2 text-3xl">
        Request review, not instant silent deletion.
      </h2>
      <p className="mt-3 text-[9px] leading-5 text-white/55">
        This records a privacy request. It does not claim that legally required
        payment, audit or reservation records are instantly erased.
      </p>

      <textarea
        name="note"
        rows={3}
        placeholder="Optional note"
        className="mt-4 w-full rounded-[14px] bg-white p-3 text-sm text-[#201713]"
      />

      <button className="mt-3 h-11 w-full rounded-[14px] bg-[#201713] text-[8px] uppercase tracking-[.11em]">
        Request deletion review
      </button>

      {message ? (
        <p className="mt-3 text-[9px] leading-5 text-[#ffd0aa]">
          {
            message
          }
        </p>
      ) : null}
    </form>
  );
}
