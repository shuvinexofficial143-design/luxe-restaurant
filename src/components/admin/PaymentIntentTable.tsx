"use client";

import { useEffect, useState } from "react";
import type {
  PaymentIntentRow,
} from "@/lib/server/billing/types";

export default function PaymentIntentTable() {
  const [rows, setRows] =
    useState<PaymentIntentRow[]>([]);
  const [message, setMessage] =
    useState("Loading payments…");

  useEffect(() => {
    fetch(
      "/api/v1/admin/billing/payments",
      { cache: "no-store" }
    )
      .then((response) =>
        response.json()
      )
      .then(
        (payload: {
          ok?: boolean;
          data?: {
            payments?: PaymentIntentRow[];
          };
          error?: {
            message?: string;
          };
        }) => {
          const payments =
            payload.data?.payments || [];
          setRows(payments);
          setMessage(
            payments.length
              ? ""
              : payload.error?.message ||
                  "No payment intents yet."
          );
        }
      )
      .catch(() =>
        setMessage(
          "Payments could not be loaded."
        )
      );
  }, []);

  return (
    <div className="overflow-hidden rounded-[24px] bg-[#fffaf4]">
      <div className="p-5">
        <p className="lx-kicker">
          Payment intents
        </p>
        <h2 className="lx-serif mt-2 text-3xl">
          Server-created Razorpay orders.
        </h2>
        {message ? (
          <p className="mt-2 text-xs text-[#75645d]">
            {message}
          </p>
        ) : null}
      </div>

      {rows.length ? (
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full">
            <thead className="bg-[#201713] text-white">
              <tr>
                {[
                  "Intent",
                  "Entity",
                  "Amount",
                  "Status",
                  "Razorpay order",
                  "Payment",
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
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="px-4 py-3 text-[9px]">
                    {row.id}
                  </td>
                  <td className="px-4 py-3 text-[9px]">
                    {row.entity_type} ·{" "}
                    {row.entity_id}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    ₹
                    {Number(
                      row.amount
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </td>
                  <td className="px-4 py-3 text-[9px]">
                    {row.status}
                  </td>
                  <td className="px-4 py-3 text-[9px]">
                    {row.razorpay_order_id ||
                      "—"}
                  </td>
                  <td className="px-4 py-3 text-[9px]">
                    {row.razorpay_payment_id ||
                      "—"}
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
