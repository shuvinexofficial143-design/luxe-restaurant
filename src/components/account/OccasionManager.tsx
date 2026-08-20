"use client";

import { FormEvent, useState } from "react";
import type { CustomerOccasionRow } from "@/lib/server/account/types";

export default function OccasionManager({
  occasions,
  onChanged,
}: {
  occasions: CustomerOccasionRow[];
  onChanged: () => void;
}) {
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const response = await fetch("/api/v1/account/occasions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label: String(form.get("label") || ""),
        date: String(form.get("date") || ""),
        note: String(form.get("note") || ""),
      }),
    });

    setMessage(response.ok ? "Occasion saved." : "Could not save occasion.");

    if (response.ok) {
      event.currentTarget.reset();
      onChanged();
    }
  }

  return (
    <div className="rounded-[28px] bg-[#fffaf4] p-5">
      <p className="lx-kicker">Special dates</p>
      <h2 className="lx-serif mt-2 text-3xl">Occasions.</h2>

      <div className="mt-4 space-y-2">
        {occasions.map((item) => (
          <div key={item.id} className="rounded-[15px] bg-white p-3">
            <div className="flex justify-between gap-3">
              <p className="lx-serif text-xl">{item.label}</p>
              <p className="text-[9px] text-[#7c241e]">{item.occasion_date}</p>
            </div>
            {item.note ? (
              <p className="mt-1 text-[9px] text-[#75645d]">{item.note}</p>
            ) : null}
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="mt-4 grid gap-2">
        <input
          required
          name="label"
          placeholder="Birthday / Anniversary"
          className="h-11 rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-sm"
        />
        <input
          required
          name="date"
          type="date"
          className="h-11 rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-sm"
        />
        <input
          name="note"
          placeholder="Optional note"
          className="h-11 rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-sm"
        />
        <button className="h-11 rounded-[14px] bg-[#335f50] text-[8px] uppercase tracking-[.11em] text-white">
          Add occasion
        </button>
      </form>

      {message ? (
        <p className="mt-3 text-[9px] text-[#75645d]">{message}</p>
      ) : null}
    </div>
  );
}
