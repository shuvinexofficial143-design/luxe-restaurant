import { NextRequest } from "next/server";
import {
  apiFailure,
  apiSuccess,
} from "@/lib/server/api/response";
import {
  getRequestId,
} from "@/lib/server/security/request-id";
import {
  requireAdminPermission,
} from "@/lib/server/security/admin-guard";
import {
  communicationEnvironment,
} from "@/lib/server/communications/config";
import {
  supabaseNotificationQueue,
} from "@/lib/server/supabase/notification-queue";

export async function GET(
  request: NextRequest
) {
  const requestId =
    getRequestId(request);

  try {
    await requireAdminPermission(
      request,
      "security.view"
    );

    const notifications =
      await supabaseNotificationQueue.listRecent(
        200
      );

    return apiSuccess(
      {
        providers:
          communicationEnvironment(),
        notifications,
        stats: {
          total:
            notifications.length,
          queued:
            notifications.filter(
              (item) =>
                item.status ===
                "QUEUED"
            ).length,
          sent:
            notifications.filter(
              (item) =>
                item.status ===
                "SENT"
            ).length,
          failed:
            notifications.filter(
              (item) =>
                item.status ===
                  "FAILED" ||
                item.status ===
                  "DEAD"
            ).length,
        },
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
