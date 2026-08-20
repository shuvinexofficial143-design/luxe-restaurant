"use client";

import { useEffect, useState } from "react";

type Reservation = {
  id: string;
  reservation_date: string;
  reservation_time: string;
  guest_count: number;
  area: string | null;
  status: string;
};

export default function ReservationHistoryPanel() {
  const [rows, setRows] = useState<Reservation[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/v1/account/reservations", { cache: "no-store" })
      .then((response) => response.json())
      .then(
        (payload: {
          ok?: boolean;
          data?: { reservations?: Reservation[] };
        }) => {
          setRows(payload.data?.reservations || []);
          setLoaded(true);
        }
      )
      .catch(() => setLoaded(true));
  }, []);

  return (
    <div className="rounded-[28px] bg-[#fffaf4] p-5">
      <p className="lx-kicker">Reservation history</p>
      <h2 className="lx-serif mt-2 text-3xl">Your table history.</h2>

      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {rows.map((row) => (
          <article key={row.id} className="rounded-[17px] bg-white p-4">
            <div className="flex justify-between gap-3">
              <p className="lx-serif text-xl">{row.reservation_date}</p>
              <span className="text-[8px] uppercase tracking-[.09em] text-[#335f50]">
                {row.status}
              </span>
            </div>
            <p className="mt-2 text-[10px] text-[#75645d]">
              {row.reservation_time} · {row.guest_count} guests ·{" "}
              {row.area || "Dining room"}
            </p>
            <p className="mt-2 text-[8px] text-[#8a756b]">{row.id}</p>
          </article>
        ))}

        {loaded && !rows.length ? (
          <p className="rounded-[17px] bg-[#f3e7dc] p-4 text-xs text-[#75645d] md:col-span-2">
            No database reservation history found for this account email.
          </p>
        ) : null}
      </div>
    </div>
  );
}
