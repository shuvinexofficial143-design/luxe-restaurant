import { baseTimes } from "./data";

export function createBookingId() {
  return `LUXE-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

export function createWaitlistId() {
  return `WAIT-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

export function todayISO() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export function addDaysISO(days: number) {
  const now = new Date();
  now.setDate(now.getDate() + days);
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export function formatDate(date: string) {
  if (!date) return "Choose date";
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export function availabilityFor(date: string, guests: number) {
  const seed = [...date].reduce((sum, char) => sum + char.charCodeAt(0), guests * 17);

  return baseTimes.map((time, index) => {
    const unavailable = (seed + index * 7 + guests) % 6 === 0;
    const limited = !unavailable && (seed + index * 3) % 5 === 0;
    return { time, available: !unavailable, limited };
  });
}

export function depositFor(guests: number, area: string) {
  if (area === "Chef Table") return Math.max(2000, guests * 1000);
  if (guests >= 6) return guests * 500;
  return 0;
}
