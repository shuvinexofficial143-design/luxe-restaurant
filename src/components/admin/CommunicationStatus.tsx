"use client";

import { useEffect, useState } from "react";

type Payload = {
  providers: {
    email: {
      configured: boolean;
      from: string;
    };
    whatsapp: {
      configured: boolean;
      phoneNumberId: string;
    };
  };
  stats: {
    total: number;
    queued: number;
    sent: number;
    failed: number;
  };
};

export default function CommunicationStatus() {
  const [data, setData] =
    useState<Payload | null>(null);

  useEffect(() => {
    fetch(
      "/api/v1/admin/communications",
      { cache: "no-store" }
    )
      .then((response) =>
        response.json()
      )
      .then(
        (payload: {
          data?: Payload;
        }) =>
          setData(
            payload.data || null
          )
      )
      .catch(() => setData(null));
  }, []);

  if (!data) {
    return (
      <div className="rounded-[22px] bg-[#fff4de] p-5 text-xs text-[#75645d]">
        Communication status unavailable.
      </div>
    );
  }

  const cards = [
    [
      data.providers.email
        .configured
        ? "Ready"
        : "Missing",
      "Resend",
    ],
    [
      data.providers.whatsapp
        .configured
        ? "Ready"
        : "Missing",
      "WhatsApp",
    ],
    [
      String(data.stats.queued),
      "queued",
    ],
    [
      String(data.stats.sent),
      "sent",
    ],
    [
      String(data.stats.failed),
      "failed",
    ],
  ];

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
      {cards.map(([value, label]) => (
        <div
          key={label}
          className="rounded-[18px] bg-[#fffaf4] p-4"
        >
          <p className="lx-serif text-3xl text-[#7c241e]">
            {value}
          </p>
          <p className="mt-1 text-[8px] uppercase tracking-[.09em] text-[#75645d]">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
