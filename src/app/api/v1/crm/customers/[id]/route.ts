import { NextRequest } from "next/server";
import { ApiError } from "@/lib/server/api/errors";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { getCRMCustomer } from "@/lib/server/crm/service";
import { supabaseCRMNotes } from "@/lib/server/supabase/customer-notes";
import { buildCustomerTimeline } from "@/lib/server/crm/timeline";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const requestId = getRequestId(request);

  try {
    if (request.cookies.get("luxe_admin_demo")?.value !== "1") {
      throw new ApiError(
        "ADMIN_REQUIRED",
        "Admin session is required.",
        401
      );
    }

    const { id } = await context.params;
    const summary = await getCRMCustomer(id);

    if (!summary) {
      throw new ApiError(
        "CUSTOMER_NOT_FOUND",
        "Customer was not found.",
        404
      );
    }

    const [notes, timeline] = await Promise.all([
      supabaseCRMNotes.listForCustomer(id),
      buildCustomerTimeline({
        customerId: id,
        email: summary.customer.email,
      }),
    ]);

    return apiSuccess(
      {
        ...summary,
        notes,
        timeline,
      },
      requestId
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
