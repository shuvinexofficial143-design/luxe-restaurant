import type { NotificationItem } from "./types";

export function unreadCount(items: NotificationItem[]) {
  return items.filter((item) => !item.read).length;
}

export function notificationLabel(type: NotificationItem["type"]) {
  if (type === "EVENT") return "Event";
  if (type === "WINE") return "Wine";
  if (type === "OFFER") return "Offer";
  if (type === "BOOKING") return "Booking";
  return "Update";
}

export function relativeNotificationDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}
