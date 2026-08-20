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
  buildDeploymentReadiness,
} from "@/lib/deployment/readiness";
import {
  productionCriticalRoutes,
} from "@/lib/deployment/routes";
import {
  productionChecklist,
} from "@/lib/deployment/checklist";

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

    const readiness =
      await buildDeploymentReadiness();

    return apiSuccess(
      {
        readiness,
        criticalRoutes:
          productionCriticalRoutes,
        checklist:
          productionChecklist,
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
