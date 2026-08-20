"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import PasswordStrength from "./PasswordStrength";

export default function CustomerRegisterForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/v1/customer-auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(form.get("name") || ""),
          email: String(form.get("email") || ""),
          phone: String(form.get("phone") || ""),
          password,
        }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        error?: { message?: string; details?: { failures?: string[] } };
      };

      if (!response.ok || !payload.ok) {
        const failures = payload.error?.details?.failures;
        setMessage(
          failures?.length
            ? failures.join(" ")
            : payload.error?.message || "Registration failed."
        );
        return;
      }

      router.replace("/account/secure");
      router.refresh();
    } catch {
      setMessage("Registration request failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="rounded-[28px] bg-[#fffaf4] p-5 md:p-7">
      <p className="lx-kicker">Create account</p>
      <h1 className="lx-serif mt-2 text-4xl">Join the guest list.</h1>

      <div className="mt-5 grid gap-3">
        {[
          ["Name", "name", "text"],
          ["Email", "email", "email"],
          ["Phone", "phone", "tel"],
        ].map(([label, name, type]) => (
          <label
            key={name}
            className="grid gap-2 text-[8px] uppercase tracking-[.1em] text-[#7c241e]"
          >
            {label}
            <input
              required={name !== "phone"}
              name={name}
              type={type}
              className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case tracking-normal"
            />
          </label>
        ))}

        <label className="grid gap-2 text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
          Password
          <input
            required
            minLength={12}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case tracking-normal"
          />
        </label>

        <PasswordStrength password={password} />
      </div>

      <button
        disabled={loading}
        className="mt-5 h-13 w-full rounded-[18px] bg-[#7c241e] text-[9px] uppercase tracking-[.12em] text-white disabled:opacity-50"
      >
        {loading ? "Creating account…" : "Create secure account ↗"}
      </button>

      {message ? (
        <p className="mt-4 rounded-[15px] bg-[#7c241e]/8 p-3 text-xs leading-6 text-[#7c241e]">
          {message}
        </p>
      ) : null}
    </form>
  );
}
