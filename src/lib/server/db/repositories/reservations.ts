import { BaseRepository } from "../repository";
import { getDatabase } from "../client";
import type { DBRecord } from "../types";

export type ReservationRow = DBRecord & {
  id: string;
  guest_name: string;
  email: string;
  phone: string;
  reservation_date: string;
  reservation_time: string;
  guest_count: number;
  status: string;
  created_at: string;
};

export class ReservationRepository extends BaseRepository<ReservationRow> {
  constructor() {
    super(getDatabase(), "reservations");
  }

  async findByReference(reference: string) {
    const result = await this.db.query<ReservationRow>({
      text: "select * from reservations where id = $1 limit 1",
      values: [reference],
    });
    return result.rows[0] || null;
  }
}

export const reservationRepository = new ReservationRepository();
