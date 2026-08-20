import { BaseRepository } from "../repository";
import { getDatabase } from "../client";
import type { DBRecord } from "../types";

export type OrderRow = DBRecord & {
  id: string;
  guest_name: string;
  phone: string;
  fulfillment: string;
  status: string;
  subtotal: number;
  total: number;
  created_at: string;
};

export class OrderRepository extends BaseRepository<OrderRow> {
  constructor() {
    super(getDatabase(), "orders");
  }

  async listOpen(limit = 100) {
    const safeLimit = Math.max(1, Math.min(200, Math.floor(limit)));
    const result = await this.db.query<OrderRow>({
      text:
        "select * from orders where status not in ('COMPLETED','CANCELLED') order by created_at desc limit $1",
      values: [safeLimit],
    });
    return result.rows;
  }
}

export const orderRepository = new OrderRepository();
