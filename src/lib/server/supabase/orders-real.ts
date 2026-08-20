import { SupabaseRepository } from "./repository";
import type { OrderRow } from "@/lib/server/orders/types";

export class SupabaseRealOrderRepository extends SupabaseRepository<OrderRow> {
  constructor() {
    super("orders");
  }

  async listKitchen(limit = 100) {
    return this.list({
      limit,
      order: "created_at.asc",
      query: "status=not.in.(COMPLETED,CANCELLED)",
    });
  }

  async listForCustomer(customerId: string) {
    return this.list({
      limit: 100,
      order: "created_at.desc",
      query: `customer_id=eq.${encodeURIComponent(customerId)}`,
    });
  }
}

export const supabaseOrdersReal =
  new SupabaseRealOrderRepository();
