import { ApiError } from "@/lib/server/api/errors";
import { serverIds } from "@/lib/server/db/ids";
import { supabaseRpc } from "@/lib/server/supabase/rpc";
import { reservationHoldMinutes } from "./config";
import type {
  ConfirmedReservation,
  ReservationHold,
} from "./types";
import {
  queueReservationConfirmation,
} from "@/lib/server/communications/automation";

export async function createReservationHold(input: {
  date: string;
  time: string;
  guests: number;
  area?: string;
  tableId?: string;
}) {
  const holdId =
    `HOLD-${crypto.randomUUID()}`;

  const hold =
    await supabaseRpc<ReservationHold>(
      "luxe_create_reservation_hold",
      {
        p_hold_id: holdId,
        p_date: input.date,
        p_time: input.time,
        p_guests: input.guests,
        p_area:
          input.area &&
          input.area !== "Any"
            ? input.area
            : null,
        p_table_id:
          input.tableId || null,
        p_minutes:
          reservationHoldMinutes,
      }
    );

  if (!hold.ok) {
    throw new ApiError(
      hold.code || "HOLD_FAILED",
      "A table could not be held for this slot.",
      409
    );
  }

  return hold;
}

export async function confirmReservationHold(input: {
  holdId: string;
  customerId?: string;
  guestName: string;
  email: string;
  phone: string;
  occasion?: string;
  notes?: string;
}) {
  const reservationId =
    serverIds.reservation();

  const reservation =
    await supabaseRpc<ConfirmedReservation>(
      "luxe_confirm_reservation_hold",
      {
        p_reservation_id:
          reservationId,
        p_hold_id:
          input.holdId,
        p_customer_id:
          input.customerId || "",
        p_guest_name:
          input.guestName,
        p_email: input.email,
        p_phone: input.phone,
        p_occasion:
          input.occasion || "",
        p_notes:
          input.notes || "",
      }
    );

  if (!reservation.ok) {
    const expired =
      reservation.code ===
      "HOLD_EXPIRED";

    throw new ApiError(
      reservation.code ||
        "BOOKING_FAILED",
      expired
        ? "Your table hold expired. Please choose a slot again."
        : "The reservation could not be confirmed.",
      409
    );
  }

  if (
    reservation.reservationId
  ) {
    await queueReservationConfirmation(
      {
        customerId:
          input.customerId,
        guestName:
          input.guestName,
        email: input.email,
        phone: input.phone,
        reference:
          reservation.reservationId,
        date:
          (reservation as unknown as {
            reservationDate?: string;
          }).reservationDate || "",
        time:
          (reservation as unknown as {
            reservationTime?: string;
          }).reservationTime || "",
        guests:
          (reservation as unknown as {
            guestCount?: number;
          }).guestCount || 0,
      }
    ).catch(() => undefined);
  }

  return reservation;
}
