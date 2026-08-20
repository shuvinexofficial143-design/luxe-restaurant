import { serverIds } from "@/lib/server/db/ids";
import { supabaseWaitlist } from "@/lib/server/supabase/waitlist";

export async function joinReservationWaitlist(input: {
  customerId?: string;
  guestName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  area?: string;
  notes?: string;
}) {
  return supabaseWaitlist.insert({
    id: `WAIT-${serverIds.reservation()}`,
    customer_id: input.customerId || null,
    guest_name: input.guestName,
    email: input.email.toLowerCase(),
    phone: input.phone,
    reservation_date: input.date,
    preferred_time: input.time,
    guest_count: input.guests,
    area:
      input.area && input.area !== "Any" ? input.area : null,
    status: "WAITING",
    notes: input.notes || null,
  });
}
