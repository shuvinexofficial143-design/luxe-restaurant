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
  buildDeepHealth,
} from "@/lib/server/monitoring/health";

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

    const report =
      await buildDeepHealth();

    return apiSuccess(
      report,
      requestId
    );
  } catch (error) {
    return apiFailure(
      error,
      requestId
    );
  }
}
