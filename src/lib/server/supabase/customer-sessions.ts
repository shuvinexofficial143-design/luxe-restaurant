import { SupabaseRepository } from "./repository";
import type { CustomerSessionDBRow } from "@/lib/server/auth/customer-types";

export class SupabaseCustomerSessionRepository extends SupabaseRepository<CustomerSessionDBRow> {
  constructor() {
    super("customer_sessions");
  }

  async findActiveByHash(tokenHash: string) {
    const rows = await this.list({
      limit: 1,
      query: `token_hash=eq.${encodeURIComponent(
        tokenHash
      )}&revoked_at=is.null`,
    });

    return rows[0] || null;
  }

  async revoke(id: string) {
    return this.patch(id, {
      revoked_at: new Date().toISOString(),
    });
  }

  async revokeAllForCustomer(customerId: string) {
    const rows = await this.list({
      limit: 200,
      query: `customer_id=eq.${encodeURIComponent(
        customerId
      )}&revoked_at=is.null`,
    });

    await Promise.all(rows.map((row) => this.revoke(row.id)));
  }
}

export const supabaseCustomerSessions =
  new SupabaseCustomerSessionRepository();
