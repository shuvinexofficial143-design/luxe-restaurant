import { secureIdentifier } from "@/lib/server/security/admin-token";
import { supabaseRest } from "@/lib/server/supabase/http";

type PaymentEventRow = {
  id: string;
  provider: string;
  external_event_id: string;
  entity_type: string | null;
  entity_id: string | null;
  event_type: string;
  amount: number | null;
  currency: string | null;
  payment_id: string | null;
  order_id: string | null;
  status: string | null;
  raw_json: Record<string, unknown>;
  created_at?: string;
};

export async function storePaymentEvent(input: {
  externalEventId: string;
  eventType: string;
  entityType: string | null;
  entityId: string | null;
  amount: number | null;
  currency: string | null;
  paymentId: string | null;
  orderId: string | null;
  status: string | null;
  raw: Record<string, unknown>;
}) {
  const existing = await supabaseRest<PaymentEventRow[]>(
    "payment_events",
    {
      query:
        `select=*&provider=eq.RAZORPAY` +
        `&external_event_id=eq.${encodeURIComponent(
          input.externalEventId
        )}&limit=1`,
    }
  );

  if (existing[0]) {
    return {
      duplicate: true,
      event: existing[0],
    };
  }

  const rows = await supabaseRest<PaymentEventRow[]>(
    "payment_events",
    {
      method: "POST",
      body: {
        id: secureIdentifier("PAYEVT"),
        provider: "RAZORPAY",
        external_event_id: input.externalEventId,
        entity_type: input.entityType,
        entity_id: input.entityId,
        event_type: input.eventType,
        amount: input.amount,
        currency: input.currency,
        payment_id: input.paymentId,
        order_id: input.orderId,
        status: input.status,
        raw_json: input.raw,
      },
      prefer: "return=representation",
    }
  );

  return {
    duplicate: false,
    event: rows[0] || null,
  };
}
