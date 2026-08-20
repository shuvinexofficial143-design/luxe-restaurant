import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { parseJsonObject, requireString } from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { sendWhatsAppText } from "@/lib/server/whatsapp/cloud";

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    const body = await parseJsonObject(request);

    const result = await sendWhatsAppText({
      to: requireString(body, "to", { min: 8, max: 30 }),
      text: requireString(body, "text", { min: 1, max: 4096 }),
    });

    return apiSuccess(
      {
        messageId: result.messages?.[0]?.id || null,
      },
      requestId,
      201
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
