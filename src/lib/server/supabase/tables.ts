import { SupabaseRepository } from "./repository";

export type DiningTableRow = {
  id: string;
  label: string;
  area: string;
  min_guests: number;
  max_guests: number;
  active: boolean;
  sort_order: number;
  created_at?: string;
};

export class SupabaseDiningTableRepository extends SupabaseRepository<DiningTableRow> {
  constructor() {
    super("dining_tables");
  }

  async listActive() {
    return this.list({
      limit: 100,
      order: "sort_order.asc",
      query: "active=eq.true",
    });
  }
}

export const supabaseDiningTables =
  new SupabaseDiningTableRepository();
