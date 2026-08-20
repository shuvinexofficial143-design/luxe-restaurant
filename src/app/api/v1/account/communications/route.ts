import { NextRequest } from "next/server";
import {
  apiFailure,
  apiSuccess,
} from "@/lib/server/api/response";
import {
  parseJsonObject,
} from "@/lib/server/api/validation";
import {
  getRequestId,
} from "@/lib/server/security/request-id";
import {
  requireCustomer,
} from "@/lib/server/account/session";
import {
  ensureCommunicationPreferences,
  updateCommunicationPreferences,
} from "@/lib/server/communications/preferences";
import {
  supabaseNotificationQueue,
} from "@/lib/server/supabase/notification-queue";

export async function GET(
  request: NextRequest
) {
  const requestId =
    getRequestId(request);

  try {
    const customer =
      await requireCustomer(request);

    const [preferences, notifications] =
      await Promise.all([
        ensureCommunicationPreferences(
          customer.id
        ),
        supabaseNotificationQueue.list({
          limit: 100,
          order: "created_at.desc",
          query: `customer_id=eq.${encodeURIComponent(
            customer.id
          )}`,
        }),
      ]);

    return apiSuccess(
      {
        preferences,
        notifications,
      },
      requestId
    );
  } catch (error) {
    return apiFailure(
      error,
      requestId
    );
  }
}

export async function PATCH(
  request: NextRequest
) {
  const requestId =
    getRequestId(request);

  try {
    const customer =
      await requireCustomer(request);
    const body =
      await parseJsonObject(request);

    const patch: Record<string, boolean | "en" | "hi"> = {};

    for (const key of [
      "transactional_email",
      "transactional_whatsapp",
      "marketing_email",
      "marketing_whatsapp",
    ]) {
      if (typeof body[key] === "boolean") {
        patch[key] =
          body[key] as boolean;
      }
    }

    if (
      body.language === "en" ||
      body.language === "hi"
    ) {
      patch.language =
        body.language;
    }

    const preferences =
      await updateCommunicationPreferences(
        customer.id,
        patch
      );

    return apiSuccess(
      { preferences },
      requestId
    );
  } catch (error) {
    return apiFailure(
      error,
      requestId
    );
  }
}
