import { ApiError } from "@/lib/server/api/errors";
import {
  giftCardEmail,
  reservationConfirmationEmail,
} from "@/lib/server/email/templates";
import {
  reservationWhatsAppText,
} from "@/lib/server/whatsapp/templates";

function text(
  payload: Record<string, unknown>,
  key: string
) {
  const value = payload[key];

  if (typeof value !== "string" || !value.trim()) {
    throw new ApiError(
      "NOTIFICATION_PAYLOAD_INVALID",
      `Notification is missing ${key}.`,
      422
    );
  }

  return value;
}

function numberValue(
  payload: Record<string, unknown>,
  key: string
) {
  const value = payload[key];

  if (typeof value !== "number") {
    throw new ApiError(
      "NOTIFICATION_PAYLOAD_INVALID",
      `Notification is missing numeric ${key}.`,
      422
    );
  }

  return value;
}

export function renderEmailNotification(
  templateKey: string,
  payload: Record<string, unknown>
) {
  if (templateKey === "reservation_confirmation") {
    return reservationConfirmationEmail({
      guestName: text(payload, "guestName"),
      reference: text(payload, "reference"),
      date: text(payload, "date"),
      time: text(payload, "time"),
      guests: numberValue(payload, "guests"),
    });
  }

  if (templateKey === "gift_card") {
    return giftCardEmail({
      recipientName: text(payload, "recipientName"),
      senderName: text(payload, "senderName"),
      code: text(payload, "code"),
      amount: text(payload, "amount"),
      message: text(payload, "message"),
    });
  }

  if (templateKey === "order_ready") {
    const orderId = text(payload, "orderId");

    return {
      subject: `LUXE order ${orderId} is ready`,
      text: `Your LUXE order ${orderId} is ready.`,
      html: `<div style="font-family:Arial,sans-serif;padding:28px"><h1>Your order is ready.</h1><p>${orderId}</p></div>`,
    };
  }

  throw new ApiError(
    "UNKNOWN_EMAIL_TEMPLATE",
    `Unknown email template ${templateKey}.`,
    422
  );
}

export function renderWhatsAppNotification(
  templateKey: string,
  payload: Record<string, unknown>
) {
  if (templateKey === "reservation_confirmation") {
    return reservationWhatsAppText({
      guestName: text(payload, "guestName"),
      reference: text(payload, "reference"),
      date: text(payload, "date"),
      time: text(payload, "time"),
    });
  }

  if (templateKey === "order_ready") {
    return `Your LUXE order ${text(
      payload,
      "orderId"
    )} is ready for collection/service.`;
  }

  throw new ApiError(
    "UNKNOWN_WHATSAPP_TEMPLATE",
    `Unknown WhatsApp template ${templateKey}.`,
    422
  );
}
