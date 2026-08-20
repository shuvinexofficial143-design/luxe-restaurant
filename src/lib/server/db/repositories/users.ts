import { BaseRepository } from "../repository";
import { getDatabase } from "../client";
import type { DBRecord } from "../types";

export type AdminUserRow = DBRecord & {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  active: boolean;
  created_at: string;
};

export class AdminUserRepository extends BaseRepository<AdminUserRow> {
  constructor() {
    super(getDatabase(), "admin_users");
  }

  async findByEmail(email: string) {
    const result = await this.db.query<AdminUserRow>({
      text: "select * from admin_users where lower(email) = lower($1) limit 1",
      values: [email],
    });
    return result.rows[0] || null;
  }
}

export const adminUserRepository = new AdminUserRepository();
