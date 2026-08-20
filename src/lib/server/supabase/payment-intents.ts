import { SupabaseRepository } from "./repository";
import type {
  PaymentEntityType,
  PaymentIntentRow,
} from "@/lib/server/billing/types";

export class PaymentIntentRepository extends SupabaseRepository<PaymentIntentRow> {
  constructor() {
    super("payment_intents");
  }

  async findOpen(
    entityType: PaymentEntityType,
    entityId: string
  ) {
    const rows = await this.list({
      limit: 1,
      order: "created_at.desc",
      query:
        `entity_type=eq.${entityType}` +
        `&entity_id=eq.${encodeURIComponent(entityId)}` +
        `&status=in.(CREATED,PENDING)`,
    });

    return rows[0] || null;
  }

  async listRecent(limit = 150) {
    return this.list({
      limit,
      order: "created_at.desc",
    });
  }
}

export const supabasePaymentIntents =
  new PaymentIntentRepository();
