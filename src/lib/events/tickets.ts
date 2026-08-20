import type { EventRecord } from "./types";

export function maxTicketQuantity(event: EventRecord) {
  if (event.soldOut || event.seatsRemaining <= 0) return 0;
  return Math.min(8, event.seatsRemaining);
}

export function bookingTotal(event: EventRecord, quantity: number) {
  return event.price * Math.max(1, quantity);
}

export function seatLabel(event: EventRecord) {
  if (event.soldOut || event.seatsRemaining === 0) return "Sold out";
  if (event.seatsRemaining <= 5) return `Only ${event.seatsRemaining} left`;
  if (event.seatsRemaining <= 12) return `${event.seatsRemaining} seats left`;
  return "Available";
}
