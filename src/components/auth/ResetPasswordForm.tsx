"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import PasswordStrength from "./PasswordStrength";

export default function ResetPasswordForm({
  token,
}: {
  token: string;
}) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "/api/v1/customer-auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password }),
        }
      );

      const payload = (await response.json()) as {
        ok?: boolean;
        error?: { message?: string; details?: { failures?: string[] } };
      };

      if (!response.ok || !payload.ok) {
        const failures = payload.error?.details?.failures;
        setMessage(
          failures?.length
            ? failures.join(" ")
            : payload.error?.message || "Password reset failed."
        );
        return;
      }

      router.replace("/auth/login");
    } catch {
      setMessage("Password reset failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="rounded-[28px] bg-[#fffaf4] p-5 md:p-7">
      <p className="lx-kicker">Choose new password</p>
      <h1 className="lx-serif mt-2 text-4xl">Make it strong.</h1>

      <input
        required
        minLength={12}
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="New password"
        className="mt-5 h-12 w-full rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm"
      />

      <div className="mt-2">
        <PasswordStrength password={password} />
      </div>

      <input
        required
        minLength={12}
        type="password"
        value={confirm}
        onChange={(event) => setConfirm(event.target.value)}
        placeholder="Confirm password"
        className="mt-3 h-12 w-full rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm"
      />

      <button
        disabled={loading || !token}
        className="mt-4 h-12 w-full rounded-[16px] bg-[#201713] text-[9px] uppercase tracking-[.12em] text-white disabled:opacity-50"
      >
        {loading ? "Updating…" : "Update password"}
      </button>

      {message ? (
        <p className="mt-4 text-xs leading-6 text-[#7c241e]">{message}</p>
      ) : null}
    </form>
  );
}
