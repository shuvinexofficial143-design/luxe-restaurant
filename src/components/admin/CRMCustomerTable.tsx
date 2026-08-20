"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type {
  CRMCustomerSummary,
  CRMSegment,
} from "@/lib/server/crm/types";
import CRMSegmentBadge from "./CRMSegmentBadge";

export default function CRMCustomerTable() {
  const [customers, setCustomers] = useState<CRMCustomerSummary[]>([]);
  const [query, setQuery] = useState("");
  const [segment, setSegment] = useState<"ALL" | CRMSegment>("ALL");
  const [message, setMessage] = useState("Loading CRM customers…");

  useEffect(() => {
    fetch("/api/v1/crm/customers?limit=200", {
      cache: "no-store",
    })
      .then((response) => response.json())
      .then(
        (payload: {
          ok?: boolean;
          data?: { customers?: CRMCustomerSummary[] };
          error?: { message?: string };
        }) => {
          const rows = payload.data?.customers || [];
          setCustomers(rows);
          setMessage(
            rows.length
              ? ""
              : payload.error?.message || "No CRM customers found."
          );
        }
      )
      .catch(() => setMessage("CRM customers could not be loaded."));
  }, []);

  const filtered = useMemo(() => {
    const clean = query.trim().toLowerCase();

    return customers.filter((item) => {
      const matchesQuery =
        !clean ||
        item.customer.name.toLowerCase().includes(clean) ||
        item.customer.email.toLowerCase().includes(clean);

      const matchesSegment =
        segment === "ALL" || item.profile.segment === segment;

      return matchesQuery && matchesSegment;
    });
  }, [customers, query, segment]);

  const segments: ("ALL" | CRMSegment)[] = [
    "ALL",
    "NEW",
    "REGULAR",
    "LOYAL",
    "VIP",
    "AT_RISK",
    "DORMANT",
  ];

  return (
    <div>
      <div className="rounded-[22px] bg-[#fffaf4] p-3">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search name or email"
          className="h-11 w-full rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-sm"
        />

        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {segments.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSegment(item)}
              className={`shrink-0 rounded-full px-3 py-2 text-[8px] uppercase tracking-[.09em] ${
                segment === item
                  ? "bg-[#201713] text-white"
                  : "border border-[#4a3025]/10 bg-white"
              }`}
            >
              {item.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {message ? (
        <p className="mt-3 rounded-[18px] bg-[#fff4de] p-4 text-xs text-[#75645d]">
          {message}
        </p>
      ) : null}

      <div className="mt-3 overflow-hidden rounded-[22px] bg-[#fffaf4]">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full">
            <thead className="bg-[#201713] text-white">
              <tr>
                {[
                  "Customer",
                  "Segment",
                  "VIP",
                  "Value",
                  "Orders",
                  "Reservations",
                  "Tags",
                ].map((label) => (
                  <th
                    key={label}
                    className="px-4 py-4 text-left text-[8px] font-normal uppercase tracking-[.1em]"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4a3025]/8">
              {filtered.map((item) => (
                <tr key={item.customer.id}>
                  <td className="px-4 py-4">
                    <Link
                      href={`/admin/crm/customers/${item.customer.id}`}
                      className="block"
                    >
                      <p className="lx-serif text-xl">
                        {item.customer.name}
                      </p>
                      <p className="mt-1 text-[9px] text-[#75645d]">
                        {item.customer.email}
                      </p>
                    </Link>
                  </td>
                  <td className="px-4 py-4">
                    <CRMSegmentBadge
                      segment={item.profile.segment}
                    />
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {item.profile.vip_score}/100
                  </td>
                  <td className="px-4 py-4 text-sm">
                    ₹
                    {Number(
                      item.profile.lifetime_value
                    ).toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {item.profile.total_orders}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {item.profile.total_reservations}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag.id}
                          className="rounded-full bg-[#f3e7dc] px-2 py-1 text-[8px]"
                        >
                          {tag.tag}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
