import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import {
  parseJsonObject,
  requirePositiveInteger,
  requireString,
} from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { joinReservationWaitlist } from "@/lib/server/reservations/waitlist";
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

    const entry = await joinReservationWaitlist({
      customerId: session?.customer.id,
      guestName: requireString(body, "guestName", { max: 100 }),
      email: requireString(body, "email", { max: 200 }),
      phone: requireString(body, "phone", { max: 40 }),
      date: requireString(body, "date", { min: 10, max: 10 }),
      time: requireString(body, "time", { max: 20 }),
      guests: requirePositiveInteger(body, "guests", 30),
      area:
        typeof body.area === "string" ? body.area.slice(0, 120) : "Any",
      notes:
        typeof body.notes === "string" ? body.notes.slice(0, 1000) : "",
    });

    return apiSuccess({ entry }, requestId, 201);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
