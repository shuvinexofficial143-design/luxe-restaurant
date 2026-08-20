import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { requireAdminPermission } from "@/lib/server/security/admin-guard";
import { requireCsrf } from "@/lib/server/security/csrf";
import {
  processRefund,
} from "@/lib/server/billing/refund-service";
import { writeSecurityAudit } from "@/lib/server/security/audit-log";

export async function POST(
  request: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  const requestId = getRequestId(request);

  try {
    requireCsrf(request);

    const admin =
      await requireAdminPermission(
        request,
        "security.view"
      );

    const { id } = await context.params;

    const refund = await processRefund({
      refundRequestId: id,
      processedBy: admin.user.id,
    });

    await writeSecurityAudit({
      adminUserId: admin.user.id,
      eventType: "REFUND_PROCESSED",
      resource: `/refunds/${id}`,
      action: "refund",
      request,
    }).catch(() => undefined);

    return apiSuccess(
      { refund },
      requestId
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
