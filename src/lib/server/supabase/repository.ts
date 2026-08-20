import {
  supabaseRest,
} from "./http";

export class SupabaseRepository<
  T extends object,
> {
  constructor(
    protected readonly table: string,
    protected readonly primaryKey = "id"
  ) {}

  async list(
    options: {
      limit?: number;
      order?: string;
      query?: string;
    } = {}
  ): Promise<T[]> {
    const limit =
      Math.max(
        1,
        Math.min(
          200,
          options.limit || 50
        )
      );

    const parts = [
      "select=*",
      `limit=${limit}`,
      options.order
        ? `order=${encodeURIComponent(
            options.order
          )}`
        : "",
      options.query || "",
    ].filter(Boolean);

    return supabaseRest<T[]>(
      this.table,
      {
        query:
          parts.join("&"),
      }
    );
  }

  async findById(
    id: string
  ): Promise<T | null> {
    const rows =
      await supabaseRest<T[]>(
        this.table,
        {
          query:
            `select=*&${encodeURIComponent(
              this.primaryKey
            )}=eq.${encodeURIComponent(
              id
            )}&limit=1`,
        }
      );

    return rows[0] || null;
  }

  async insert(
    row:
      Omit<
        T,
        "created_at" | "updated_at"
      > &
      Partial<T>
  ): Promise<T> {
    const rows =
      await supabaseRest<T[]>(
        this.table,
        {
          method: "POST",
          body: row,
          prefer:
            "return=representation",
        }
      );

    if (!rows[0]) {
      throw new Error(
        `supabase_insert_returned_no_row:${this.table}`
      );
    }

    return rows[0];
  }

  async patch(
    id: string,
    patch: Partial<T>
  ): Promise<T | null> {
    const rows =
      await supabaseRest<T[]>(
        this.table,
        {
          method: "PATCH",
          query:
            `${encodeURIComponent(
              this.primaryKey
            )}=eq.${encodeURIComponent(
              id
            )}`,
          body: patch,
          prefer:
            "return=representation",
        }
      );

    return rows[0] || null;
  }

  async remove(
    id: string
  ): Promise<void> {
    await supabaseRest<unknown>(
      this.table,
      {
        method: "DELETE",
        query:
          `${encodeURIComponent(
            this.primaryKey
          )}=eq.${encodeURIComponent(
            id
          )}`,
        prefer:
          "return=minimal",
      }
    );
  }
}
