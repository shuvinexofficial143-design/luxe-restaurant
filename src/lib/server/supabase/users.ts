import { SupabaseRepository } from "./repository";

export type AdminUserDBRow = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
};

export class SupabaseAdminUserRepository extends SupabaseRepository<AdminUserDBRow> {
  constructor() {
    super("admin_users");
  }

  async findByEmail(email: string) {
    const rows = await this.list({
      limit: 1,
      query: `email=ilike.${encodeURIComponent(email)}`,
    });
    return rows[0] || null;
  }
}

export const supabaseAdminUsers = new SupabaseAdminUserRepository();
