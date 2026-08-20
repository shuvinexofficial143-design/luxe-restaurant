"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReservationRecord } from "@/lib/reservations/types";
import { reservationStorage } from "@/lib/reservations/storage";
import { formatDate } from "@/lib/reservations/utils";

export default function BookingHistory() {
  const [bookings] = useState<ReservationRecord[]>(() =>
    typeof window !== "undefined" ? reservationStorage.listBookings() : []
  );

  return (
    <div className="rounded-[26px] bg-[#fffaf4] p-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="lx-kicker">Reservations</p>
          <h2 className="lx-serif mt-2 text-3xl">Booking history.</h2>
        </div>
        <Link href="/reservations" className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
          Book →
        </Link>
      </div>

      <div className="mt-4 space-y-2">
        {bookings.length ? bookings.slice(0, 5).map((booking) => (
          <div key={booking.id} className="rounded-[18px] bg-[#f3e7dc] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium">{formatDate(booking.date)} · {booking.time}</p>
                <p className="mt-1 text-[10px] text-[#75645d]">{booking.area} · {booking.guests} guests</p>
              </div>
              <span className="text-[8px] uppercase tracking-[.1em] text-[#7c241e]">{booking.status}</span>
            </div>
          </div>
        )) : (
          <p className="rounded-[18px] border border-dashed border-[#4a3025]/15 p-6 text-center text-xs text-[#75645d]">
            No saved bookings on this browser yet.
          </p>
        )}
      </div>
    </div>
  );
}
