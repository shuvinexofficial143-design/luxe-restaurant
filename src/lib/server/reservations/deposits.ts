import { ApiError } from "@/lib/server/api/errors";
import { createRazorpayOrder } from "@/lib/server/payments/razorpay";
import { supabaseRest } from "@/lib/server/supabase/http";

type ReservationDepositRow = {
  id: string;
  deposit_required: boolean;
  deposit_amount: number;
  payment_status: string;
  razorpay_order_id: string | null;
};

export async function createReservationDepositOrder(
  reservationId: string
) {
  const rows = await supabaseRest<ReservationDepositRow[]>(
    "reservations",
    {
      query: `select=id,deposit_required,deposit_amount,payment_status,razorpay_order_id&id=eq.${encodeURIComponent(
        reservationId
      )}&limit=1`,
    }
  );

  const reservation = rows[0];

  if (!reservation) {
    throw new ApiError(
      "RESERVATION_NOT_FOUND",
      "Reservation was not found.",
      404
    );
  }

  if (!reservation.deposit_required) {
    throw new ApiError(
      "DEPOSIT_NOT_REQUIRED",
      "This reservation does not require a deposit.",
      422
    );
  }

  if (reservation.payment_status === "PAID") {
    throw new ApiError(
      "DEPOSIT_ALREADY_PAID",
      "This reservation deposit is already paid.",
      409
    );
  }

  const amountPaise = Math.round(
    Number(reservation.deposit_amount) * 100
  );

  const order = await createRazorpayOrder({
    amountPaise,
    receipt: reservation.id.slice(0, 40),
    notes: {
      reservationId: reservation.id,
      purpose: "reservation_deposit",
    },
  });

  await supabaseRest<unknown>("reservations", {
    method: "PATCH",
    query: `id=eq.${encodeURIComponent(reservation.id)}`,
    body: {
      razorpay_order_id: order.id,
      payment_status: "PENDING",
      updated_at: new Date().toISOString(),
    },
    prefer: "return=minimal",
  });

  return {
    reservationId: reservation.id,
    depositAmount: Number(reservation.deposit_amount),
    order,
  };
}

export async function markReservationDepositPaid(input: {
  reservationId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
}) {
  const rows = await supabaseRest<ReservationDepositRow[]>(
    "reservations",
    {
      query: `select=id,deposit_required,deposit_amount,payment_status,razorpay_order_id&id=eq.${encodeURIComponent(
        input.reservationId
      )}&limit=1`,
    }
  );

  const reservation = rows[0];

  if (
    !reservation ||
    reservation.razorpay_order_id !== input.razorpayOrderId
  ) {
    throw new ApiError(
      "PAYMENT_RESERVATION_MISMATCH",
      "Payment order does not match this reservation.",
      409
    );
  }

  await supabaseRest<unknown>("reservations", {
    method: "PATCH",
    query: `id=eq.${encodeURIComponent(input.reservationId)}`,
    body: {
      payment_status: "PAID",
      status: "CONFIRMED",
      razorpay_payment_id: input.razorpayPaymentId,
      updated_at: new Date().toISOString(),
    },
    prefer: "return=minimal",
  });
}
