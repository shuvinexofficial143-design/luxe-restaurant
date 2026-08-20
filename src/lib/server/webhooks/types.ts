export type WebhookProvider =
  | "RAZORPAY"
  | "WHATSAPP";

export type WebhookEventRow = {
  id: string;
  provider: WebhookProvider;
  external_event_id: string;
  event_type: string;
  payload_json: Record<string, unknown>;
  signature_verified: boolean;
  processing_status:
    | "RECEIVED"
    | "QUEUED"
    | "PROCESSING"
    | "PROCESSED"
    | "FAILED";
  attempts: number;
  last_error: string | null;
  received_at: string;
  processed_at: string | null;
};

export type IngestWebhookResult = {
  accepted: boolean;
  duplicate: boolean;
  eventId: string;
  jobId?: string;
};
