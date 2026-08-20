import { ApiError } from "@/lib/server/api/errors";
import { supabaseRpc } from "@/lib/server/supabase/rpc";
import { supabaseWebhookEvents } from "@/lib/server/supabase/webhook-events";
import type {
  IngestWebhookResult,
  WebhookProvider,
} from "./types";
import { handleRazorpayEvent } from "./razorpay-events";
import { handleWhatsAppEvent } from "./whatsapp-events";

export async function ingestVerifiedWebhook(input: {
  provider: WebhookProvider;
  externalEventId: string;
  eventType: string;
  payload: Record<string, unknown>;
}) {
  return supabaseRpc<IngestWebhookResult>(
    "luxe_ingest_webhook",
    {
      p_provider: input.provider,
      p_external_event_id: input.externalEventId,
      p_event_type: input.eventType,
      p_payload: input.payload,
      p_signature_verified: true,
    }
  );
}

export async function processWebhookEvent(
  webhookEventId: string
) {
  const event =
    await supabaseWebhookEvents.findById(webhookEventId);

  if (!event) {
    throw new ApiError(
      "WEBHOOK_EVENT_NOT_FOUND",
      "Persisted webhook event was not found.",
      404
    );
  }

  if (!event.signature_verified) {
    throw new ApiError(
      "WEBHOOK_NOT_VERIFIED",
      "Unverified webhook events cannot be processed.",
      403
    );
  }

  if (event.processing_status === "PROCESSED") {
    return {
      alreadyProcessed: true,
      eventId: event.id,
    };
  }

  await supabaseWebhookEvents.patch(event.id, {
    processing_status: "PROCESSING",
    attempts: Number(event.attempts || 0) + 1,
    last_error: null,
  });

  try {
    const result =
      event.provider === "RAZORPAY"
        ? await handleRazorpayEvent(event)
        : await handleWhatsAppEvent(event);

    await supabaseWebhookEvents.patch(event.id, {
      processing_status: "PROCESSED",
      processed_at: new Date().toISOString(),
      last_error: null,
    });

    return result;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Webhook processing failed.";

    await supabaseWebhookEvents.patch(event.id, {
      processing_status: "FAILED",
      last_error: message.slice(0, 2000),
    }).catch(() => undefined);

    throw error;
  }
}
