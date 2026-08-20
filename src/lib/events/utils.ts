export function createEventBookingId() {
  return `EVT-${Date.now().toString(36).toUpperCase().slice(-7)}`;
}

export function formatEventDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}
