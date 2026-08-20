export type NotificationChannel =
  | "EMAIL"
  | "WHATSAPP";

export type NotificationQueueRow = {
  id: string;
  customer_id: string | null;
  channel: NotificationChannel;
  recipient: string;
  template_key: string;
  payload_json: Record<string, unknown>;
  status:
    | "QUEUED"
    | "PROCESSING"
    | "SENT"
    | "FAILED"
    | "DEAD";
  attempts: number;
  max_attempts: number;
  run_after: string;
  provider_message_id: string | null;
  last_error: string | null;
  created_at: string;
  sent_at: string | null;
};
