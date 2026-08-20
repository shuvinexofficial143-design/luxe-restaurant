import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import {
  parseJsonObject,
  requirePositiveInteger,
  requireString,
} from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { createReservationHold } from "@/lib/server/reservations/booking";

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    const body = await parseJsonObject(request);

    const hold = await createReservationHold({
      date: requireString(body, "date", { min: 10, max: 10 }),
      time: requireString(body, "time", { min: 4, max: 10 }),
      guests: requirePositiveInteger(body, "guests", 30),
      area:
        typeof body.area === "string" ? body.area.slice(0, 120) : "Any",
      tableId:
        typeof body.tableId === "string"
          ? body.tableId.slice(0, 120)
          : undefined,
    });

    return apiSuccess({ hold }, requestId, 201);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
