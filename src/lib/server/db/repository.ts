import type { DatabaseAdapter, DBRecord } from "./types";

export abstract class BaseRepository<T extends DBRecord> {
  protected constructor(
    protected readonly db: DatabaseAdapter,
    protected readonly table: string
  ) {}

  async findById(id: string): Promise<T | null> {
    const result = await this.db.query<T>({
      text: `select * from ${this.table} where id = $1 limit 1`,
      values: [id],
    });

    return result.rows[0] || null;
  }

  async list(limit = 50): Promise<T[]> {
    const safeLimit = Math.max(1, Math.min(200, Math.floor(limit)));
    const result = await this.db.query<T>({
      text: `select * from ${this.table} order by created_at desc limit $1`,
      values: [safeLimit],
    });

    return result.rows;
  }
}
