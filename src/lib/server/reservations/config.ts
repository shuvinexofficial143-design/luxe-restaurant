export const reservationTimes = [
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
];

export const reservationAreas = [
  "Any",
  "Main Dining",
  "Window",
  "Terrace",
  "Chef Table",
  "Private Dining",
];

export const reservationHoldMinutes = 8;

export function depositEstimate(guestCount: number, date: string) {
  const day = new Date(`${date}T12:00:00`).getDay();
  const weekend = day === 0 || day === 5 || day === 6;
  const required = guestCount >= 6 || weekend;

  return {
    required,
    amount: required ? Math.max(1000, guestCount * 500) : 0,
  };
}
