import { SupabaseRepository } from "./repository";
import type { PasswordResetDBRow } from "@/lib/server/auth/customer-types";

export class SupabasePasswordResetRepository extends SupabaseRepository<PasswordResetDBRow> {
  constructor() {
    super("password_reset_tokens");
  }

  async findUsableByHash(tokenHash: string) {
    const rows = await this.list({
      limit: 1,
      query: `token_hash=eq.${encodeURIComponent(
        tokenHash
      )}&used_at=is.null`,
    });

    const row = rows[0] || null;

    if (!row || new Date(row.expires_at).getTime() <= Date.now()) {
      return null;
    }

    return row;
  }

  async markUsed(id: string) {
    return this.patch(id, {
      used_at: new Date().toISOString(),
    });
  }
}

export const supabasePasswordResets =
  new SupabasePasswordResetRepository();
