"use client";

import { useState } from "react";
import type { ReservationRecord } from "@/lib/reservations/types";
import { reservationStorage } from "@/lib/reservations/storage";
import { formatDate } from "@/lib/reservations/utils";
import BookingStatusBadge from "./BookingStatusBadge";

export default function ManageBookingCard({
  record,
  onChange,
}: {
  record: ReservationRecord;
  onChange: (record: ReservationRecord) => void;
}) {
  const [time, setTime] = useState(record.time);

  function saveTime() {
    const updated = reservationStorage.updateBooking(record.id, { time });
    if (updated) onChange(updated);
  }

  function cancel() {
    const updated = reservationStorage.cancelBooking(record.id);
    if (updated) onChange(updated);
  }

  return (
    <div className="rounded-[28px] bg-[#fffaf4] p-5 md:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[9px] uppercase tracking-[.14em] text-[#7c241e]">{record.id}</p>
          <h2 className="lx-serif mt-2 text-3xl">{record.name}</h2>
        </div>
        <BookingStatusBadge status={record.status} />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {[
          [formatDate(record.date), "date"],
          [`${record.guests} guests`, "party"],
          [record.area, "area"],
          [record.tableId, "table"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-[16px] bg-[#f3e7dc] p-3">
            <p className="text-sm">{value}</p>
            <p className="mt-1 text-[8px] uppercase tracking-[.1em] text-[#75645d]">{label}</p>
          </div>
        ))}
      </div>

      {record.status !== "CANCELLED" ? (
        <>
          <label className="mt-5 grid gap-2 text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
            Change time
            <select
              value={time}
              onChange={(event) => setTime(event.target.value)}
              className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case tracking-normal"
            >
              {["6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button onClick={saveTime} className="min-h-12 rounded-[16px] bg-[#335f50] text-[9px] uppercase tracking-[.12em] text-white">
              Save change
            </button>
            <button onClick={cancel} className="min-h-12 rounded-[16px] border border-[#7c241e]/20 text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
              Cancel booking
            </button>
          </div>
        </>
      ) : null}

      <p className="mt-4 text-[10px] leading-5 text-[#8a756b]">Demo management only; no real restaurant backend is connected yet.</p>
    </div>
  );
}
