import { NextRequest } from "next/server";
import { ApiError } from "@/lib/server/api/errors";
import {
  apiFailure,
  apiSuccess,
} from "@/lib/server/api/response";
import {
  parseJsonObject,
  requireString,
} from "@/lib/server/api/validation";
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
  getOrderDetails,
  updateDatabaseOrderStatus,
} from "@/lib/server/orders/service";
import {
  canMoveOrderStatus,
} from "@/lib/server/orders/status";
import {
  writeSecurityAudit,
} from "@/lib/server/security/audit-log";
import {
  queueOrderReady,
} from "@/lib/server/communications/automation";

export async function PATCH(
  request: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  const requestId =
    getRequestId(request);

  try {
    requireCsrf(request);

    const admin =
      await requireAdminPermission(
        request,
        "orders.manage"
      );

    const { id } =
      await context.params;
    const body =
      await parseJsonObject(request);
    const next =
      requireString(
        body,
        "status",
        { max: 40 }
      ).toUpperCase();

    const details =
      await getOrderDetails(id);

    if (
      !canMoveOrderStatus(
        details.order.status,
        next
      )
    ) {
      throw new ApiError(
        "INVALID_STATUS_TRANSITION",
        `Cannot move ${details.order.status} directly to ${next}.`,
        409
      );
    }

    const result =
      await updateDatabaseOrderStatus(
        id,
        next,
        typeof body.note === "string"
          ? body.note.slice(0, 300)
          : ""
      );

    if (next === "READY") {
      await queueOrderReady({
        customerId:
          details.order.customer_id,
        orderId:
          details.order.id,
        guestName:
          details.order.guest_name,
        phone:
          details.order.phone,
      }).catch(() => undefined);
    }

    await writeSecurityAudit({
      adminUserId:
        admin.user.id,
      eventType:
        "ORDER_STATUS_CHANGED",
      resource:
        `/orders/${id}`,
      action: next,
      request,
      metadata: {
        previousStatus:
          details.order.status,
      },
    }).catch(() => undefined);

    return apiSuccess(
      result,
      requestId
    );
  } catch (error) {
    return apiFailure(
      error,
      requestId
    );
  }
}
