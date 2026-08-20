import { SupabaseRepository } from "./repository";
import type {
  CommunicationPreferencesRow,
} from "@/lib/server/communications/types";

export class CommunicationPreferenceRepository extends SupabaseRepository<CommunicationPreferencesRow> {
  constructor() {
    super("communication_preferences");
  }

  async findForCustomer(
    customerId: string
  ) {
    const rows = await this.list({
      limit: 1,
      query: `customer_id=eq.${encodeURIComponent(
        customerId
      )}`,
    });

    return rows[0] || null;
  }
}

export const supabaseCommunicationPreferences =
  new CommunicationPreferenceRepository();
