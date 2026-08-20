import { SupabaseRepository } from "./repository";
import type { WaitlistRow } from "@/lib/server/reservations/types";

export class SupabaseWaitlistRepository extends SupabaseRepository<WaitlistRow> {
  constructor() {
    super("waitlist_entries");
  }

  async listWaiting(limit = 100) {
    return this.list({
      limit,
      order: "created_at.asc",
      query: "status=eq.WAITING",
    });
  }
}

export const supabaseWaitlist = new SupabaseWaitlistRepository();
