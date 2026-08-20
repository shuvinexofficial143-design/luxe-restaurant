import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { requireAdminPermission } from "@/lib/server/security/admin-guard";
import { supabasePaymentIntents } from "@/lib/server/supabase/payment-intents";

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    await requireAdminPermission(
      request,
      "security.view"
    );

    const payments =
      await supabasePaymentIntents.listRecent(
        200
      );

    return apiSuccess(
      { payments },
      requestId
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
