import { ApiError } from "@/lib/server/api/errors";
import { secureIdentifier } from "@/lib/server/security/admin-token";
import { createRazorpayOrder } from "@/lib/server/payments/razorpay";
import { supabasePaymentIntents } from "@/lib/server/supabase/payment-intents";
import { supabaseRest } from "@/lib/server/supabase/http";
import type {
  PaymentEntityType,
  PaymentIntentRow,
} from "./types";

type OrderPayable = {
  id: string;
  total: number;
  payment_status: string;
  guest_name: string;
  phone: string;
};

type ReservationPayable = {
  id: string;
  deposit_required: boolean;
  deposit_amount: number;
  payment_status: string;
  guest_name: string;
  email: string;
  phone: string;
};

async function payableAmount(
  entityType: PaymentEntityType,
  entityId: string
) {
  if (entityType === "ORDER") {
    const rows = await supabaseRest<OrderPayable[]>("orders", {
      query: `select=id,total,payment_status,guest_name,phone&id=eq.${encodeURIComponent(
        entityId
      )}&limit=1`,
    });

    const order = rows[0];

    if (!order) {
      throw new ApiError("ORDER_NOT_FOUND", "Order was not found.", 404);
    }

    if (order.payment_status === "PAID") {
      throw new ApiError(
        "ORDER_ALREADY_PAID",
        "This order is already paid.",
        409
      );
    }

    return {
      amount: Number(order.total),
      customerName: order.guest_name,
      customerEmail: null,
      customerPhone: order.phone,
    };
  }

  const rows = await supabaseRest<ReservationPayable[]>(
    "reservations",
    {
      query: `select=id,deposit_required,deposit_amount,payment_status,guest_name,email,phone&id=eq.${encodeURIComponent(
        entityId
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
      "Reservation deposit is already paid.",
      409
    );
  }

  return {
    amount: Number(reservation.deposit_amount),
    customerName: reservation.guest_name,
    customerEmail: reservation.email,
    customerPhone: reservation.phone,
  };
}

export async function createPaymentIntent(input: {
  entityType: PaymentEntityType;
  entityId: string;
}) {
  const payable = await payableAmount(
    input.entityType,
    input.entityId
  );

  if (!Number.isFinite(payable.amount) || payable.amount <= 0) {
    throw new ApiError(
      "INVALID_PAYMENT_AMOUNT",
      "The server-calculated payable amount is invalid.",
      422
    );
  }

  const existing = await supabasePaymentIntents.findOpen(
    input.entityType,
    input.entityId
  );

  if (
    existing &&
    existing.razorpay_order_id &&
    existing.status === "PENDING"
  ) {
    return {
      intent: existing,
      reused: true,
      customer: payable,
    };
  }

  const intentId = secureIdentifier("PAY");
  const razorpayOrder = await createRazorpayOrder({
    amountPaise: Math.round(payable.amount * 100),
    receipt: intentId.slice(0, 40),
    notes: {
      paymentIntentId: intentId,
      entityType: input.entityType,
      entityId: input.entityId,
      ...(input.entityType === "ORDER"
        ? { orderId: input.entityId }
        : { reservationId: input.entityId }),
    },
  });

  const intent = await supabasePaymentIntents.insert({
    id: intentId,
    entity_type: input.entityType,
    entity_id: input.entityId,
    amount: payable.amount,
    currency: "INR",
    status: "PENDING",
    razorpay_order_id: razorpayOrder.id,
    razorpay_payment_id: null,
    failure_code: null,
    failure_message: null,
  });

  return {
    intent,
    reused: false,
    customer: payable,
  };
}

export async function findPaymentIntent(id: string) {
  return supabasePaymentIntents.findById(id);
}

export async function markIntentPaid(input: {
  intent: PaymentIntentRow;
  paymentId: string;
}) {
  return supabasePaymentIntents.patch(input.intent.id, {
    status: "PAID",
    razorpay_payment_id: input.paymentId,
    updated_at: new Date().toISOString(),
    failure_code: null,
    failure_message: null,
  });
}
