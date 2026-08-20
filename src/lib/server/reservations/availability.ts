import { supabaseRpc } from "@/lib/server/supabase/rpc";
import { reservationTimes } from "./config";
import type { AvailabilitySlot, AvailabilityTable } from "./types";

export async function getReservationAvailability(input: {
  date: string;
  guests: number;
  area?: string;
  time?: string;
}) {
  const times = input.time ? [input.time] : reservationTimes;

  const slots: AvailabilitySlot[] = [];

  for (const time of times) {
    const tables = await supabaseRpc<AvailabilityTable[]>(
      "luxe_reservation_availability",
      {
        p_date: input.date,
        p_time: time,
        p_guests: input.guests,
        p_area:
          input.area && input.area !== "Any" ? input.area : null,
      }
    );

    slots.push({
      time,
      availableTables: tables.filter((table) => table.available).length,
      tables,
    });
  }

  return slots;
}
