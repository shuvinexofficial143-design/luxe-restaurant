import { secureIdentifier } from "@/lib/server/security/admin-token";
import { supabaseBillingReceipts } from "@/lib/server/supabase/billing-receipts";
import { supabaseRest } from "@/lib/server/supabase/http";
import type {
  PaymentIntentRow,
} from "./types";
import { receiptNumber } from "./config";

export async function issueReceiptForIntent(
  intent: PaymentIntentRow
) {
  const existing =
    await supabaseBillingReceipts.findForIntent(
      intent.id
    );

  if (existing) return existing;

  let customerName: string | null = null;
  let customerEmail: string | null = null;
  let customerPhone: string | null = null;

  if (intent.entity_type === "ORDER") {
    const rows = await supabaseRest<
      {
        guest_name: string;
        phone: string;
      }[]
    >("orders", {
      query: `select=guest_name,phone&id=eq.${encodeURIComponent(
        intent.entity_id
      )}&limit=1`,
    });

    customerName = rows[0]?.guest_name || null;
    customerPhone = rows[0]?.phone || null;
  } else {
    const rows = await supabaseRest<
      {
        guest_name: string;
        email: string;
        phone: string;
      }[]
    >("reservations", {
      query: `select=guest_name,email,phone&id=eq.${encodeURIComponent(
        intent.entity_id
      )}&limit=1`,
    });

    customerName = rows[0]?.guest_name || null;
    customerEmail = rows[0]?.email || null;
    customerPhone = rows[0]?.phone || null;
  }

  return supabaseBillingReceipts.insert({
    id: secureIdentifier("RCPT"),
    payment_intent_id: intent.id,
    receipt_number: receiptNumber(),
    entity_type: intent.entity_type,
    entity_id: intent.entity_id,
    amount: Number(intent.amount),
    currency: intent.currency,
    customer_name: customerName,
    customer_email: customerEmail,
    customer_phone: customerPhone,
    payment_id: intent.razorpay_payment_id,
    issued_at: new Date().toISOString(),
  });
}
