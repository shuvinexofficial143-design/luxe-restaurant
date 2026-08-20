import { orderStatuses } from "./config";

export function canMoveOrderStatus(
  current: string,
  next: string
) {
  if (next === "CANCELLED") {
    return !["COMPLETED", "CANCELLED"].includes(current);
  }

  const currentIndex = orderStatuses.indexOf(
    current as (typeof orderStatuses)[number]
  );
  const nextIndex = orderStatuses.indexOf(
    next as (typeof orderStatuses)[number]
  );

  return (
    currentIndex >= 0 &&
    nextIndex >= 0 &&
    nextIndex === currentIndex + 1
  );
}

export function nextOrderStatus(current: string) {
  if (current === "RECEIVED") return "CONFIRMED";
  if (current === "CONFIRMED") return "PREPARING";
  if (current === "PREPARING") return "READY";
  if (current === "READY") return "COMPLETED";
  return null;
}
