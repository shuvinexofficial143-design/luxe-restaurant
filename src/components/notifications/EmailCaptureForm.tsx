"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { subscriptionStorage } from "@/lib/notifications/storage";

export default function EmailCaptureForm() {
  const router = useRouter();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");

    const subscription = subscriptionStorage.subscribe(name, email);
    router.push(
      `/newsletter/success?id=${encodeURIComponent(subscription.id)}`
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[28px] bg-[#fffaf4] p-5 md:p-7"
    >
      <p className="lx-kicker">Join LUXE Notes</p>
      <h2 className="lx-serif mt-2 text-4xl">Your inbox, your rules.</h2>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="grid gap-2 text-[9px] uppercase tracking-[.11em] text-[#7c241e]">
          Name
          <input
            required
            name="name"
            type="text"
            className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case tracking-normal"
          />
        </label>

        <label className="grid gap-2 text-[9px] uppercase tracking-[.11em] text-[#7c241e]">
          Email
          <input
            required
            name="email"
            type="email"
            className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case tracking-normal"
          />
        </label>
      </div>

      <button className="mt-4 h-13 w-full rounded-[18px] bg-[#7c241e] text-[9px] uppercase tracking-[.13em] text-white">
        Subscribe ↗
      </button>

      <p className="mt-3 text-[9px] leading-5 text-[#8a756b]">
        Demo-only subscription stored in this browser. No real email is sent.
      </p>
    </form>
  );
}
