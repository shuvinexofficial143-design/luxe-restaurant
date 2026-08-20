"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Reservation = {
  id: string;
  reservation_date: string;
  reservation_time: string;
  guest_count: number;
  area: string | null;
  table_id: string | null;
  status: string;
  deposit_required: boolean;
  deposit_amount: number;
  payment_status: string;
};

export default function RealReservationSuccess({
  id,
}: {
  id: string;
}) {
  const [reservation, setReservation] =
    useState<Reservation | null>(null);
  const [message, setMessage] = useState("Loading reservation…");

  useEffect(() => {
    fetch(
      `/api/v1/reservations?reference=${encodeURIComponent(id)}`,
      { cache: "no-store" }
    )
      .then((response) => response.json())
      .then(
        (payload: {
          ok?: boolean;
          data?: {
            reservations?: Reservation[];
          };
        }) => {
          const found =
            payload.data?.reservations?.find(
              (item) => item.id === id
            ) || null;
          setReservation(found);
          setMessage(
            found
              ? ""
              : "Reservation exists, but this API view could not load it."
          );
        }
      )
      .catch(() => setMessage("Reservation could not be loaded."));
  }, [id]);

  async function createDeposit() {
    if (!reservation) return;

    const response = await fetch(
      "/api/v1/reservation-engine/deposit",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reservationId: reservation.id }),
      }
    );

    const payload = (await response.json()) as {
      ok?: boolean;
      data?: {
        order?: { id?: string };
      };
      error?: { message?: string };
    };

    if (!response.ok || !payload.ok) {
      setMessage(
        payload.error?.message || "Deposit order could not be created."
      );
      return;
    }

    setMessage(
      `Real Razorpay order created: ${
        payload.data?.order?.id || "order ready"
      }. Checkout UI activation comes in the payment UI phase.`
    );
  }

  return (
    <div className="rounded-[30px] bg-[#fffaf4] p-6 md:p-8">
      <p className="lx-kicker">Reservation</p>
      <h1 className="lx-serif mt-2 text-5xl">
        {reservation?.status === "CONFIRMED"
          ? "Your table is confirmed."
          : "Your table is held for deposit."}
      </h1>
      <p className="mt-3 text-sm text-[#75645d]">{id}</p>

      {reservation ? (
        <>
          <div className="mt-6 grid grid-cols-2 gap-2">
            {[
              ["Date", reservation.reservation_date],
              ["Time", reservation.reservation_time],
              ["Guests", String(reservation.guest_count)],
              ["Area", reservation.area || "Dining room"],
              ["Table", reservation.table_id || "Assigned"],
              ["Status", reservation.status],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[16px] bg-white p-3">
                <p className="text-[8px] uppercase tracking-[.09em] text-[#8a756b]">
                  {label}
                </p>
                <p className="lx-serif mt-1 text-xl">{value}</p>
              </div>
            ))}
          </div>

          {reservation.deposit_required &&
          reservation.payment_status !== "PAID" ? (
            <button
              type="button"
              onClick={() => void createDeposit()}
              className="mt-5 h-12 w-full rounded-[16px] bg-[#7c241e] text-[9px] uppercase tracking-[.12em] text-white"
            >
              Create Razorpay deposit order · ₹
              {Number(reservation.deposit_amount).toLocaleString("en-IN")}
            </button>
          ) : null}

          <Link
            href="/reservations/live"
            className="mt-3 flex h-12 items-center justify-center rounded-[16px] border border-[#4a3025]/10 text-[9px] uppercase tracking-[.11em]"
          >
            New reservation
          </Link>
        </>
      ) : null}

      {message ? (
        <p className="mt-4 rounded-[15px] bg-[#fff4de] p-3 text-[10px] leading-5 text-[#75645d]">
          {message}
        </p>
      ) : null}
    </div>
  );
}
