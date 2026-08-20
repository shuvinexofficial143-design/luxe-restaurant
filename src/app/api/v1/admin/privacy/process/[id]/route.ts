import { NextRequest } from "next/server";
import { ApiError } from "@/lib/server/api/errors";
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
  requireCsrf,
} from "@/lib/server/security/csrf";
import {
  parseJsonObject,
  requireString,
} from "@/lib/server/api/validation";
import {
  resolvePrivacyRequest,
} from "@/lib/server/privacy/service";
import {
  writeSecurityAudit,
} from "@/lib/server/security/audit-log";

export async function PATCH(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const requestId =
    getRequestId(request);

  try {
    requireCsrf(
      request
    );

    const admin =
      await requireAdminPermission(
        request,
        "security.view"
      );

    const { id } =
      await context.params;

    const body =
      await parseJsonObject(
        request
      );

    const status =
      requireString(
        body,
        "status",
        { max: 30 }
      ).toUpperCase();

    if (
      ![
        "IN_REVIEW",
        "COMPLETED",
        "REJECTED",
      ].includes(status)
    ) {
      throw new ApiError(
        "INVALID_PRIVACY_STATUS",
        "Invalid privacy request status.",
        422
      );
    }

    const resolved =
      await resolvePrivacyRequest(
        {
          id,
          status:
            status as
              | "IN_REVIEW"
              | "COMPLETED"
              | "REJECTED",
          note:
            typeof body.note ===
            "string"
              ? body.note
              : "",
        }
      );

    await writeSecurityAudit({
      adminUserId:
        admin.user.id,
      eventType:
        "PRIVACY_REQUEST_UPDATED",
      resource:
        `/privacy/${id}`,
      action: status,
      request,
    }).catch(
      () => undefined
    );

    return apiSuccess(
      {
        request:
          resolved,
        dataDeletionPerformed:
          false,
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
