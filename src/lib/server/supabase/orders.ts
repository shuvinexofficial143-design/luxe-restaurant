import { SupabaseRepository } from "./repository";

export type OrderDBRow = {
  id: string;
  guest_name: string;
  phone: string;
  fulfillment: string;
  table_number: string | null;
  pickup_time: string | null;
  subtotal: number;
  service_charge: number;
  total: number;
  status: string;
  notes: string | null;
  created_at?: string;
  updated_at?: string;
};

export class SupabaseOrderRepository extends SupabaseRepository<OrderDBRow> {
  constructor() {
    super("orders");
  }

  async listOpen(limit = 100) {
    return this.list({
      limit,
      order: "created_at.desc",
      query: "status=not.in.(COMPLETED,CANCELLED)",
    });
  }
}

export const supabaseOrders = new SupabaseOrderRepository();
