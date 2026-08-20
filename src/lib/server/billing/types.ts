export type PaymentEntityType =
  | "ORDER"
  | "RESERVATION";

export type PaymentIntentRow = {
  id: string;
  entity_type: PaymentEntityType;
  entity_id: string;
  amount: number;
  currency: string;
  status:
    | "CREATED"
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "REFUNDED"
    | "PARTIALLY_REFUNDED";
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  failure_code: string | null;
  failure_message: string | null;
  created_at?: string;
  updated_at?: string;
};

export type BillingReceiptRow = {
  id: string;
  payment_intent_id: string;
  receipt_number: string;
  entity_type: PaymentEntityType;
  entity_id: string;
  amount: number;
  currency: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  payment_id: string | null;
  issued_at: string;
};

export type RefundRequestRow = {
  id: string;
  payment_intent_id: string;
  requested_amount: number;
  reason: string;
  status:
    | "REQUESTED"
    | "PROCESSING"
    | "REFUNDED"
    | "FAILED"
    | "REJECTED";
  razorpay_refund_id: string | null;
  provider_status: string | null;
  requested_by: string | null;
  processed_by: string | null;
  last_error: string | null;
  created_at: string;
  processed_at: string | null;
};
