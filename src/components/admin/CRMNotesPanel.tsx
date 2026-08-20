"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import type { CRMCustomerNote } from "@/lib/server/crm/types";

export default function CRMNotesPanel({
  customerId,
  notes,
  onChanged,
}: {
  customerId: string;
  notes: CRMCustomerNote[];
  onChanged: () => void;
}) {
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const response = await fetch(
      `/api/v1/crm/customers/${encodeURIComponent(
        customerId
      )}/notes`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorLabel: "LUXE Admin",
          note: String(form.get("note") || ""),
        }),
      }
    );

    setMessage(
      response.ok ? "CRM note saved." : "CRM note could not be saved."
    );

    if (response.ok) {
      event.currentTarget.reset();
      onChanged();
    }
  }

  return (
    <div className="rounded-[24px] bg-[#fffaf4] p-5">
      <p className="lx-kicker">Staff notes</p>
      <h2 className="lx-serif mt-2 text-3xl">Guest context.</h2>

      <form onSubmit={submit} className="mt-4">
        <textarea
          required
          name="note"
          rows={3}
          placeholder="Preference, service note, follow-up context…"
          className="w-full rounded-[15px] border border-[#4a3025]/10 bg-white p-3 text-sm"
        />
        <button className="mt-2 h-11 w-full rounded-[14px] bg-[#335f50] text-[8px] uppercase tracking-[.11em] text-white">
          Add CRM note
        </button>
      </form>

      {message ? (
        <p className="mt-3 text-[9px] text-[#75645d]">{message}</p>
      ) : null}

      <div className="mt-4 space-y-2">
        {notes.map((note) => (
          <article key={note.id} className="rounded-[14px] bg-white p-3">
            <p className="text-xs leading-6">{note.note}</p>
            <p className="mt-2 text-[8px] uppercase tracking-[.08em] text-[#8a756b]">
              {note.author_label}
              {note.created_at
                ? ` · ${new Date(note.created_at).toLocaleString(
                    "en-IN"
                  )}`
                : ""}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
