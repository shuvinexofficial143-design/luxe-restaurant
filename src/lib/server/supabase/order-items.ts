import { SupabaseRepository } from "./repository";
import type { OrderItemRow } from "@/lib/server/orders/types";

export class SupabaseOrderItemRepository extends SupabaseRepository<OrderItemRow> {
  constructor() {
    super("order_items");
  }

  async listForOrder(orderId: string) {
    return this.list({
      limit: 100,
      order: "created_at.asc",
      query: `order_id=eq.${encodeURIComponent(orderId)}`,
    });
  }
}

export const supabaseOrderItems =
  new SupabaseOrderItemRepository();
