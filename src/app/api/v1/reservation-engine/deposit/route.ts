import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { parseJsonObject, requireString } from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { createReservationDepositOrder } from "@/lib/server/reservations/deposits";

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    const body = await parseJsonObject(request);
    const reservationId = requireString(body, "reservationId", {
      max: 180,
    });

    const result = await createReservationDepositOrder(reservationId);

    return apiSuccess(result, requestId, 201);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
