"use client";

import { FormEvent, useSyncExternalStore } from "react";
import { accountStore } from "@/lib/account/storage";

export default function ProfileEditor() {
  const account = useSyncExternalStore(
    accountStore.subscribe,
    accountStore.getSnapshot,
    accountStore.getServerSnapshot
  );

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    accountStore.update({
      name: String(form.get("name") || ""),
      phone: String(form.get("phone") || ""),
      birthday: String(form.get("birthday") || ""),
      city: String(form.get("city") || ""),
    });
  }

  return (
    <form onSubmit={submit} className="rounded-[26px] bg-[#fffaf4] p-5">
      <p className="lx-kicker">Edit profile</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {[
          ["Name", "name", "text", account.name],
          ["Phone", "phone", "tel", account.phone],
          ["Birthday", "birthday", "date", account.birthday],
          ["City", "city", "text", account.city],
        ].map(([label, name, type, value]) => (
          <label key={name} className="grid gap-2 text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
            {label}
            <input
              name={name}
              type={type}
              defaultValue={value}
              className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case tracking-normal outline-none"
            />
          </label>
        ))}
      </div>
      <button className="mt-4 h-12 w-full rounded-[16px] bg-[#335f50] text-[9px] uppercase tracking-[.13em] text-white">
        Save profile
      </button>
    </form>
  );
}
