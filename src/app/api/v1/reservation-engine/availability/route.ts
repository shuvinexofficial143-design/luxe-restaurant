import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { ApiError } from "@/lib/server/api/errors";
import { getRequestId } from "@/lib/server/security/request-id";
import { getReservationAvailability } from "@/lib/server/reservations/availability";

export async function GET(request: Request) {
  const requestId = getRequestId(request);
  const url = new URL(request.url);
  const date = url.searchParams.get("date") || "";
  const guests = Number(url.searchParams.get("guests") || "0");
  const area = url.searchParams.get("area") || "Any";
  const time = url.searchParams.get("time") || undefined;

  try {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new ApiError(
        "INVALID_DATE",
        "A valid reservation date is required.",
        422
      );
    }

    if (!Number.isInteger(guests) || guests < 1 || guests > 30) {
      throw new ApiError(
        "INVALID_GUEST_COUNT",
        "Guest count must be between 1 and 30.",
        422
      );
    }

    const slots = await getReservationAvailability({
      date,
      guests,
      area,
      time,
    });

    return apiSuccess({ date, guests, area, slots }, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
