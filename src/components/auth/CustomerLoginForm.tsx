"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomerLoginForm({
  nextPath = "/account/secure",
}: {
  nextPath?: string;
}) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/v1/customer-auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(form.get("email") || ""),
          password: String(form.get("password") || ""),
        }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        error?: { message?: string };
      };

      if (!response.ok || !payload.ok) {
        setMessage(payload.error?.message || "Sign in failed.");
        return;
      }

      router.replace(
        nextPath.startsWith("/account") ? nextPath : "/account/secure"
      );
      router.refresh();
    } catch {
      setMessage("Sign-in request failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="rounded-[28px] bg-[#fffaf4] p-5 md:p-7">
      <p className="lx-kicker">Guest account</p>
      <h1 className="lx-serif mt-2 text-4xl">Welcome back.</h1>

      <label className="mt-5 grid gap-2 text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
        Email
        <input
          required
          name="email"
          type="email"
          className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case tracking-normal"
        />
      </label>

      <label className="mt-3 grid gap-2 text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
        Password
        <input
          required
          name="password"
          type="password"
          className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case tracking-normal"
        />
      </label>

      <button
        disabled={loading}
        className="mt-5 h-13 w-full rounded-[18px] bg-[#201713] text-[9px] uppercase tracking-[.12em] text-white disabled:opacity-50"
      >
        {loading ? "Signing in…" : "Sign in ↗"}
      </button>

      {message ? (
        <p className="mt-4 text-xs leading-6 text-[#7c241e]">{message}</p>
      ) : null}
    </form>
  );
}
