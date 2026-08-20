import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import {
  parseJsonObject,
  requireString,
} from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { createPaymentIntent } from "@/lib/server/billing/intent-service";
import { razorpayPublicKey } from "@/lib/server/billing/config";
import type {
  PaymentEntityType,
} from "@/lib/server/billing/types";
import { ApiError } from "@/lib/server/api/errors";

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    const body = await parseJsonObject(request);
    const entityType = requireString(
      body,
      "entityType",
      { max: 30 }
    ).toUpperCase();

    if (
      !["ORDER", "RESERVATION"].includes(
        entityType
      )
    ) {
      throw new ApiError(
        "INVALID_PAYMENT_ENTITY",
        "entityType must be ORDER or RESERVATION.",
        422
      );
    }

    const result = await createPaymentIntent({
      entityType:
        entityType as PaymentEntityType,
      entityId: requireString(body, "entityId", {
        max: 180,
      }),
    });

    const publicKey = razorpayPublicKey();

    if (!publicKey) {
      throw new ApiError(
        "RAZORPAY_PUBLIC_KEY_MISSING",
        "Razorpay checkout public key is not configured.",
        503
      );
    }

    return apiSuccess(
      {
        paymentIntent: result.intent,
        customer: result.customer,
        razorpayKeyId: publicKey,
        reused: result.reused,
      },
      requestId,
      201
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
