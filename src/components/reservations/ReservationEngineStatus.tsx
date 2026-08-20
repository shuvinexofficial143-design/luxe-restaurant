"use client";

import { useEffect, useState } from "react";

type State = {
  database: boolean;
  engine: boolean;
  message: string;
};

export default function ReservationEngineStatus() {
  const [state, setState] = useState<State>({
    database: false,
    engine: false,
    message: "Checking reservation engine…",
  });

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const date = today.toISOString().slice(0, 10);

    Promise.all([
      fetch("/api/v1/database/health", { cache: "no-store" }),
      fetch(
        `/api/v1/reservation-engine/availability?date=${date}&guests=2&area=Any`,
        { cache: "no-store" }
      ),
    ])
      .then(async ([databaseResponse, engineResponse]) => {
        setState({
          database: databaseResponse.ok,
          engine: engineResponse.ok,
          message: engineResponse.ok
            ? "Reservation RPC and dining-table inventory are reachable."
            : "Apply migration 005_reservation_engine.sql after the database is connected.",
        });
      })
      .catch(() =>
        setState({
          database: false,
          engine: false,
          message: "Reservation engine health check failed.",
        })
      );
  }, []);

  return (
    <div className="rounded-[24px] bg-[#201713] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.13em] text-[#efc28b]">
        Engine status
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          [state.database ? "Ready" : "No", "database"],
          [state.engine ? "Ready" : "No", "booking RPC"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-[15px] bg-white/[.06] p-3">
            <p className="lx-serif text-2xl text-[#efc28b]">{value}</p>
            <p className="mt-1 text-[8px] uppercase tracking-[.09em] text-white/40">
              {label}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[10px] leading-5 text-white/45">
        {state.message}
      </p>
    </div>
  );
}
