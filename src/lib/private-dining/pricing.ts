import type {
  PrivateDiningPackage,
  PrivateDiningRoom,
} from "./types";

export function estimatePrivateDining(
  room: PrivateDiningRoom,
  diningPackage: PrivateDiningPackage,
  guests: number
) {
  return Math.max(
    room.baseMinimum,
    diningPackage.pricePerGuest * Math.max(room.minGuests, guests)
  );
}

export function createPrivateDiningId() {
  return `PRV-${Date.now().toString(36).toUpperCase().slice(-7)}`;
}
