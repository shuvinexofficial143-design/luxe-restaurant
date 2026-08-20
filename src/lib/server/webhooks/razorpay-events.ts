import type { WebhookEventRow } from "./types";
import { storePaymentEvent } from "@/lib/server/payments/event-store";
import {
  markReservationDepositPaid,
} from "@/lib/server/reservations/deposits";
import {
  markFoodOrderPaid,
} from "@/lib/server/orders/payment";

function record(value: unknown) {
  return value &&
    typeof value === "object" &&
    !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function text(
  value: unknown
): string {
  return typeof value === "string" ? value : "";
}

export async function handleRazorpayEvent(
  event: WebhookEventRow
) {
  const root = event.payload_json;
  const payload = record(root.payload);
  const paymentBox = record(payload.payment);
  const payment = record(paymentBox.entity);
  const orderBox = record(payload.order);
  const order = record(orderBox.entity);

  const paymentId = text(payment.id);
  const orderId =
    text(payment.order_id) || text(order.id);
  const status =
    text(payment.status) || text(order.status);
  const notes = record(payment.notes);
  const reservationId = text(notes.reservationId);
  const foodOrderId = text(notes.orderId);
  const amountPaise =
    typeof payment.amount === "number"
      ? payment.amount
      : typeof order.amount_paid === "number"
        ? order.amount_paid
        : 0;

  const stored = await storePaymentEvent({
    externalEventId: event.external_event_id,
    eventType: event.event_type,
    entityType: reservationId
      ? "RESERVATION"
      : foodOrderId
        ? "ORDER"
        : null,
    entityId: reservationId || foodOrderId || null,
    amount:
      amountPaise > 0 ? amountPaise / 100 : null,
    currency:
      text(payment.currency) ||
      text(order.currency) ||
      "INR",
    paymentId: paymentId || null,
    orderId: orderId || null,
    status: status || null,
    raw: root,
  });

  if (stored.duplicate) {
    return {
      duplicatePaymentEvent: true,
      reconciled: false,
    };
  }

  if (
    event.event_type === "payment.captured" &&
    orderId &&
    paymentId
  ) {
    if (reservationId) {
      await markReservationDepositPaid({
        reservationId,
        razorpayOrderId: orderId,
        razorpayPaymentId: paymentId,
      });

      return {
        duplicatePaymentEvent: false,
        reconciled: true,
        entity: "RESERVATION",
        entityId: reservationId,
      };
    }

    if (foodOrderId) {
      await markFoodOrderPaid({
        orderId: foodOrderId,
        razorpayOrderId: orderId,
        razorpayPaymentId: paymentId,
      });

      return {
        duplicatePaymentEvent: false,
        reconciled: true,
        entity: "ORDER",
        entityId: foodOrderId,
      };
    }
  }

  return {
    duplicatePaymentEvent: false,
    reconciled: false,
    eventType: event.event_type,
  };
}
