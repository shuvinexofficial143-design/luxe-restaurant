import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import {
  parseJsonObject,
  requirePositiveInteger,
  requireString,
} from "@/lib/server/api/validation";
import { serverIds } from "@/lib/server/db/ids";
import { getRequestId } from "@/lib/server/security/request-id";
import { supabaseReservations } from "@/lib/server/supabase/reservations";

export async function GET(request: Request) {
  const requestId = getRequestId(request);

  try {
    const rows = await supabaseReservations.listUpcoming(100);
    return apiSuccess({ reservations: rows }, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    const body = await parseJsonObject(request);

    const row = await supabaseReservations.insert({
      id: serverIds.reservation(),
      guest_name: requireString(body, "guestName", { max: 100 }),
      email: requireString(body, "email", { max: 200 }),
      phone: requireString(body, "phone", { max: 40 }),
      reservation_date: requireString(body, "date", { max: 20 }),
      reservation_time: requireString(body, "time", { max: 20 }),
      guest_count: requirePositiveInteger(body, "guestCount", 30),
      area:
        typeof body.area === "string" && body.area.trim()
          ? body.area.trim()
          : null,
      table_id:
        typeof body.tableId === "string" && body.tableId.trim()
          ? body.tableId.trim()
          : null,
      occasion:
        typeof body.occasion === "string" && body.occasion.trim()
          ? body.occasion.trim()
          : null,
      notes:
        typeof body.notes === "string" && body.notes.trim()
          ? body.notes.trim()
          : null,
      status: "CONFIRMED",
    });

    return apiSuccess({ reservation: row }, requestId, 201);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
