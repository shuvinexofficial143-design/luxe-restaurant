import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { requireAdminPermission } from "@/lib/server/security/admin-guard";
import { parseAnalyticsRange } from "@/lib/server/analytics/date-range";
import { buildAnalyticsOverview } from "@/lib/server/analytics/metrics";

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    await requireAdminPermission(request, "analytics.view");

    const range = parseAnalyticsRange(new URL(request.url));
    const overview = await buildAnalyticsOverview(range);

    return apiSuccess(overview, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
