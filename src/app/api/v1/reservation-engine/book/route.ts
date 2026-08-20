import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import {
  parseJsonObject,
  requireString,
} from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { confirmReservationHold } from "@/lib/server/reservations/booking";
import { CUSTOMER_SESSION_COOKIE } from "@/lib/server/auth/customer-cookies";
import { resolveCustomerSession } from "@/lib/server/auth/customer-service";

export async function POST(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    const body = await parseJsonObject(request);
    const token =
      request.cookies.get(CUSTOMER_SESSION_COOKIE)?.value || "";

    const session = token
      ? await resolveCustomerSession(token).catch(() => null)
      : null;

    const reservation = await confirmReservationHold({
      holdId: requireString(body, "holdId", { max: 180 }),
      customerId: session?.customer.id,
      guestName: requireString(body, "guestName", { max: 100 }),
      email: requireString(body, "email", { max: 200 }),
      phone: requireString(body, "phone", { max: 40 }),
      occasion:
        typeof body.occasion === "string"
          ? body.occasion.slice(0, 120)
          : "",
      notes:
        typeof body.notes === "string"
          ? body.notes.slice(0, 1000)
          : "",
    });

    return apiSuccess({ reservation }, requestId, 201);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
