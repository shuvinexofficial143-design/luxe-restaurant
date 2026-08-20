export type DiningArea = "Main Dining" | "Window" | "Terrace" | "Chef Table";
export type BookingStatus = "CONFIRMED" | "CANCELLED" | "WAITLISTED";

export type TableOption = {
  id: string;
  label: string;
  area: DiningArea;
  seats: number;
  premium?: boolean;
  note: string;
};

export type ReservationDraft = {
  guests: number;
  date: string;
  time: string;
  area: DiningArea;
  tableId: string;
  occasion: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

export type ReservationRecord = ReservationDraft & {
  id: string;
  status: BookingStatus;
  createdAt: string;
  depositRequired: boolean;
  depositAmount: number;
};

export type WaitlistRecord = {
  id: string;
  name: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  preferredTime: string;
  createdAt: string;
  status: "WAITLISTED";
};
