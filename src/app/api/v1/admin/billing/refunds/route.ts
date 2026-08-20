import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import {
  parseJsonObject,
  requireString,
} from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { requireAdminPermission } from "@/lib/server/security/admin-guard";
import { requireCsrf } from "@/lib/server/security/csrf";
import {
  createRefundRequest,
} from "@/lib/server/billing/refund-service";
import { supabaseRefundRequests } from "@/lib/server/supabase/refund-requests";

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    await requireAdminPermission(
      request,
      "security.view"
    );

    const refunds =
      await supabaseRefundRequests.listPending(
        150
      );

    return apiSuccess(
      { refunds },
      requestId
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}

export async function POST(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    requireCsrf(request);

    const admin =
      await requireAdminPermission(
        request,
        "security.view"
      );

    const body = await parseJsonObject(request);

    const refund =
      await createRefundRequest({
        paymentIntentId: requireString(
          body,
          "paymentIntentId",
          { max: 180 }
        ),
        amount:
          typeof body.amount === "number"
            ? body.amount
            : Number(body.amount || 0),
        reason: requireString(
          body,
          "reason",
          {
            min: 3,
            max: 500,
          }
        ),
        requestedBy: admin.user.id,
      });

    return apiSuccess(
      { refund },
      requestId,
      201
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
