import { NextRequest } from "next/server";
import { ApiError } from "@/lib/server/api/errors";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { buildCustomerCohorts } from "@/lib/server/analytics/cohorts";

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    if (request.cookies.get("luxe_admin_demo")?.value !== "1") {
      throw new ApiError("ADMIN_REQUIRED", "Admin session is required.", 401);
    }

    const cohorts = await buildCustomerCohorts(6);
    return apiSuccess({ cohorts }, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
