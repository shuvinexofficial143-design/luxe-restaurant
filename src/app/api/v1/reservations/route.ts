import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import {
  parseJsonObject,
  requirePositiveInteger,
  requireString,
} from "@/lib/server/api/validation";
import { serverIds } from "@/lib/server/db/ids";
import { getRequestId } from "@/lib/server/security/request-id";
import { requireAdminPermission } from "@/lib/server/security/admin-guard";
import { supabaseReservations } from "@/lib/server/supabase/reservations";

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    const reference = request.nextUrl.searchParams.get("reference")?.trim() || "";

    if (reference) {
      const row = await supabaseReservations.findById(reference);

      const safeReservation = row
        ? {
            id: row.id,
            reservation_date: row.reservation_date,
            reservation_time: row.reservation_time,
            guest_count: row.guest_count,
            area: row.area,
            table_id: row.table_id,
            status: row.status,
            deposit_required:
              "deposit_required" in row
                ? Boolean((row as Record<string, unknown>).deposit_required)
                : false,
            deposit_amount:
              "deposit_amount" in row
                ? Number((row as Record<string, unknown>).deposit_amount || 0)
                : 0,
            payment_status:
              "payment_status" in row
                ? String((row as Record<string, unknown>).payment_status || "UNPAID")
                : "UNPAID",
          }
        : null;

      return apiSuccess(
        { reservations: safeReservation ? [safeReservation] : [] },
        requestId
      );
    }

    await requireAdminPermission(request, "reservations.manage");

    const rows = await supabaseReservations.listUpcoming(100);
    return apiSuccess({ reservations: rows }, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}

export async function POST(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    await requireAdminPermission(request, "reservations.manage");

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
