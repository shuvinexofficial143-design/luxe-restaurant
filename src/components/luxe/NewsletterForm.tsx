"use client";

import { FormEvent, useState } from "react";

export default function NewsletterForm() {
  const [done, setDone] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
  }

  if (done) {
    return (
      <div className="border-t border-white/15 pt-5">
        <p className="text-[10px] uppercase tracking-[.24em] text-[#e7b878]">You’re on the list</p>
        <p className="mt-2 text-sm leading-6 text-white/55">
          Demo state only — connect your email provider before launch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-6">
      <label className="text-[9px] uppercase tracking-[.25em] text-white/42">
        Dining notes & new menus
      </label>
      <div className="mt-3 flex border-b border-white/20">
        <input
          required
          type="email"
          placeholder="Email address"
          className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/28"
        />
        <button
          type="submit"
          className="px-2 text-[10px] uppercase tracking-[.2em] text-[#efb36c] transition hover:text-white"
        >
          Join ↗
        </button>
      </div>
    </form>
  );
}
