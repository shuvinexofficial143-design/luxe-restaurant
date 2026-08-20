"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { accountStore } from "@/lib/account/storage";

export default function RegisterForm() {
  const router = useRouter();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    accountStore.register({
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
    });

    router.push("/account");
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      {[
        ["Name", "name", "text"],
        ["Email", "email", "email"],
        ["Phone", "phone", "tel"],
      ].map(([label, name, type]) => (
        <label key={name} className="grid gap-2 text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
          {label}
          <input
            required
            name={name}
            type={type}
            className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case tracking-normal outline-none"
          />
        </label>
      ))}

      <label className="grid gap-2 text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
        Password
        <input
          required
          name="password"
          type="password"
          minLength={4}
          className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case tracking-normal outline-none"
        />
      </label>

      <div className="rounded-[18px] bg-[#335f50]/10 p-4 text-[#335f50]">
        <p className="text-[9px] uppercase tracking-[.12em]">Welcome reward</p>
        <p className="lx-serif mt-1 text-2xl">+250 points</p>
      </div>

      <button className="h-13 rounded-[18px] bg-[#7c241e] text-[9px] uppercase tracking-[.14em] text-white">
        Create account ↗
      </button>

      <p className="text-center text-xs text-[#75645d]">
        Already joined? <Link href="/account/login" className="text-[#7c241e] underline">Login</Link>
      </p>
    </form>
  );
}
