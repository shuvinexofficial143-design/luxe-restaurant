import { NextRequest } from "next/server";
import { ApiError } from "@/lib/server/api/errors";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { parseAnalyticsRange } from "@/lib/server/analytics/date-range";
import { buildAnalyticsOverview } from "@/lib/server/analytics/metrics";

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    if (request.cookies.get("luxe_admin_demo")?.value !== "1") {
      throw new ApiError("ADMIN_REQUIRED", "Admin session is required.", 401);
    }

    const overview = await buildAnalyticsOverview(
      parseAnalyticsRange(new URL(request.url))
    );

    return apiSuccess(
      {
        range: overview.range,
        daily: overview.daily.map((item) => ({
          date: item.date,
          revenue: item.revenue,
          avgOrderValue: item.avgOrderValue,
          completedOrders: item.completedOrders,
        })),
      },
      requestId
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
