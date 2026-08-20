"use client";

import { useEffect, useState } from "react";

export default function ReservationHoldTimer({
  expiresAt,
  onExpired,
}: {
  expiresAt: string;
  onExpired: () => void;
}) {
  const [seconds, setSeconds] = useState(() =>
    Math.max(
      0,
      Math.floor(
        (new Date(expiresAt).getTime() - Date.now()) / 1000
      )
    )
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      const next = Math.max(
        0,
        Math.floor(
          (new Date(expiresAt).getTime() - Date.now()) / 1000
        )
      );

      setSeconds(next);

      if (next === 0) {
        window.clearInterval(timer);
        onExpired();
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, [expiresAt, onExpired]);

  const minutes = Math.floor(seconds / 60);
  const remainder = String(seconds % 60).padStart(2, "0");

  return (
    <div className="rounded-[16px] bg-[#fff0d7] p-3">
      <p className="text-[8px] uppercase tracking-[.1em] text-[#8a5a21]">
        Table hold
      </p>
      <p className="lx-serif mt-1 text-2xl text-[#7c241e]">
        {minutes}:{remainder}
      </p>
      <p className="mt-1 text-[9px] text-[#75645d]">
        Complete guest details before the hold expires.
      </p>
    </div>
  );
}
