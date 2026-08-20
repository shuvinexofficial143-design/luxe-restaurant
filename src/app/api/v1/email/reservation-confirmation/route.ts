import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import {
  parseJsonObject,
  requirePositiveInteger,
  requireString,
} from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { sendResendEmail } from "@/lib/server/email/resend";
import { reservationConfirmationEmail } from "@/lib/server/email/templates";

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    const body = await parseJsonObject(request);
    const to = requireString(body, "to", { max: 200 });

    const template = reservationConfirmationEmail({
      guestName: requireString(body, "guestName", { max: 100 }),
      reference: requireString(body, "reference", { max: 100 }),
      date: requireString(body, "date", { max: 40 }),
      time: requireString(body, "time", { max: 40 }),
      guests: requirePositiveInteger(body, "guests", 30),
    });

    const result = await sendResendEmail({
      to,
      ...template,
    });

    return apiSuccess({ emailId: result.id }, requestId, 201);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
