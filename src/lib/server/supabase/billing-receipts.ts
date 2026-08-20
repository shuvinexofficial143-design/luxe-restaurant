import { SupabaseRepository } from "./repository";
import type {
  BillingReceiptRow,
} from "@/lib/server/billing/types";

export class BillingReceiptRepository extends SupabaseRepository<BillingReceiptRow> {
  constructor() {
    super("billing_receipts");
  }

  async findForIntent(paymentIntentId: string) {
    const rows = await this.list({
      limit: 1,
      query: `payment_intent_id=eq.${encodeURIComponent(
        paymentIntentId
      )}`,
    });

    return rows[0] || null;
  }
}

export const supabaseBillingReceipts =
  new BillingReceiptRepository();
