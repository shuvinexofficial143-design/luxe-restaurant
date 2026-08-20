"use client";

import { FormEvent, useState } from "react";
import { subscriptionStorage } from "@/lib/notifications/storage";

export default function UnsubscribeForm() {
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");

    const success = subscriptionStorage.unsubscribe(email);
    setMessage(
      success
        ? "Subscription turned off in this browser."
        : "No matching local subscription was found."
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[28px] bg-[#fffaf4] p-5 md:p-7">
      <p className="lx-kicker">Unsubscribe</p>
      <h2 className="lx-serif mt-2 text-4xl">Take a quieter seat.</h2>
      <p className="mt-3 text-sm leading-7 text-[#75645d]">
        Enter the same email used for the local demo subscription.
      </p>

      <input
        required
        name="email"
        type="email"
        placeholder="you@example.com"
        className="mt-5 h-12 w-full rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm"
      />

      <button className="mt-3 h-12 w-full rounded-[16px] bg-[#7c241e] text-[9px] uppercase tracking-[.13em] text-white">
        Unsubscribe
      </button>

      {message ? (
        <p className="mt-4 text-xs leading-6 text-[#75645d]">{message}</p>
      ) : null}
    </form>
  );
}
