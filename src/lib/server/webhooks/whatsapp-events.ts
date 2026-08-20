import type { WebhookEventRow } from "./types";

function record(value: unknown) {
  return value &&
    typeof value === "object" &&
    !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export async function handleWhatsAppEvent(
  event: WebhookEventRow
) {
  const entries = Array.isArray(
    event.payload_json.entry
  )
    ? event.payload_json.entry
    : [];

  let inboundMessages = 0;
  let deliveryStatuses = 0;

  for (const entry of entries) {
    const changes = Array.isArray(record(entry).changes)
      ? (record(entry).changes as unknown[])
      : [];

    for (const change of changes) {
      const value = record(record(change).value);
      const messages = Array.isArray(value.messages)
        ? value.messages
        : [];
      const statuses = Array.isArray(value.statuses)
        ? value.statuses
        : [];

      inboundMessages += messages.length;
      deliveryStatuses += statuses.length;
    }
  }

  return {
    provider: "WHATSAPP",
    inboundMessages,
    deliveryStatuses,
    autoReplySent: false,
  };
}
