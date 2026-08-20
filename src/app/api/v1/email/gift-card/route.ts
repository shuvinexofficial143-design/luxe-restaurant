import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { parseJsonObject, requireString } from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { sendResendEmail } from "@/lib/server/email/resend";
import { giftCardEmail } from "@/lib/server/email/templates";

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    const body = await parseJsonObject(request);
    const to = requireString(body, "to", { max: 200 });

    const template = giftCardEmail({
      recipientName: requireString(body, "recipientName", { max: 100 }),
      senderName: requireString(body, "senderName", { max: 100 }),
      code: requireString(body, "code", { max: 100 }),
      amount: requireString(body, "amount", { max: 50 }),
      message: requireString(body, "message", { max: 500 }),
    });

    const result = await sendResendEmail({ to, ...template });
    return apiSuccess({ emailId: result.id }, requestId, 201);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
