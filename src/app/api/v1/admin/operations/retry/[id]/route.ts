import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { requireAdminPermission } from "@/lib/server/security/admin-guard";
import { requireCsrf } from "@/lib/server/security/csrf";
import { retryDeadJob } from "@/lib/server/jobs/service";
import { writeSecurityAudit } from "@/lib/server/security/audit-log";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const requestId = getRequestId(request);

  try {
    requireCsrf(request);

    const admin = await requireAdminPermission(
      request,
      "security.view"
    );

    const { id } = await context.params;

    await retryDeadJob(id);

    await writeSecurityAudit({
      adminUserId: admin.user.id,
      eventType: "DEAD_JOB_REQUEUED",
      resource: `/jobs/${id}`,
      action: "retry",
      request,
    }).catch(() => undefined);

    return apiSuccess(
      {
        jobId: id,
        requeued: true,
      },
      requestId
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
