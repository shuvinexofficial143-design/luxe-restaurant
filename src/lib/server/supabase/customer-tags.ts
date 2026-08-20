import { SupabaseRepository } from "./repository";
import type { CRMCustomerTag } from "@/lib/server/crm/types";

export class SupabaseCRMTagRepository extends SupabaseRepository<CRMCustomerTag> {
  constructor() {
    super("crm_customer_tags");
  }

  async listForCustomer(customerId: string) {
    return this.list({
      limit: 100,
      order: "created_at.desc",
      query: `customer_id=eq.${encodeURIComponent(customerId)}`,
    });
  }
}

export const supabaseCRMTags = new SupabaseCRMTagRepository();
