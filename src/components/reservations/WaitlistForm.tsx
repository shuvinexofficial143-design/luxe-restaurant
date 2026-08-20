"use client";

import { FormEvent, useState } from "react";
import { reservationStorage } from "@/lib/reservations/storage";
import { createWaitlistId, todayISO } from "@/lib/reservations/utils";

export default function WaitlistForm() {
  const [done, setDone] = useState("");
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState(todayISO());

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const id = createWaitlistId();

    reservationStorage.addWaitlist({
      id,
      name: String(form.get("name") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      guests,
      date,
      preferredTime: String(form.get("preferredTime") || "Any"),
      createdAt: new Date().toISOString(),
      status: "WAITLISTED",
    });

    setDone(id);
  }

  if (done) {
    return (
      <div className="rounded-[28px] bg-[#335f50] p-7 text-white">
        <p className="text-[9px] uppercase tracking-[.14em] text-[#efc99a]">Waitlist joined</p>
        <h2 className="lx-serif mt-2 text-4xl">You&apos;re on the list.</h2>
        <p className="mt-3 text-sm text-white/60">Reference: {done}</p>
        <p className="mt-3 text-xs leading-6 text-white/50">Demo only — no SMS or WhatsApp alert will be sent yet.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[28px] bg-[#fffaf4] p-5 md:p-7">
      <div className="grid grid-cols-2 gap-3">
        <label className="grid gap-2 text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
          Guests
          <select value={guests} onChange={(event) => setGuests(Number(event.target.value))} className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case">
            {[1,2,3,4,5,6,7,8].map((n) => <option key={n}>{n}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
          Date
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-3 text-sm normal-case" />
        </label>
      </div>

      <div className="mt-3 grid gap-3">
        {[
          ["Name", "name", "text"],
          ["Phone", "phone", "tel"],
          ["Email", "email", "email"],
        ].map(([label, name, type]) => (
          <label key={name} className="grid gap-2 text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
            {label}
            <input required name={name} type={type} className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case" />
          </label>
        ))}

        <label className="grid gap-2 text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
          Preferred time
          <select name="preferredTime" className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case">
            <option>Any</option>
            <option>6:00 PM – 7:30 PM</option>
            <option>7:30 PM – 9:00 PM</option>
            <option>9:00 PM onwards</option>
          </select>
        </label>
      </div>

      <button className="mt-5 h-13 w-full rounded-[18px] bg-[#7c241e] text-[9px] uppercase tracking-[.14em] text-white">
        Join waitlist ↗
      </button>
    </form>
  );
}
