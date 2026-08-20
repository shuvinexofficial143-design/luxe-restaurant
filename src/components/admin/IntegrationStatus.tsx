"use client";

import { useEffect, useState } from "react";

type Health = {
  name: string;
  configured: boolean;
  liveChecked: boolean;
  reachable: boolean;
  message: string;
};

type ResponseShape = {
  ok: boolean;
  data?: {
    razorpay: Health;
    resend: Health;
    whatsapp: Health;
  };
};

export default function IntegrationStatus() {
  const [data, setData] = useState<ResponseShape["data"]>();

  useEffect(() => {
    fetch("/api/v1/integrations/health", { cache: "no-store" })
      .then((response) => response.json())
      .then((payload: ResponseShape) => setData(payload.data))
      .catch(() => setData(undefined));
  }, []);

  const items = [
    data?.razorpay,
    data?.resend,
    data?.whatsapp,
  ].filter(Boolean) as Health[];

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {items.length ? (
        items.map((item) => (
          <div key={item.name} className="rounded-[22px] bg-[#fffaf4] p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="lx-serif text-2xl">{item.name}</p>
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  item.configured ? "bg-[#335f50]" : "bg-[#7c241e]"
                }`}
              />
            </div>
            <p className="mt-2 text-[9px] uppercase tracking-[.1em] text-[#75645d]">
              {item.configured ? "Configured" : "Not configured"}
            </p>
            <p className="mt-3 text-[10px] leading-5 text-[#75645d]">
              {item.message}
            </p>
          </div>
        ))
      ) : (
        <div className="rounded-[22px] bg-[#fffaf4] p-5 md:col-span-3">
          <p className="lx-serif text-3xl">Checking integrations…</p>
        </div>
      )}
    </div>
  );
}
