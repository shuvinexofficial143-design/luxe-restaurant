import { SupabaseRepository } from "./repository";
import type { OrderStatusHistoryRow } from "@/lib/server/orders/types";

export class SupabaseOrderHistoryRepository extends SupabaseRepository<OrderStatusHistoryRow> {
  constructor() {
    super("order_status_history");
  }

  async listForOrder(orderId: string) {
    return this.list({
      limit: 100,
      order: "created_at.asc",
      query: `order_id=eq.${encodeURIComponent(orderId)}`,
    });
  }
}

export const supabaseOrderHistory =
  new SupabaseOrderHistoryRepository();
