"use client";

import { useEffect, useState } from "react";

type EndpointState = {
  label: string;
  endpoint: string;
  state: "checking" | "ready" | "unavailable";
};

const initial: EndpointState[] = [
  {
    label: "Reservations",
    endpoint: "/api/v1/reservations",
    state: "checking",
  },
  { label: "Orders", endpoint: "/api/v1/orders", state: "checking" },
  {
    label: "CMS Menu",
    endpoint: "/api/v1/cms?collection=menu",
    state: "checking",
  },
];

export default function DatabaseTableStatus() {
  const [items, setItems] = useState(initial);

  useEffect(() => {
    Promise.all(
      initial.map(async (item) => {
        try {
          const response = await fetch(item.endpoint, { cache: "no-store" });
          return {
            ...item,
            state: response.ok ? "ready" : "unavailable",
          } as EndpointState;
        } catch {
          return { ...item, state: "unavailable" } as EndpointState;
        }
      })
    ).then(setItems);
  }, []);

  return (
    <div className="grid gap-2 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-[20px] bg-[#fffaf4] p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="lx-serif text-2xl">{item.label}</p>
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                item.state === "ready"
                  ? "bg-emerald-500"
                  : item.state === "checking"
                    ? "bg-amber-300"
                    : "bg-[#7c241e]"
              }`}
            />
          </div>
          <p className="mt-2 text-[9px] uppercase tracking-[.1em] text-[#75645d]">
            {item.state}
          </p>
        </div>
      ))}
    </div>
  );
}
