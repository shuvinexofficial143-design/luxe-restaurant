import { NextRequest } from "next/server";
import {
  apiFailure,
  apiSuccess,
} from "@/lib/server/api/response";
import {
  parseJsonObject,
  requireString,
} from "@/lib/server/api/validation";
import {
  getRequestId,
} from "@/lib/server/security/request-id";
import {
  requireAdminPermission,
} from "@/lib/server/security/admin-guard";
import {
  requireCsrf,
} from "@/lib/server/security/csrf";
import {
  sendResendEmail,
} from "@/lib/server/email/resend";
import {
  sendWhatsAppText,
} from "@/lib/server/whatsapp/cloud";
import {
  ApiError,
} from "@/lib/server/api/errors";

export async function POST(
  request: NextRequest
) {
  const requestId =
    getRequestId(request);

  try {
    requireCsrf(request);

    await requireAdminPermission(
      request,
      "security.view"
    );

    const body =
      await parseJsonObject(request);

    const channel =
      requireString(
        body,
        "channel",
        { max: 20 }
      ).toUpperCase();

    const recipient =
      requireString(
        body,
        "recipient",
        {
          min: 3,
          max: 240,
        }
      );

    if (channel === "EMAIL") {
      const result =
        await sendResendEmail({
          to: recipient,
          subject:
            "LUXE provider test",
          text:
            "This is an explicit provider test from the LUXE admin panel.",
          html:
            "<p>This is an explicit provider test from the LUXE admin panel.</p>",
        });

      return apiSuccess(
        {
          sent: true,
          provider: "RESEND",
          providerMessageId:
            result.id,
        },
        requestId
      );
    }

    if (
      channel === "WHATSAPP"
    ) {
      const result =
        await sendWhatsAppText({
          to: recipient,
          text:
            "LUXE provider test. This message was explicitly triggered from the admin panel.",
        });

      return apiSuccess(
        {
          sent: true,
          provider:
            "WHATSAPP",
          providerMessageId:
            result.messages?.[0]
              ?.id || null,
        },
        requestId
      );
    }

    throw new ApiError(
      "INVALID_CHANNEL",
      "channel must be EMAIL or WHATSAPP.",
      422
    );
  } catch (error) {
    return apiFailure(
      error,
      requestId
    );
  }
}
