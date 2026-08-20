import type { ReservationRecord, WaitlistRecord } from "./types";

const BOOKINGS_KEY = "luxe-reservations-v1";
const WAITLIST_KEY = "luxe-waitlist-v1";

function parse<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function save<T>(key: string, value: T[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

export const reservationStorage = {
  listBookings() {
    return parse<ReservationRecord>(BOOKINGS_KEY);
  },
  getBooking(id: string) {
    return parse<ReservationRecord>(BOOKINGS_KEY).find((item) => item.id === id);
  },
  saveBooking(record: ReservationRecord) {
    const current = parse<ReservationRecord>(BOOKINGS_KEY);
    const next = [record, ...current.filter((item) => item.id !== record.id)];
    save(BOOKINGS_KEY, next);
    return record;
  },
  updateBooking(id: string, patch: Partial<ReservationRecord>) {
    const current = parse<ReservationRecord>(BOOKINGS_KEY);
    const next = current.map((item) => (item.id === id ? { ...item, ...patch } : item));
    save(BOOKINGS_KEY, next);
    return next.find((item) => item.id === id);
  },
  cancelBooking(id: string) {
    return this.updateBooking(id, { status: "CANCELLED" });
  },
  addWaitlist(record: WaitlistRecord) {
    const current = parse<WaitlistRecord>(WAITLIST_KEY);
    save(WAITLIST_KEY, [record, ...current]);
    return record;
  },
};
