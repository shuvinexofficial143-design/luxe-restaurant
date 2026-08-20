"use client";

import { useEffect, useState } from "react";

type AuditEvent = {
  id: string;
  admin_user_id: string | null;
  event_type: string;
  severity: string;
  ip_hint: string | null;
  resource: string | null;
  action: string | null;
  created_at: string;
};

export default function SecurityAuditTable() {
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [message, setMessage] = useState(
    "Loading security audit…"
  );

  useEffect(() => {
    fetch("/api/v1/security/audit", {
      cache: "no-store",
    })
      .then((response) => response.json())
      .then(
        (payload: {
          ok?: boolean;
          data?: { events?: AuditEvent[] };
          error?: { message?: string };
        }) => {
          const rows = payload.data?.events || [];
          setEvents(rows);
          setMessage(
            rows.length
              ? ""
              : payload.error?.message || "No audit events yet."
          );
        }
      )
      .catch(() =>
        setMessage("Security audit could not be loaded.")
      );
  }, []);

  return (
    <div className="overflow-hidden rounded-[24px] bg-[#fffaf4]">
      <div className="p-5">
        <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
          Security audit
        </p>
        <h2 className="lx-serif mt-2 text-3xl">
          Authentication & permission events.
        </h2>
      </div>

      {message ? (
        <p className="px-5 pb-5 text-xs text-[#75645d]">
          {message}
        </p>
      ) : null}

      {events.length ? (
        <div className="overflow-x-auto">
          <table className="min-w-[820px] w-full">
            <thead className="bg-[#201713] text-white">
              <tr>
                {[
                  "Time",
                  "Severity",
                  "Event",
                  "Resource",
                  "Action",
                  "IP hint",
                ].map((label) => (
                  <th
                    key={label}
                    className="px-4 py-4 text-left text-[8px] font-normal uppercase tracking-[.09em]"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4a3025]/8">
              {events.slice(0, 100).map((event) => (
                <tr key={event.id}>
                  <td className="px-4 py-3 text-[9px]">
                    {new Date(event.created_at).toLocaleString(
                      "en-IN"
                    )}
                  </td>
                  <td className="px-4 py-3 text-[9px]">
                    {event.severity}
                  </td>
                  <td className="px-4 py-3 text-[9px]">
                    {event.event_type}
                  </td>
                  <td className="px-4 py-3 text-[9px]">
                    {event.resource || "—"}
                  </td>
                  <td className="px-4 py-3 text-[9px]">
                    {event.action || "—"}
                  </td>
                  <td className="px-4 py-3 text-[9px]">
                    {event.ip_hint || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
