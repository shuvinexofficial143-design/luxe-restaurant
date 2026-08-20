"use client";

import { useEffect, useState } from "react";
import type { CRMCustomerSummary } from "@/lib/server/crm/types";

export default function CRMOverview() {
  const [customers, setCustomers] = useState<CRMCustomerSummary[]>([]);

  useEffect(() => {
    fetch("/api/v1/crm/customers?limit=200", {
      cache: "no-store",
    })
      .then((response) => response.json())
      .then(
        (payload: {
          data?: { customers?: CRMCustomerSummary[] };
        }) => setCustomers(payload.data?.customers || [])
      )
      .catch(() => setCustomers([]));
  }, []);

  const totalValue = customers.reduce(
    (sum, item) => sum + Number(item.profile.lifetime_value || 0),
    0
  );

  const cards = [
    [String(customers.length), "active customers"],
    [
      String(
        customers.filter(
          (item) => item.profile.segment === "VIP"
        ).length
      ),
      "VIP guests",
    ],
    [
      String(
        customers.filter(
          (item) =>
            item.profile.segment === "AT_RISK" ||
            item.profile.segment === "DORMANT"
        ).length
      ),
      "re-engage",
    ],
    [
      `₹${Math.round(totalValue).toLocaleString("en-IN")}`,
      "tracked order value",
    ],
  ];

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {cards.map(([value, label]) => (
        <div
          key={label}
          className="rounded-[20px] bg-[#fffaf4] p-4"
        >
          <p className="lx-serif text-3xl text-[#7c241e]">
            {value}
          </p>
          <p className="mt-1 text-[8px] uppercase tracking-[.1em] text-[#75645d]">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
