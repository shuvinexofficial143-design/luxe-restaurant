import { SupabaseRepository } from "./repository";
import type { CustomerOccasionRow } from "@/lib/server/account/types";

export class SupabaseCustomerOccasionRepository extends SupabaseRepository<CustomerOccasionRow> {
  constructor() {
    super("customer_occasions");
  }

  async listForCustomer(customerId: string) {
    return this.list({
      limit: 50,
      order: "occasion_date.asc",
      query: `customer_id=eq.${encodeURIComponent(customerId)}`,
    });
  }
}

export const supabaseCustomerOccasions =
  new SupabaseCustomerOccasionRepository();
