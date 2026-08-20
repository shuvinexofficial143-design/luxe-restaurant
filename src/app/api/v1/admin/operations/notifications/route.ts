import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { requireAdminPermission } from "@/lib/server/security/admin-guard";
import { supabaseNotificationQueue } from "@/lib/server/supabase/notification-queue";

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    await requireAdminPermission(
      request,
      "security.view"
    );

    const notifications =
      await supabaseNotificationQueue.listRecent(150);

    return apiSuccess(
      { notifications },
      requestId
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
