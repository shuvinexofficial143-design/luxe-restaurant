import { SupabaseRepository } from "./repository";

export type ReservationDBRow = {
  id: string;
  guest_name: string;
  email: string;
  phone: string;
  reservation_date: string;
  reservation_time: string;
  guest_count: number;
  area: string | null;
  table_id: string | null;
  occasion: string | null;
  notes: string | null;
  status: string;
  deposit_required?: boolean;
  deposit_amount?: number;
  payment_status?: string;
  created_at?: string;
  updated_at?: string;
};

export class SupabaseReservationRepository extends SupabaseRepository<ReservationDBRow> {
  constructor() {
    super("reservations");
  }

  async listUpcoming(limit = 100) {
    const today = new Date().toISOString().slice(0, 10);
    return this.list({
      limit,
      order: "reservation_date.asc",
      query: `reservation_date=gte.${today}`,
    });
  }
}

export const supabaseReservations = new SupabaseReservationRepository();
