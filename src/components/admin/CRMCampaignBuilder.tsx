"use client";

import type { FormEvent } from "react";
import { useState } from "react";

export default function CRMCampaignBuilder() {
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const estimatedRecipients = Number(
      form.get("estimatedRecipients") || 0
    );

    const response = await fetch("/api/v1/crm/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: String(form.get("name") || ""),
        channel: String(form.get("channel") || "EMAIL"),
        estimatedRecipients,
        audienceFilter: {
          segment: String(form.get("segment") || "VIP"),
        },
      }),
    });

    const payload = (await response.json()) as {
      ok?: boolean;
      data?: {
        campaign?: { id?: string };
        sendingStarted?: boolean;
      };
      error?: { message?: string };
    };

    setMessage(
      response.ok && payload.ok
        ? `Draft saved · ${
            payload.data?.campaign?.id || "campaign"
          }. No messages were sent.`
        : payload.error?.message || "Campaign could not be saved."
    );

    if (response.ok) event.currentTarget.reset();
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[28px] bg-[#7c241e] p-5 text-white"
    >
      <p className="text-[9px] uppercase tracking-[.13em] text-[#ffd0aa]">
        Campaign foundation
      </p>
      <h2 className="lx-serif mt-2 text-3xl">
        Save the audience, not a fake send.
      </h2>

      <div className="mt-4 grid gap-2">
        <input
          required
          name="name"
          placeholder="Campaign name"
          className="h-11 rounded-[14px] bg-white px-3 text-sm text-[#201713]"
        />
        <select
          name="channel"
          className="h-11 rounded-[14px] bg-white px-3 text-sm text-[#201713]"
        >
          <option>EMAIL</option>
          <option>WHATSAPP</option>
        </select>
        <select
          name="segment"
          className="h-11 rounded-[14px] bg-white px-3 text-sm text-[#201713]"
        >
          <option>VIP</option>
          <option>LOYAL</option>
          <option>REGULAR</option>
          <option>AT_RISK</option>
          <option>DORMANT</option>
          <option>NEW</option>
        </select>
        <input
          name="estimatedRecipients"
          type="number"
          min="0"
          placeholder="Estimated recipients"
          className="h-11 rounded-[14px] bg-white px-3 text-sm text-[#201713]"
        />
      </div>

      <button className="mt-3 h-11 w-full rounded-[14px] bg-[#201713] text-[8px] uppercase tracking-[.11em]">
        Save draft campaign
      </button>

      <p className="mt-3 text-[9px] leading-5 text-white/55">
        Draft creation never calls Resend or WhatsApp. Sending will require a
        separate explicit, consent-aware production action.
      </p>

      {message ? (
        <p className="mt-3 text-[9px] text-[#ffd0aa]">{message}</p>
      ) : null}
    </form>
  );
}
