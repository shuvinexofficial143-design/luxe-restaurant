"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

function safeAdminNextPath(value?: string) {
  if (
    value &&
    value.startsWith("/admin") &&
    !value.startsWith("//")
  ) {
    return value;
  }

  return "/admin";
}

export default function AdminLoginForm({
  nextPath,
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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: String(form.get("email") || ""),
          password: String(form.get("password") || ""),
        }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        error?: {
          message?: string;
        };
      };

      if (!response.ok || !payload.ok) {
        setMessage(
          payload.error?.message ||
            "Admin sign-in failed."
        );
        return;
      }

      router.replace(
        safeAdminNextPath(nextPath)
      );
      router.refresh();
    } catch {
      setMessage(
        "Admin sign-in request failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[28px] bg-[#fffaf4] p-5 md:p-7"
    >
      <p className="text-[9px] uppercase tracking-[.13em] text-[#7c241e]">
        Secure admin access
      </p>
      <h1 className="lx-serif mt-2 text-4xl">
        Database-backed sign in.
      </h1>
      <p className="mt-3 text-xs leading-6 text-[#75645d]">
        No fallback demo password is accepted by this login route.
      </p>

      <input
        required
        name="email"
        type="email"
        placeholder="Admin email"
        className="mt-5 h-12 w-full rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm"
      />

      <input
        required
        name="password"
        type="password"
        placeholder="Password"
        className="mt-3 h-12 w-full rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm"
      />

      <button
        disabled={loading}
        className="mt-4 h-12 w-full rounded-[16px] bg-[#201713] text-[9px] uppercase tracking-[.12em] text-white disabled:opacity-40"
      >
        {loading ? "Signing in…" : "Secure sign in"}
      </button>

      {message ? (
        <p className="mt-4 rounded-[14px] bg-[#7c241e]/8 p-3 text-xs text-[#7c241e]">
          {message}
        </p>
      ) : null}
    </form>
  );
}
