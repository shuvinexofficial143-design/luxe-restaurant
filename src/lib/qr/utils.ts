import type { QRShareType } from "./types";

export function qrImageUrl(value: string, size = 420) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=12&data=${encodeURIComponent(
    value
  )}`;
}

export function absoluteAppUrl(path: string) {
  if (typeof window === "undefined") return path;
  return new URL(path, window.location.origin).toString();
}

export function sharePath(type: QRShareType, value: string) {
  const clean = value.trim();

  if (type === "MENU") return "/menu";
  if (type === "TABLE")
    return `/order?table=${encodeURIComponent(clean || "T01")}`;
  if (type === "RESERVATION")
    return clean
      ? `/reservations/manage?reference=${encodeURIComponent(clean)}`
      : "/reservations";
  if (type === "EVENT")
    return clean ? `/events/${encodeURIComponent(clean)}` : "/events";
  if (type === "GIFT")
    return clean
      ? `/gift-cards/redeem?code=${encodeURIComponent(clean)}`
      : "/gift-cards";

  return clean || "/";
}

export function qrTypeLabel(type: QRShareType) {
  if (type === "MENU") return "Menu";
  if (type === "TABLE") return "Table order";
  if (type === "RESERVATION") return "Reservation";
  if (type === "EVENT") return "Event";
  if (type === "GIFT") return "Gift card";
  return "Custom link";
}
