export type AvailabilityTable = {
  table_id: string;
  table_label: string;
  area: string;
  max_guests: number;
  available: boolean;
};

export type AvailabilitySlot = {
  time: string;
  availableTables: number;
  tables: AvailabilityTable[];
};

export type ReservationHold = {
  ok: boolean;
  code?: string;
  holdId?: string;
  tableId?: string;
  tableLabel?: string;
  area?: string;
  expiresAt?: string;
};

export type ConfirmedReservation = {
  ok: boolean;
  code?: string;
  reservationId?: string;
  status?: string;
  depositRequired?: boolean;
  depositAmount?: number;
  tableId?: string;
  area?: string;
};

export type WaitlistRow = {
  id: string;
  customer_id: string | null;
  guest_name: string;
  email: string;
  phone: string;
  reservation_date: string;
  preferred_time: string;
  guest_count: number;
  area: string | null;
  status: string;
  notes: string | null;
  created_at?: string;
};
