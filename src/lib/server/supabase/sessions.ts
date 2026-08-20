import { SupabaseRepository } from "./repository";

export type AdminSessionDBRow = {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: string;
  revoked_at: string | null;
  created_at?: string;
};

export class SupabaseSessionRepository extends SupabaseRepository<AdminSessionDBRow> {
  constructor() {
    super("admin_sessions");
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
    return this.patch(id, { revoked_at: new Date().toISOString() });
  }
}

export const supabaseSessions = new SupabaseSessionRepository();
