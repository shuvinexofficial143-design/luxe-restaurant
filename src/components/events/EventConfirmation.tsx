"use client";

import Link from "next/link";
import { useState } from "react";
import { eventBookingStorage } from "@/lib/events/storage";

export default function EventConfirmation({ id }: { id: string }) {
  const [booking] = useState(() =>
    typeof window !== "undefined" ? eventBookingStorage.get(id) : undefined
  );

  if (!booking) {
    return (
      <div className="rounded-[24px] bg-[#fffaf4] p-6 text-center">
        <p className="lx-serif text-3xl">Booking not found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[28px] bg-[#fffaf4]">
      <div className="bg-[#335f50] p-6 text-white">
        <p className="text-[9px] uppercase tracking-[.14em] text-[#efc99a]">
          Tickets confirmed
        </p>
        <h2 className="lx-serif mt-2 text-4xl">You&apos;re on the list.</h2>
        <p className="mt-3 text-sm text-white/60">{booking.id}</p>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 gap-2">
          {[
            [booking.eventTitle, "event"],
            [String(booking.quantity), "tickets"],
            [`₹${booking.total.toLocaleString("en-IN")}`, "total"],
            [booking.status, "status"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-[16px] bg-[#f3e7dc] p-3">
              <p className="text-sm">{value}</p>
              <p className="mt-1 text-[8px] uppercase tracking-[.1em] text-[#75645d]">
                {label}
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/events"
          className="mt-5 flex min-h-12 items-center justify-center rounded-[16px] bg-[#7c241e] text-[9px] uppercase tracking-[.12em] text-white"
        >
          Explore more events
        </Link>
      </div>
    </div>
  );
}
