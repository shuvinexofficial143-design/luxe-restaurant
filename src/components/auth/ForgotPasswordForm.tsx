"use client";

import { FormEvent, useState } from "react";

export default function ForgotPasswordForm() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch(
        "/api/v1/customer-auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: String(form.get("email") || ""),
          }),
        }
      );

      const payload = (await response.json()) as {
        ok?: boolean;
        data?: { message?: string };
        error?: { message?: string };
      };

      setMessage(
        payload.ok
          ? payload.data?.message ||
              "If an account exists, a reset email will be sent."
          : payload.error?.message || "Reset request failed."
      );
    } catch {
      setMessage("Reset request failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="rounded-[28px] bg-[#fffaf4] p-5 md:p-7">
      <p className="lx-kicker">Password recovery</p>
      <h1 className="lx-serif mt-2 text-4xl">Reset securely.</h1>
      <p className="mt-3 text-sm leading-7 text-[#75645d]">
        A real reset email is sent only when Resend is configured.
      </p>

      <input
        required
        name="email"
        type="email"
        placeholder="you@example.com"
        className="mt-5 h-12 w-full rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm"
      />

      <button
        disabled={loading}
        className="mt-3 h-12 w-full rounded-[16px] bg-[#7c241e] text-[9px] uppercase tracking-[.12em] text-white disabled:opacity-50"
      >
        {loading ? "Requesting…" : "Send reset link"}
      </button>

      {message ? (
        <p className="mt-4 text-xs leading-6 text-[#75645d]">{message}</p>
      ) : null}
    </form>
  );
}
