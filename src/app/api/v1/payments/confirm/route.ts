import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import {
  parseJsonObject,
  requireString,
} from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { confirmCheckout } from "@/lib/server/billing/confirmation";

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    const body = await parseJsonObject(request);

    const result = await confirmCheckout({
      paymentIntentId: requireString(
        body,
        "paymentIntentId",
        { max: 180 }
      ),
      razorpayOrderId: requireString(
        body,
        "razorpayOrderId",
        { max: 180 }
      ),
      razorpayPaymentId: requireString(
        body,
        "razorpayPaymentId",
        { max: 180 }
      ),
      razorpaySignature: requireString(
        body,
        "razorpaySignature",
        { max: 300 }
      ),
    });

    return apiSuccess(result, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
