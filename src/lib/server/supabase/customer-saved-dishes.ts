import { SupabaseRepository } from "./repository";
import type { SavedDishRow } from "@/lib/server/account/types";

export class SupabaseSavedDishRepository extends SupabaseRepository<SavedDishRow> {
  constructor() {
    super("customer_saved_dishes");
  }

  async listForCustomer(customerId: string) {
    return this.list({
      limit: 100,
      order: "created_at.desc",
      query: `customer_id=eq.${encodeURIComponent(customerId)}`,
    });
  }

  async findByDish(customerId: string, dishSlug: string) {
    const rows = await this.list({
      limit: 1,
      query: `customer_id=eq.${encodeURIComponent(
        customerId
      )}&dish_slug=eq.${encodeURIComponent(dishSlug)}`,
    });
    return rows[0] || null;
  }
}

export const supabaseSavedDishes =
  new SupabaseSavedDishRepository();
