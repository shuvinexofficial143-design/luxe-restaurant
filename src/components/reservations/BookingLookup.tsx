"use client";

import { useState } from "react";
import Link from "next/link";

type Reservation = {
  id: string;
  reservation_date: string;
  reservation_time: string;
  guest_count: number;
  area: string | null;
  table_id: string | null;
  status: string;
};

export default function BookingLookup() {
  const [id, setId] = useState("");
  const [record, setRecord] = useState<Reservation | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function lookup() {
    const reference = id.trim();
    if (!reference) return;

    setLoading(true);
    setSearched(true);
    setMessage("");
    setRecord(null);

    try {
      const response = await fetch(
        "/api/v1/reservations?reference=" + encodeURIComponent(reference),
        { cache: "no-store" }
      );

      const payload = (await response.json()) as {
        ok?: boolean;
        data?: { reservations?: Reservation[] };
        error?: { message?: string };
      };

      if (!response.ok || !payload.ok) {
        setMessage(payload.error?.message || "Booking could not be loaded.");
        return;
      }

      const found = payload.data?.reservations?.[0] || null;
      setRecord(found);

      if (!found) {
        setMessage("No reservation was found for that reference.");
      }
    } catch {
      setMessage("Booking lookup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="rounded-[26px] bg-[#fffaf4] p-5">
        <p className="text-[10px] uppercase tracking-[.14em] text-[#7c241e]">
          Booking reference
        </p>
        <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
          <input
            value={id}
            onChange={(event) => setId(event.target.value)}
            placeholder="Reservation reference"
            className="h-12 min-w-0 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm outline-none"
          />
          <button
            type="button"
            onClick={() => void lookup()}
            disabled={loading || !id.trim()}
            className="rounded-[16px] bg-[#201713] px-5 text-[10px] uppercase tracking-[.13em] text-white disabled:opacity-40"
          >
            {loading ? "Finding…" : "Find"}
          </button>
        </div>
      </div>

      <div className="mt-4">
        {record ? (
          <div className="rounded-[28px] bg-[#fffaf4] p-5 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[.14em] text-[#7c241e]">
                  {record.id}
                </p>
                <h2 className="lx-serif mt-2 text-3xl">Your reservation.</h2>
              </div>
              <span className="rounded-full bg-[#335f50]/10 px-3 py-2 text-[10px] uppercase tracking-[.1em] text-[#335f50]">
                {record.status}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-3">
              {[
                [record.reservation_date, "date"],
                [record.reservation_time, "time"],
                [String(record.guest_count), "guests"],
                [record.area || "Dining room", "area"],
                [record.table_id || "Assigned", "table"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[16px] bg-[#f3e7dc] p-3">
                  <p className="text-sm">{value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[.1em] text-[#75645d]">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-[#75645d]">
              Need to change or cancel this reservation? Contact the restaurant team and share your booking reference.
            </p>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <Link
                href="/contact"
                className="flex min-h-12 items-center justify-center rounded-[16px] bg-[#7c241e] px-4 text-[10px] uppercase tracking-[.12em] text-white"
              >
                Contact LUXE
              </Link>
              <Link
                href="/reservations"
                className="flex min-h-12 items-center justify-center rounded-[16px] border border-[#4a3025]/10 px-4 text-[10px] uppercase tracking-[.12em]"
              >
                New reservation
              </Link>
            </div>
          </div>
        ) : searched && message ? (
          <div className="rounded-[24px] border border-dashed border-[#7c241e]/20 p-8 text-center">
            <p className="lx-serif text-3xl">Booking not found.</p>
            <p className="mt-2 text-sm text-[#75645d]">{message}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
