"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { accountStore } from "@/lib/account/storage";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    accountStore.login(email);
    router.push("/account");
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <label className="grid gap-2 text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
        Email
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case tracking-normal outline-none"
          placeholder="you@example.com"
        />
      </label>

      <label className="grid gap-2 text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
        Password
        <input
          required
          type="password"
          minLength={4}
          className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case tracking-normal outline-none"
          placeholder="••••••••"
        />
      </label>

      <p className="rounded-[16px] bg-[#fff4de] p-3 text-[10px] leading-5 text-[#75645d]">
        Demo login only. Production authentication will use a secure auth provider and hashed credentials.
      </p>

      <button className="h-13 rounded-[18px] bg-[#7c241e] text-[9px] uppercase tracking-[.14em] text-white">
        Login ↗
      </button>

      <p className="text-center text-xs text-[#75645d]">
        New guest? <Link href="/account/register" className="text-[#7c241e] underline">Create an account</Link>
      </p>
    </form>
  );
}
