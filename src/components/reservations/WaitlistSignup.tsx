"use client";

import type { FormEvent } from "react";
import { useState } from "react";

export default function WaitlistSignup({
  date,
  time,
  guests,
  area,
}: {
  date: string;
  time: string;
  guests: number;
  area: string;
}) {
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const response = await fetch(
      "/api/v1/reservation-engine/waitlist",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: String(form.get("guestName") || ""),
          email: String(form.get("email") || ""),
          phone: String(form.get("phone") || ""),
          date,
          time,
          guests,
          area,
          notes: String(form.get("notes") || ""),
        }),
      }
    );

    const payload = (await response.json()) as {
      ok?: boolean;
      data?: { entry?: { id?: string } };
      error?: { message?: string };
    };

    setMessage(
      response.ok && payload.ok
        ? `Waitlist joined · ${payload.data?.entry?.id || "saved"}`
        : payload.error?.message || "Waitlist request failed."
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[28px] bg-[#7c241e] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.13em] text-[#ffd0aa]">
        Fully booked
      </p>
      <h2 className="lx-serif mt-2 text-4xl">Join the real waitlist.</h2>
      <p className="mt-3 text-xs leading-6 text-white/55">
        {date} · {time} · {guests} guests · {area}
      </p>

      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        <input
          required
          name="guestName"
          placeholder="Name"
          className="h-11 rounded-[14px] bg-white px-3 text-sm text-[#201713]"
        />
        <input
          required
          name="email"
          type="email"
          placeholder="Email"
          className="h-11 rounded-[14px] bg-white px-3 text-sm text-[#201713]"
        />
        <input
          required
          name="phone"
          placeholder="Phone"
          className="h-11 rounded-[14px] bg-white px-3 text-sm text-[#201713]"
        />
      </div>

      <input
        name="notes"
        placeholder="Optional flexibility / notes"
        className="mt-2 h-11 w-full rounded-[14px] bg-white px-3 text-sm text-[#201713]"
      />

      <button className="mt-3 h-11 w-full rounded-[14px] bg-[#201713] text-[8px] uppercase tracking-[.11em]">
        Join waitlist
      </button>

      {message ? (
        <p className="mt-3 text-[10px] text-white/70">{message}</p>
      ) : null}
    </form>
  );
}
