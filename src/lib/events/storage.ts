import type { EventBooking } from "./types";

const KEY = "luxe-event-bookings-v1";

function read(): EventBooking[] {
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(next: EventBooking[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  }
}

export const eventBookingStorage = {
  list() {
    return read();
  },
  get(id: string) {
    return read().find((booking) => booking.id === id);
  },
  save(booking: EventBooking) {
    const current = read();
    write([booking, ...current.filter((item) => item.id !== booking.id)]);
    return booking;
  },
};
