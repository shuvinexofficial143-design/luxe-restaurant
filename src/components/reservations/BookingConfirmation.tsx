"use client";

import Link from "next/link";
import { useState } from "react";
import BookingStatusBadge from "./BookingStatusBadge";
import { reservationStorage } from "@/lib/reservations/storage";
import { formatDate } from "@/lib/reservations/utils";

export default function BookingConfirmation({ id }: { id: string }) {
  const [record] = useState(() =>
    typeof window !== "undefined" ? reservationStorage.getBooking(id) : undefined
  );

  if (!record) {
    return (
      <div className="rounded-[28px] bg-[#fffaf4] p-8 text-center">
        <p className="lx-serif text-3xl">Booking not found on this device.</p>
        <p className="mt-3 text-sm text-[#75645d]">This demo stores bookings locally in the browser.</p>
        <Link href="/reservations" className="mt-6 inline-flex rounded-full bg-[#7c241e] px-5 py-3 text-[9px] uppercase tracking-[.14em] text-white">
          New booking
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[30px] bg-[#fffaf4] shadow-[0_24px_70px_rgba(70,40,26,.09)]">
      <div className="bg-[#335f50] p-6 text-white md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[9px] uppercase tracking-[.16em] text-[#efc99a]">Booking confirmed</p>
            <h1 className="lx-serif mt-2 text-5xl">You&apos;re in.</h1>
          </div>
          <BookingStatusBadge status={record.status} />
        </div>
        <p className="mt-4 text-sm text-white/60">Reference: {record.id}</p>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {[
            [String(record.guests), "guests"],
            [formatDate(record.date), "date"],
            [record.time, "time"],
            [record.area, "area"],
            [record.tableId, "table"],
            [record.occasion, "occasion"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-[18px] bg-[#f3e7dc] p-3">
              <p className="text-sm font-medium">{value}</p>
              <p className="mt-1 text-[8px] uppercase tracking-[.12em] text-[#75645d]">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <Link href="/reservations/manage" className="flex min-h-13 items-center justify-center rounded-[18px] bg-[#7c241e] px-4 text-[9px] uppercase tracking-[.14em] text-white">
            Manage booking
          </Link>
          <Link href="/menu" className="flex min-h-13 items-center justify-center rounded-[18px] border border-[#4a3025]/10 px-4 text-[9px] uppercase tracking-[.14em]">
            Browse menu
          </Link>
        </div>
      </div>
    </div>
  );
}
