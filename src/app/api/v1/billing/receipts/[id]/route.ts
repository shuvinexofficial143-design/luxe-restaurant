import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { ApiError } from "@/lib/server/api/errors";
import { supabaseBillingReceipts } from "@/lib/server/supabase/billing-receipts";

export async function GET(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  const requestId = getRequestId(request);

  try {
    const { id } = await context.params;
    const receipt =
      await supabaseBillingReceipts.findById(id);

    if (!receipt) {
      throw new ApiError(
        "RECEIPT_NOT_FOUND",
        "Receipt was not found.",
        404
      );
    }

    return apiSuccess(
      { receipt },
      requestId
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
