import { SupabaseRepository } from "./repository";
import type { CustomerDBRow } from "@/lib/server/auth/customer-types";

export class SupabaseCustomerRepository extends SupabaseRepository<CustomerDBRow> {
  constructor() {
    super("customers");
  }

  async findByEmail(email: string) {
    const rows = await this.list({
      limit: 1,
      query: `email=eq.${encodeURIComponent(email.toLowerCase())}`,
    });

    return rows[0] || null;
  }
}

export const supabaseCustomers = new SupabaseCustomerRepository();
