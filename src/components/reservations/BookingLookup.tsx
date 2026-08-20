"use client";

import { useState } from "react";
import type { ReservationRecord } from "@/lib/reservations/types";
import { reservationStorage } from "@/lib/reservations/storage";
import ManageBookingCard from "./ManageBookingCard";

export default function BookingLookup() {
  const [id, setId] = useState("");
  const [record, setRecord] = useState<ReservationRecord | null>(null);
  const [searched, setSearched] = useState(false);

  function lookup() {
    setSearched(true);
    setRecord(reservationStorage.getBooking(id.trim().toUpperCase()) || null);
  }

  return (
    <div>
      <div className="rounded-[26px] bg-[#fffaf4] p-5">
        <p className="text-[9px] uppercase tracking-[.14em] text-[#7c241e]">Booking reference</p>
        <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
          <input
            value={id}
            onChange={(event) => setId(event.target.value)}
            placeholder="LUXE-ABC123"
            className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm uppercase outline-none"
          />
          <button onClick={lookup} className="rounded-[16px] bg-[#201713] px-5 text-[9px] uppercase tracking-[.13em] text-white">
            Find
          </button>
        </div>
      </div>

      <div className="mt-4">
        {record ? (
          <ManageBookingCard record={record} onChange={setRecord} />
        ) : searched ? (
          <div className="rounded-[24px] border border-dashed border-[#7c241e]/20 p-8 text-center">
            <p className="lx-serif text-3xl">No booking found.</p>
            <p className="mt-2 text-xs text-[#75645d]">Check the reference saved on this browser.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
