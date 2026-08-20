import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { parseJsonObject, requireString } from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { createRazorpayOrder } from "@/lib/server/payments/razorpay";
import { ApiError } from "@/lib/server/api/errors";

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    const body = await parseJsonObject(request);
    const amountPaise = body.amountPaise;

    if (
      typeof amountPaise !== "number" ||
      !Number.isInteger(amountPaise)
    ) {
      throw new ApiError(
        "INVALID_PAYMENT_AMOUNT",
        "amountPaise must be an integer.",
        422
      );
    }

    const receipt = requireString(body, "receipt", {
      min: 1,
      max: 40,
    });

    const order = await createRazorpayOrder({
      amountPaise,
      receipt,
      notes:
        body.notes &&
        typeof body.notes === "object" &&
        !Array.isArray(body.notes)
          ? Object.fromEntries(
              Object.entries(body.notes as Record<string, unknown>)
                .filter(([, value]) => typeof value === "string")
                .map(([key, value]) => [key, String(value).slice(0, 256)])
            )
          : {},
    });

    return apiSuccess({ order }, requestId, 201);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
