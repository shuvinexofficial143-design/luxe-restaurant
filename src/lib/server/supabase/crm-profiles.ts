import { SupabaseRepository } from "./repository";
import type { CRMCustomerProfile } from "@/lib/server/crm/types";

export class SupabaseCRMProfileRepository extends SupabaseRepository<CRMCustomerProfile> {
  constructor() {
    super("crm_customer_profiles");
  }

  async findByCustomerId(customerId: string) {
    const rows = await this.list({
      limit: 1,
      query: `customer_id=eq.${encodeURIComponent(customerId)}`,
    });
    return rows[0] || null;
  }
}

export const supabaseCRMProfiles =
  new SupabaseCRMProfileRepository();
