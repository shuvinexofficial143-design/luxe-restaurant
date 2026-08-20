import { SupabaseRepository } from "./repository";
import type { CRMCustomerNote } from "@/lib/server/crm/types";

export class SupabaseCRMNoteRepository extends SupabaseRepository<CRMCustomerNote> {
  constructor() {
    super("crm_customer_notes");
  }

  async listForCustomer(customerId: string) {
    return this.list({
      limit: 100,
      order: "created_at.desc",
      query: `customer_id=eq.${encodeURIComponent(customerId)}`,
    });
  }
}

export const supabaseCRMNotes = new SupabaseCRMNoteRepository();
