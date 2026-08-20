import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { parseJsonObject, requireString } from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { sendWhatsAppTemplate } from "@/lib/server/whatsapp/cloud";

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    const body = await parseJsonObject(request);

    const result = await sendWhatsAppTemplate({
      to: requireString(body, "to", { min: 8, max: 30 }),
      templateName: requireString(body, "templateName", { max: 200 }),
      languageCode:
        typeof body.languageCode === "string" ? body.languageCode : "en",
      components: Array.isArray(body.components) ? body.components : [],
    });

    return apiSuccess(
      { messageId: result.messages?.[0]?.id || null },
      requestId,
      201
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
