export const orderStatuses = [
  "RECEIVED",
  "CONFIRMED",
  "PREPARING",
  "READY",
  "COMPLETED",
  "CANCELLED",
] as const;

export const fulfillmentModes = ["TABLE", "PICKUP"] as const;

export const kitchenStations = [
  "HOT",
  "COLD",
  "PASTRY",
  "BAR",
] as const;

export const pickupWindows = [
  "ASAP · 25–35 min",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
];

export function statusStep(status: string) {
  return orderStatuses.indexOf(
    status as (typeof orderStatuses)[number]
  );
}
