"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  CRMCustomerNote,
  CRMCustomerSummary,
} from "@/lib/server/crm/types";
import CRMSegmentBadge from "./CRMSegmentBadge";
import CRMNotesPanel from "./CRMNotesPanel";
import CRMTagsPanel from "./CRMTagsPanel";

type TimelineItem = {
  id: string;
  type: string;
  title: string;
  detail: string;
  amount: number | null;
  at: string;
};

type DetailPayload = CRMCustomerSummary & {
  notes: CRMCustomerNote[];
  timeline: TimelineItem[];
};

export default function CRMCustomerDetail({
  customerId,
}: {
  customerId: string;
}) {
  const [data, setData] = useState<DetailPayload | null>(null);
  const [message, setMessage] = useState("Loading customer intelligence…");

  const load = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/v1/crm/customers/${encodeURIComponent(customerId)}`,
        { cache: "no-store" }
      );

      const payload = (await response.json()) as {
        ok?: boolean;
        data?: DetailPayload;
        error?: { message?: string };
      };

      if (!response.ok || !payload.ok || !payload.data) {
        setMessage(
          payload.error?.message || "Customer could not be loaded."
        );
        return;
      }

      setData(payload.data);
      setMessage("");
    } catch {
      setMessage("Customer could not be loaded.");
    }
  }, [customerId]);

  useEffect(() => {
    const initialLoad = window.setTimeout(() => {
      void load();
    }, 0);

    return () => window.clearTimeout(initialLoad);
  }, [load]);

  if (!data) {
    return (
      <div className="rounded-[28px] bg-[#fffaf4] p-8 text-center">
        <p className="lx-serif text-3xl">{message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <div className="rounded-[28px] bg-[#fffaf4] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="lx-kicker">Customer intelligence</p>
              <h1 className="lx-serif mt-2 text-5xl">
                {data.customer.name}
              </h1>
              <p className="mt-2 text-sm text-[#75645d]">
                {data.customer.email}
              </p>
            </div>
            <CRMSegmentBadge segment={data.profile.segment} />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-4">
            {[
              [`${data.profile.vip_score}/100`, "VIP score"],
              [
                `₹${Number(
                  data.profile.lifetime_value
                ).toLocaleString("en-IN")}`,
                "order value",
              ],
              [String(data.profile.total_orders), "orders"],
              [
                String(data.profile.total_reservations),
                "reservations",
              ],
            ].map(([value, label]) => (
              <div key={label} className="rounded-[16px] bg-white p-3">
                <p className="lx-serif text-2xl text-[#7c241e]">
                  {value}
                </p>
                <p className="mt-1 text-[8px] uppercase tracking-[.09em] text-[#75645d]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <CRMTagsPanel
          customerId={customerId}
          tags={data.tags}
          onChanged={() => void load()}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
        <div className="rounded-[24px] bg-[#fffaf4] p-5">
          <p className="lx-kicker">Timeline</p>
          <h2 className="lx-serif mt-2 text-3xl">
            Orders, reservations & CRM events.
          </h2>

          <div className="mt-4 space-y-2">
            {data.timeline.map((item) => (
              <div
                key={item.id}
                className="rounded-[15px] bg-white p-3"
              >
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="text-[8px] uppercase tracking-[.09em] text-[#7c241e]">
                      {item.type}
                    </p>
                    <p className="lx-serif mt-1 text-xl">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[9px] text-[#75645d]">
                      {item.detail}
                    </p>
                  </div>
                  {typeof item.amount === "number" ? (
                    <span className="text-sm">
                      ₹{item.amount.toLocaleString("en-IN")}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-[8px] text-[#8a756b]">
                  {new Date(item.at).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        </div>

        <CRMNotesPanel
          customerId={customerId}
          notes={data.notes}
          onChanged={() => void load()}
        />
      </div>
    </div>
  );
}
