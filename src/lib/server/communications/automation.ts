import { enqueueNotification } from "@/lib/server/notifications/service";
import {
  reservationNotificationPayload,
  orderReadyNotificationPayload,
} from "./event-messages";

export async function queueReservationConfirmation(input: {
  customerId?: string;
  guestName: string;
  email: string;
  phone: string;
  reference: string;
  date: string;
  time: string;
  guests: number;
}) {
  const payload = reservationNotificationPayload(
    input
  );

  const queued = [];

  if (input.email) {
    queued.push(
      await enqueueNotification({
        customerId: input.customerId,
        channel: "EMAIL",
        category: "TRANSACTIONAL",
        recipient: input.email,
        templateKey:
          "reservation_confirmation",
        subjectLabel:
          "Reservation confirmation",
        payload,
      })
    );
  }

  if (input.phone && input.customerId) {
    queued.push(
      await enqueueNotification({
        customerId: input.customerId,
        channel: "WHATSAPP",
        category: "TRANSACTIONAL",
        recipient: input.phone,
        templateKey:
          "reservation_confirmation",
        subjectLabel:
          "Reservation confirmation",
        payload,
      })
    );
  }

  return queued;
}

export async function queueOrderReady(input: {
  customerId?: string | null;
  orderId: string;
  guestName: string;
  phone: string;
}) {
  if (!input.customerId || !input.phone) {
    return [];
  }

  return [
    await enqueueNotification({
      customerId: input.customerId,
      channel: "WHATSAPP",
      category: "TRANSACTIONAL",
      recipient: input.phone,
      templateKey: "order_ready",
      subjectLabel: "Order ready",
      payload: orderReadyNotificationPayload(
        input
      ),
    }),
  ];
}
