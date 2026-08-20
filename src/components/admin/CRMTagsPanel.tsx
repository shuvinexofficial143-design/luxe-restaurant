"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import type { CRMCustomerTag } from "@/lib/server/crm/types";

export default function CRMTagsPanel({
  customerId,
  tags,
  onChanged,
}: {
  customerId: string;
  tags: CRMCustomerTag[];
  onChanged: () => void;
}) {
  const [message, setMessage] = useState("");

  async function add(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const tag = String(form.get("tag") || "").trim();

    const response = await fetch(
      `/api/v1/crm/customers/${encodeURIComponent(
        customerId
      )}/tags`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tag }),
      }
    );

    setMessage(
      response.ok ? "Tag saved." : "Tag could not be saved."
    );

    if (response.ok) {
      event.currentTarget.reset();
      onChanged();
    }
  }

  async function remove(tag: string) {
    await fetch(
      `/api/v1/crm/customers/${encodeURIComponent(
        customerId
      )}/tags?tag=${encodeURIComponent(tag)}`,
      { method: "DELETE" }
    ).catch(() => undefined);

    onChanged();
  }

  return (
    <div className="rounded-[24px] bg-[#201713] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.13em] text-[#efc28b]">
        CRM Tags
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag.id}
            type="button"
            onClick={() => void remove(tag.tag)}
            className="rounded-full bg-white/[.08] px-3 py-2 text-[8px]"
          >
            {tag.tag} ×
          </button>
        ))}
        {!tags.length ? (
          <span className="text-[9px] text-white/40">No tags yet.</span>
        ) : null}
      </div>

      <form onSubmit={add} className="mt-4 flex gap-2">
        <input
          required
          name="tag"
          placeholder="VIP wine / terrace / birthday…"
          className="h-11 min-w-0 flex-1 rounded-[14px] bg-white px-3 text-sm text-[#201713]"
        />
        <button className="rounded-[14px] bg-[#7c241e] px-4 text-[8px] uppercase tracking-[.1em]">
          Add
        </button>
      </form>

      {message ? (
        <p className="mt-3 text-[9px] text-[#efc28b]">{message}</p>
      ) : null}
    </div>
  );
}
