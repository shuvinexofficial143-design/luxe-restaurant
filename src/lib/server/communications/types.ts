export type CommunicationChannel =
  | "EMAIL"
  | "WHATSAPP";

export type CommunicationCategory =
  | "TRANSACTIONAL"
  | "MARKETING";

export type CommunicationPreferencesRow = {
  id: string;
  customer_id: string;
  transactional_email: boolean;
  transactional_whatsapp: boolean;
  marketing_email: boolean;
  marketing_whatsapp: boolean;
  language: "en" | "hi";
  updated_at?: string;
};

export type DeliveryEventRow = {
  id: string;
  notification_id: string;
  provider: string;
  event_type: string;
  provider_message_id: string | null;
  payload_json: Record<string, unknown>;
  created_at?: string;
};

export type CommunicationDecision = {
  allowed: boolean;
  reason:
    | "ALLOWED"
    | "NO_CUSTOMER"
    | "TRANSACTIONAL_EMAIL_DISABLED"
    | "TRANSACTIONAL_WHATSAPP_DISABLED"
    | "MARKETING_EMAIL_NOT_OPTED_IN"
    | "MARKETING_WHATSAPP_NOT_OPTED_IN";
};
